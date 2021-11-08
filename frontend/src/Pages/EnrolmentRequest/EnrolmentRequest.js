import React, { useEffect, useState } from 'react'
import './EnrolmentRequest.css'
import * as Bs from 'react-icons/bs'
import EnrollModal from '../../Components/EnrollModal/EnrollModal'
import EnrollModalReject from '../../Components/EnrollModal/EnrollModalReject'
import Spinner from '../../Components/Spinner/Spinner'
import Empty from '../../Components/Empty/Empty'
import {
  getAllSelfEnrolled,
  acceptSelfEnroll,
  deleteSelfEnroll,
  getClassDetails,
} from '../../Apis/Api'

const HrEnroll = () => {
  const [allEnrollRequest, setAllEnrollRequest] = useState([])

  const [modalShow, setModalShow] = React.useState(false)
  const [rejectModalShow, setRejectModalShow] = React.useState(false)
  const [ModalEngId, setModalEngId] = useState('')
  const [ModalEngName, setModalEngName] = useState('')
  const [modalCourseId, setModalCourseId] = useState('')
  const [modalCourseName, setModalCourseName] = useState('')
  const [modalTrainerId, setModalTrainerId] = useState('')
  const [slotsAvailable, setSlotsAvailable] = useState('')
  const [endDate, setEndDate] = useState('')
  const [startDate, setStartDate] = useState('')

  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    getAllSelfEnrolled()
      .then((response) => {
        setAllEnrollRequest(response.data.results)
      })
      .then(() => {
        setLoading(false)
      })
  }, [])

  useEffect(async () => {
    let i = 0
    let all_slots = []
    let all_start_date = []
    let all_end_date = []


    // for await(let num of allEnrollRequest){
    //   const response= await getClassDetails(
    //     num.course.course_id,
    //     num.trainer.id
    //   )
    //   all_slots.push(response.data.num_slots_remaining)
    //   console.log(response.data.course_class.start_date)


    // }

    for (i; i < allEnrollRequest.length; i++) {
      const response = await getClassDetails(
        allEnrollRequest[i].course.course_id,
        allEnrollRequest[i].trainer.id
      )

      all_slots.push(response.data.num_slots_remaining)

      console.log(response.data.course_class.start_date)
   
      all_start_date.push(response.data.course_class.start_date.slice(0, 10))
      all_end_date.push(response.data.course_class.end_date.slice(0, 10))
    }

    setEndDate(all_end_date)
    setStartDate(all_start_date)
    setSlotsAvailable(all_slots)


  })

  return (
    <div id='pagelayout'>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className='white-bg'>
            <h5 id='title'>Enrolment Request</h5>

            {allEnrollRequest.length == 0 ? (
              <Empty text='You do not have any enrolment request' />
            ) : (
              <>
                {allEnrollRequest.map((data, i) => {
                  return (
                    <>
                      <div className='row content-row' key={i}>
                        <div className='col'>
                          <div className='header-row'>Timestamp</div>
                          {new Date(data.created_timestamp * 1000)
                            .toString()
                            .slice(0, 25)}
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
                          {startDate[i]}
                        </div>
                        <div className='col'>
                          <div className='header-row'>End Date</div>
                          {endDate[i]}
                        </div>
                        <div className='col'>
                          <div className='header-row'>Slots Available</div>
                          {slotsAvailable[i]}
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
                              setModalEngId(data.eng.id)
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
                              setModalEngId(data.eng.id)
                            }}
                          >
                            <Bs.BsX size={20} />
                          </button>
                        </div>
                      </div>
                    </>
                  )
                })}
              </>
            )}
          </div>

          <EnrollModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            eng_name={ModalEngName}
            course_id={modalCourseId}
            course_name={modalCourseName}
            accept_request={() => {
              acceptSelfEnroll(ModalEngId, modalCourseId, modalTrainerId).then(
                (response) => {
                  console.log(response)
                  setModalShow(false)
                  window.location.reload(false)
                }
              )
            }}
          />
          <EnrollModalReject
            show={rejectModalShow}
            onHide={() => setRejectModalShow(false)}
            reject_request={() => {
              deleteSelfEnroll(ModalEngId, modalCourseId, modalTrainerId).then(
                (response) => {
                  console.log(response)
                  setRejectModalShow(false)
                  window.location.reload(false)
                }
              )
            }}
          />
        </>
      )}
    </div>
  )
}

export default HrEnroll
