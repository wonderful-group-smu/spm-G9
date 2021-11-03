import CourseCard from '../../Components/CourseCard/CourseCard'
import '../Pagelayout.css'
import './Courses.css'
import * as Cg from 'react-icons/cg'
import * as Im from 'react-icons/im'
import * as Bi from 'react-icons/bi'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteCourse, getCourseList } from '../../Apis/Api'
import Spinner from '../../Components/Spinner/Spinner'

// const CourseData = () => {
//   let temp = [];
//   for (let i = 1; i < 7; i++) {
//     temp.push(
//       {
//         courseID: i,
//         cardTitle: "IS110: Python Programming",
//         cardText: "12 Jan 2021 to 31 Jan 2021"
//       },
//     )
//   }
//   return temp;
// }

const Courses = () => {
  const [pageTitle, setPageTitle] = useState('Courses')
  const [deleteMode, setDeleteMode] = useState(false)
  const [courseDataArr, setCourseDataArr] = useState([])
  const [selectedArr, setSelectedArr] = useState([])
  const [isLoading, setLoading] = useState(true)

  const handleDeleteMode = () => {
    setPageTitle(deleteMode ? 'Courses' : 'Delete Course')
    setDeleteMode(!deleteMode)
  }

  const handleDelete = async () => {
    selectedArr.map(async (courseID) => {
      setLoading(true)
      deleteCourse({
        "course_id": courseID
      })
        .then((response) => {
          console.log(response)
        })
      setLoading(false)
    })
    window.location.reload()
  }

  useEffect(() => {
    getCourseList()
      .then((response) => {
        setCourseDataArr(response.data.results)
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
              <Link to='/createcourse'>
                <button
                  hidden={deleteMode}
                  className='fitted-button-corner'
                  // className='btn-sm btn-secondary'
                  role="button"
                  aria-label="createCourse"
                >
                  <Cg.CgMathPlus className='plus-icon' />
                  Create a Course
                </button>
              </Link>

              <button
                hidden={deleteMode}
                className='fitted-button-corner'
                // className='btn-sm btn-secondary'
                onClick={handleDeleteMode}
                role="button"
                aria-label="deleteCourses"
              >
                <Im.ImBin className='bin-icon' />
                Delete Courses
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
                aria-label="deleteSelectedCourses"
              >
                Delete Selected Courses
              </button>
            </div>
          </div>

          <div className='center-content-flexbox'>
            <div>
              {courseDataArr.map((data) => (
                <CourseCard
                  key={data.course_id}
                  courseID={data.course_id}
                  courseName={data.name}
                  description={data.description}
                  deleteMode={deleteMode}
                  selectedArr={selectedArr}
                  setSelectedArr={setSelectedArr}
                  link={{
                    pathname: '/courseclasses',
                    state: { courseID: data.course_id, courseName: data.name },
                  }}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Courses
