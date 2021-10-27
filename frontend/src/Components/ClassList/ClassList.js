import React, { useState } from 'react'
import './ClassList.css'
import * as Md from 'react-icons/md'
import * as Bs from 'react-icons/bs'
import HrAssignModal from '../HrAssignModal/HrAssignModal'
import { number } from 'prop-types'

const ClassList = (props) => {
  //   const [modalShow, setModalShow] = useState(false)
  const [modalShow, setModalShow] = useState(false)

  return (
    <>
      <div style={{ textAlign: 'right' }}>
        <button className='add-engineer' onClick={() => setModalShow(true)}>
          <Md.MdAdd size={20} /> ADD ENGINEERS
        </button>
      </div>

      <div className='white-bg'>
        <div className='row header-row-class'>
          <div className='col'>Engineer ID</div>
          <div className='col'>Name</div>
          <div className='col'>Email</div>
          <div className='col'></div>
        </div>

        <div className='row content-row'>
          <div className='col'>E24567</div>
          <div className='col'>Lia Kim</div>
          <div className='col'>lia.kim@gmail.com</div>
          <div className='col cross-side'>
            <button className='cross'>
              <Bs.BsX size={20} />
            </button>
          </div>
        </div>

        <div className='row content-row'>
          <div className='col'>E24567</div>
          <div className='col'>Lia Kim</div>
          <div className='col'>lia.kim@gmail.com</div>
          <div className='col cross-side'>
            <button className='cross'>
              <Bs.BsX size={20} />
            </button>
          </div>
        </div>
        <div className='row content-row'>
          <div className='col'>E24567</div>
          <div className='col'>Lia Kim</div>
          <div className='col'>lia.kim@gmail.com</div>
          <div className='col cross-side'>
            <button className='cross'>
              <Bs.BsX size={20} />
            </button>
          </div>
        </div>
        <div className='row content-row'>
          <div className='col'>E24567</div>
          <div className='col'>Lia Kim</div>
          <div className='col'>lia.kim@gmail.com</div>
          <div className='col cross-side'>
            <button className='cross'>
              <Bs.BsX size={20} />
            </button>
          </div>
        </div>
      </div>

      <HrAssignModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        course_id={props.course_id}
        trainer_id={props.trainer_id}
      />
    </>
  )
}

ClassList.propTypes = {
  course_id: number,
  trainer_id: number,
}

export default ClassList
