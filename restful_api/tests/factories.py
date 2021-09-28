import factory

from myapi.models import User, Course, Employee, Prereq, OfficialEnroll, SelfEnroll, CourseClass

class UserFactory(factory.Factory):
    username = factory.Sequence(lambda n: "user%d" % n)
    email = factory.Sequence(lambda n: "user%d@mail.com" % n)
    password = "mypwd"
    class Meta:
        model = User


class CourseFactory(factory.Factory):
    course_id = factory.Sequence(lambda n: n)
    name = factory.Sequence(lambda n: "course %d" % n)
    description = factory.Sequence(lambda n: "course %d description" % n)
    class Meta:
        model = Course

class EmployeeFactory(factory.Factory):
    id = factory.Sequence(lambda n: "%d" % n)
    name = factory.Sequence(lambda n: "employee %d" % n)
    user_type = factory.Sequence(lambda n: "user type %d" % n)
    class Meta:
        model = Employee

class OfficialEnrollFactory(factory.Factory):
    eng_id = factory.Sequence(lambda n: 1)
    course_id = factory.Sequence(lambda n: "%d" % n)
    # start_date = factory.Sequence(lambda n: "%d" % n)
    # end_date = factory.Sequence(lambda n: "%d" % n)
    has_passed = factory.Sequence(lambda n: False)
    class Meta:
        model = OfficialEnroll

class PrereqFactory(factory.Factory):
    class Meta:
        model = Prereq

class SelfEnrollFactory(factory.Factory):
    eng_id = factory.Sequence(lambda n: 1)
    course_id = factory.Sequence(lambda n: "%d" % n)

    class Meta:
        model = SelfEnroll

class CourseClassFactory(factory.Factory):
    class Meta:
        model = CourseClass
