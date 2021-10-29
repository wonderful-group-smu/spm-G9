import React from 'react'
import Modal from 'react-bootstrap/Modal'
import { func, number, string } from 'prop-types'
import * as Bs from 'react-icons/bs'


const ContentModal = (props) => {
  return (
    <Modal size='lg' {...props} centered>
      <div className='modal-box'>
        <h5>
          Session {props.sessionNumber}
          <button className='closing-icon' onClick={props.onHide}>
            <Bs.BsX size={30} />
          </button>
        </h5>
        <hr />
        {props.sessionContent}
        <button
          type='submit'
          className='confirm-enroll col'
          onClick={props.onHide}
        >
          Close
        </button>
      </div>
    </Modal>
  )
}
ContentModal.propTypes = {
  onHide: func,
  sessionNumber: number,
  sessionContent: string,
}

export default ContentModal
