import React, { useState, useEffect } from 'react'
import './OptionSelection.css'
import Quiz from '../../Assets/Quiz.jpg'
import '../Pagelayout.css'
import Lesson from '../../Assets/Lesson.jpg'
import { Link } from 'react-router-dom'

import { object } from 'prop-types'
import Spinner from '../../Components/Spinner/Spinner'

const OptionSelection = (props) => {
  const [courseId, setCourseId] = useState()
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    setCourseId(props.location.state.course_id)
  }, [])

  setTimeout(() => {
    setLoading(false)
  }, 700)

  console.log(courseId)

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h5 className='option-title'>
            <i>What do you want to do today?</i>
          </h5>

          <div className='parent-container'>
            <div className='child-container top-lay'>
              {/* <Link to='/coursecontent'> */}
              <Link
                to={{
                  pathname: '/coursecontent',
                  state: { course_id: courseId },
                }}
              >
                <img src={Lesson} className='option-card' />
                <div className='overlay-option shadow'>
                  <h2 className='option-txt'>Review Course Content</h2>
                </div>
              </Link>
            </div>

            <span className='space'></span>

            <div className='child-container top-lay'>
              <Link to='/quiz'>
                <img src={Quiz} className='option-card' />
                <div className='overlay-option shadow'>
                  <h2 className='option-txt'>Take Quizzes</h2>
                </div>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

OptionSelection.propTypes = {
  location: object,
}

export default OptionSelection
