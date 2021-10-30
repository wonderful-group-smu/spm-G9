from myapi.extensions import db


class Course(db.Model):
    """Basic course model"""

    __tablename__ = 'course'

    course_id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    self_enrollment_start_date = db.Column(db.DateTime)
    self_enrollment_end_date = db.Column(db.DateTime)
