import React from 'react'
import './OptionSelection.css'
import Quiz from '../../Assets/Quiz.jpg'
import '../Pagelayout.css'
import Lesson from '../../Assets/Lesson.jpg'
import { Link } from 'react-router-dom'

const OptionSelection = () => {
  return (
    <>
      <h5 className='option-title'>
        <i>What do you want to do today?</i>
      </h5>

      <div className='parent-container'>
        <div className='child-container top-lay'>
          <Link to='/coursecontent'>
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
  )
}

export default OptionSelection
