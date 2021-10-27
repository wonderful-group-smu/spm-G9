// props used for testing
const testCourse = {
    course_id: 1,
    description: "Course one description",
    isActive: false,
    isComplete: false,
    isEligible: true,
    name: "course one name",
    self_enrollment_start_date: null,
    self_enrollment_end_date: null,
    prereqs: [],
}
const testTrainer = {
    id: 2,
    name: "test trainer",
    user_type: "ENG"
}
const testCourseClass = {
    class_size: 20,
    course: testCourse,
    start_date: null,
    end_date: null,
    trainer: testTrainer,
    trainer_id: testTrainer.trainer_id
}

export {
    testCourse,
    testCourseClass
}