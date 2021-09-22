from myapi.models import OfficialEnroll
from myapi.extensions import ma, db


class OfficialEnrollSchema(ma.SQLAlchemyAutoSchema):
    
    class Meta:
        model = OfficialEnroll
        sqla_session = db.session
        load_instance = True