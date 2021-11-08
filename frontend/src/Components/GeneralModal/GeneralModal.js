import React from 'react'
import Modal from 'react-bootstrap/Modal'
import { func, string } from 'prop-types'
import '../EnrollModal/EnrollModal.css'
import * as Bs from 'react-icons/bs'

const GeneralModal = (props) => {
  return (
    <Modal {...props} centered>
      <div className='modal-box'>
        <h5 id={props.modal_title}>
          {props.modal_title}
          <button className='closing-icon' onClick={props.onHide}>
            <Bs.BsX size={30} />
          </button>
        </h5>
        <hr />
        {props.modal_content}
        <button
          type='submit'
          className='confirm-enroll col'
          onClick={props.button_action}
          id={props.modal_title}
        >
          {props.button_content}
        </button>
      </div>
    </Modal>
  )
}
GeneralModal.propTypes = {
  onHide: func,
  modal_content: string,
  modal_title: string,
  button_content: string,
  button_action: func,
}

export default GeneralModal
