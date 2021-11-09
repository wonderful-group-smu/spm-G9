import React from 'react'
import '../Pagelayout.css'
import './Quiz.css'
import { Link } from 'react-router-dom'

const Quiz = () => {
  return (
    <div id='pagelayout'>
      <div id='section-header'>
        <h5 id='page-title'>Quiz List</h5>
      </div>

      <div className='white-bg table-padding'>
        <div className='row header-row-class'>
          <div className='col-8'>Pending Quizzes</div>
          <div className='col-2'>Score</div>
          <div className='col-2'>Feedback</div>
        </div>

        <div className='row content-row'>
          <div className='col-8'>
            <div>
              <Link to='/takequiz'>Quiz 1- Introduction to Variable</Link>
            </div>
            <div className='quiz-availability'>
              Available on Sep 30, 2021 8:00 AM until Oct 22, 2021 5:00 PM
            </div>
          </div>
          <div className='col-2'>-</div>
          <div className='col-2'>-</div>
        </div>

        <div className='row content-row'>
          <div className='col-8'>
            <div>
              <Link to='/takequiz'>Quiz 1- Introduction to Variable</Link>
            </div>
            <div className='quiz-availability'>
              Available on Sep 30, 2021 8:00 AM until Oct 22, 2021 5:00 PM
            </div>
          </div>
          <div className='col-2'>-</div>
          <div className='col-2'>-</div>
        </div>

        <div className='row content-row'>
          <div className='col-8'>
            <div>
              <Link to='/takequiz'>Quiz 1- Introduction to Variable</Link>
            </div>
            <div className='quiz-availability'>
              Available on Sep 30, 2021 8:00 AM until Oct 22, 2021 5:00 PM
            </div>
          </div>
          <div className='col-2'>-</div>
          <div className='col-2'>-</div>
        </div>
      </div>

      <div className='white-bg table-padding'>
        <div className='row header-row-class'>
          <div className='col-8'>Past Quizzes</div>
          <div className='col-2'>Score</div>
          <div className='col-2'>Feedback</div>
        </div>

        <div className='row content-row'>
          <div className='col-8'>
            <div>
              <Link to='/takequiz'>Quiz 1- Introduction to Variable</Link>
            </div>
            <div className='quiz-availability'>
              Available on Sep 30, 2021 8:00 AM until Oct 22, 2021 5:00 PM
            </div>
          </div>
          <div className='col-2'>9/10</div>
          <div className='col-2'>
            <Link to='/quizfeedback'>View</Link>
          </div>
        </div>

        <div className='row content-row'>
          <div className='col-8'>
            <div>
              <Link to='/takequiz'>Quiz 1- Introduction to Variable</Link>
            </div>
            <div className='quiz-availability'>
              Available on Sep 30, 2021 8:00 AM until Oct 22, 2021 5:00 PM
            </div>
          </div>
          <div className='col-2'>9/10</div>

          <div className='col-2'>
            <Link to='/quizfeedback'>View</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Quiz
