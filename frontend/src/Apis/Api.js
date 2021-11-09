import axios from 'axios'
import jwt from 'jwt-decode'
// const BASE_URL = 'http://spmg9.herokuapp.com/'
const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000/'

const getAuthHeaders = () => {
  let token = localStorage.getItem('token')
  if (token === null) {
    throw new Error('token not in')
  }
  const headers = {
    'content-type': 'application/json',
    authorization: 'Bearer ' + token,
  }
  return headers
}

const getEmployeeID = () => {
  let token = localStorage.getItem('token')
  const employeeID = jwt(token).sub
  return employeeID
}

const getEmployeeRole = () => {
  let token = localStorage.getItem('token')
  const employeeRole = jwt(token).user_type
  return employeeRole
}

const login = (data) => axios.post(`${BASE_URL}auth/login`, data)

const getEmployees = () => {
  const headers = getAuthHeaders()
  return axios.get(`${BASE_URL}api/v1/employees`, { headers })
}

const getCourseList = () => {
  const headers = getAuthHeaders()
  return axios.get(`${BASE_URL}api/v1/courses/0`, { headers })
}

const getCourseClasses = ({ course_id }) => {
  const headers = getAuthHeaders()
  return axios.get(`${BASE_URL}api/v1/course_classes/` + course_id, { headers })
}

const addNewCourse = ({ course_id, name, description, prereqs }) => {
  const headers = getAuthHeaders()
  return axios.post(
    `${BASE_URL}api/v1/course/${course_id}`,
    {
      course_id,
      name,
      description,
      prereqs,
    },
    { headers }
  )
}
const deleteCourse = ({ course_id }) => {
  const headers = getAuthHeaders()
  return axios.delete(`${BASE_URL}api/v1/course/${course_id}`, { headers })
}

const addNewCourseClass = ({
  course_id,
  trainer_id,
  class_size,
  start_date,
  end_date,
}) => {
  const headers = getAuthHeaders()
  return axios.post(
    `${BASE_URL}api/v1/course_class/${course_id}&${trainer_id}`,
    {
      class_size,
      course_id,
      end_date,
      start_date,
      trainer_id,
    },
    { headers }
  )
}
const deleteCourseClass = ({ course_id, trainer_id }) => {
  const headers = getAuthHeaders()
  return axios.delete(`${BASE_URL}api/v1/course_class/${course_id}&${trainer_id}`, { headers })
}

const addNewSection = ({ course_id, section_name, materials, trainer_id }) => {
  const headers = getAuthHeaders()
  return axios.post(
    `${BASE_URL}api/v1/class_section/0`,
    {
      course_id,
      section_name,
      materials,
      trainer_id,
    },
    { headers }
  )
}
const deleteSection = ({ section_id }) => {
  const headers = getAuthHeaders()
  return axios.delete(
    `${BASE_URL}api/v1/class_section/${section_id}`,
    { headers }
  )
}
const deleteQuiz = ({ course_id, section_id, trainer_id }) => {
  const headers = getAuthHeaders()
  return axios.delete(
    `${BASE_URL}api/v1/quiz/${course_id}&${section_id}&${trainer_id}`,
    { headers }
  )
}

const addNewQuiz = ({ course_id, section_id, trainer_id, is_graded, passing_mark, questions }) => {
  const headers = getAuthHeaders()
  return axios.post(
    `${BASE_URL}api/v1/quiz/${course_id}&${section_id}&${trainer_id}`,
    {
      course_id,
      section_id,
      trainer_id,
      is_graded,
      passing_mark,
      questions
    },
    { headers }
  )
}

const getEnrolledList = () => {
  const headers = getAuthHeaders()
  const employeeID = getEmployeeID()
  return axios.get(`${BASE_URL}api/v1/enrollments/${employeeID}`, { headers })
}

const getClassDetails = (course_id, trainer_id) => {
  const headers = getAuthHeaders()
  return axios.get(
    `${BASE_URL}api/v1/course_class/${course_id}&${trainer_id}`,
    { headers }
  )
}

const addSelfEnroll = (course_id, trainer_id) => {
  const employeeID = getEmployeeID()
  const detail_input = {
    eng_id: employeeID,
    course_id: course_id,
    trainer_id: trainer_id,
    is_official: false,
  }
  const headers = getAuthHeaders()
  return axios.post(
    `${BASE_URL}api/v1/enroll/${employeeID}&${course_id}&${trainer_id}`,
    detail_input,
    { headers }
  )
}

