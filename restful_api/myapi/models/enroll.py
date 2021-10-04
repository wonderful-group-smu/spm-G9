from myapi.extensions import db

class Enroll(db.Model):
    """Basic Enroll model"""

    __tablename__ = "enroll"
    __table_args__ = (db.UniqueConstraint('eng_id','course_id','trainer_id', name = 'unique_enroll'),)

    eng_id = db.Column(db.Integer, db.ForeignKey('employee.id'), primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey('course.course_id'), primary_key=True)
    trainer_id = db.Column(db.Integer, db.ForeignKey('employee.id'), primary_key=True)
    has_passed = db.Column(db.Boolean, default=False, nullable=False)
    is_official = db.Column(db.Boolean, default=False, nullable=False)
    
    course = db.relationship('Course', backref=db.backref('enroll', lazy='joined', cascade="all,delete"))
    
    trainer = db.relationship(
        'Employee', 
        primaryjoin="and_(Employee.id==Enroll.trainer_id)",
        backref=db.backref('enroll', lazy='joined', cascade="all,delete"))
    
    # eng = db.relationship(
    #     'Employee',
    #     primaryjoin="and_(Employee.id==Enroll.eng_id)",
    #     backref=db.backref('enroll', lazy='joined', cascade="all,delete"))
    