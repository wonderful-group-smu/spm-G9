import React, { useEffect, useState } from 'react'
import './CourseClasses.css'
import * as Cg from 'react-icons/cg'
import * as Im from 'react-icons/im'
import { Link, useLocation } from 'react-router-dom'
import {
  deleteCourseClass,
  getCourseClasses,
  getEmployeeRole,
} from '../../Apis/Api'
import BackArrow from '../../Components/BackArrow/BackArrow'
import Spinner from '../../Components/Spinner/Spinner'
import ClassRow from '../../Components/ClassRow/ClassRow'

const CourseClasses = () => {
  const location = useLocation()
  const { courseID, courseName, eligibility } = location.state
  const [courseClasses, setCourseClasses] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [pageTitle, setPageTitle] = useState(`Classes for ${courseName}`)
  const [deleteMode, setDeleteMode] = useState(false)
  const [selectedArr, setSelectedArr] = useState([])
  const role = getEmployeeRole()

  console.log(eligibility, 'me')
  const handleDeleteMode = () => {
    setPageTitle(
      deleteMode
        ? `Classes for ${courseName}`
        : `Delete Classes for ${courseName}`
    )
    setDeleteMode(!deleteMode)
  }

  const handleDelete = async () => {
    selectedArr.map(async (trainer_id) => {
      setLoading(true)
      deleteCourseClass({
        course_id: courseID,
        trainer_id: trainer_id,
      }).then((response) => {
        console.log(response)
      })
      setLoading(false)
    })
    window.location.reload()
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
                <div className={role == 'ENG' ? 'hidebutton' : ''}>
                  <Link
                    to={{
                      pathname: '/createclass',
                      state: { courseID: courseID, courseName: courseName },
                    }}
                  >
                    <button
                      hidden={deleteMode}
                      className='fitted-button-corner'
                      role='button'
                      aria-label='createCourseClass'
                      id='create_class'
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
                    role='button'
                    aria-label='deleteClasses'
                  >
                    <Im.ImBin className='bin-icon' />
                    Delete Classes
                  </button>
                </div>

                <button
                  hidden={!deleteMode}
                  className='fitted-button-corner'
                  // className='btn-sm btn-secondary'
                  onClick={handleDeleteMode}
                  role='button'
                  aria-label='cancelDeleteClasses'
                >
                  Cancel
                </button>

                <button
                  hidden={!deleteMode}
                  className='fitted-button-corner'
                  // className='btn-sm btn-secondary'
                  onClick={handleDelete}
                  role='button'
                  aria-label='deleteSelectedClasses'
                >
                  Delete Selected Classes
                </button>
              </div>
            </div>

            {courseClasses.map((courseClass) => (
              <ClassRow
                key={courseClass.course_id}
                courseClass={courseClass}
                deleteMode={deleteMode}
                selectedArr={selectedArr}
                setSelectedArr={setSelectedArr}
                link={{
                  pathname: '/classdetails',
                  state: { courseClass: courseClass, eligibility: eligibility },
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default CourseClasses
