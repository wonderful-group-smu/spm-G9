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
        setEnrolledCourses(response.data.results)
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
            <h5 id='page-title'>Enrolled Courses</h5>
          </div>

          <div className='row'>
            <div className='center-content-flexbox'>
              {enrolledCourses.map((data, i) => (
                <CourseCard
                  key={{ i }}
                  courseID={data.course.course_id}
                  cardTitle={data.course.name}
                  cardText={data.course.description}
                  link={{
                    pathname: '/optionselection',
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
