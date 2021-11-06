import React, { useState, useEffect } from 'react'
// import React from 'react'
import ContentCard from '../../Components/ContentCard/ContentCard'
import './CourseContent.css'
import '../Pagelayout.css'
import { object } from 'prop-types'
import { Link, useLocation } from 'react-router-dom'
import {
  getCourseProgress,
  getClassContent,
  getSelfEnroll,
} from '../../Apis/Api'
import Spinner from '../../Components/Spinner/Spinner'
import Empty from '../../Components/Empty/Empty'

const CourseContent = () => {
  const [courseProgress, setCourseProgress] = useState()
  const [courseSections, setCourseSections] = useState()
  const [courseName, setCourseName] = useState()
  const [isLoading, setLoading] = useState(true)
  const [quizSection, setQuizSection] = useState()
  const [hasSections, setHasSections] = useState(true)
  const [hasPassed, setHasPassed] = useState(false)
  const location = useLocation()
  const { course_id, trainer_id } = location.state

  useEffect(() => {
    getCourseProgress(course_id, trainer_id).then((response) => {
      if (response.data[0].progress['completed_sections'] == 0) {
        setCourseProgress(0)
      } else {
        var progress = Math.round(
          (response.data[0].progress['completed_sections'] /
            (response.data[0].progress['no_sections'] - 1)) *
            100
        )

        if (progress > 100) {
          progress = 100
        }
        setCourseProgress(progress)
      }
    })
    getSelfEnroll(course_id, trainer_id).then((response) => {
      setHasPassed(response.data.enrollment.has_passed)

      // console.log(response.data.enrollment.has_passed, 'selfenrol')
    })

    getClassContent(course_id, trainer_id)
      // console.log(response.data)
      .then((response) => {
        console.log(response)
        console.log(response.data.class_sections.slice(-1)[0].section_id)
        setQuizSection(response.data.class_sections.slice(-1)[0].section_id)
        setCourseName(response.data.class_sections[0].course_class.course.name)
        setCourseSections(response.data.class_sections.slice(0, -1))
      })
      .catch((error) => {
        console.log(error)
        setHasSections(false)
      })
      .then(() => {
        setLoading(false)
      })
  }, [])

  return (
    <div id='pagelayout'>
      {isLoading ? (
        <Spinner />
      ) : hasSections ? (
        <>
          <div id='section-header '>
            <h5 id='page-title'>{courseName} Content</h5>

            {hasPassed ? (
              <div className=' complete'>COURSE COMPLETED</div>
            ) : courseProgress < 100 ? (
              <div className='fitted-button quiz_disabled button_masked'>
                Take Final Quiz
              </div>
            ) : (
              <div>
                <Link
                  className='fitted-button final-quiz-style'
                  to={{
                    pathname: '/takequiz',
                    state: {
                      course_id: course_id,
                      trainer_id: trainer_id,
                      session_id: quizSection,
                    },
                  }}
                >
                  Take Final Quiz
                </Link>
              </div>
            )}
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
              {courseSections.map((data, i) => (
                <ContentCard
                  key={data.section_id}
                  status={data.has_completed}
                  sessionNumber={data.section_id}
                  sessionTitle={data.section_name}
                  sessionContent={data.materials}
                  courseId={course_id}
                  trainerId={trainer_id}
                  sessionCount={i + 1}
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        <Empty text='Course is still being set up, come back later!' />
      )}
    </div>
  )
}

CourseContent.propTypes = {
  location: object,
}
export default CourseContent
