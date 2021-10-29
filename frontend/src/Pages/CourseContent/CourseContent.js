import React, { useState, useEffect } from 'react'
// import React from 'react'
import ContentCard from '../../Components/ContentCard/ContentCard'
import './CourseContent.css'
import '../Pagelayout.css'
import { object } from 'prop-types'
import { Link, useLocation } from 'react-router-dom'
import { getCourseProgress } from '../../Apis/Api'
import Spinner from '../../Components/Spinner/Spinner'

const CourseContent = () => {
  const [courseProgress, setCourseProgress] = useState()
  const [isLoading, setLoading] = useState(true)
  const location = useLocation()
  const { course_id, trainer_id } = location.state

  console.log(course_id, trainer_id)

  useEffect(() => {
    getCourseProgress(course_id, trainer_id)
      .then((response) => {
        console.log(response.data[0].progress)
        if (response.data[0].progress['completed_sections'] == 0) {
          setCourseProgress(0)
        } else {
          const progress = Math.round(
            (response.data[0].progress['completed_sections'] /
              response.data[0].progress['no_sections']) *
              100
          )
          console.log(progress)
          setCourseProgress(progress)
        }
      })
      .then(() => {
        setLoading(false)
      })
  }, [])

  // console.log(trainerId, 'trainerid')
  console.log(courseProgress)

  return (
    <div id='pagelayout'>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div id='section-header '>
            <h5 id='page-title'>
              IS111: Introduction to Python (Course Content)
            </h5>

            {/* to might need to change based on api */}
            <Link className='fitted-button final-quiz-style' to='/takequiz'>
              Take Final Quiz
            </Link>
          </div>
          Your Progress
          <div className='progress'>
            <div
              className='progress-bar'
              role='progressbar'
              style={{ width: `${courseProgress}%` }}
            >
              {courseProgress}%
            </div>
          </div>
          {/* <div className='page-subtitle'>There are 3 lessons in this course</div> */}
          <div className='row'>
            <div className='col'>
              <ContentCard
                status={true}
                sessionNumber='1'
                sessionTitle='Introduction to variable'
                // courseId={courseId}
              />
              <ContentCard
                status={false}
                sessionNumber='2'
                sessionTitle='Functions'
                // courseId={courseId}
              />
              <ContentCard
                status={false}
                sessionNumber='3'
                sessionTitle='Application'
                // courseId={courseId}
              />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

CourseContent.propTypes = {
  location: object,
}
export default CourseContent
