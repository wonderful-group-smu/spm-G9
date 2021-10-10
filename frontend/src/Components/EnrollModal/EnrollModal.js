import React from 'react'
import Modal from 'react-bootstrap/Modal'
import { func, string } from 'prop-types'
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
          Are you sure you want to enroll Engineer ID <b>{props.eng_id}</b> into Course <b>{props.course_id}</b>?

          <button type='submit' className='confirm-enroll' 
          onClick={props.onHide}>
          Yes
        </button>
        
      </div>
    </Modal>
  )
}
EnrollModal.propTypes = {
  onHide: func,
  eng_id:string,
  course_id: string
}

export default EnrollModal
