import axios from 'axios'
// const BASE_URL = 'http://spmg9.herokuapp.com/'
const BASE_URL = 'http://localhost:5000/'

const getAuthHeaders = () => {
    if (localStorage.getItem('token') === null) {
        throw new Error('token not in')
    }
    const headers = {
        'content-type': 'application/json',
        'authorization': 'Bearer ' + localStorage.getItem('token')
    }
    return headers
}

const login = (data) => axios.post(`${BASE_URL}auth/login`, data)
const addNewSection = async ({ course_id, section_name, materials, trainer_id }) => {
    const headers = getAuthHeaders()
    return await axios.post(`${BASE_URL}api/v1/class_section/0`, {
        course_id, section_name, materials, trainer_id
    }, {headers})
}
const addNewQuiz = async ({ course_id, section_id, trainer_id, is_graded }) => {
    const headers = getAuthHeaders()
    return await axios.post(`${BASE_URL}api/v1/quiz/0`, {
        course_id, section_id, trainer_id, is_graded
    }, {headers})
}

export {
    login,
    addNewSection,
    addNewQuiz,
}