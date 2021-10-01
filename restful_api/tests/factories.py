import factory

from myapi.models import (
    User,
    Course,
    Employee,
    Prereq,
    OfficialEnroll,
    SelfEnroll,
    CourseClass,
    ClassSection
)

class UserFactory(factory.Factory):
    username = factory.Sequence(lambda n: "user%d" % n)
    email = factory.LazyAttribute(lambda o: o.username + "%@mail.com")
    password = "mypwd"
    class Meta:
        model = User


class CourseFactory(factory.Factory):
    course_id = factory.Sequence(lambda n: n)
    name = factory.LazyAttribute(lambda o: "course %d" % o.course_id)
    description = factory.LazyAttribute(lambda o: "course %d description" % o.course_id)
    class Meta:
        model = Course

class EmployeeFactory(factory.Factory):
    id = factory.Sequence(lambda n: n)
    name = factory.LazyAttribute(lambda o: "employee %d" % o.id)
    user_type = "ENG" # If want to test HR, declare explicit when creating
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
    course_id = factory.Sequence(lambda n: n)
    trainer_id = factory.Sequence(lambda n: n)
    course = factory.SubFactory(CourseFactory, course_id=factory.SelfAttribute('..course_id'))
    trainer = factory.SubFactory(EmployeeFactory, id=factory.SelfAttribute('..trainer_id'))
    class Meta:
        model = CourseClass

class ClassSectionFactory(factory.Factory):
    course_id = factory.Sequence(lambda n: n)
    trainer_id = factory.Sequence(lambda n: n)
    section_name = factory.Sequence(lambda n: "class section %d" % n)
    course_class = factory.SubFactory(
        CourseClassFactory,
        course_id=factory.SelfAttribute('..course_id'),
        trainer_id=factory.SelfAttribute('..trainer_id'),
    )
    class Meta:
        model = ClassSection
