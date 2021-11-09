from myapi.api.resources.course import CourseStatusList, CourseResource, CourseResourceList, CourseEligibleEngineerList
from myapi.api.resources.employee import EmployeeList, EmployeeResource
from myapi.api.resources.enroll import EnrollResourceList, EnrollResource, EnrollByEngineerSelfResourceList, EnrollByCourseResourceList
from myapi.api.resources.course_class import CourseClassResource, CourseClassResourceList
from myapi.api.resources.class_section import ClassSectionResource, ClassSectionResourceList
from myapi.api.resources.quiz import QuizResourceList, QuizResource
from myapi.api.resources.progress import ProgressResource, ProgressListResource
from myapi.api.resources.quiz_attempt import QuizAttemptResource

__all__ = [
    "EmployeeList",
    "EmployeeResource",
    "EnrollResourceList",
    "EnrollResource",
    "EnrollByEngineerSelfResourceList",
    "EnrollByCourseResourceList",
    "CourseStatusList",
    "CourseResourceList",
    "CourseResource",
    "CourseClassResource",
    "CourseClassResourceList",
    "CourseEligibleEngineerList",
    "ClassSectionResource",
    "ClassSectionResourceList",
    "QuizResource",
    "QuizResourceList",
    "ProgressResource",
    "ProgressListResource",
    "QuizAttemptResource"
]
