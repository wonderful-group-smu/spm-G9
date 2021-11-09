// props used for testing
const testHrToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYzNjM2NTY4NywianRpIjoiYmJmYmE0MDUtZjBkZC00NDE0LWI1ZmEtY2ExNjA2MzBlYzhkIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6MywibmJmIjoxNjM2MzY1Njg3LCJleHAiOjE2MzY5NzA0ODcsInVzZXJfdHlwZSI6IkhSIn0.7Na3c6HT-YxsnpSFVJDJJvBxlbG5INFRTUoQloqraz8"
const testCourse = {
    course_id: 1,
    description: "Course one description",
    isActive: false,
    isComplete: false,
    isEligible: true,
    name: "course one name",
    self_enrollment_start_date: new Date(2021, 12, 1).toISOString(),
    self_enrollment_end_date: new Date(2021, 12, 30).toISOString(),
    prereqs: [],
}
const testCourseList = [
    testCourse,
]
const testTrainer = {
    id: 2,
    name: "test trainer",
    user_type: "ENG"
}
const testCourseClass = {
    class_size: 20,
    course: testCourse,
    start_date: new Date(2021, 12, 1).toISOString(),
    end_date: new Date(2021, 12, 30).toISOString(),
    trainer: testTrainer,
    trainer_id: testTrainer.id
}
const testCourseClasses = [
    testCourseClass,
]
const testClassSection = {
    course_class: testCourseClass,
    course_id: testCourse.course_id,
    has_completed: false,
    materials: "test materials",
    section_id: 1,
    section_name: "Section One",
    trainer_id: testCourseClass.trainer.trainer_id,
}

export {
    testHrToken,
    testCourse,
    testCourseList,
    testCourseClass,
    testCourseClasses,
    testClassSection
}