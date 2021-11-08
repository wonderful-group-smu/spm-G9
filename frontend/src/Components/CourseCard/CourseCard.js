import React, { useState } from 'react'
import './CourseCard.css'
// import * as Si from 'react-icons/si'
import * as Bs from 'react-icons/bs'
import { Link } from 'react-router-dom'
import CourseImages from '../../Assets/CourseImages/CourseImages';
import * as Ri from 'react-icons/ri'

import {
  array,
  bool,
  func,
  number,
  string,
  object,
  oneOfType,
} from 'prop-types'

const CourseCard = (props) => {
  const [selected, setSelected] = useState(false)

  const handleClickSelect = (event) => {
    event.preventDefault()
    if (!selected) {
      props.setSelectedArr([...props.selectedArr, props.courseID])
    } else {
      props.setSelectedArr(
        props.selectedArr.filter((item) => {
          return item !== props.courseID
        })
      )
    }
    setSelected(!selected)
  }

  return (
    <>
      <Link
        id={props.courseName}
        to={props.link}
        className='try'
        style={{ textDecoration: 'none' }}
      >
        <div
          className='col-sm shadow-box'
          onClick={props.deleteMode ? handleClickSelect : null}
        >
          <div
            className={selected && props.deleteMode ? 'card selected' : 'card'}
          >
            <img src={CourseImages[props.courseID % 8].default} className='card-img-top' />
            <div className='hover-overlay' />
            <div className='card-body'>
              <h5 className='card-title'>
                {props.courseName}
                &nbsp;&nbsp;
                  {props.eligibility && <Ri.RiThumbUpLine />}
              </h5>

              <p className='card-subtitle mb-2 text-muted'></p>
              <p className='card-text'>
                <Bs.BsFileEarmarkText className='calendar' /> Course Description <br />
                {props.description}
                <Bs.BsCircle
                  className='checkbox'
                  hidden={selected || !props.deleteMode}
                />
                <Bs.BsCheckCircle
                  className='checkbox checked'
                  hidden={!selected || !props.deleteMode}
                />
              </p>
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}

CourseCard.propTypes = {
  courseID: number,
  courseName: string,
  description: string,
  deleteMode: bool,
  selectedArr: array,
  setSelectedArr: func,
  link: oneOfType([string, object]),
  eligibility: bool,
}

export default CourseCard
