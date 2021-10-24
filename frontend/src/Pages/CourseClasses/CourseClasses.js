import React, { useEffect, useState } from 'react'
import "./CourseClasses.css"
import * as Cg from 'react-icons/cg'
import { Link, useLocation } from 'react-router-dom'
import { getCourseClasses } from '../../Apis/Api'
import BackArrow from '../../Components/BackArrow/BackArrow'

const CourseClasses = () => {
  const location = useLocation();
  const { courseID, courseName } = location.state
  const [courseClasses, setCourseClasses] = useState([])

  useEffect(async () => {
    let response = await getCourseClasses(courseID)
    setCourseClasses(response.data.course_classes)
    console.log(courseClasses)
  }, [])

  return (
    <div id='pagelayout'>
      <div className='white-bg'>
        <div className="title">
          <BackArrow/>
          <h5 id="page-title">Classes for {courseName}</h5>
          <Link to='/createclass'>
            <button type="button" className="btn-sm btn-secondary">
              <Cg.CgMathPlus className="plus-icon" />Create a Class
            </button>
          </Link>
        </div>

        {courseClasses.map((courseClass, i) => (
          <div className='row content-row' key={i}>
            <div className='col'>
              <div className='header-row'>Trainer ID</div>
              {courseClass.trainer.id}
            </div>
            <div className='col'>
              <div className='header-row'>Trainer Name</div>
              {courseClass.trainer.name}
            </div>
            <div className='col'>
              <div className='header-row'>Start Date</div>
              {courseClass.start_date}
            </div>
            <div className='col'>
              <div className='header-row'>End Date</div>
              {courseClass.end_date}
            </div>

            <div className='col'>
              <div className='header-row action'>Action</div>
              <Link
                to={{
                  pathname: '/classdetails',
                  state:{ courseClass } 
                }}
                className='arrow'
                >
                <Cg.CgArrowLongRight size={20} />
              </Link>
            </div>
          </div>
        ))}

      </div>
    </div >
  )
}

export default CourseClasses;
