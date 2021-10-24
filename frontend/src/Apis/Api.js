import axios from 'axios'
import jwt from 'jwt-decode'
// const BASE_URL = 'http://spmg9.herokuapp.com/'
const BASE_URL = 'http://localhost:5000/'

const getAuthHeaders = () => {
    let token = localStorage.getItem('token')
    if (token === null) {
        throw new Error('token not in')
    }
    const headers = {
        'content-type': 'application/json',
        'authorization': 'Bearer ' + token
    }
    return headers
}

const getEmployeeID = () => {
    let token = localStorage.getItem('token')
    const employeeID= jwt(token).sub
    console.log(employeeID)
    return employeeID
}
    

const login = (data) => axios.post(`${BASE_URL}auth/login`, data)

const getCourseList = () => {
    const headers = getAuthHeaders();
    return axios.get(`${BASE_URL}api/v1/courses/1`, {headers});
}

const addNewCourse = ({ course_id, name, description, prereqs }) => {
    const headers = getAuthHeaders();
    return axios.post(`${BASE_URL}api/v1/course/3`, {
        course_id, name, description, prereqs
    }, {headers});
}
const addNewSection = ({ course_id, section_name, materials, trainer_id }) => {
    const headers = getAuthHeaders();
    return axios.post(`${BASE_URL}api/v1/class_section/0`, {
        course_id, section_name, materials, trainer_id
    }, {headers});
}
const addNewQuiz = ({ course_id, section_id, trainer_id, is_graded }) => {
    const headers = getAuthHeaders();
    return axios.post(`${BASE_URL}api/v1/quiz/0`, {
        course_id, section_id, trainer_id, is_graded
    }, {headers});
}

const getEnrolledList = () => {
    const headers = getAuthHeaders();
    const employeeID=getEmployeeID()
    // console.log( axios.get(`${BASE_URL}api/v1/enrollments/${employeeID}`, {headers}))
    return axios.get(`${BASE_URL}api/v1/enrollments/${employeeID}`, {headers});
}

const getClassDetails = (course_id, trainer_id) => {
    const headers = getAuthHeaders();
    // console.log( axios.get(`${BASE_URL}api/v1/enrollments/${employeeID}`, {headers}))
    return axios.get(`${BASE_URL}api/v1/course_class/${course_id}&${trainer_id}`, {headers});
}



export {
    login,
    getCourseList,
    addNewCourse,
    addNewSection,
    addNewQuiz,
    getEmployeeID,
    getEnrolledList,
    getClassDetails
}