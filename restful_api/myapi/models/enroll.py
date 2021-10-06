from myapi.extensions import db


class Enroll(db.Model):
    """Basic Enroll model"""

    __tablename__ = "enroll"
    __table_args__ = (db.UniqueConstraint('eng_id', 'course_id', 'trainer_id', name='unique_enroll'),)

    eng_id = db.Column(db.Integer, db.ForeignKey('employee.id'), primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey('course.course_id'), primary_key=True)
    trainer_id = db.Column(db.Integer, db.ForeignKey('employee.id'), primary_key=True)
    has_passed = db.Column(db.Boolean, default=False, nullable=False)
    is_official = db.Column(db.Boolean, default=False, nullable=False)
    created_timestamp = db.Column(db.Integer)

    course = db.relationship('Course', backref=db.backref('enrollment_course', lazy='joined', cascade="all,delete"))

    # DOC: https://stackoverflow.com/questions/62692414/how-to-resolve-this-flask-sqlalchemy-error-sqlalchemy-exc-invalidrequesterror
    # How to double link backref relationships
    trainer = db.relationship(
        'Employee',
        primaryjoin="Employee.id==Enroll.trainer_id",
        backref=db.backref('enrollment_trainer', lazy='joined', cascade="all,delete"))

    eng = db.relationship(
        'Employee',
        primaryjoin="Employee.id==Enroll.eng_id",
        backref=db.backref('enrollment_engineer', lazy='joined', cascade="all,delete"))
