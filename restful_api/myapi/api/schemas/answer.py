from myapi.models import Answer
from myapi.extensions import ma, db


class AnswerSchema(ma.SQLAlchemyAutoSchema):

    course_id = ma.Int(required=False, load_only=True)
    trainer_id = ma.Int(required=False, load_only=True)
    section_id = ma.Int(required=False, load_only=True)
    eng_id = ma.Int(required=False, load_only=True)
    question_id = ma.Int()
    answer_label = ma.String()

    class Meta:
        model = Answer
        sqla_session = db.session
        load_instance = True
