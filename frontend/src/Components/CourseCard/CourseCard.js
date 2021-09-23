import React from 'react'
import './CourseCard.css'
import * as Si from 'react-icons/si'
import * as Bs from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { bool, string } from 'prop-types'

const CourseCard = (props) => {
  return (
  <>
   <Link to='/CourseTitle' className='try' style={{ textDecoration: 'none' }}
    onClick={props.deleteMode ? "" : (event) => event.preventDefault()}>
      <div className='col-sm shadow'>
        <div className='card hover-backgroundcolor'>
          <div className='card-body'>
            <h5 className='card-title'>
              <Si.SiGoogleclassroom />
              &nbsp;{props.cardTitle}
            </h5>
            <p className='card-subtitle mb-2 text-muted'>{props.cardText}</p>
            <p className='card-text'>
              <Bs.BsPeopleCircle size={25} />
              &nbsp;{props.trainer}
            </p>
          </div>
        </div>
      </div>
    </Link>

  </>
   
  )
}

CourseCard.defaultProps = {
  cardTitle: 'IS110:Python Programming',
  cardText: 'Starts on 12 Jan 2021, End on 12 March 2021',
  trainer: 'Daniel Lim (Senior Engineer)',
  selected: false,
  deleteMode: false,
  // age: "45"
}

CourseCard.propTypes = {
  cardTitle: string,
  cardText: string,
  trainer: string,
  selected: bool,
  deleteMode: bool,
}

export default CourseCard
