from myapi.extensions import db


class Course(db.Model):
    """Basic course model"""
    
    __tablename__ = 'course'
    
    course_id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(255), nullable=False)