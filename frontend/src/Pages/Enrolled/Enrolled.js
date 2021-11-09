import CourseCard from '../../Components/CourseCard/CourseCard'
import Empty from '../../Components/Empty/Empty'
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
        const allEnrolled = response.data.results
        if (allEnrolled.length > 0) {
          const official_enrolled = allEnrolled.filter(function (obj) {
            return obj.is_official == true
          })

          setEnrolledCourses(official_enrolled)
        }
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

          {enrolledCourses.length > 0 ? (
            <div className='center-content-flexbox'>
              {enrolledCourses.map((data) => (
                <CourseCard
                  key={data.course.course_id}
                  courseID={data.course.course_id}
                  courseName={data.course.name}
                  description={data.course.description}
                  link={{
                    pathname: '/coursecontent',
                    state: {
                      course_id: data.course.course_id,
                      trainer_id: data.trainer.id,
                    },
                  }}
                />
              ))}
            </div>
          ) : (
            <Empty text='You do not have any enrolled classes' />
          )}
        </>
      )}
    </div>
  )
}

export default Enrolled
