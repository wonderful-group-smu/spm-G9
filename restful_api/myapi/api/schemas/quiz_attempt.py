from myapi.models import QuizAttempt
from myapi.extensions import ma, db
from .question import QuestionSchema


class QuizAttemptSchema(ma.SQLAlchemyAutoSchema):

    course_id = ma.Int()
    section_id = ma.Int()
    trainer_id = ma.Int()
    eng_id = ma.Int()
    questions = ma.List(ma.Nested(QuestionSchema), required=False)

    class Meta:
        model = QuizAttempt
        sqla_session = db.session
        load_instance = True
