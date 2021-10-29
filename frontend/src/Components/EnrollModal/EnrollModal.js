import React from 'react'
import Modal from 'react-bootstrap/Modal'
import { func, string, number } from 'prop-types'
import './EnrollModal.css'
import * as Bs from 'react-icons/bs'

const EnrollModal = (props) => {
  return (
    <Modal {...props} centered>
      <div className='modal-box'>
        <h5>
          Confirm Request
          <button className='closing-icon' onClick={props.onHide}>
            <Bs.BsX size={30} />
          </button>
        </h5>
        <hr />
        Are you sure you want to enroll <b>{props.eng_name}</b> into{' '}
        <b>{props.course_name}</b>?
        <button
          type='submit'
          className='confirm-enroll'
          onClick={props.accept_request}
        >
          Yes
        </button>
      </div>
    </Modal>
  )
}
EnrollModal.propTypes = {
  onHide: func,
  eng_name: string,
  course_name: string,
  course_id: number,
  accept_request: func,
}

export default EnrollModal
