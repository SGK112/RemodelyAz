from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime, timezone

from src.models.user import User, UserProfile, ContractorProfile, db

user_bp = Blueprint('user', __name__)

def get_current_user():
    """Get current user from JWT token"""
    user_id = get_jwt_identity()
    return User.query.get(user_id)

@user_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    """Get current user profile"""
    try:
        current_user = get_current_user()
        if not current_user:
            return jsonify({
                'success': False,
                'error': {'code': 'USER_NOT_FOUND', 'message': 'User not found'}
            }), 404
        
        user_data = current_user.to_dict()
        
        # Add profile information
        if current_user.profile:
            user_data['profile'] = current_user.profile.to_dict()
        
        # Add contractor profile if applicable
        if current_user.contractor_profile:
            user_data['contractor_profile'] = current_user.contractor_profile.to_dict()
        
        return jsonify({
            'success': True,
            'data': user_data
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': {
                'code': 'PROFILE_FETCH_ERROR',
                'message': 'Failed to fetch profile',
                'details': str(e)
            }
        }), 500

@user_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    """Update user profile"""
    try:
        current_user = get_current_user()
        if not current_user:
            return jsonify({
                'success': False,
                'error': {'code': 'USER_NOT_FOUND', 'message': 'User not found'}
            }), 404
        
        data = request.get_json()
        updated_fields = []
        
        # Update user basic information
        if 'first_name' in data:
            current_user.first_name = data['first_name'].strip()
            updated_fields.append('first_name')
        
        if 'last_name' in data:
            current_user.last_name = data['last_name'].strip()
            updated_fields.append('last_name')
        
        if 'phone' in data:
            current_user.phone = data['phone'].strip()
            updated_fields.append('phone')
        
        # Update profile information
        if 'profile' in data:
            profile_data = data['profile']
            
            # Create profile if it doesn't exist
            if not current_user.profile:
                current_user.profile = UserProfile(user_id=current_user.id)
                db.session.add(current_user.profile)
            
            profile = current_user.profile
            
            if 'company_name' in profile_data:
                profile.company_name = profile_data['company_name'].strip()
                updated_fields.append('profile.company_name')
            
            if 'bio' in profile_data:
                profile.bio = profile_data['bio'].strip()
                updated_fields.append('profile.bio')
            
            if 'website' in profile_data:
                profile.website = profile_data['website'].strip()
                updated_fields.append('profile.website')
            
            if 'address' in profile_data:
                address = profile_data['address']
                if 'line1' in address:
                    profile.address_line1 = address['line1'].strip()
                    updated_fields.append('profile.address.line1')
                if 'line2' in address:
                    profile.address_line2 = address['line2'].strip()
                    updated_fields.append('profile.address.line2')
                if 'city' in address:
                    profile.city = address['city'].strip()
                    updated_fields.append('profile.address.city')
                if 'state' in address:
                    profile.state = address['state'].strip()
                    updated_fields.append('profile.address.state')
                if 'zip_code' in address:
                    profile.zip_code = address['zip_code'].strip()
                    updated_fields.append('profile.address.zip_code')
                if 'country' in address:
                    profile.country = address['country'].strip()
                    updated_fields.append('profile.address.country')
            
            if 'timezone' in profile_data:
                profile.timezone = profile_data['timezone']
                updated_fields.append('profile.timezone')
            
            if 'language' in profile_data:
                profile.language = profile_data['language']
                updated_fields.append('profile.language')
            
            if 'notification_preferences' in profile_data:
                profile.set_notification_preferences(profile_data['notification_preferences'])
                updated_fields.append('profile.notification_preferences')
            
            if 'privacy_settings' in profile_data:
                profile.set_privacy_settings(profile_data['privacy_settings'])
                updated_fields.append('profile.privacy_settings')
        
        # Update contractor profile if user is a contractor
        if current_user.role == 'contractor' and 'contractor_profile' in data:
            contractor_data = data['contractor_profile']
            
            # Create contractor profile if it doesn't exist
            if not current_user.contractor_profile:
                current_user.contractor_profile = ContractorProfile(user_id=current_user.id)
                db.session.add(current_user.contractor_profile)
            
            contractor_profile = current_user.contractor_profile
            
            if 'license_number' in contractor_data:
                contractor_profile.license_number = contractor_data['license_number'].strip()
                updated_fields.append('contractor_profile.license_number')
            
            if 'license_state' in contractor_data:
                contractor_profile.license_state = contractor_data['license_state'].strip()
                updated_fields.append('contractor_profile.license_state')
            
            if 'insurance_provider' in contractor_data:
                contractor_profile.insurance_provider = contractor_data['insurance_provider'].strip()
                updated_fields.append('contractor_profile.insurance_provider')
            
            if 'insurance_policy_number' in contractor_data:
                contractor_profile.insurance_policy_number = contractor_data['insurance_policy_number'].strip()
                updated_fields.append('contractor_profile.insurance_policy_number')
            
            if 'hourly_rate' in contractor_data:
                contractor_profile.hourly_rate = contractor_data['hourly_rate']
                updated_fields.append('contractor_profile.hourly_rate')
            
            if 'minimum_project_size' in contractor_data:
                contractor_profile.minimum_project_size = contractor_data['minimum_project_size']
                updated_fields.append('contractor_profile.minimum_project_size')
            
            if 'years_experience' in contractor_data:
                contractor_profile.years_experience = contractor_data['years_experience']
                updated_fields.append('contractor_profile.years_experience')
            
            if 'service_radius' in contractor_data:
                contractor_profile.service_radius = contractor_data['service_radius']
                updated_fields.append('contractor_profile.service_radius')
            
            if 'specialties' in contractor_data:
                contractor_profile.set_specialties(contractor_data['specialties'])
                updated_fields.append('contractor_profile.specialties')
        
        current_user.updated_at = datetime.now(timezone.utc)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Profile updated successfully',
            'data': {
                'updated_fields': updated_fields
            }
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': {
                'code': 'PROFILE_UPDATE_ERROR',
                'message': 'Failed to update profile',
                'details': str(e)
            }
        }), 500

