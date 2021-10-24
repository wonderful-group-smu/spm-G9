import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import LectureHeader from '../../Assets/Lecture Header.jpeg'
// import * as Bs from 'react-icons/bs'
import * as Fi from 'react-icons/fi'
import * as Cg from 'react-icons/cg'
// import ProfileImage from '../../Assets/Profile Image.jpg'
import './ClassDetails.css'
import ClassList from '../../Components/ClassList/ClassList'
import SectionFlow from '../../Components/SectionFlow/SectionFlow'
import { getClassDetails } from '../../Apis/Api'
import Spinner from '../../Components/Spinner/Spinner'

const ClassDetails = () => {
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    getClassDetails(2, 2)
      .then((response) => {
        setClassDetails(response.data)
      })
      .then(() => {
        setLoading(false)
      })
  }, [])

  const [classDetails, setClassDetails] = useState()

  const [DetailButton, setDetailButton] = useState('top-bar-selected')
  const [NamelistButton, setNamelistButton] = useState('top-bar')

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

  return (
    <div id='pagelayout'>
      {isLoading ? (
        <Spinner/>
      ) : (
        <>
          <div className='gfg'>
            <img src={LectureHeader} className='HeaderImage' />
            <div className='Overlay'>
              <h3 className='first-txt'>
                {classDetails.course_class.course.name}
                <div className='sub-txt'>
                  Application closes on 1 January 2021
                </div>
              </h3>
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



                  {/* <div className='col'>
                    <b>
                      <Bs.BsPeopleCircle />
                      &nbsp; Slots Available
                    </b>
                  </div> */}

                </div>

                {/* <div className='row'>
                  <div className='col'>
                    {classDetails.course_class.start_date.slice(0, 10)}
                  </div>
                  <div className='col'>
                    {classDetails.course_class.end_date.slice(0, 10)}
                  </div>
                  <div className='col'>{classDetails.num_slots_remaining}</div>
                </div> */}
                <br />
              </div>
              {/* <div style={{ paddingLeft: '1rem' }}></div> */}

              {/* <div className='white-bg profile-block'>
                <h4> Our Trainer </h4>
                <hr />
                <div className='row'>
                  <div className='col'>
                    <img src={ProfileImage} className='profile-image shadow' />
                  </div>
                  <div className='col'>
                    <h6>{classDetails.course_class.trainer.name}</h6>
                    <div>
                      <i>Senior Engineer</i>
                    </div>
                    <div>
                      <i>
                        {classDetails.course_class.trainer.name}@wonderful.com
                      </i>
                    </div>
                  </div>
                </div>
              </div> */}


              

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
          ) : 
          
          
          
          
          (
            <ClassList />
          )}











          <br />
        </>
      )}
    </div>
  )
}

export default ClassDetails
