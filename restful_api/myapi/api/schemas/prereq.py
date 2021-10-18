from myapi.models import Prereq
from myapi.extensions import ma, db


class PrereqSchema(ma.SQLAlchemyAutoSchema):

    course_id = ma.Int()
    prereq_id = ma.Int()

    class Meta:
        model = Prereq
        sqla_session = db.session
        load_instance = True
