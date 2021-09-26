import React, { useEffect, useState } from 'react'
import './EnrolmentRequest.css'
import * as Bs from 'react-icons/bs'
import axios from 'axios'
import EnrollModal from '../../Components/EnrollModal/EnrollModal'
import EnrollModalReject from '../../Components/EnrollModal/EnrollModalReject'

const HrEnroll = () => {
  const [allEnrollRequest, setAllEnrollRequest] = useState([
    { name: 'hello', id: '444' },
    { name: 'hello', id: '444' },
  ])

  const [modalShow, setModalShow] = React.useState(false)
  const [rejectModalShow, setRejectModalShow] = React.useState(false)
  // const[modalName, setModalName]=React.useState(false)

  const[modalName, setModalName]= useState('')
  const[modalCourse, setModalCourse]= useState('')

  // setModalName('hello')
  // console.log(modalName)
 
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/v1/employees', {
        // headers: { Authorization: `Bearer ${token}` },
        headers: {
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYzMjQ2NTU3NywianRpIjoiMGNhZjc4MTMtYjk2ZC00MmU1LTkxYWItZjZjNTgzMmEzYmU3IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6MSwibmJmIjoxNjMyNDY1NTc3LCJleHAiOjE2MzI0NjY0Nzd9.ziP51WpLd_6a-kOWiBhXLSY7MX020oSyrgSJhGAzJ_s`,
        },
      })
      .then((response) => {
        setAllEnrollRequest(response)
      })
  }, [])
  console.log(allEnrollRequest)
  console.log(modalName)

  return (
    <div id='pagelayout'>
      <h5>Enrolment Request</h5>
      <div className='white-bg'>
        <div className='row header-row'>
          <div className='col-1'>No.</div>
          <div className='col-3'>Name</div>
          <div className='col-3'>Course ID</div>
          <div className='col-2'>Status</div>
          <div className='col-3'></div>
        </div>

        <div className='row content-row'>
          <div className='col-1'>1</div>
          <div className='col-3'>Elvin Chua</div>
          <div className='col-3'>IS211</div>
          <div className='col-2'>
            <span className='badge status-pill'>Pending</span>
          </div>
          <div className='col-3'>
            <button className='check' onClick={() => {
            setModalName('hello');
            setModalCourse('IS333');
            setModalShow(true);}
            }>
              <Bs.BsCheck size={20} />
            </button>

            <button className='cross' onClick={() => {
           
            setRejectModalShow(true);}
            }>
              <Bs.BsX size={20} />
            </button>
          </div>
        </div>
        <div className='row content-row'>
          <div className='col-1'>2</div>
          <div className='col-3'>Sam Ng</div>
          <div className='col-3'>QF124</div>
          <div className='col-2'>
            <span className='badge status-pill'>Pending</span>
          </div>
          <div className='col-3'>
            <span className='check'>
              {' '}
              <Bs.BsCheck size={20} />
            </span>
            <span className='cross'>
              <Bs.BsX size={20} />
            </span>
          </div>
        </div>
      </div>

      {/* {allEnrollRequest.map((item, i) => (
         <div>{item}{i}</div>
))} */}

      <EnrollModal show={modalShow} onHide={() => setModalShow(false)} name={modalName} course={modalCourse} />
      <EnrollModalReject show={rejectModalShow} onHide={() => setRejectModalShow(false)}/>

    </div>
  )
}

// HrEnroll.propTypes={
//   onHide: any
// }

export default HrEnroll
