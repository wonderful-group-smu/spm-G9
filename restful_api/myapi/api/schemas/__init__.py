from myapi.api.schemas.user import UserSchema
from myapi.api.schemas.employee import EmployeeSchema
from myapi.api.schemas.official_enroll import OfficialEnrollSchema
from myapi.api.schemas.course import CourseSchema
from myapi.api.schemas.employee import EmployeeSchema
from myapi.api.schemas.prereq import PrereqSchema
<<<<<<< HEAD
from myapi.api.schemas.self_enroll import SelfEnrollSchema

__all__ = ["UserSchema", "EmployeeSchema", "CourseSchema", "PrereqSchema", "OfficialEnrollSchema", "SelfEnrollSchema"]
=======
from myapi.api.schemas.course_trainer import CourseTrainerSchema

__all__ = [
  "UserSchema",
  "EmployeeSchema",
  "CourseSchema",
  "PrereqSchema",
  "OfficialEnrollSchema",
  "CourseTrainerSchema"
]
>>>>>>> origin/SPM-29-Display-Eligible-Courses


