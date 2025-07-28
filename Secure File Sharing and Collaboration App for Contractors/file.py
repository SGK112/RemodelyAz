from src.models.user import db
from datetime import datetime, timezone
import uuid
import hashlib
import json

class File(db.Model):
    __tablename__ = 'files'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    project_id = db.Column(db.String(36), db.ForeignKey('projects.id'), nullable=False)
    uploaded_by = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    
    # File information
    original_filename = db.Column(db.String(255), nullable=False)
    stored_filename = db.Column(db.String(255), nullable=False)
    file_path = db.Column(db.String(500), nullable=False)
    file_size = db.Column(db.BigInteger, nullable=False)
    mime_type = db.Column(db.String(100), nullable=False)
    file_hash = db.Column(db.String(64), nullable=False, index=True)  # SHA-256 hash
    
    # File categorization
    file_type = db.Column(db.String(20), nullable=False, index=True)  # image, document, video, audio, other
    category = db.Column(db.String(50))  # before, progress, after, plans, contracts, etc.
    tags = db.Column(db.Text)  # JSON array of tags
    
    # Image-specific fields
    image_width = db.Column(db.Integer)
    image_height = db.Column(db.Integer)
    thumbnail_path = db.Column(db.String(500))
    
    # Security and access
    is_encrypted = db.Column(db.Boolean, default=True)
    encryption_key_id = db.Column(db.String(36))
    access_level = db.Column(db.String(20), default='project')  # public, project, private
    
    # Metadata
    description = db.Column(db.Text)
    alt_text = db.Column(db.String(500))  # For accessibility
    exif_data = db.Column(db.Text)  # JSON string for image EXIF data
    custom_metadata = db.Column(db.Text)  # JSON object for custom fields
    
    # Status and workflow
    status = db.Column(db.String(20), default='active', index=True)  # active, archived, deleted
    approval_status = db.Column(db.String(20), default='approved')  # pending, approved, rejected
    approved_by = db.Column(db.String(36), db.ForeignKey('users.id'))
    approved_at = db.Column(db.DateTime)
    
    # Version control
    version = db.Column(db.Integer, default=1)
    parent_file_id = db.Column(db.String(36), db.ForeignKey('files.id'))
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
    
    # Relationships
    approver = db.relationship('User', foreign_keys=[approved_by])
    parent_file = db.relationship('File', remote_side=[id])
    versions = db.relationship('File', backref=db.backref('parent', remote_side=[id]))
    
    def __init__(self, **kwargs):
        super(File, self).__init__(**kwargs)
        # Determine file type from mime_type
        if self.mime_type:
            if self.mime_type.startswith('image/'):
                self.file_type = 'image'
            elif self.mime_type.startswith('video/'):
                self.file_type = 'video'
            elif self.mime_type.startswith('audio/'):
                self.file_type = 'audio'
            elif self.mime_type in ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']:
                self.file_type = 'document'
            else:
                self.file_type = 'other'
    
    @staticmethod
    def calculate_hash(file_content):
        """Calculate SHA-256 hash of file content"""
        return hashlib.sha256(file_content).hexdigest()
    
    def get_file_url(self, base_url=''):
        """Get URL for file access"""
        return f"{base_url}/api/files/{self.id}/download"
    
    def get_thumbnail_url(self, base_url=''):
        """Get URL for thumbnail (if available)"""
        if self.thumbnail_path:
            return f"{base_url}/api/files/{self.id}/thumbnail"
        return None
    
    def is_image(self):
        """Check if file is an image"""
        return self.file_type == 'image'
    
    def is_document(self):
        """Check if file is a document"""
        return self.file_type == 'document'
    
    def get_tags_list(self):
        """Get tags as a list"""
        if self.tags:
            try:
                return json.loads(self.tags)
            except:
                return []
        return []
    
    def set_tags_list(self, tags):
        """Set tags from a list"""
        self.tags = json.dumps(tags) if tags else None
    
    def to_dict(self):
        """Convert file to dictionary"""
        return {
            'id': self.id,
            'project_id': self.project_id,
            'uploaded_by': self.uploaded_by,
            'original_filename': self.original_filename,
            'stored_filename': self.stored_filename,
            'file_size': self.file_size,
            'mime_type': self.mime_type,
            'file_hash': self.file_hash,
            'file_type': self.file_type,
            'category': self.category,
            'tags': self.get_tags_list(),
            'image_width': self.image_width,
            'image_height': self.image_height,
            'is_encrypted': self.is_encrypted,
            'access_level': self.access_level,
            'description': self.description,
            'alt_text': self.alt_text,
            'status': self.status,
            'approval_status': self.approval_status,
            'approved_by': self.approved_by,
            'approved_at': self.approved_at.isoformat() if self.approved_at else None,
            'version': self.version,
            'parent_file_id': self.parent_file_id,
            'file_url': self.get_file_url(),
            'thumbnail_url': self.get_thumbnail_url(),
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

class FileShare(db.Model):
    __tablename__ = 'file_shares'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    file_id = db.Column(db.String(36), db.ForeignKey('files.id'), nullable=False)
    shared_by = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    shared_with = db.Column(db.String(36), db.ForeignKey('users.id'))  # Null for public shares
    share_token = db.Column(db.String(100), unique=True, nullable=False, index=True)
    
    # Access control
    permissions = db.Column(db.String(20), default='view')  # view, download, edit
    password_protected = db.Column(db.Boolean, default=False)
    password_hash = db.Column(db.String(128))
    
    # Expiration
    expires_at = db.Column(db.DateTime)
    max_downloads = db.Column(db.Integer)
    download_count = db.Column(db.Integer, default=0)
    
    # Tracking
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    last_accessed = db.Column(db.DateTime)
    is_active = db.Column(db.Boolean, default=True)
    
    # Relationships
    file = db.relationship('File', backref='shares')
    sharer = db.relationship('User', foreign_keys=[shared_by])
    recipient = db.relationship('User', foreign_keys=[shared_with])
    
    def __init__(self, **kwargs):
        super(FileShare, self).__init__(**kwargs)
        if not self.share_token:
            self.share_token = str(uuid.uuid4())
    
    def is_expired(self):
        """Check if share is expired"""
        if self.expires_at:
            return datetime.now(timezone.utc) > self.expires_at
        if self.max_downloads and self.download_count >= self.max_downloads:
            return True
        return False
    
    def get_share_url(self, base_url='https://app.securefileshare.com'):
        """Generate share URL"""
        return f"{base_url}/share/{self.share_token}"
    
    def to_dict(self):
        """Convert file share to dictionary"""
        return {
            'id': self.id,
            'file_id': self.file_id,
            'shared_by': self.shared_by,
            'shared_with': self.shared_with,
            'share_token': self.share_token,
            'permissions': self.permissions,
            'password_protected': self.password_protected,
            'expires_at': self.expires_at.isoformat() if self.expires_at else None,
            'max_downloads': self.max_downloads,
            'download_count': self.download_count,
            'share_url': self.get_share_url(),
            'is_expired': self.is_expired(),
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'last_accessed': self.last_accessed.isoformat() if self.last_accessed else None,
            'is_active': self.is_active
        }

