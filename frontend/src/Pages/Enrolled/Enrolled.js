import CourseCard from '../../Components/CourseCard/CourseCard'
import '../Pagelayout.css'
import { getEnrolledList } from '../../Apis/Api'
import React, { useEffect, useState } from 'react'
import Spinner from '../../Components/Spinner/Spinner'

const Enrolled = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([])

  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    getEnrolledList()
      .then((response) => {
        console.log(response.data.results[0].course.name)
        setEnrolledCourses(response.data.results)
      })
      .then(() => {
        setLoading(false)
      })
  }, [])

  // console.log(enrolledCourses)

  return (
    <div id='pagelayout'>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div id='section-header'>
            <h5 id='page-title'>Enrolled Courses</h5>
          </div>

          <div className='row'>
            <div className='center-content-flexbox'>
              {enrolledCourses.map((data) => (
                <CourseCard
                  key={data.course.course_id}
                  courseID={data.course.course_id}
                  courseName={data.course.name}
                  description={data.course.description}
                  link={{
                      pathname: '/coursecontent',
                      state: { course_id: data.course.course_id },
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

export default Enrolled
