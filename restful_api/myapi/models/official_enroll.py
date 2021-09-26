from myapi.extensions import db

class OfficialEnroll(db.Model):
    """Basic official enroll model"""

    __tablename__ = "official_enroll"
    __table_args__ = (db.UniqueConstraint('eng_id','course_id', name = 'unique_official_enroll'),)
    
    eng_id = db.Column(db.Integer, db.ForeignKey('employee.id'), primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey('course.course_id'), primary_key=True)
    start_date = db.Column(db.DateTime)
    end_date = db.Column(db.DateTime)
    has_passed = db.Column(db.Boolean, default=False)

    # If course is deleted, the row in this table will be dropped
    course = db.relationship('Course', backref=db.backref('official_enrols', lazy='joined', cascade="all,delete"))