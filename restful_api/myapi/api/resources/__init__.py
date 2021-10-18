from myapi.api.resources.course import CourseList, CourseResource
from myapi.api.resources.employee import EmployeeList, EmployeeResource
from myapi.api.resources.enroll import EnrollResourceList, EnrollResource, EnrollByEngineerSelfResourceList, EnrollByCourseResourceList
from myapi.api.resources.course_class import CourseClassResource
from myapi.api.resources.class_section import ClassSectionResource, ClassSectionResourceList
from myapi.api.resources.quiz import QuizResourceList, QuizResource
from myapi.api.resources.progress import ProgressResource

__all__ = [
    "EmployeeList",
    "EmployeeResource",
    "EnrollResourceList",
    "EnrollResource",
    "EnrollByEngineerSelfResourceList",
    "EnrollByCourseResourceList",
    "CourseList",
    "CourseResource",
    "CourseClassResource",
    "ClassSectionResource",
    "ClassSectionResourceList",
    "QuizResource",
    "QuizResourceList"
    "ProgressResource"
]
