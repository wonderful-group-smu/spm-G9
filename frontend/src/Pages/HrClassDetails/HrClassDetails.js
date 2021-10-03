import React, { useState } from 'react'
import LectureHeader from '../../Assets/Lecture Header.jpeg'
import * as Bs from 'react-icons/bs'
import * as Fi from 'react-icons/fi'
import ProfileImage from '../../Assets/Profile Image.jpg'
import './HrClassDetails.css'
import ClassList from '../../Components/ClassList/ClassList'

const HrClassDetails = () => {
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
      <div className='gfg'>
        <img src={LectureHeader} className='HeaderImage' />
        <div className='Overlay'>
          <h3 className='first-txt'>
            Introduction to programming (IS111)
            <div className='sub-txt'>Application closes on 1 January 2021</div>
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
          <div className='flex-box'>
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
                  &nbsp; Slots Available
                </b>
              </div>
            </div>

            <div className='row'>
              <div className='col'> 4 January 2021</div>
              <div className='col'> 21 January 2021</div>
              <div className='col'> 25</div>
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
                <h6>Daniel Parker</h6>
                <div>
                  <i>Senior Engineer</i>
                </div>
                <div>
                  <i>danielparker@wonderful.com</i>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ClassList/>
        // <div>not</div>
      )}
      <br />
    </div>
  )
}

export default HrClassDetails
