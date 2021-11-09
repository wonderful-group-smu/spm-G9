from myapi.extensions import db


class Question(db.Model):
    """Basic question model"""

    __tablename__ = 'question'
    __table_args__ = (db.UniqueConstraint('course_id', 'section_id', 'trainer_id', 'question_id', name='unique_quiz_question'),)

    question_id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey("quiz.course_id"), primary_key=True)
    section_id = db.Column(db.Integer, db.ForeignKey("quiz.section_id"), primary_key=True)
    trainer_id = db.Column(db.Integer, db.ForeignKey("quiz.trainer_id"), primary_key=True)
    question = db.Column(db.String(255))
    question_type = db.Column(db.Boolean)

    quiz = db.relationship(
        'Quiz',
        primaryjoin="and_(Quiz.course_id==Question.course_id, Quiz.section_id==Question.section_id)",
        backref=db.backref('questions', lazy='joined', cascade="all,delete")
    )
