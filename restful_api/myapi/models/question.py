from myapi.extensions import db


class Question(db.Model):
    """Basic question model"""

    __tablename__ = 'question'
    __table_args__ = (db.UniqueConstraint('course_id', 'trainer_id', 'section_id', 'question_id', name='unique_section_question'),)

    section_id = db.Column(db.Integer, db.ForeignKey('class_section.section_id'))
    course_id = db.Column(db.Integer, db.ForeignKey("class_section.course_id"))
    trainer_id = db.Column(db.Integer, db.ForeignKey("class_section.trainer_id"))
    question_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    question = db.Column(db.String(255), nullable=False)
    answer = db.Column(db.String(255), nullable=False)

    # Multiple foreign keys in One relationship - https://stackoverflow.com/questions/37156248/flask-sqlalchemy-multiple-foreign-keys-in-relationship
    # This effectively joins ClassSection and Question with two foreign keys
    class_section = db.relationship(
        'ClassSection',
        lazy='joined',
        primaryjoin="and_(ClassSection.course_id==Question.course_id, ClassSection.section_id==Question.section_id)",
        backref=db.backref('class_sections', lazy='joined', cascade="all,delete")
    )
