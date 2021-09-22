from myapi.extensions import db


class PreReq(db.Model):
    """Basic course pre-requisites model"""
    course_id = db.Column(db.Integer, db.ForeignKey('course.course_id'), primary_key=True)
    prereq_id = db.Column(db.Integer, primary_key=True)

