import React, { useReducer, useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import { func, string } from 'prop-types'
import './EnrollModal.css'
import * as Bs from 'react-icons/bs'

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  }
}
const EnrollModal = (props) => {
  const [formData, setFormData] = useReducer(formReducer, {
    name: props.name,
    course: props.course,
  })

  const [submitting, setSubmitting] = useState(false)
  const handleSubmit = (event) => {
    event.preventDefault()
    if (Object.keys(formData).length < 4) {
      alert('Not filled')
    } else {
      // console.log(Object.keys(formData))
      setSubmitting(true)
      setTimeout(() => {
        setSubmitting(false)
      }, 3000)
    }
  }

  const handleChange = (event) => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    })
  }

  useEffect(() => {
    setFormData({
      name: 'name',
      value: props.name,
    })
    setFormData({
      name: 'course',
      value: props.course,
    })
  }, [props.name, props.course])

  console.log(formData)
  return (
    <Modal  size='lg' centered>
      <div className='modal-box'>
        <h5>
          Course Validity Period{' '}
          <button className='closing-icon' onClick={props.onHide}>
            <Bs.BsX size={30} />
          </button>
        </h5>
        <hr />

        {submitting ? (
          <div>
            <div>Submtting Form...</div>
            You are submitting the following:
            <ul>
              {Object.entries(formData).map(([name, value]) => (
                <li key={name}>
                  <strong>{name}</strong>:{value.toString()}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className='row'>
              <div className='col-2'>Name</div>
              <input
                type='text'
                className='form-control col'
                value={props.name}
                disabled
              />
            </div>
            <br />

            <div className='row'>
              <div className='col-2'>Course</div>
              <input
                type='text'
                className='form-control col'
                value={props.course}
                disabled
              />
            </div>

            <div style={{ paddingTop: '1rem' }}></div>

            <div className='row'>
              <div className='col'>Start Date</div>
              <div className='col'>End Date</div>
            </div>

            <div className='row'>
              <input
                type='date'
                className='form-control col'
                placeholder='Start Date'
                onChange={handleChange}
                name='startDate'
              />
              &nbsp; &nbsp; &nbsp;
              <input
                type='date'
                className='form-control col'
                placeholder='Start Date'
                onChange={handleChange}
                name='endDate'
              />
            </div>

            <button type='submit' className='confirm-enroll'>
              Submit
            </button>
          </form>
        )}
      </div>
    </Modal>
  )
}
EnrollModal.propTypes = {
  onHide: func,
  name: string,
  course: string,
}

export default EnrollModal
