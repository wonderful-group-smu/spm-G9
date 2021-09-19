from typing import Dict

from myapi.extensions import db


class Course(db.Model):
    """Basic course model"""

    # -------------
    # TODO: We will add a table later for course materials
    # -------------
    
    cid = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)

    def json(self) -> Dict:
        return {
            "cid": self.cid,
            "name": self.name,
            "description": self.description
        }
