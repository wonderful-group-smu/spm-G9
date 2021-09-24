from myapi.models import Course
from myapi.extensions import ma, db
from marshmallow import fields
from .prereq import PrereqSchema
from .course_trainer import CourseTrainerSchema

class CourseSchema(ma.SQLAlchemyAutoSchema):

    prereqs = ma.List(ma.Nested(PrereqSchema), required=False)
    course_trainers = ma.List(ma.Nested(CourseTrainerSchema), required=False)
    isEligible = fields.Method('is_eligible') # Note, this is using Marshmallow, not the flask extension
    isActive = fields.Method('is_active')
    isComplete = fields.Method('is_complete')
    class Meta:
        model = Course
        sqla_session = db.session
        load_instance = True
        ordered = True
    
    def is_complete(self, obj):
        if hasattr(obj, 'has_passed'):
            return obj.has_passed
        return None
    
    def is_eligible(self, obj):
        if hasattr(obj, 'is_eligible'):
            return obj.is_eligible
        return None
    
    def is_active(self, obj):
        # If enrolled but haven't passed, then it's active
        # Hence, not has passed.
        if hasattr(obj, 'has_passed'):
            return not obj.has_passed
        return None