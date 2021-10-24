import axios from 'axios'
// const BASE_URL = 'http://spmg9.herokuapp.com/'
const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000/'

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

const login = (data) => axios.post(`${BASE_URL}auth/login`, data)
const getCourseList = () => {
    const headers = getAuthHeaders();
    return axios.get(`${BASE_URL}api/v1/courses/0`, {headers});
}
const getCourseClasses = ({ course_id }) => {
    const headers = getAuthHeaders();
    return axios.get(`${BASE_URL}api/v1/course_classes/` + course_id, {headers})
}
// const getClassSections = ({ course_id, trainer_id }) => {
//     const headers = getAuthHeaders();
//     return axios.get(`${BASE_URL}api/v1/class_section/0`, {
//         course_id, trainer_id
//     }, {headers})
// }

const addNewCourse = ({ course_id, name, description, prereqs }) => {
    const headers = getAuthHeaders();
    return axios.post(`${BASE_URL}api/v1/course/` + course_id, {
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

export {
    login,
    getCourseList,
    getCourseClasses,
    // getClassSections,
    addNewCourse,
    addNewSection,
    addNewQuiz,
}