from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity, get_jwt
from werkzeug.security import check_password_hash
from datetime import datetime, timezone, timedelta
import uuid

from src.models.user import db, User, UserSession

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    """User login endpoint"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({
                'success': False,
                'error': {'code': 'INVALID_REQUEST', 'message': 'No data provided'}
            }), 400
        
        email = data.get('email', '').strip().lower()
        password = data.get('password', '')
        
        if not email or not password:
            return jsonify({
                'success': False,
                'error': {'code': 'MISSING_FIELDS', 'message': 'Email and password are required'}
            }), 400
        
        # Find user
        user = User.query.filter_by(email=email).first()
        if not user or not user.check_password(password):
            return jsonify({
                'success': False,
                'error': {'code': 'INVALID_CREDENTIALS', 'message': 'Invalid email or password'}
            }), 401
        
        if not user.is_active:
            return jsonify({
                'success': False,
                'error': {'code': 'ACCOUNT_DISABLED', 'message': 'Account is disabled'}
            }), 401
        
        # Create JWT tokens
        additional_claims = {
            'role': user.role,
            'session_id': str(uuid.uuid4())
        }
        
        access_token = create_access_token(
            identity=user.id,
            additional_claims=additional_claims
        )
        refresh_token = create_refresh_token(
            identity=user.id,
            additional_claims={'session_id': additional_claims['session_id']}
        )
        
        # Create session record
        session = UserSession(
            user_id=user.id,
            session_token=additional_claims['session_id'],
            refresh_token=refresh_token,
            expires_at=datetime.now(timezone.utc) + timedelta(hours=24),
            ip_address=request.remote_addr,
            user_agent=request.headers.get('User-Agent', '')
        )
        db.session.add(session)
        
        # Update user last login
        user.last_login = datetime.now(timezone.utc)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Login successful',
            'data': {
                'access_token': access_token,
                'refresh_token': refresh_token,
                'expires_in': 86400,  # 24 hours in seconds
                'user': user.to_dict()
            }
        })
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': {'code': 'LOGIN_ERROR', 'message': str(e)}
        }), 500

@auth_bp.route('/register', methods=['POST'])
def register():
    """User registration endpoint"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({
                'success': False,
                'error': {'code': 'INVALID_REQUEST', 'message': 'No data provided'}
            }), 400
        
        # Validate required fields
        required_fields = ['email', 'password', 'first_name', 'last_name']
        for field in required_fields:
            if not data.get(field):
                return jsonify({
                    'success': False,
                    'error': {'code': 'MISSING_FIELD', 'field': field, 'message': f'{field} is required'}
                }), 400
        
        email = data.get('email', '').strip().lower()
        
        # Check if user already exists
        if User.query.filter_by(email=email).first():
            return jsonify({
                'success': False,
                'error': {'code': 'USER_EXISTS', 'message': 'User with this email already exists'}
            }), 409
        
        # Create new user
        user = User(
            email=email,
            first_name=data.get('first_name').strip(),
            last_name=data.get('last_name').strip(),
            phone=data.get('phone', '').strip() if data.get('phone') else None,
            role=data.get('role', 'client'),
            company=data.get('company', '').strip() if data.get('company') else None,
            timezone=data.get('timezone', 'UTC')
        )
        user.set_password(data.get('password'))
        
        db.session.add(user)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'User registered successfully',
            'data': {
                'user': user.to_dict()
            }
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': {'code': 'REGISTRATION_ERROR', 'message': str(e)}
        }), 500

@auth_bp.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    """Refresh access token"""
    try:
        current_user_id = get_jwt_identity()
        claims = get_jwt()
        session_id = claims.get('session_id')
        
        # Verify session exists and is valid
        session = UserSession.query.filter_by(
            user_id=current_user_id,
            session_token=session_id,
            is_active=True
        ).first()
        
        if not session or session.is_expired():
            return jsonify({
                'success': False,
                'error': {'code': 'INVALID_SESSION', 'message': 'Session expired or invalid'}
            }), 401
        
        # Get user
        user = User.query.get(current_user_id)
        if not user or not user.is_active:
            return jsonify({
                'success': False,
                'error': {'code': 'USER_NOT_FOUND', 'message': 'User not found or inactive'}
            }), 401
        
        # Create new access token
        additional_claims = {
            'role': user.role,
            'session_id': session_id
        }
        
        access_token = create_access_token(
            identity=user.id,
            additional_claims=additional_claims
        )
        
        # Update session last used
        session.last_used = datetime.now(timezone.utc)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Token refreshed successfully',
            'data': {
                'access_token': access_token,
                'expires_in': 86400
            }
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': {'code': 'REFRESH_ERROR', 'message': str(e)}
        }), 500

@auth_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    """User logout endpoint"""
    try:
        current_user_id = get_jwt_identity()
        claims = get_jwt()
        session_id = claims.get('session_id')
        
        # Deactivate session
        session = UserSession.query.filter_by(
            user_id=current_user_id,
            session_token=session_id
        ).first()
        
        if session:
            session.is_active = False
            db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Logged out successfully'
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': {'code': 'LOGOUT_ERROR', 'message': str(e)}
        }), 500

@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_current_user():
    """Get current user information"""
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if not user:
            return jsonify({
                'success': False,
                'error': {'code': 'USER_NOT_FOUND', 'message': 'User not found'}
            }), 404
        
        return jsonify({
            'success': True,
            'data': {
                'user': user.to_dict()
            }
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': {'code': 'USER_INFO_ERROR', 'message': str(e)}
        }), 500

@auth_bp.route('/change-password', methods=['POST'])
@jwt_required()
def change_password():
    """Change user password"""
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()
        
        if not data:
            return jsonify({
                'success': False,
                'error': {'code': 'INVALID_REQUEST', 'message': 'No data provided'}
            }), 400
        
        current_password = data.get('current_password')
        new_password = data.get('new_password')
        
        if not current_password or not new_password:
            return jsonify({
                'success': False,
                'error': {'code': 'MISSING_FIELDS', 'message': 'Current and new passwords are required'}
            }), 400
        
        user = User.query.get(current_user_id)
        if not user:
            return jsonify({
                'success': False,
                'error': {'code': 'USER_NOT_FOUND', 'message': 'User not found'}
            }), 404
        
        if not user.check_password(current_password):
            return jsonify({
                'success': False,
                'error': {'code': 'INVALID_PASSWORD', 'message': 'Current password is incorrect'}
            }), 401
        
        user.set_password(new_password)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Password changed successfully'
        })
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': {'code': 'PASSWORD_CHANGE_ERROR', 'message': str(e)}
        }), 500

