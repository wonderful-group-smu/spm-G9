from myapi.extensions import db

class Prereq(db.Model):
    """Basic course pre-requisites model"""

    __tablename__ = 'prereq'
    __table_args__ = (db.UniqueConstraint('course_id','prereq_id', name = 'unique_course_prereq'),)
    
    course_id = db.Column(db.Integer, db.ForeignKey("course.course_id"), primary_key=True)
    prereq_id = db.Column(db.Integer, primary_key=True)

    course = db.relationship('Course', backref=db.backref('prereqs', lazy='joined', cascade="all,delete"))