import React, { useEffect, useState } from 'react'
import './EnrolmentRequest.css'
import * as Bs from 'react-icons/bs'
import axios from 'axios'
import EnrollModal from '../../Components/EnrollModal/EnrollModal'
import EnrollModalReject from '../../Components/EnrollModal/EnrollModalReject'
// import { getEmployeeID } from '../../Apis/Api'


const HrEnroll = () => {
  const [allEnrollRequest, setAllEnrollRequest] = useState([
    { name: 'hello', id: '444' },
    { name: 'hello', id: '444' },
  ])

  const [modalShow, setModalShow] = React.useState(false)
  const [rejectModalShow, setRejectModalShow] = React.useState(false)
  // const[modalName, setModalName]=React.useState(false)

  const [ModalEngId, setModalEngId] = useState('')
  const [modalCourseId, setModalCourseId] = useState('')
  const [modalTrainerId, setModalTrainerId] = useState('')

  console.log(modalTrainerId)

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






  return (
    <div id='pagelayout'>
     
      <div className='white-bg'>
      <h5>Enrolment Request</h5>

        <div className='row content-row'>
          <div className='col'>
            <div className='header-row'>Timestamp</div>1 Jan 2021 6:00
          </div>
          <div className='col'>
            <div className='header-row'>Engineer ID</div>
            E4567
          </div>
          <div className='col'>
            <div className='header-row'>Course ID</div>
            IS211
          </div>
          <div className='col'>
            <div className='header-row'>Trainer ID</div>
            T2519
          </div>
          <div className='col'>
            <div className='header-row'>Start Date</div>
            23 Mar 2022
          </div>
          <div className='col'>
            <div className='header-row'>End Date</div>
            30 Mar 2022
          </div>
          <div className='col'>
          <div className='header-row'>Slots Available</div>
          3 Left</div>
          <div className='col'>
          <div className='header-row action'>Action</div>
            <button
              className='check'
              onClick={() => {
                setModalEngId('E4567')
                setModalCourseId('IS211')
                setModalTrainerId('T2519')
                setModalShow(true)
              }}
            >
              <Bs.BsCheck size={20} />
            </button>

            <button
              className='cross'
              onClick={() => {
                setRejectModalShow(true)
              }}
            >
              <Bs.BsX size={20} />
            </button>
          </div>
        </div>

        <div className='row content-row'>
          <div className='col'>
            <div className='header-row'>Timestamp</div>1 Jan 2021 6:00
          </div>
          <div className='col'>
            <div className='header-row'>Engineer ID</div>
            E4567
          </div>
          <div className='col'>
            <div className='header-row'>Course ID</div>
            IS211
          </div>
          <div className='col'>
            <div className='header-row'>Trainer ID</div>
            T2519
          </div>
          <div className='col'>
            <div className='header-row'>Start Date</div>
            23 Mar 2022
          </div>
          <div className='col'>
            <div className='header-row'>End Date</div>
            30 Mar 2022
          </div>
          <div className='col'>
          <div className='header-row'>Slots Available</div>
          3 Left</div>
          <div className='col'>
          <div className='header-row action'>Action</div>
            <button
              className='check'
              onClick={() => {
                setModalEngId('E4567')
                setModalCourseId('IS211')
                setModalTrainerId('T2519')
                setModalShow(true)
              }}
            >
              <Bs.BsCheck size={20} />
            </button>

            <button
              className='cross'
              onClick={() => {
                setRejectModalShow(true)
              }}
            >
              <Bs.BsX size={20} />
            </button>
          </div>
        </div>

        <div className='row content-row'>
          <div className='col'>
            <div className='header-row'>Timestamp</div>1 Jan 2021 6:00
          </div>
          <div className='col'>
            <div className='header-row'>Engineer ID</div>
            E4567
          </div>
          <div className='col'>
            <div className='header-row'>Course ID</div>
            IS211
          </div>
          <div className='col'>
            <div className='header-row'>Trainer ID</div>
            T2519
          </div>
          <div className='col'>
            <div className='header-row'>Start Date</div>
            23 Mar 2022
          </div>
          <div className='col'>
            <div className='header-row'>End Date</div>
            30 Mar 2022
          </div>
          <div className='col col'>
          <div className='header-row'>Slots Available</div>
          3 Left</div>
          <div className='col'>
          <div className='header-row action'>Action</div>
            <button
              className='check'
              onClick={() => {
                setModalEngId('E4567')
                setModalCourseId('IS211')
                setModalTrainerId('T2519')
                setModalShow(true)
              }}
            >
              <Bs.BsCheck size={20} />
            </button>

            <button
              className='cross'
              onClick={() => {
                setRejectModalShow(true)
              }}
            >
              <Bs.BsX size={20} />
            </button>
          </div>
        </div>


      </div>

      {/* {allEnrollRequest.map((item, i) => (
         <div>{item}{i}</div>
))} */}

      <EnrollModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        eng_id={ModalEngId}
        course_id={modalCourseId}
      />
      <EnrollModalReject
        show={rejectModalShow}
        onHide={() => setRejectModalShow(false)}
      />
    </div>
  )
}

export default HrEnroll
