from myapi.models import Question
from myapi.extensions import ma, db
from .class_section import ClassSectionSchema


class QuestionSchema(ma.SQLAlchemyAutoSchema):

    course_id = ma.Int()
    trainer_id = ma.Int()
    section_id = ma.Int()
    question_id = ma.Int(required=False)
    class_section = ma.Nested(ClassSectionSchema, required=False)

    class Meta:
        model = Question
        sqla_session = db.session
        load_instance = True
