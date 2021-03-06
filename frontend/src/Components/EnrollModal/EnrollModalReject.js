import React from 'react'
import Modal from 'react-bootstrap/Modal'
import { func } from 'prop-types'
import './EnrollModal.css'
import * as Bs from 'react-icons/bs'

const EnrollModal = (props) => {
  return (
    <Modal {...props} centered>
      <div className='modal-box'>
        <h5>
          Reject Request
          <button className='closing-icon' onClick={props.onHide}>
            <Bs.BsX size={30} />
          </button>
        </h5>
        <hr />
        Are you sure you want to reject this reject?
        <button
          type='submit'
          className='confirm-enroll col'
          onClick={props.reject_request}
        >
          Yes
        </button>
      </div>
    </Modal>
  )
}
EnrollModal.propTypes = {
  onHide: func,
  reject_request: func,
}

export default EnrollModal
