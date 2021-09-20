from typing import Dict
from myapi.extensions import db

class Engineer(db.Model):
    """Basic Engineer model"""

    # ---------------------
    # TODO: Add Each engineer can be enrolled to zero or many courses. Each course can have one or many enrolled engineers
    # TODO: Add engineer's schedule
    # ---------------------

    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String(255), nullable=False)

    def json(self) -> Dict:
        return {
            "engineer_id": self.id,
            "name": self.name,
        }

    def __repr__(self):
        return "<Engineer %s>" % self.name