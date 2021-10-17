from myapi.models import Quiz
from myapi.extensions import ma, db
from .class_section import ClassSectionSchema
from .question import QuestionSchema


class QuizSchema(ma.SQLAlchemyAutoSchema):

    course_id = ma.Int()
    trainer_id = ma.Int()
    section_id = ma.Int()
    quiz_id = ma.Int(required=False)
    class_section = ma.Nested(ClassSectionSchema, required=False)
    questions = ma.List(ma.Nested(QuestionSchema), required=False)

    class Meta:
        model = Quiz
        sqla_session = db.session
        load_instance = True
