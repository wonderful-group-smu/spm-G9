from typing import Dict
from sqlalchemy.ext.hybrid import hybrid_property
from myapi.extensions import db, pwd_context


class Employee(db.Model):
    """
    Basic Employee model
    An employee can be engineer or HR based on user_type = 'ENG' | 'HR'
    """

    id = db.Column(db.Integer, primary_key=True)
    user_type = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(255), nullable=False)

    _password = db.Column("password", db.String(255), nullable=False)

    @hybrid_property
    def password(self):
        return self._password

    @password.setter
    def password(self, value):
        self._password = pwd_context.hash(value)

    def json(self) -> Dict:
        return {
            "employee_id": self.id,
            "user_type": self.user_type,
            "name": self.name
        }

    def __repr__(self):
        return "<Employee %s>" % self.name
