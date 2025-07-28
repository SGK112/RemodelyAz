import os
import sys
# DON'T CHANGE THIS !!!
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from flask import Flask, send_from_directory, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from datetime import timedelta

# Import database
from src.models.user import db

# Import all models to ensure they're registered
from src.models.user import User, UserSession
from src.models.project import Project, ProjectMember
from src.models.file import File, FileShare
from src.models.message import Message, MessageThread, ProjectNote
from src.models.calendar import CalendarEvent, CalendarIntegration, EventAttendee

# Import all route blueprints
from src.routes.user import user_bp
from src.routes.auth import auth_bp
from src.routes.project import project_bp
from src.routes.file import file_bp
from src.routes.message import message_bp
from src.routes.calendar import calendar_bp

# Create Flask app
app = Flask(__name__, static_folder=os.path.join(os.path.dirname(__file__), 'static'))

# Configuration
app.config['SECRET_KEY'] = 'SecureShare2025!@#$%^&*()_+{}|:<>?[]\\;\'\",./'
app.config['JWT_SECRET_KEY'] = 'JWT-SecureShare-2025-SuperSecret-Key'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=30)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(os.path.dirname(__file__), 'database', 'app.db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# File upload configuration
app.config['MAX_CONTENT_LENGTH'] = 100 * 1024 * 1024  # 100MB max file size
app.config['UPLOAD_FOLDER'] = os.path.join(os.path.dirname(__file__), 'uploads')

# Ensure upload directory exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Initialize extensions
CORS(app, origins="*", supports_credentials=True)
jwt = JWTManager(app)
db.init_app(app)

# Register blueprints
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(user_bp, url_prefix='/api/users')
app.register_blueprint(project_bp, url_prefix='/api/projects')
app.register_blueprint(file_bp, url_prefix='/api/files')
app.register_blueprint(message_bp, url_prefix='/api/messages')
app.register_blueprint(calendar_bp, url_prefix='/api/calendar')

# Health check endpoint
@app.route('/api/health')
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'message': 'SecureShare API is running',
        'version': '2.0.0',
        'success': True
    })

# Initialize database and create admin user
with app.app_context():
    db.create_all()
    
    # Create admin user if it doesn't exist
    admin_user = User.query.filter_by(email='admin@securefileshare.com').first()
    if not admin_user:
        admin_user = User(
            email='admin@securefileshare.com',
            first_name='System',
            last_name='Administrator',
            role='admin',
            is_active=True,
            email_verified=True
        )
        admin_user.set_password('admin123')
        db.session.add(admin_user)
        db.session.commit()
        print("✅ Admin user created successfully")
    
    # Create sample project for testing
    sample_project = Project.query.filter_by(title='Sample Construction Project').first()
    if not sample_project:
        sample_project = Project(
            title='Sample Construction Project',
            description='A sample project for testing SecureShare functionality',
            project_type='renovation',
            status='active',
            owner_id=admin_user.id,
            allow_file_uploads=True,
            allow_comments=True
        )
        db.session.add(sample_project)
        db.session.commit()
        print("✅ Sample project created successfully")

# Serve frontend
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    """Serve frontend files"""
    static_folder_path = app.static_folder
    if static_folder_path is None:
        return jsonify({'error': 'Static folder not configured'}), 404

    if path != "" and os.path.exists(os.path.join(static_folder_path, path)):
        return send_from_directory(static_folder_path, path)
    else:
        index_path = os.path.join(static_folder_path, 'index.html')
        if os.path.exists(index_path):
            return send_from_directory(static_folder_path, 'index.html')
        else:
            return jsonify({
                'message': 'SecureShare API Server',
                'version': '2.0.0',
                'endpoints': {
                    'health': '/api/health',
                    'auth': '/api/auth',
                    'users': '/api/users',
                    'projects': '/api/projects',
                    'files': '/api/files',
                    'messages': '/api/messages',
                    'calendar': '/api/calendar'
                }
            })

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not found', 'success': False}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error', 'success': False}), 500

@app.errorhandler(413)
def too_large(error):
    return jsonify({'error': 'File too large', 'success': False}), 413

if __name__ == '__main__':
    print("🚀 Starting SecureShare API Server...")
    print("📊 Database initialized with admin user")
    print("🔗 Available endpoints:")
    print("   - Health: /api/health")
    print("   - Auth: /api/auth")
    print("   - Users: /api/users")
    print("   - Projects: /api/projects")
    print("   - Files: /api/files")
    print("   - Messages: /api/messages")
    print("   - Calendar: /api/calendar")
    app.run(host='0.0.0.0', port=5000, debug=True)

