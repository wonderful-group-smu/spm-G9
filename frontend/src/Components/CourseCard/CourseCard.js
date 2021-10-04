import React, { useState } from 'react'
import './CourseCard.css'
import * as Si from 'react-icons/si'
import * as Bs from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { array, bool, func, number, string } from 'prop-types'

const CourseCard = (props) => {
  const [selected, setSelected] = useState(false);

  const handleClickSelect = (event) => {
    if (!selected) {
      props.setSelectedArr([...props.selectedArr, props.courseID]);
    }
    else {
      props.setSelectedArr(props.selectedArr.filter((item) => {return item !== props.courseID}));
    }
    setSelected(!selected);
    event.preventDefault();
  }

  return (
    <>
      <Link to='/CourseTitle' className='try' style={{ textDecoration: 'none' }}
        onClick={props.deleteMode ? handleClickSelect : ""}>
        <div className='col-sm shadow'>
          <div className='card hover-backgroundcolor'>
            <div className={selected && props.deleteMode ? 'card-body selected-body' : 'card-body'}>
              <h5 className='card-title'>
                <Si.SiGoogleclassroom />
                &nbsp;{props.cardTitle}
              </h5>
              <p className='card-subtitle mb-2 text-muted'>{props.cardText}</p>
              <p className='card-text'>
                <Bs.BsPeopleCircle size={25} />
                &nbsp;{props.trainer}
                <Bs.BsCircle className="checkbox" hidden={selected || !props.deleteMode} />
                <Bs.BsCheckCircle className="checkbox selected" hidden={!selected || !props.deleteMode} />
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
  trainer: string,
  deleteMode: bool,
  selectedArr: array,
  setSelectedArr: func,
}

export default CourseCard
