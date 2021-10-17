from myapi.extensions import db


class QuestionOption(db.Model):
    """Basic question_option model"""

    __tablename__ = 'question_option'
    __table_args__ = (
        db.UniqueConstraint(
            'course_id',
            'trainer_id',
            'section_id',
            'question_id',
            'option_id',
            name='unique_question_option'),)

    section_id = db.Column(db.Integer, db.ForeignKey('question.section_id'))
    course_id = db.Column(db.Integer, db.ForeignKey("question.course_id"))
    trainer_id = db.Column(db.Integer, db.ForeignKey("question.trainer_id"))
    quiz_id = db.Column(db.Integer, db.ForeignKey("question.quiz_id"))
    question_id = db.Column(db.Integer, db.ForeignKey("question.question_id"))
    option_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    option_label = db.Column(db.String(255))
    option_value = db.Column(db.String(255))
    is_correct = db.Column(db.Boolean)

    question = db.relationship(
        'Question',
        lazy='joined',
        primaryjoin="and_(Question.course_id==QuestionOption.course_id, Question.section_id==QuestionOption.section_id)",
        backref=db.backref('question_options', lazy='joined', cascade="all,delete")
    )
