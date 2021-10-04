import React, { useReducer, useState } from 'react'
// import React from 'react'

import './SelfEnrollmentForm.css'
import CourseDescription from '../../Components/CourseDescription/CourseDescription'
import LectureHeader from '../../Assets/Lecture Header.jpeg'
import FormInput from '../../Components/FormInput/FormInput'
const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  }
}

const SelfEnrollmentForm = () => {
  const [formData, setFormData] = useReducer(formReducer, {
    eng_id: 'hello',
    course_id: 'nihao',
  })
  const [submitting, setSubmitting] = useState(false)
  // const [showButton, setButton]=useState()

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitting(true)
    // alert('You have submitted the form.')
    setTimeout(() => {
      setSubmitting(false)
    }, 3000)
  }

  const handleChange = (event) => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    })
  }
  

  return (
    <div id='pagelayout'>
      <div className='gfg'>
        <img src={LectureHeader} className='HeaderImage' />
        <div className='Overlay'>
          <h3 className='first-txt'>
            Introduction to programming (IS111)
            <div className='sub-txt'>Daniel Lim</div>
            <br />
            {submitting && (
              <div>
                Submtting Form...
                {console.log(formData)}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <FormInput
                labelName='eng_id'
                inputType='text'
                handleChange={handleChange}
                inputName='eng_id'
                // inputValue='hello'
              />
              <FormInput
                labelName='course_id'
                inputType='text'
                handleChange={handleChange}
                inputName='course_id'
                // inputValue='hello'
              />

              <button type='submit' className='btn btn-enroll' showButton >
                <b>ENROLL NOW</b>
              </button>
            </form>
          </h3>
        </div>
      </div>
      <br />
      <CourseDescription />

      <br />
    </div>
  )
}

export default SelfEnrollmentForm
