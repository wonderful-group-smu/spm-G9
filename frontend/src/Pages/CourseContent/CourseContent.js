import React, { useState, useEffect } from 'react'
import ContentCard from '../../Components/ContentCard/ContentCard'
import './CourseContent.css'
import '../Pagelayout.css'
import { object } from 'prop-types'
import { Link } from 'react-router-dom'

const CourseContent = (props) => {
  const [courseId, setCourseId] = useState()

  useEffect(() => {
    setCourseId(props.location.state.course_id)
  }, [])

  return (
    <div id='pagelayout'>
      {console.log(courseId, 'hi')}
      <div id='section-header '>
        <h5 id='page-title'>IS111: Introduction to Python (Course Content)</h5>

        {/* to might need to change based on api */}
        <Link className='fitted-button final-quiz-style' to='/takequiz'>Take Final Quiz</Link>
      </div>
      Your Progress
      <div className='progress'>
        <div
          className='progress-bar'
          role='progressbar'
          style={{ width: '25%' }}
        >
          25%
        </div>
      </div>
      {/* <div className='page-subtitle'>There are 3 lessons in this course</div> */}
      <div className='row'>
        <div className='col'>
          <ContentCard
            status={true}
            sessionNumber='1'
            sessionTitle='Introduction to variable'
            courseId={courseId}
          />
          <ContentCard
            status={false}
            sessionNumber='2'
            sessionTitle='Functions'
            courseId={courseId}
          />
          <ContentCard
            status={false}
            sessionNumber='3'
            sessionTitle='Application'
            courseId={courseId}
          />
        </div>
      </div>
    </div>
  )
}

CourseContent.propTypes = {
  location: object,
}
export default CourseContent
