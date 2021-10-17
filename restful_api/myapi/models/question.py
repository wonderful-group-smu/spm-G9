from myapi.extensions import db


class Question(db.Model):
    """Basic question model"""

    __tablename__ = 'question'
    __table_args__ = (db.UniqueConstraint('course_id', 'trainer_id', 'section_id', 'question_id', 'quiz_id', name='unique_quiz_question'),)

    section_id = db.Column(db.Integer, db.ForeignKey('quiz.section_id'))
    course_id = db.Column(db.Integer, db.ForeignKey("quiz.course_id"))
    trainer_id = db.Column(db.Integer, db.ForeignKey("quiz.trainer_id"))
    quiz_id = db.Column(db.Integer, db.ForeignKey("quiz.quiz_id"))
    question_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    question = db.Column(db.String(255), nullable=False)
    question_type = db.Column(db.Boolean)

    quiz = db.relationship(
        'Quiz',
        lazy='joined',
        primaryjoin="and_(Quiz.course_id==Question.course_id, Quiz.section_id==Question.section_id)",
        backref=db.backref('questions', lazy='joined', cascade="all,delete")
    )
    question_option = db.relationship(
        'QuestionOption',
        lazy='joined',
        primaryjoin="and_(QuestionOption.course_id==Question.course_id, QuestionOption.section_id==Question.section_id)",
        backref=db.backref('questions', lazy='joined', cascade="all,delete")
    )
