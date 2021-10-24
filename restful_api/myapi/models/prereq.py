from myapi.extensions import db


class Prereq(db.Model):
    """Basic course pre-requisites model"""

    __tablename__ = 'prereq'
    __table_args__ = (db.UniqueConstraint('course_id', 'prereq_id', name='unique_course_prereq'),)

    course_id = db.Column(db.Integer, db.ForeignKey("course.course_id"), primary_key=True)
    prereq_id = db.Column(db.Integer, db.ForeignKey("course.course_id"), primary_key=True)

    current_course = db.relationship(
        'Course',
        primaryjoin="Course.course_id==Prereq.course_id",
        backref=db.backref('prereqs', lazy='joined', cascade="all,delete"))

    prereq_course = db.relationship(
        'Course',
        primaryjoin="Course.course_id==Prereq.prereq_id",
        backref=db.backref('postreqs', lazy='joined', cascade="all,delete"))
