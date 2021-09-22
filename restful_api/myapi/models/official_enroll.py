from myapi.extensions import db

class OfficialEnroll(db.Model):
    """Basic official enroll model"""

    __tablename__ = "official_enroll"
    
    eng_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), primary_key=True, )
    course_id = db.Column(db.Integer, db.ForeignKey('course.course_id'), primary_key=True, )
    start_date = db.Column(db.DateTime)
    end_date = db.Column(db.DateTime)
    has_passed = db.Column(db.Boolean, default=False)