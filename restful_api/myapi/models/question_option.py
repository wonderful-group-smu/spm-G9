from myapi.extensions import db


class QuestionOption(db.Model):
    """Basic question_option model"""

    __tablename__ = 'question_option'
    __table_args__ = (db.UniqueConstraint('course_id', 'section_id', 'trainer_id', 'question_id', 'option_id', name='unique_question_option'),)

    option_id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey("question.course_id"), primary_key=True)
    section_id = db.Column(db.Integer, db.ForeignKey("question.section_id"), primary_key=True)
    trainer_id = db.Column(db.Integer, db.ForeignKey("question.trainer_id"), primary_key=True)
    question_id = db.Column(db.Integer, db.ForeignKey("question.question_id"), primary_key=True)
    option_label = db.Column(db.String(255))
    option_value = db.Column(db.String(255))
    is_correct = db.Column(db.Boolean)

    question = db.relationship(
        'Question',
        primaryjoin="and_(Question.course_id==QuestionOption.course_id, Question.section_id==QuestionOption.section_id, "
        "Question.trainer_id==QuestionOption.trainer_id, Question.question_id==QuestionOption.question_id)",
        backref=db.backref('question_options', lazy='joined', cascade="all,delete")
    )
