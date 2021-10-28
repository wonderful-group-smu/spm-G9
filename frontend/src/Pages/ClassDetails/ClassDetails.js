import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import LectureHeader from '../../Assets/Lecture Header.jpeg'
import * as Bs from 'react-icons/bs'
import * as Fi from 'react-icons/fi'
import * as Cg from 'react-icons/cg'
import ProfileImage from '../../Assets/Profile Image.jpg'
import './ClassDetails.css'
import ClassList from '../../Components/ClassList/ClassList'
import GeneralModal from '../../Components/GeneralModal/GeneralModal'
import SectionFlow from '../../Components/SectionFlow/SectionFlow'
import { addSelfEnroll, getSelfEnroll } from '../../Apis/Api'

const ClassDetails = () => {
  const location = useLocation()
  const { courseClass } = location.state
  const [DetailButton, setDetailButton] = useState('top-bar-selected')
  const [NamelistButton, setNamelistButton] = useState('top-bar')
  const [disableButton, setDisableButton] = useState([
    false,
    'fitted-button button-padding',
    'ENROLL NOW',
  ])

  const showDetailButton = () => {
    if (DetailButton == 'top-bar') {
      setDetailButton('top-bar-selected')
      setNamelistButton('top-bar')
    }
  }
  const showNamelistButton = () => {
    if (NamelistButton == 'top-bar') {
      setDetailButton('top-bar')
      setNamelistButton('top-bar-selected')
    }
  }

  // useEffect(async () => {
  //   let response = await getSelfEnroll(
  //     courseClass.course.course_id,
  //     courseClass.trainer.id
  //   )
  //   if (response.data.msg == 'enrollment record retrieved') {
  //     setDisableButton([
  //       true,
  //       'fitted-button button-padding button_masked',
  //       'APPLIED/ENROLLED',
  //     ])
  //   }
  // }, [])

  
  useEffect(() => {
    getSelfEnroll(courseClass.course.course_id, courseClass.trainer.id).then(
      (response) => {
        if (response.data.msg == 'enrollment record retrieved') {
          setDisableButton([
            true,
            'fitted-button button-padding button_masked',
            'APPLIED/ENROLLED',
          ])
        }
      }
    )
  }, [])

  const role = 'engineer'
  const [confirmSubmission, setConfirmSubmission] = React.useState(false)
  function submitSelfEnroll(course_id, trainer_id) {
    console.log('hi')
    addSelfEnroll(course_id, trainer_id)
    setDisableButton([
      true,
      'fitted-button button-padding button_masked',
      'APPLIED/ENROLLED',
    ])
    setConfirmSubmission(true)
  }

  return (
    <div id='pagelayout'>
      <div className='gfg'>
        <img src={LectureHeader} className='HeaderImage' />
        <div className='Overlay'>
          <div className='first-txt'>
            <h3>{courseClass.course.name}</h3>
            <div className='sub-txt'>Application closes on 1 January 2021</div>

            <div className={role != 'engineer' ? 'hidebutton' : ''}>
              <button
                disabled={disableButton[0]}
                className={disableButton[1]}
                onClick={() => {
                  submitSelfEnroll(
                    courseClass.course.course_id,
                    courseClass.trainer.id
                  )
                }}
              >
                {disableButton[2]}
              </button>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div>
        <button
          type='submit'
          className={DetailButton}
          onClick={showDetailButton}
        >
          Details
        </button>
        <button
          type='submit'
          className={NamelistButton}
          onClick={showNamelistButton}
        >
          Students Namelist
        </button>
      </div>
      {DetailButton == 'top-bar-selected' ? (
        <div className='flex-boxx'>
          <div className='white-bg class-detail'>
            <h4>Class Details</h4>
            <hr />
            <div className='row'>
              <div className='col'>
                <b>
                  <Fi.FiCalendar /> Start
                </b>
              </div>
              <div className='col'>
                <b>
                  <Fi.FiCalendar /> End
                </b>
              </div>

              <div className='col'>
                <b>
                  <Bs.BsPeopleCircle />
                  &nbsp; Class Size
                </b>
              </div>
            </div>

            <div className='row'>
              <div className='col'>{courseClass.start_date.slice(0, 10)}</div>
              <div className='col'>{courseClass.end_date.slice(0, 10)}</div>
              <div className='col'>{courseClass.class_size}</div>
            </div>
            <br />
          </div>
          <div style={{ paddingLeft: '1rem' }}></div>

          <div className='white-bg profile-block'>
            <h4> Our Trainer </h4>
            <hr />
            <div className='row'>
              <div className='col'>
                <img src={ProfileImage} className='profile-image shadow' />
              </div>
              <div className='col'>
                <h6>{courseClass.trainer.name}</h6>
                <div>
                  <i>Senior Engineer</i>
                </div>
                <div>
                  <i>{courseClass.trainer.name}@wonderful.com</i>
                </div>
              </div>
            </div>
          </div>

          <div className='white-bg sections-block'>
            <div className='sections-title'>
              <h4> Sections </h4>
              <Link to='/createsection'>
                <button type='button' className='btn-sm btn-secondary'>
                  <Cg.CgMathPlus className='plus-icon' />
                  Add a Section
                </button>
              </Link>
            </div>
            <hr />
            <SectionFlow />
          </div>
        </div>
      ) : (
        <ClassList
          course_id={courseClass.course.course_id}
          trainer_id={courseClass.trainer.id}
        />
      )}

      <br />
      <GeneralModal
        show={confirmSubmission}
        onHide={() => setConfirmSubmission(false)}
        modal_title='Self-Enrollment Request Received'
        modal_content='Thank you for signing up for the course. We are reviewing your request and will get back to you ASAP!'
        button_content='Ok'
        button_action={() => setConfirmSubmission(false)}
      />
    </div>
  )
}

export default ClassDetails
