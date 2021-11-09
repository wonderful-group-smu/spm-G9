import CourseCard from '../../Components/CourseCard/CourseCard'
import '../Pagelayout.css'
import './Courses.css'
import * as Cg from 'react-icons/cg'
import * as Im from 'react-icons/im'
import * as Bi from 'react-icons/bi'
import React, { useEffect, useState } from 'react'
import {
  deleteCourse,
  getCourseList,
  getEngineerEligibility,
  getEmployeeRole,
} from '../../Apis/Api'
import Spinner from '../../Components/Spinner/Spinner'
import CreateCourseModal from '../../Components/CreateCourseModal/CreateCourseModal'

const Courses = () => {
  const [pageTitle, setPageTitle] = useState('Courses')
  const [deleteMode, setDeleteMode] = useState(false)
  const [courseDataArr, setCourseDataArr] = useState([])
  const [selectedArr, setSelectedArr] = useState([])
  const [engEligibilityArr, setEngEligibilityArr] = useState([])
  const [showCreateCourse, setShowCreateCourse] = useState(false)
  const [isLoading, setLoading] = useState(true)

  const handleDeleteMode = () => {
    setPageTitle(deleteMode ? 'Courses' : 'Delete Courses')
    setDeleteMode(!deleteMode)
  }
  const role = getEmployeeRole()

  const handleDelete = async () => {
    selectedArr.map(async (courseID) => {
      setLoading(true)
      deleteCourse({
        "course_id": courseID,
      }).then(() => {
        setLoading(false)
        window.location.reload()
      })
    })
  }

  useEffect(() => {
    getCourseList().then((response) => {
      setCourseDataArr(response.data.results)
    })

    getEngineerEligibility()
      .then((response) => {
        setEngEligibilityArr(response.data.results)
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
          <div id='section-header'>
            <button hidden={!deleteMode} onClick={handleDeleteMode}>
              <Bi.BiArrowBack className='back-arrow' />
            </button>
            <h5 id='page-title'>{pageTitle}</h5>
            <div className='button-alignment'>
              <div className={role == 'ENG' ? 'hidebutton' : ''}>
                  <button
                    hidden={deleteMode}
                    className='fitted-button-corner'
                    role='button'
                    aria-label='createCourse'
                    id='createCourse'
                    onClick={() => setShowCreateCourse(true)}
                  >
                    <Cg.CgMathPlus className='plus-icon' />
                    Create a Course
                  </button>
                <CreateCourseModal
                  show={showCreateCourse}
                  hideWithReload={() => {
                    setShowCreateCourse(false)
                    window.location.reload()
                  }}
                  onHide={() => setShowCreateCourse(false)}
                />

                <button
                  hidden={deleteMode}
                  className='fitted-button-corner'
                  onClick={handleDeleteMode}
                  role='button'
                  aria-label='deleteCourses'
                >
                  <Im.ImBin className='bin-icon' />
                  Delete Courses
                </button>
              </div>

              <button
                hidden={!deleteMode}
                className='fitted-button-corner'
                onClick={handleDeleteMode}
                role='button'
                aria-label='cancelDeleteClasses'
              >
                Cancel
              </button>

              <button
                hidden={!deleteMode}
                className='fitted-button-corner'
                onClick={handleDelete}
                role='button'
                aria-label='deleteSelectedCourses'
              >
                Delete Selected Courses
              </button>
            </div>
          </div>

          <div className='center-content-flexbox'>
            {courseDataArr.map((data, i) => (
              <CourseCard
                key={data.course_id}
                courseID={data.course_id}
                courseName={data.name}
                description={data.description}
                deleteMode={deleteMode}
                selectedArr={selectedArr}
                eligibility={engEligibilityArr[i].isEligible}
                setSelectedArr={setSelectedArr}
                link={{
                  pathname: '/courseclasses',
                  state: {
                    courseID: data.course_id,
                    courseName: data.name,
                    eligibility: engEligibilityArr[i].isEligible,
                  },
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Courses