const acceptSelfEnroll = (eng_id,course_id, trainer_id) => {
  const detail_input = {
    eng_id: eng_id,
    course_id: course_id,
    trainer_id: trainer_id,
    is_official: true,
  }
  const headers = getAuthHeaders()
  return axios.post(
    `${BASE_URL}api/v1/enroll/${eng_id}&${course_id}&${trainer_id}`,
    detail_input,
    { headers }
  )
}

const deleteSelfEnroll = (eng_id,course_id, trainer_id) => {
  const headers = getAuthHeaders()
  return axios.delete(
    `${BASE_URL}api/v1/enroll/${eng_id}&${course_id}&${trainer_id}`,
    { headers }
  )
}

const getSelfEnroll = (course_id, trainer_id) => {
  const employeeID = getEmployeeID()
  const headers = getAuthHeaders()
  return axios.get(
    `${BASE_URL}api/v1/enroll/${employeeID}&${course_id}&${trainer_id}`,
    { headers }
  )
}

const getCourseEligibleEngineers = (course_id) => {
  const headers = getAuthHeaders()
  return axios.get(`${BASE_URL}api/v1/course_eligible_engineers/${course_id}`, {
    headers,
  })
}

const addHrEnroll = (course_id, trainer_id, employee_id) => {
  const detail_input = {
    eng_id: employee_id,
    course_id: course_id,
    trainer_id: trainer_id,
    is_official: true,
  }
  const headers = getAuthHeaders()
  return axios.post(
    `${BASE_URL}api/v1/enroll/${employee_id}&${course_id}&${trainer_id}`,
    detail_input,
    { headers }
  )
}

const getCourseProgress = (course_id, trainer_id) => {
  const employeeID = getEmployeeID()
  const headers = getAuthHeaders()
  return axios.get(
    `${BASE_URL}api/v1/course_progress/${course_id}&${trainer_id}&${employeeID}`,
    { headers }
  )
}

const getClassContent = (course_id, trainer_id) => {
  const employeeID = getEmployeeID()
  const headers = getAuthHeaders()
  return axios.get(
    `${BASE_URL}api/v1/class_sections/${course_id}&${trainer_id}&${employeeID}`,
    { headers }
  )
}

const getAllSelfEnrolled = () => {
  const headers = getAuthHeaders()
  return axios.get(`${BASE_URL}api/v1/self_enrollments`, { headers })
}

const getQuiz = (course_id, section_id, trainer_id) => {
  const headers = getAuthHeaders()
  return axios.get(
    `${BASE_URL}api/v1/quiz/${course_id}&${section_id}&${trainer_id}`,
    { headers }
  )
}

const getQuizAttempt = (course_id, section_id, trainer_id) => {
  const employeeID = getEmployeeID()
  const headers = getAuthHeaders()
  return axios.get(
    `${BASE_URL}api/v1/quiz_attempt/${course_id}&${section_id}&${trainer_id}&${employeeID}`,
    { headers }
  )
}
const postQuizAttempt = (course_id, section_id, trainer_id, detail_input) => {
  const employeeID = getEmployeeID()
  const headers = getAuthHeaders()

  return axios.post(
    `${BASE_URL}api/v1/quiz_attempt/${course_id}&${section_id}&${trainer_id}&${employeeID}`,

    detail_input,
    { headers }
  )
}

const getEngineerEligibility = () => {
  const employeeID = getEmployeeID()
  const headers = getAuthHeaders()
  return axios.get(
    `${BASE_URL}api/v1/courses/${employeeID}`,
    { headers }
  )
}

export {
  BASE_URL,
  getAuthHeaders,
  login,
  getEmployees,
  getCourseList,
  getCourseClasses,
  addNewCourse,
  addNewCourseClass,
  addNewSection,
  addNewQuiz,
  getEmployeeID,
  getEnrolledList,
  getClassDetails,
  addSelfEnroll,
  getSelfEnroll,
  getCourseEligibleEngineers,
  addHrEnroll,
  getCourseProgress,
  getClassContent,
  getAllSelfEnrolled,
  acceptSelfEnroll,
  deleteSelfEnroll,
  deleteCourse,
  deleteCourseClass,
  deleteSection,
  deleteQuiz,
  getQuiz,
  getEmployeeRole,
  getQuizAttempt, 
  postQuizAttempt,
  getEngineerEligibility
}
