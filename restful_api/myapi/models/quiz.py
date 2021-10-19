from myapi.extensions import db


class Quiz(db.Model):
    """Basic Quiz model"""

    __tablename__ = 'quiz'
    __table_args__ = (db.UniqueConstraint('course_id', 'trainer_id', 'section_id', 'quiz_id', name='unique_section_quiz'),)

    section_id = db.Column(db.Integer, db.ForeignKey('class_section.section_id'))
    course_id = db.Column(db.Integer, db.ForeignKey("class_section.course_id"))
    trainer_id = db.Column(db.Integer, db.ForeignKey("class_section.trainer_id"))
    quiz_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    is_graded = db.Column(db.Boolean)

    class_section = db.relationship(
        'ClassSection',
        lazy='joined',
        primaryjoin="and_(ClassSection.course_id==Quiz.course_id, ClassSection.section_id==Quiz.section_id)",
        backref=db.backref('quizzes', lazy='joined', cascade="all,delete")
    )
