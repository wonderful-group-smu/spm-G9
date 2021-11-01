import factory
import time

from myapi.models import (
    Course,
    Employee,
    Prereq,
    Enroll,
    CourseClass,
    ClassSection,
    SectionCompleted,
    Quiz,
    Question,
    QuestionOption,
    QuizAttempt,
    Answer
)


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
    password = "testpassword"

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
    course_id = factory.SelfAttribute('current_course.course_id')
    prereq_id = factory.SelfAttribute('prereq_course.course_id')
    current_course = factory.SubFactory(CourseFactory)
    prereq_course = factory.SubFactory(CourseFactory)

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


class SectionCompletedFactory(factory.Factory):
    eng_id = factory.SelfAttribute('engineer.id')
    section_id = factory.SelfAttribute('class_section.section_id')
    course_id = factory.SelfAttribute('class_section.course_id')
    trainer_id = factory.SelfAttribute('class_section.trainer_id')
    class_section = factory.SubFactory(ClassSectionFactory)
    engineer = factory.SubFactory(EmployeeFactory)

    class Meta:
        model = SectionCompleted


class QuizFactory(factory.Factory):
    course_id = factory.SelfAttribute('class_section.course_id')
    trainer_id = factory.SelfAttribute('class_section.trainer_id')
    section_id = factory.SelfAttribute('class_section.section_id')
    is_graded = factory.LazyAttribute(lambda n: False)
    class_section = factory.SubFactory(ClassSectionFactory)

    class Meta:
        model = Quiz


class QuestionFactory(factory.Factory):
    question_id = factory.Sequence(lambda n: n)
    course_id = factory.SelfAttribute('quiz.course_id')
    trainer_id = factory.SelfAttribute('quiz.trainer_id')
    section_id = factory.SelfAttribute('quiz.section_id')
    question = factory.LazyAttribute(lambda o: "question %d" % o.question_id)
    question_type = factory.LazyAttribute(lambda n: True)
    quiz = factory.SubFactory(QuizFactory)

    class Meta:
        model = Question


class QuestionOptionFactory(factory.Factory):
    course_id = factory.SelfAttribute('question.course_id')
    trainer_id = factory.SelfAttribute('question.trainer_id')
    section_id = factory.SelfAttribute('question.section_id')
    question_id = factory.SelfAttribute('question.question_id')
    option_id = factory.Sequence(lambda n: n)
    option_label = factory.LazyAttribute(lambda o: "option label %d" % o.question_id)
    option_value = factory.LazyAttribute(lambda o: "option value %d" % o.question_id)
    is_correct = factory.LazyAttribute(lambda n: False)
    question = factory.SubFactory(QuestionFactory)

    class Meta:
        model = QuestionOption


class QuizAttemptFactory(factory.Factory):
    course_id = factory.SelfAttribute('quiz.course_id')
    section_id = factory.SelfAttribute('quiz.section_id')
    trainer_id = factory.SelfAttribute('quiz.trainer_id')
    eng_id = factory.SelfAttribute('engineer.id')
    quiz = factory.SubFactory(QuizFactory)
    engineer = factory.SubFactory(EmployeeFactory)

    class Meta:
        model = QuizAttempt

class AnswerFactory(factory.Factory):
    question_id = factory.Sequence(lambda n: n)
    course_id = factory.SelfAttribute('quiz_attempt.course_id')
    trainer_id = factory.SelfAttribute('quiz_attempt.trainer_id')
    section_id = factory.SelfAttribute('quiz_attempt.section_id')
    eng_id = factory.SelfAttribute('quiz_attempt.eng_id')
    answer_label = factory.LazyAttribute(lambda o: "answer label %d" % o.question_id)
    quiz_attempt = factory.SubFactory(QuizAttemptFactory)

    class Meta:
        model = Answer
