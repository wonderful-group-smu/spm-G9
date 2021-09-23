from myapi.extensions import db

class SelfEnroll(db.Model):
    """Basic Self Enroll model"""

    __tablename__ = "self_enroll"
    
    eng_id = db.Column(db.Integer, db.ForeignKey('employee.id'), primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey('course.course_id'), primary_key=True)
    