from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timezone, timedelta
import uuid
import secrets

# Import db from user model to maintain consistency
from src.models.user import db

class Schedule(db.Model):
    __tablename__ = 'schedules'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    project_id = db.Column(db.String(36), db.ForeignKey('projects.id'), index=True)
    created_by = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False, index=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    event_type = db.Column(db.String(30), nullable=False, index=True)  # appointment, milestone, deadline, reminder, meeting
    start_time = db.Column(db.DateTime, nullable=False, index=True)
    end_time = db.Column(db.DateTime)
    all_day = db.Column(db.Boolean, default=False)
    location = db.Column(db.String(500))
    is_recurring = db.Column(db.Boolean, default=False)
    recurrence_rule = db.Column(db.Text)  # RRULE format
    status = db.Column(db.String(20), default='scheduled', index=True)  # scheduled, confirmed, cancelled, completed
    reminder_minutes = db.Column(db.Integer, default=60)
    is_public = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
    
    # Relationships
    participants = db.relationship('ScheduleParticipant', backref='schedule', cascade='all, delete-orphan')
    
    def __init__(self, **kwargs):
        super(Schedule, self).__init__(**kwargs)
        if not self.status:
            self.status = 'scheduled'
        if not self.reminder_minutes:
            self.reminder_minutes = 60
    
    def add_participant(self, user_id, role='attendee', status='pending'):
        """Add a participant to the event"""
        participant = ScheduleParticipant(
            schedule_id=self.id,
            user_id=user_id,
            role=role,
            status=status
        )
        db.session.add(participant)
        db.session.commit()
        return participant