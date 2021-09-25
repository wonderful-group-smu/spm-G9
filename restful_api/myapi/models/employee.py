from typing import Dict
from myapi.extensions import db

class Employee(db.Model):
    """
    Basic Employee model
    An employee can be engineer or HR based on user_type = 'ENG' | 'HR'
    """

    id=db.Column(db.Integer, primary_key=True)
    user_type=db.Column(db.String(255),nullable=False)
    name=db.Column(db.String(255), nullable=False)

    def json(self) -> Dict:
        return {
            "employee_id": self.id,
            "user_type": self.user_type,
            "name": self.name
        }

    def __repr__(self):
        return "<Employee %s>" % self.name