from myapi.extensions import db


class Answer(db.Model):
    """Basic answer model"""

    __tablename__ = 'answer'
    __table_args__ = (db.UniqueConstraint('course_id', 'section_id', 'trainer_id', 'eng_id', 'question_id', name='unique_answer'),)
    
    question_id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey("quiz_attempt.course_id"), primary_key=True)
    section_id = db.Column(db.Integer, db.ForeignKey('quiz_attempt.section_id'), primary_key=True)
    trainer_id = db.Column(db.Integer, db.ForeignKey("quiz_attempt.trainer_id"), primary_key=True)
    eng_id = db.Column(db.Integer, db.ForeignKey("quiz_attempt.eng_id"))
    answer_label = db.Column(db.String(255))

    quiz_attempt = db.relationship(
        'QuizAttempt',
        primaryjoin="and_(QuizAttempt.course_id==Answer.course_id, QuizAttempt.section_id==Answer.section_id)",
        backref=db.backref('answers', lazy='joined', cascade="all,delete")
    )
