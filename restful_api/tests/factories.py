import factory

from myapi.models import (
    User,
    Course,
    Employee,
    Prereq,
    Enroll,
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

class EnrollFactory(factory.Factory):
    eng_id = factory.Sequence(lambda n: 1)
    course_id = factory.Sequence(lambda n: n)
    trainer_id = factory.Sequence(lambda n: n)
    has_passed = factory.Sequence(lambda n: False)
    is_official = factory.Sequence(lambda n: False)
    class Meta:
        model = Enroll

class PrereqFactory(factory.Factory):
    class Meta:
        model = Prereq

class CourseClassFactory(factory.Factory):
    course_id = factory.SelfAttribute('course.course_id')
    trainer_id = factory.SelfAttribute('trainer.id')
    course = factory.SubFactory(CourseFactory)
    trainer = factory.SubFactory(EmployeeFactory)
    class Meta:
        model = CourseClass

class ClassSectionFactory(factory.Factory):
    section_id = factory.Sequence(lambda n: n)
    course_id = factory.SelfAttribute('course_class.course_id')
    trainer_id = factory.SelfAttribute('course_class.trainer_id')
    section_name = factory.LazyAttribute(lambda o: "class section %d" % o.section_id)
    course_class = factory.SubFactory(CourseClassFactory)
    class Meta:
        model = ClassSection
