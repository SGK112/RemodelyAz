from src.models.user import db
from datetime import datetime, timezone
import uuid
import json

class CalendarEvent(db.Model):
    __tablename__ = 'calendar_events'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    project_id = db.Column(db.String(36), db.ForeignKey('projects.id'))
    organizer_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    
    # Event details
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    location = db.Column(db.String(500))
    event_type = db.Column(db.String(50), default='meeting')  # meeting, inspection, deadline, milestone, reminder
    
    # Timing
    start_datetime = db.Column(db.DateTime, nullable=False)
    end_datetime = db.Column(db.DateTime, nullable=False)
    timezone_name = db.Column(db.String(50), default='UTC')
    is_all_day = db.Column(db.Boolean, default=False)
    
    # Recurrence
    is_recurring = db.Column(db.Boolean, default=False)
    recurrence_rule = db.Column(db.Text)  # RRULE format
    recurrence_end_date = db.Column(db.Date)
    parent_event_id = db.Column(db.String(36), db.ForeignKey('calendar_events.id'))
    
    # Participants
    attendees = db.Column(db.Text)  # JSON array of user IDs
    required_attendees = db.Column(db.Text)  # JSON array of user IDs
    optional_attendees = db.Column(db.Text)  # JSON array of user IDs
    
    # External calendar integration
    google_event_id = db.Column(db.String(255))
    outlook_event_id = db.Column(db.String(255))
    external_calendar_data = db.Column(db.Text)  # JSON for other calendar systems
    
    # Event status
    status = db.Column(db.String(20), default='confirmed')  # tentative, confirmed, cancelled
    visibility = db.Column(db.String(20), default='default')  # default, public, private, confidential
    
    # Reminders and notifications
    reminders = db.Column(db.Text)  # JSON array of reminder settings
    send_notifications = db.Column(db.Boolean, default=True)
    
    # Meeting details
    meeting_url = db.Column(db.String(500))  # Video conference URL
    meeting_password = db.Column(db.String(100))
    meeting_phone = db.Column(db.String(50))
    
    # Attachments and resources
    attachments = db.Column(db.Text)  # JSON array of file IDs
    resources = db.Column(db.Text)  # JSON array of resource IDs (rooms, equipment)
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
    
    # Relationships
    parent_event = db.relationship('CalendarEvent', remote_side=[id])
    recurring_events = db.relationship('CalendarEvent', backref=db.backref('parent', remote_side=[id]))
    
    def get_attendees_list(self):
        """Get attendees as a list"""
        if self.attendees:
            try:
                return json.loads(self.attendees)
            except:
                return []
        return []
    
    def set_attendees_list(self, attendees):
        """Set attendees from a list"""
        self.attendees = json.dumps(attendees) if attendees else None
    
    def get_reminders_list(self):
        """Get reminders as a list"""
        if self.reminders:
            try:
                return json.loads(self.reminders)
            except:
                return []
        return []
    
    def set_reminders_list(self, reminders):
        """Set reminders from a list"""
        self.reminders = json.dumps(reminders) if reminders else None
    
    def is_past(self):
        """Check if event is in the past"""
        return self.end_datetime < datetime.now(timezone.utc)
    
    def is_today(self):
        """Check if event is today"""
        today = datetime.now(timezone.utc).date()
        return self.start_datetime.date() == today
    
    def get_duration_minutes(self):
        """Get event duration in minutes"""
        return int((self.end_datetime - self.start_datetime).total_seconds() / 60)
    
    def to_dict(self):
        """Convert calendar event to dictionary"""
        return {
            'id': self.id,
            'project_id': self.project_id,
            'organizer_id': self.organizer_id,
            'title': self.title,
            'description': self.description,
            'location': self.location,
            'event_type': self.event_type,
            'start_datetime': self.start_datetime.isoformat() if self.start_datetime else None,
            'end_datetime': self.end_datetime.isoformat() if self.end_datetime else None,
            'timezone_name': self.timezone_name,
            'is_all_day': self.is_all_day,
            'is_recurring': self.is_recurring,
            'recurrence_rule': self.recurrence_rule,
            'recurrence_end_date': self.recurrence_end_date.isoformat() if self.recurrence_end_date else None,
            'parent_event_id': self.parent_event_id,
            'attendees': self.get_attendees_list(),
            'google_event_id': self.google_event_id,
            'outlook_event_id': self.outlook_event_id,
            'status': self.status,
            'visibility': self.visibility,
            'reminders': self.get_reminders_list(),
            'send_notifications': self.send_notifications,
            'meeting_url': self.meeting_url,
            'meeting_password': self.meeting_password,
            'meeting_phone': self.meeting_phone,
            'duration_minutes': self.get_duration_minutes(),
            'is_past': self.is_past(),
            'is_today': self.is_today(),
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

class CalendarIntegration(db.Model):
    __tablename__ = 'calendar_integrations'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    
    # Integration details
    provider = db.Column(db.String(50), nullable=False)  # google, outlook, apple, caldav
    provider_user_id = db.Column(db.String(255))
    calendar_id = db.Column(db.String(255))
    calendar_name = db.Column(db.String(200))
    
    # Authentication
    access_token = db.Column(db.Text)
    refresh_token = db.Column(db.Text)
    token_expires_at = db.Column(db.DateTime)
    
    # Sync settings
    sync_enabled = db.Column(db.Boolean, default=True)
    sync_direction = db.Column(db.String(20), default='bidirectional')  # import, export, bidirectional
    last_sync_at = db.Column(db.DateTime)
    sync_status = db.Column(db.String(20), default='active')  # active, error, disabled
    sync_error_message = db.Column(db.Text)
    
    # Configuration
    default_calendar = db.Column(db.Boolean, default=False)
    sync_project_events = db.Column(db.Boolean, default=True)
    sync_personal_events = db.Column(db.Boolean, default=False)
    event_prefix = db.Column(db.String(50))  # Prefix for synced events
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
    
    # Relationships
    user = db.relationship('User', backref='calendar_integrations')
    
    def is_token_expired(self):
        """Check if access token is expired"""
        if self.token_expires_at:
            return datetime.now(timezone.utc) > self.token_expires_at
        return False
    
    def needs_refresh(self):
        """Check if token needs refresh (expires in next 5 minutes)"""
        if self.token_expires_at:
            return datetime.now(timezone.utc) > (self.token_expires_at - timezone.utc.localize(datetime.now()).replace(tzinfo=None))
        return False
    
    def to_dict(self):
        """Convert calendar integration to dictionary"""
        return {
            'id': self.id,
            'user_id': self.user_id,
            'provider': self.provider,
            'provider_user_id': self.provider_user_id,
            'calendar_id': self.calendar_id,
            'calendar_name': self.calendar_name,
            'sync_enabled': self.sync_enabled,
            'sync_direction': self.sync_direction,
            'last_sync_at': self.last_sync_at.isoformat() if self.last_sync_at else None,
            'sync_status': self.sync_status,
            'sync_error_message': self.sync_error_message,
            'default_calendar': self.default_calendar,
            'sync_project_events': self.sync_project_events,
            'sync_personal_events': self.sync_personal_events,
            'event_prefix': self.event_prefix,
            'is_token_expired': self.is_token_expired(),
            'needs_refresh': self.needs_refresh(),
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

class EventAttendee(db.Model):
    __tablename__ = 'event_attendees'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    event_id = db.Column(db.String(36), db.ForeignKey('calendar_events.id'), nullable=False)
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'))
    
    # Attendee details
    email = db.Column(db.String(255))  # For external attendees
    name = db.Column(db.String(200))  # For external attendees
    role = db.Column(db.String(20), default='attendee')  # organizer, attendee, optional
    
    # Response status
    response_status = db.Column(db.String(20), default='pending')  # pending, accepted, declined, tentative
    response_comment = db.Column(db.Text)
    responded_at = db.Column(db.DateTime)
    
    # Notifications
    reminder_sent = db.Column(db.Boolean, default=False)
    reminder_sent_at = db.Column(db.DateTime)
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
    
    # Relationships
    event = db.relationship('CalendarEvent', backref='event_attendees')
    user = db.relationship('User', backref='event_attendances')
    
    # Unique constraint
    __table_args__ = (db.UniqueConstraint('event_id', 'user_id', name='unique_event_attendee'),)
    
    def to_dict(self):
        """Convert event attendee to dictionary"""
        return {
            'id': self.id,
            'event_id': self.event_id,
            'user_id': self.user_id,
            'email': self.email,
            'name': self.name,
            'role': self.role,
            'response_status': self.response_status,
            'response_comment': self.response_comment,
            'responded_at': self.responded_at.isoformat() if self.responded_at else None,
            'reminder_sent': self.reminder_sent,
            'reminder_sent_at': self.reminder_sent_at.isoformat() if self.reminder_sent_at else None,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

