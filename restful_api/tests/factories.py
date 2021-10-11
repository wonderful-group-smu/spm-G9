import factory
import time

from myapi.models import (
    User,
    Course,
    Employee,
    Prereq,
    Enroll,
    CourseClass,
    ClassSection,
    Question
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
    user_type = "ENG"  # If want to test HR, declare explicit when creating

    class Meta:
        model = Employee


class EnrollFactory(factory.Factory):
    eng_id = factory.SelfAttribute('eng.id')
    course_id = factory.SelfAttribute('course.course_id')
    trainer_id = factory.SelfAttribute('trainer.id')
    has_passed = factory.LazyAttribute(lambda n: False)
    is_official = factory.LazyAttribute(lambda n: False)
    created_timestamp = factory.LazyFunction(time.time)

    eng = factory.SubFactory(EmployeeFactory)
    course = factory.SubFactory(CourseFactory)
    trainer = factory.SubFactory(EmployeeFactory)

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


class QuestionFactory(factory.Factory):
    question_id = factory.Sequence(lambda n:n)
    course_id = factory.SelfAttribute('class_section.course_id')
    trainer_id = factory.SelfAttribute('class_section.trainer_id')
    section_id = factory.SelfAttribute('class_section.section_id')
    question = factory.LazyAttribute(lambda o: "question %d" % o.question_id)
    answer = factory.LazyAttribute(lambda o: "answer %d" % o.question_id)
    class_section = factory.SubFactory(ClassSectionFactory)

    class Meta:
        model = Question