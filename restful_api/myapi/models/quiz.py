from myapi.extensions import db


class Quiz(db.Model):
    """Basic Quiz model"""

    __tablename__ = 'quiz'
    __table_args__ = (db.UniqueConstraint('course_id', 'section_id', 'trainer_id', name='unique_section_quiz'),)

    course_id = db.Column(db.Integer, db.ForeignKey("class_section.course_id"), primary_key=True)
    section_id = db.Column(db.Integer, db.ForeignKey("class_section.section_id"), primary_key=True)
    trainer_id = db.Column(db.Integer, db.ForeignKey("class_section.trainer_id"), primary_key=True)
    is_graded = db.Column(db.Boolean, default=False)

    class_section = db.relationship(
        'ClassSection',
        primaryjoin="and_(ClassSection.course_id==Quiz.course_id, ClassSection.section_id==Quiz.section_id)",
        backref=db.backref('quizzes', lazy='joined', cascade="all,delete")
    )
