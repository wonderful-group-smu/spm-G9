import React, { useState } from 'react'
import './CourseCard.css'
// import * as Si from 'react-icons/si'
import * as Fi from 'react-icons/fi'
import * as Bs from 'react-icons/bs'
import { Link } from 'react-router-dom'
import LectureHeader from "../../Assets/Lecture Header.jpeg"

import { array, bool, func, number, string, object, oneOfType } from 'prop-types'

const CourseCard = (props) => {
  const [selected, setSelected] = useState(false);

  const handleClickSelect = (event) => {
    if (!selected) {
      props.setSelectedArr([...props.selectedArr, props.courseID]);
    }
    else {
      props.setSelectedArr(props.selectedArr.filter((item) => { return item !== props.courseID }));
    }
    setSelected(!selected);
    event.preventDefault();
  }

  function handlestring() {
    return ""
  }



  return (
    <>
      <Link to={props.link} className='try' style={{ textDecoration: 'none' }}
        onClick={props.deleteMode ? handleClickSelect : handlestring}>
        <div className='col-sm shadow-box'>
          <div className={selected && props.deleteMode ? 'card selected' : 'card'}>
            <img src={LectureHeader} className='card-img-top' />
            <div className="hover-overlay"/>
              <div className='card-body'>

                <h5 className='card-title'>
                  {/* <Si.SiGoogleclassroom /> */}
                  {props.cardTitle}
                </h5>
                <p className='card-subtitle mb-2 text-muted'>
                </p>
                <p className='card-text'>
                  {/* <Bs.BsPeopleCircle size={25} /> */}
                  {/* &nbsp;{props.trainer} */}
                  <Fi.FiCalendar className="calendar"/> Enrolment Period <br />
                  {props.cardText}
                  <Bs.BsCircle className="checkbox" hidden={selected || !props.deleteMode} />
                  <Bs.BsCheckCircle className="checkbox checked" hidden={!selected || !props.deleteMode} />
                </p>
            </div>
          </div>
        </div>
      </Link>

    </>

  )
}

// CourseCard.defaultProps = {

//   cardTitle: 'IS110:Python Programming',
//   cardText: 'Starts on 12 Jan 2021, End on 12 March 2021',
//   trainer: 'Daniel Lim (Senior Engineer)',
//   deleteMode: false,

//   // age: "45"
// }

CourseCard.propTypes = {
  courseID: number,
  cardTitle: string,
  cardText: string,
  // trainer: string,
  deleteMode: bool,
  selectedArr: array,
  setSelectedArr: func,
  link:oneOfType([
    string, object
  ])
  
}

export default CourseCard
