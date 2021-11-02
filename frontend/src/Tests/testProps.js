// props used for testing
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
    trainer_id: testTrainer.trainer_id
}
const testCourseClasses = [
    testCourseClass,
]

export {
    testCourse,
    testCourseList,
    testCourseClass,
    testCourseClasses
}