from myapi.models import Prereq
from myapi.extensions import ma, db


class PrereqSchema(ma.SQLAlchemyAutoSchema):

    class Meta:
        model = Prereq
        sqla_session = db.session
        load_instance = True
