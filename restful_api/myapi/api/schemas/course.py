from myapi.models import Course
from myapi.extensions import ma, db
from .prereq import PrereqSchema

class CourseSchema(ma.SQLAlchemyAutoSchema):

    prereqs = ma.List(ma.Nested(PrereqSchema), required=False)

    class Meta:
        model = Course
        sqla_session = db.session
        load_instance = True
        ordered = True
    

class CourseStatusSchema(CourseSchema):

    isEligible = ma.Method('is_eligible')
    isActive = ma.Method('is_active')
    isComplete = ma.Method('is_complete')

    def is_complete(self, obj):
        if hasattr(obj, 'has_passed'):
            return obj.has_passed
        return False
    
    def is_eligible(self, obj):
        if hasattr(obj, 'is_eligible'):
            return obj.is_eligible
        return False
    
    def is_active(self, obj):
        # If enrolled but haven't passed, then it's active
        # Hence, not has passed.
        if hasattr(obj, 'has_passed'):
            return not obj.has_passed
        return False