import axios from 'axios'
const BASE_URL = 'http://spmg9.herokuapp.com/'

const login = (data) => axios.post(`${BASE_URL}auth/login`, data)

export {
    login
}