import React, { useEffect, useState } from 'react'
import './EnrolmentRequest.css'
import * as Bs from 'react-icons/bs'
import EnrollModal from '../../Components/EnrollModal/EnrollModal'
import EnrollModalReject from '../../Components/EnrollModal/EnrollModalReject'
import Spinner from '../../Components/Spinner/Spinner'
import {
  getAllSelfEnrolled,
  acceptSelfEnroll,
  deleteSelfEnroll,
} from '../../Apis/Api'

const HrEnroll = () => {
  const [allEnrollRequest, setAllEnrollRequest] = useState([])

  const [modalShow, setModalShow] = React.useState(false)
  const [rejectModalShow, setRejectModalShow] = React.useState(false)
  // const[modalName, setModalName]=React.useState(false)

  const [ModalEngName, setModalEngName] = useState('')
  const [modalCourseId, setModalCourseId] = useState('')
  const [modalCourseName, setModalCourseName] = useState('')
  const [modalTrainerId, setModalTrainerId] = useState('')
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    getAllSelfEnrolled()
      .then((response) => {
        console.log(response.data.results)
        setAllEnrollRequest(response.data.results)
      })
      .then(() => {
        setLoading(false)
      })
  }, [])






  return (
    <div id='pagelayout'>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className='white-bg'>
            <h5>Enrolment Request</h5>

            {allEnrollRequest.map((data) => (
              <>
                <div className='row content-row'>
                  <div className='col'>
                    <div className='header-row'>Timestamp</div>1 Jan 2021 6:00
                  </div>
                  <div className='col'>
                    <div className='header-row'>Engineer Name</div>
                    {data.eng.name}
                  </div>
                  <div className='col'>
                    <div className='header-row'>Course Name</div>
                    {data.course.name}
                  </div>
                  <div className='col'>
                    <div className='header-row'>Trainer Name</div>
                    {data.trainer.name}
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
                    <div className='header-row'>Slots Available</div>3 Left
                  </div>
                  <div className='col'>
                    <div className='header-row action'>Action</div>
                    <button
                      className='check'
                      onClick={() => {
                        setModalEngName(data.eng.name)
                        setModalCourseId(data.course.course_id)
                        setModalCourseName(data.course.name)
                        setModalTrainerId(data.trainer.id)
                        setModalShow(true)
                      }}
                    >
                      <Bs.BsCheck size={20} />
                    </button>

                    <button
                      className='cross'
                      onClick={() => {
                        setModalCourseId(data.course.course_id)
                        setModalTrainerId(data.trainer.id)
                        setRejectModalShow(true)
                      }}
                    >
                      <Bs.BsX size={20} />
                    </button>
                  </div>
                </div>
              </>
            ))}
          </div>

          <EnrollModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            eng_name={ModalEngName}
            course_id={modalCourseId}
            course_name={modalCourseName}
            accept_request={() => {
              acceptSelfEnroll(modalCourseId, modalTrainerId)
              setModalShow(false)
              window.location.reload(false)
            }}
          />
          <EnrollModalReject
            show={rejectModalShow}
            onHide={() => setRejectModalShow(false)}
            reject_request={() => {
              deleteSelfEnroll(modalCourseId, modalTrainerId)
              setRejectModalShow(false)
              window.location.reload(false)
            }}
          />
        </>
      )}
    </div>
  )
}

export default HrEnroll
