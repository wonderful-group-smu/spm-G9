from myapi.extensions import db

class CourseTrainer(db.Model):
    """Basic course trainer model"""

    __tablename__ = "course_trainer"
    __table_args__ = (db.UniqueConstraint('course_id','trainer_id', name = 'unique_course_trainer'),)
    
    course_id = db.Column(db.Integer, db.ForeignKey('course.course_id'), primary_key=True)
    trainer_id = db.Column(db.Integer, db.ForeignKey('employee.id'), primary_key=True)

    course = db.relationship('Course', uselist=False, backref=db.backref('course_trainers', lazy="joined", cascade="all,delete"))
    trainer = db.relationship('Employee', uselist=False, backref=db.backref('trainer_courses', lazy="joined", cascade="all,delete"))