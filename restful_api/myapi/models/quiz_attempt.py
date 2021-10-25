from myapi.extensions import db


class QuizAttempt(db.Model):
    """Basic QuizAttempt model"""

    __tablename__ = 'quiz_attempt'
    __table_args__ = (db.UniqueConstraint('course_id', 'section_id', 'quiz_id', 'eng_id', name='unique_eng_quiz_attempt'),)

    course_id = db.Column(db.Integer, db.ForeignKey("quiz.course_id"), primary_key=True)
    section_id = db.Column(db.Integer, db.ForeignKey('quiz.section_id'), primary_key=True)
    quiz_id = db.Column(db.Integer, db.ForeignKey("quiz.quiz_id"), primary_key=True)
    eng_id = db.Column(db.Integer, db.ForeignKey("employee.id"), primary_key=True)

    quiz = db.relationship(
        'Quiz',
        lazy='joined',
        primaryjoin="and_(Quiz.quiz_id==QuizAttempt.quiz_id, Quiz.section_id==QuizAttempt.section_id, Quiz.course_id==QuizAttempt.course_id)",
        backref=db.backref('quiz_attempt', lazy='joined', cascade="all,delete")
    )

    engineer = db.relationship('Employee', backref=db.backref('quiz_attempts', lazy='joined', cascade="all,delete"))
