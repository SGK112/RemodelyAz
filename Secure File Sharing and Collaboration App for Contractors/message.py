from src.models.user import db
from datetime import datetime, timezone
import uuid
import json

class Message(db.Model):
    __tablename__ = 'messages'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    project_id = db.Column(db.String(36), db.ForeignKey('projects.id'))
    thread_id = db.Column(db.String(36), db.ForeignKey('message_threads.id'))
    
    # Message participants
    sender_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    recipient_id = db.Column(db.String(36), db.ForeignKey('users.id'))  # Null for group messages
    
    # Message content
    subject = db.Column(db.String(200))
    content = db.Column(db.Text, nullable=False)
    message_type = db.Column(db.String(20), default='text')  # text, file, image, system, notification
    
    # Message status
    status = db.Column(db.String(20), default='sent')  # sent, delivered, read, archived, deleted
    priority = db.Column(db.String(10), default='normal')  # low, normal, high, urgent
    
    # Attachments
    attachments = db.Column(db.Text)  # JSON array of file IDs
    
    # Threading and replies
    parent_message_id = db.Column(db.String(36), db.ForeignKey('messages.id'))
    reply_count = db.Column(db.Integer, default=0)
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
    read_at = db.Column(db.DateTime)
    delivered_at = db.Column(db.DateTime)
    
    # Relationships
    sender = db.relationship('User', foreign_keys=[sender_id])
    recipient = db.relationship('User', foreign_keys=[recipient_id])
    parent_message = db.relationship('Message', remote_side=[id])
    replies = db.relationship('Message', backref=db.backref('parent', remote_side=[id]))
    
    def get_attachments_list(self):
        """Get attachments as a list"""
        if self.attachments:
            try:
                return json.loads(self.attachments)
            except:
                return []
        return []
    
    def set_attachments_list(self, attachments):
        """Set attachments from a list"""
        self.attachments = json.dumps(attachments) if attachments else None
    
    def mark_as_read(self):
        """Mark message as read"""
        if self.status != 'read':
            self.status = 'read'
            self.read_at = datetime.now(timezone.utc)
    
    def to_dict(self):
        """Convert message to dictionary"""
        return {
            'id': self.id,
            'project_id': self.project_id,
            'thread_id': self.thread_id,
            'sender_id': self.sender_id,
            'recipient_id': self.recipient_id,
            'subject': self.subject,
            'content': self.content,
            'message_type': self.message_type,
            'status': self.status,
            'priority': self.priority,
            'attachments': self.get_attachments_list(),
            'parent_message_id': self.parent_message_id,
            'reply_count': self.reply_count,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'read_at': self.read_at.isoformat() if self.read_at else None,
            'delivered_at': self.delivered_at.isoformat() if self.delivered_at else None
        }

class MessageThread(db.Model):
    __tablename__ = 'message_threads'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    project_id = db.Column(db.String(36), db.ForeignKey('projects.id'))
    
    # Thread information
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    thread_type = db.Column(db.String(20), default='discussion')  # discussion, announcement, task, issue
    
    # Thread participants
    created_by = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    participants = db.Column(db.Text)  # JSON array of user IDs
    
    # Thread status
    status = db.Column(db.String(20), default='active')  # active, closed, archived
    is_pinned = db.Column(db.Boolean, default=False)
    is_locked = db.Column(db.Boolean, default=False)
    
    # Statistics
    message_count = db.Column(db.Integer, default=0)
    last_message_at = db.Column(db.DateTime)
    last_message_by = db.Column(db.String(36), db.ForeignKey('users.id'))
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
    
    # Relationships
    creator = db.relationship('User', foreign_keys=[created_by])
    last_message_user = db.relationship('User', foreign_keys=[last_message_by])
    messages = db.relationship('Message', backref='thread', lazy='dynamic', cascade='all, delete-orphan')
    
    def get_participants_list(self):
        """Get participants as a list"""
        if self.participants:
            try:
                return json.loads(self.participants)
            except:
                return []
        return []
    
    def set_participants_list(self, participants):
        """Set participants from a list"""
        self.participants = json.dumps(participants) if participants else None
    
    def add_participant(self, user_id):
        """Add a participant to the thread"""
        participants = self.get_participants_list()
        if user_id not in participants:
            participants.append(user_id)
            self.set_participants_list(participants)
    
    def remove_participant(self, user_id):
        """Remove a participant from the thread"""
        participants = self.get_participants_list()
        if user_id in participants:
            participants.remove(user_id)
            self.set_participants_list(participants)
    
    def to_dict(self):
        """Convert message thread to dictionary"""
        return {
            'id': self.id,
            'project_id': self.project_id,
            'title': self.title,
            'description': self.description,
            'thread_type': self.thread_type,
            'created_by': self.created_by,
            'participants': self.get_participants_list(),
            'status': self.status,
            'is_pinned': self.is_pinned,
            'is_locked': self.is_locked,
            'message_count': self.message_count,
            'last_message_at': self.last_message_at.isoformat() if self.last_message_at else None,
            'last_message_by': self.last_message_by,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

class ProjectNote(db.Model):
    __tablename__ = 'project_notes'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    project_id = db.Column(db.String(36), db.ForeignKey('projects.id'), nullable=False)
    created_by = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    
    # Note content
    title = db.Column(db.String(200))
    content = db.Column(db.Text, nullable=False)
    note_type = db.Column(db.String(20), default='general')  # general, progress, issue, reminder, meeting
    
    # Note organization
    category = db.Column(db.String(50))
    tags = db.Column(db.Text)  # JSON array of tags
    priority = db.Column(db.String(10), default='normal')  # low, normal, high, urgent
    
    # Attachments and references
    attachments = db.Column(db.Text)  # JSON array of file IDs
    related_files = db.Column(db.Text)  # JSON array of file IDs
    
    # Status and workflow
    status = db.Column(db.String(20), default='active')  # active, archived, deleted
    is_pinned = db.Column(db.Boolean, default=False)
    is_private = db.Column(db.Boolean, default=False)  # Private to creator only
    
    # Reminders and follow-up
    reminder_date = db.Column(db.DateTime)
    follow_up_date = db.Column(db.Date)
    assigned_to = db.Column(db.String(36), db.ForeignKey('users.id'))
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
    
    # Relationships
    creator = db.relationship('User', foreign_keys=[created_by])
    assignee = db.relationship('User', foreign_keys=[assigned_to])
    
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
    
    def get_attachments_list(self):
        """Get attachments as a list"""
        if self.attachments:
            try:
                return json.loads(self.attachments)
            except:
                return []
        return []
    
    def set_attachments_list(self, attachments):
        """Set attachments from a list"""
        self.attachments = json.dumps(attachments) if attachments else None
    
    def to_dict(self):
        """Convert project note to dictionary"""
        return {
            'id': self.id,
            'project_id': self.project_id,
            'created_by': self.created_by,
            'title': self.title,
            'content': self.content,
            'note_type': self.note_type,
            'category': self.category,
            'tags': self.get_tags_list(),
            'priority': self.priority,
            'attachments': self.get_attachments_list(),
            'status': self.status,
            'is_pinned': self.is_pinned,
            'is_private': self.is_private,
            'reminder_date': self.reminder_date.isoformat() if self.reminder_date else None,
            'follow_up_date': self.follow_up_date.isoformat() if self.follow_up_date else None,
            'assigned_to': self.assigned_to,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

