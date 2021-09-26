from myapi.extensions import db

class SelfEnroll(db.Model):
    """Basic Self Enroll model"""

    __tablename__ = "self_enroll"
    __table_args__ = (db.UniqueConstraint('eng_id','course_id', name = 'unique_eng_self_enrolled_course'),)

    eng_id = db.Column(db.Integer, db.ForeignKey('employee.id'), primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey('course.course_id'), primary_key=True)
    