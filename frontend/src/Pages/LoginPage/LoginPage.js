import React, { useState, useReducer } from 'react'
import axios from 'axios'
import Work from '../../Assets/Work.jpeg'
import './LoginPage.css'
import Spinner from '../../Components/Spinner/Spinner'
import { login } from '../../Apis/Api'

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  }
}

const LoginPage = () => {
  // const authInput = { username: 'testuser', password: 'testpassword' }
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useReducer(formReducer, {})

  const handleChange = (event) => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    })
  }

  function handleSubmit() {
    setSubmitting(true)
    axios
    login(formData)
      .then((response) => {
        // window.location.reload(false)
        // setSubmitting(false)
        if (response.data) {
          console.log(response)
          const token = response.data.access_token
          localStorage.setItem('token', token)
          console.log(token)
          window.location.reload(false)
        } else {
          console.log(response.data)
          alert('Incorrect authentication')
        }
      })
      .catch((error) => {
        setSubmitting(false)
        alert('Incorrect authentication')
        return error
      })
  }
  return (
    <>
      {submitting ? (
        <Spinner />
      ) : (
        <>
          <div className='login-containers'>
            <img src={Work} className='login-image' />
          </div>

          <div className='login-containers' id='pagelayout'>
            <div className='white-bg shadow-box'>
              <h4>
                <b>Wonderful Group</b>
              </h4>
              <p>Welcome! Login to get started with Wonderful Group!</p>

              <label className='form-label'>Username</label>
              <input
                type='text'
                className='form-control'
                name='name'
                onChange={handleChange}
                id='loginUsername'
              />

              <label className='form-label'>Password</label>
              <input
                type='password'
                className='form-control'
                name='password'
                onChange={handleChange}
                id='loginPassword'
              />

              <button className='confirm-enroll' onClick={handleSubmit} id='loginButton'>
                Submit
              </button>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default LoginPage
