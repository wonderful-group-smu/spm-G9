from myapi.models import Answer
from myapi.extensions import ma, db


class AnswerSchema(ma.SQLAlchemyAutoSchema):

    course_id = ma.Int(required=False)
    trainer_id = ma.Int(required=False)
    section_id = ma.Int(required=False)
    eng_id = ma.Int(required=False)
    question_id = ma.Int()
    answer_label = ma.String()

    class Meta:
        model = Answer
        sqla_session = db.session
        load_instance = True
