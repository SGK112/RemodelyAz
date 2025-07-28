from src.models.user import db
from datetime import datetime, timezone
import uuid

class Project(db.Model):
    __tablename__ = 'projects'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    project_type = db.Column(db.String(50), nullable=False, index=True)  # renovation, new_construction, repair, etc.
    status = db.Column(db.String(20), default='draft', index=True)  # draft, active, completed, cancelled, on_hold
    priority = db.Column(db.String(10), default='medium', index=True)  # low, medium, high, urgent
    
    # Owner and management
    owner_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    assigned_contractor_id = db.Column(db.String(36), db.ForeignKey('users.id'))
    
    # Budget information
    min_budget = db.Column(db.Float)
    max_budget = db.Column(db.Float)
    actual_cost = db.Column(db.Float)
    
    # Timeline
    estimated_duration = db.Column(db.Integer)  # days
    start_date = db.Column(db.Date)
    end_date = db.Column(db.Date)
    actual_start_date = db.Column(db.Date)
    actual_end_date = db.Column(db.Date)
    
    # Location
    address_line1 = db.Column(db.String(200))
    address_line2 = db.Column(db.String(200))
    city = db.Column(db.String(100))
    state = db.Column(db.String(50))
    zip_code = db.Column(db.String(20))
    country = db.Column(db.String(50), default='US')
    
    # Project settings
    is_public = db.Column(db.Boolean, default=False)
    allow_file_uploads = db.Column(db.Boolean, default=True)
    allow_comments = db.Column(db.Boolean, default=True)
    require_approval = db.Column(db.Boolean, default=False)
    
    # Metadata
    tags = db.Column(db.Text)  # JSON array of tags
    custom_fields = db.Column(db.Text)  # JSON object for custom fields
    share_token = db.Column(db.String(100), unique=True, index=True)
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
    
    # Relationships
    assigned_contractor = db.relationship('User', foreign_keys=[assigned_contractor_id])
    members = db.relationship('ProjectMember', backref='project', lazy='dynamic', cascade='all, delete-orphan')
    files = db.relationship('File', backref='project', lazy='dynamic', cascade='all, delete-orphan')
    messages = db.relationship('Message', backref='project', lazy='dynamic', cascade='all, delete-orphan')
    notes = db.relationship('ProjectNote', backref='project', lazy='dynamic', cascade='all, delete-orphan')
    calendar_events = db.relationship('CalendarEvent', backref='project', lazy='dynamic', cascade='all, delete-orphan')
    
    def __init__(self, **kwargs):
        super(Project, self).__init__(**kwargs)
        if not self.share_token:
            self.share_token = str(uuid.uuid4())[:8]
    
    def get_share_link(self, base_url='https://app.securefileshare.com'):
        """Generate share link for project"""
        return f"{base_url}/projects/{self.id}/invite/{self.share_token}"
    
    def get_progress_percentage(self):
        """Calculate project progress percentage"""
        if not self.start_date or not self.end_date:
            return 0
        
        today = datetime.now().date()
        if today < self.start_date:
            return 0
        elif today > self.end_date:
            return 100
        else:
            total_days = (self.end_date - self.start_date).days
            elapsed_days = (today - self.start_date).days
            return min(100, int((elapsed_days / total_days) * 100)) if total_days > 0 else 0
    
    def to_dict(self):
        """Convert project to dictionary"""
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'project_type': self.project_type,
            'status': self.status,
            'priority': self.priority,
            'owner_id': self.owner_id,
            'assigned_contractor_id': self.assigned_contractor_id,
            'min_budget': self.min_budget,
            'max_budget': self.max_budget,
            'actual_cost': self.actual_cost,
            'estimated_duration': self.estimated_duration,
            'start_date': self.start_date.isoformat() if self.start_date else None,
            'end_date': self.end_date.isoformat() if self.end_date else None,
            'actual_start_date': self.actual_start_date.isoformat() if self.actual_start_date else None,
            'actual_end_date': self.actual_end_date.isoformat() if self.actual_end_date else None,
            'address_line1': self.address_line1,
            'address_line2': self.address_line2,
            'city': self.city,
            'state': self.state,
            'zip_code': self.zip_code,
            'country': self.country,
            'is_public': self.is_public,
            'allow_file_uploads': self.allow_file_uploads,
            'allow_comments': self.allow_comments,
            'require_approval': self.require_approval,
            'tags': self.tags,
            'custom_fields': self.custom_fields,
            'share_token': self.share_token,
            'share_link': self.get_share_link(),
            'progress_percentage': self.get_progress_percentage(),
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

class ProjectMember(db.Model):
    __tablename__ = 'project_members'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    project_id = db.Column(db.String(36), db.ForeignKey('projects.id'), nullable=False)
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    role = db.Column(db.String(20), nullable=False, default='member')  # owner, manager, contractor, member, viewer
    permissions = db.Column(db.Text)  # JSON object for specific permissions
    invited_by = db.Column(db.String(36), db.ForeignKey('users.id'))
    invited_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    joined_at = db.Column(db.DateTime)
    status = db.Column(db.String(20), default='pending')  # pending, active, inactive, removed
    
    # Relationships
    inviter = db.relationship('User', foreign_keys=[invited_by])
    
    # Unique constraint
    __table_args__ = (db.UniqueConstraint('project_id', 'user_id', name='unique_project_member'),)
    
    def to_dict(self):
        """Convert project member to dictionary"""
        return {
            'id': self.id,
            'project_id': self.project_id,
            'user_id': self.user_id,
            'role': self.role,
            'permissions': self.permissions,
            'invited_by': self.invited_by,
            'invited_at': self.invited_at.isoformat() if self.invited_at else None,
            'joined_at': self.joined_at.isoformat() if self.joined_at else None,
            'status': self.status
        }

