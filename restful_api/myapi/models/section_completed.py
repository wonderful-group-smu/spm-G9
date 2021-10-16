from myapi.extensions import db


class SectionCompleted(db.Model):
    """Basic section completed model"""

    __tablename__ = 'section_completed'
    __table_args__ = (
        db.UniqueConstraint(
            'eng_id',
            'course_id',
            'trainer_id',
            'section_id',
            name='unique_section_completed'
        ),
    )

    eng_id = db.Column(db.Integer, db.ForeignKey('employee.id'), primary_key=True)
    section_id = db.Column(db.Integer, db.ForeignKey("class_section.section_id"), primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey("class_section.course_id"), primary_key=True)
    trainer_id = db.Column(db.Integer, db.ForeignKey("class_section.trainer_id"), primary_key=True)

    class_section = db.relationship(
        'ClassSection',
        backref=db.backref('section_completed', lazy='joined', cascade="all,delete"),
        primaryjoin="and_(SectionCompleted.course_id==ClassSection.course_id, SectionCompleted.trainer_id==ClassSection.trainer_id)",
    )

    engineer = db.relationship('Employee', backref=db.backref('sections_completed', lazy='joined', cascade="all,delete"))
