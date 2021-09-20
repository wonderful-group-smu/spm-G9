from myapi.models import Engineer
from myapi.extensions import ma, db


class EngineerSchema(ma.SQLAlchemyAutoSchema):

    id = ma.Int(dump_only=True)
    name = ma.String(dump_only=True)
    
    class Meta:
        model = Engineer
        sqla_session = db.session
        load_instance = True