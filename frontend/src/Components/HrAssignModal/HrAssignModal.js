import React, { useEffect, useState, useReducer } from 'react'
import Modal from 'react-bootstrap/Modal'
import { func, number } from 'prop-types'
import * as Bs from 'react-icons/bs'
import { getCourseEligibleEngineers, addHrEnroll } from '../../Apis/Api'

const EnrollModal = (props) => {
  const [eligibleNames, setEligibleNames] = useState()
  const [isLoading, setLoading] = useState(true)

  const formReducer = (state, event) => {
    return {
      ...state,
      [event.name]: event.value,
    }
  }
  const [formData, setFormData] = useReducer(formReducer, {})

  const handleSubmit = (event) => {
    event.preventDefault()
    addHrEnroll(props.course_id, props.trainer_id, formData.selfenroll).then((response)=>{
      console.log(response)
    })
  }

  const handleChange = (event) => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    })
  }

  console.log(formData)

  useEffect(() => {
    getCourseEligibleEngineers(props.course_id)
      .then((response) => {
        setEligibleNames(Object.values(response.data.results))
      })
      .then(() => {
        setLoading(false)
      })
  }, [])

  return (
    <>
      {!isLoading ? (
        <Modal {...props} centered size='lg'>
          <div className='modal-box'>
            <h5>
              Add Engineers
              <button className='closing-icon' onClick={props.onHide}>
                <Bs.BsX size={30} />
              </button>
            </h5>
            <hr />
            <form onSubmit={handleSubmit}>
              Please select the name of the student you want to enrol:
              <select
                className='form-select select-engineer'
                aria-label='Default select example'
                onChange={handleChange}
                name='selfenroll'
              >
                <option hidden>Select Engineers to Self-Enroll</option>

                {eligibleNames.map((eng) => (
                  <option value={eng.id} key={eng.id}>
                    {eng.name}
                  </option>
                ))}
              </select>
              <button
                type='submit'
                className='confirm-enroll col'
                onClick={props.submit}

                  
              >
                Submit
              </button>
            </form>
          </div>
        </Modal>
      ) : (
        <div></div>
      )}
    </>
  )
}
EnrollModal.propTypes = {
  onHide: func,
  course_id: number,
  trainer_id: number,
  submit: func,
}

export default EnrollModal