@user_bp.route('/upload-avatar', methods=['POST'])
@jwt_required()
def upload_avatar():
    """Upload user avatar"""
    try:
        current_user = get_current_user()
        if not current_user:
            return jsonify({
                'success': False,
                'error': {'code': 'USER_NOT_FOUND', 'message': 'User not found'}
            }), 404
        
        # TODO: Implement file upload for avatar
        # For now, return placeholder response
        return jsonify({
            'success': False,
            'error': {
                'code': 'NOT_IMPLEMENTED',
                'message': 'Avatar upload not yet implemented'
            }
        }), 501
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': {
                'code': 'AVATAR_UPLOAD_ERROR',
                'message': 'Failed to upload avatar',
                'details': str(e)
            }
        }), 500

@user_bp.route('/change-password', methods=['POST'])
@jwt_required()
def change_password():
    """Change user password"""
    try:
        current_user = get_current_user()
        if not current_user:
            return jsonify({
                'success': False,
                'error': {'code': 'USER_NOT_FOUND', 'message': 'User not found'}
            }), 404
        
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['current_password', 'new_password']
        for field in required_fields:
            if not data.get(field):
                return jsonify({
                    'success': False,
                    'error': {
                        'code': 'VALIDATION_ERROR',
                        'message': f'{field} is required',
                        'field': field
                    }
                }), 422
        
        current_password = data['current_password']
        new_password = data['new_password']
        
        # Verify current password
        if not current_user.check_password(current_password):
            return jsonify({
                'success': False,
                'error': {
                    'code': 'INVALID_PASSWORD',
                    'message': 'Current password is incorrect'
                }
            }), 401
        
        # Validate new password strength
        from src.routes.auth import validate_password
        is_valid, password_message = validate_password(new_password)
        if not is_valid:
            return jsonify({
                'success': False,
                'error': {
                    'code': 'VALIDATION_ERROR',
                    'message': password_message,
                    'field': 'new_password'
                }
            }), 422
        
        # Update password
        current_user.set_password(new_password)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Password changed successfully'
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': {
                'code': 'PASSWORD_CHANGE_ERROR',
                'message': 'Failed to change password',
                'details': str(e)
            }
        }), 500

@user_bp.route('/health', methods=['GET'])
def health():
    """User management health check"""
    return jsonify({
        'success': True,
        'message': 'User management routes are working',
        'endpoints': [
            'GET /health - Health check',
            'GET /profile - Get current user profile',
            'PUT /profile - Update user profile',
            'POST /upload-avatar - Upload avatar',
            'POST /change-password - Change password'
        ]
    }), 200

