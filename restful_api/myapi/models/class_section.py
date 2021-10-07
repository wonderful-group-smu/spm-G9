from myapi.extensions import db


class ClassSection(db.Model):
    """Basic section model"""

    __tablename__ = 'class_section'
    __table_args__ = (db.UniqueConstraint('course_id', 'trainer_id', 'section_id', name='unique_course_trainer'),)

    section_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    course_id = db.Column(db.Integer, db.ForeignKey("course_class.course_id"))
    trainer_id = db.Column(db.Integer, db.ForeignKey("course_class.trainer_id"))
    section_name = db.Column(db.String(255), nullable=False)
    materials = db.Column(db.String(255))

    # Multiple foreign keys in One relationship - https://stackoverflow.com/questions/37156248/flask-sqlalchemy-multiple-foreign-keys-in-relationship
    # This effectively joins CourseClass and CourseSection with two foreign keys
    course_class = db.relationship(
        'CourseClass',
        lazy='joined',
        primaryjoin="and_(CourseClass.course_id==ClassSection.course_id, CourseClass.trainer_id==ClassSection.trainer_id)",
        backref=db.backref('course_sections', lazy='joined', cascade="all,delete")
    )
