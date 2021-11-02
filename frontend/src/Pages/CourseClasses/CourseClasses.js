import React, { useEffect, useState } from 'react'
import './CourseClasses.css'
import * as Cg from 'react-icons/cg'
import * as Im from 'react-icons/im'
import { Link, useLocation } from 'react-router-dom'
import { getCourseClasses } from '../../Apis/Api'
import BackArrow from '../../Components/BackArrow/BackArrow'
import Spinner from '../../Components/Spinner/Spinner'

const CourseClasses = () => {
  const location = useLocation()
  const { courseID, courseName } = location.state
  const [courseClasses, setCourseClasses] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [pageTitle, setPageTitle] = useState(`Classes for ${courseName}`)
  const [deleteMode, setDeleteMode] = useState(false)

  const handleDeleteMode = () => {
    setPageTitle(deleteMode ? `Classes for ${courseName}` : `Delete Classes for ${courseName}`)
    setDeleteMode(!deleteMode)
  }

  const handleDelete = () => {
    console.log('test')
  }

  useEffect(() => {
    getCourseClasses({
      course_id: courseID,
    })
      .then((response) => {
        setCourseClasses(response.data.course_classes)
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
            <div className='title'>
              <BackArrow />
              <h5 id='page-title'>{pageTitle}</h5>

              <div className='button-alignment'>
                <Link
                  to={{
                    pathname: '/createclass',
                    state: { courseID: courseID, courseName: courseName },
                  }}
                >
                  <button
                    hidden={deleteMode}
                    className='fitted-button-corner'
                    role="button"
                    aria-label="createCourseClass"
                  >
                    <Cg.CgMathPlus className='plus-icon' />
                    Create a Class
                  </button>
                </Link>

                <button
                  hidden={deleteMode}
                  className='fitted-button-corner'
                  // className='btn-sm btn-secondary'
                  onClick={handleDeleteMode}
                  role="button"
                  aria-label="deleteClasses"
                >
                  <Im.ImBin className='bin-icon' />
                  Delete Classes
                </button>

                <button
                  hidden={!deleteMode}
                  className='fitted-button-corner'
                  // className='btn-sm btn-secondary'
                  onClick={handleDeleteMode}
                  role="button"
                  aria-label="cancelDeleteClasses"
                >
                  Cancel
                </button>

                <button
                  hidden={!deleteMode}
                  className='fitted-button-corner'
                  // className='btn-sm btn-secondary'
                  onClick={handleDelete}
                  role="button"
                  aria-label="deleteSelectedClasses"
                >
                  Delete Selected Classes
                </button>
              </div>

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
                  {courseClass.start_date ? courseClass.start_date.slice(0, 10) : "NIL"}
                </div>
                <div className='col'>
                  <div className='header-row'>End Date</div>
                  {courseClass.end_date ? courseClass.end_date.slice(0, 10) : "NIL"}
                </div>

                <div className='col'>
                  <div className='header-row action'>Action</div>
                  <Link
                    id='classbutton'
                    to={{
                      pathname: '/classdetails',
                      state: { courseClass },
                    }}
                    className='arrow'
                  >
                    <Cg.CgArrowLongRight size={20} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )
      }
    </div >
  )
}

export default CourseClasses
