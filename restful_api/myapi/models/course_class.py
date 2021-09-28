from myapi.extensions import db

class CourseClass(db.Model):
    """Basic class model"""

    __tablename__ = 'course_class'
    __table_args__ = (db.UniqueConstraint('course_id','trainer_id', name = 'unique_course_trainer'),)
    
    course_id = db.Column(db.Integer, db.ForeignKey("course.course_id"), primary_key=True)
    trainer_id = db.Column(db.Integer, db.ForeignKey("employee.id"), primary_key=True)
    start_date = db.Column(db.DateTime)
    end_date = db.Column(db.DateTime)

    course = db.relationship('Course', backref=db.backref('course_classes', lazy='joined', cascade="all,delete"))
    trainer = db.relationship('Employee', backref=db.backref('course_classes', lazy='joined', cascade="all,delete"))