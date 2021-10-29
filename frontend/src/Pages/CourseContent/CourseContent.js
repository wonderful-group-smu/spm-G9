import React, { useState, useEffect } from 'react'
// import React from 'react'
import ContentCard from '../../Components/ContentCard/ContentCard'
import './CourseContent.css'
import '../Pagelayout.css'
import { object } from 'prop-types'
import { Link, useLocation } from 'react-router-dom'
import { getCourseProgress, getClassContent } from '../../Apis/Api'
import Spinner from '../../Components/Spinner/Spinner'

const CourseContent = () => {
  const [courseProgress, setCourseProgress] = useState()
  const [courseSections, setCourseSections] = useState()
  const [isLoading, setLoading] = useState(true)
  const location = useLocation()
  const { course_id, trainer_id } = location.state


  useEffect(() => {
    getCourseProgress(course_id, trainer_id).then((response) => {
      if (response.data[0].progress['completed_sections'] == 0) {
        setCourseProgress(0)
      } else {
        const progress = Math.round(
          (response.data[0].progress['completed_sections'] /
            response.data[0].progress['no_sections']) *
            100
        )

        setCourseProgress(progress)
      }
    })

    getClassContent(course_id, trainer_id)
      .then((response) => {
        console.log(response.data.class_sections)
        setCourseSections(response.data.class_sections)
      })

      .then(() => {
        setLoading(false)
      })
  }, [])

  // console.log(courseProgress)
  console.log(courseSections)

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
            <Link
              className='fitted-button final-quiz-style'
              to={{
                pathname: '/takequiz',
                state: {course_id: course_id, trainer_id: trainer_id},
              }}
            >
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
              {courseSections.map((data) => (
                <ContentCard
                  key={data.section_id}
                  status={data.has_completed}
                  sessionNumber={data.section_id}
                  sessionTitle={data.section_name}
                  sessionContent={data.materials}
                  courseId={course_id}
                  trainerId={trainer_id}
                />
              ))}
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
