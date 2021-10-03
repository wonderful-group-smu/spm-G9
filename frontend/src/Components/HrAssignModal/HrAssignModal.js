import React from 'react'
import Modal from 'react-bootstrap/Modal'
import { func } from 'prop-types'
import * as Bs from 'react-icons/bs'

const EnrollModal = (props) => {
  return (
    <Modal {...props} centered size='lg'>
      <div className='modal-box'>
        <h5>
          Add Engineers
          <button className='closing-icon' onClick={props.onHide}>
            <Bs.BsX size={30} />
          </button>
        </h5>
        <hr />
        Please select the name of the student you want to enrol:
    
        <select className='form-select select-engineer' aria-label='Default select example'>
          <option  disabled selected hidden>Open this select menu</option>
          <option value='1'>One</option>
          <option value='2'>Two</option>
          <option value='3'>Three</option>
        </select>
        <button
          type='submit'
          className='confirm-enroll col'
          onClick={props.onHide}
        >
          Submit
        </button>
      </div>
    </Modal>
  )
}
EnrollModal.propTypes = {
  onHide: func,
}

export default EnrollModal
