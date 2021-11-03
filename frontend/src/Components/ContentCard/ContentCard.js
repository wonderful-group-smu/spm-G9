import React from 'react'
import './ContentCard.css'
import * as Fi from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { bool, number, string } from 'prop-types'
import ContentModal from '../../Components/ContentModal/ContentModal'

const ContentCard = (props) => {
  const [rejectModalShow, setRejectModalShow] = React.useState(false)

  const contentStatus = props.status
  return (
    <>
      <div className='row-wrapper'>
        <div className='row content-bg'>
          <div className='col-2  content-title'>
            SECTION<div>{props.sessionNumber}</div>
          </div>
          <div className='col '>
            <div
              className='content-subtitle'
              onClick={() => {
                setRejectModalShow(true)
              }}
            >
              {props.sessionTitle}
            </div>
            <Link
              className='quiz-link'
              to={{
                pathname: '/takequiz',
                state: {
                  session_id: props.sessionNumber,
                  course_id: props.courseId,
                  trainer_id:props.trainerId
                },
              }}
            >
              Take Quiz
            </Link>
          </div>

          <div className='col-2 content-status-parent'>
            {contentStatus ? (
              <div className='content-status-child completed'>
                <Fi.FiCheckCircle size={40} />
                <div>Completed</div>
              </div>
            ) : (
              <div className='content-status-child incomplete'>
                <Fi.FiXCircle size={40} />
                <div>Incomplete</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <ContentModal
        show={rejectModalShow}
        onHide={() => setRejectModalShow(false)}
        sessionNumber={props.sessionNumber}
        sessionContent={props.sessionContent}
      />
    </>
  )
}

ContentCard.propTypes = {
  status: bool,
  sessionNumber: number,
  sessionTitle: string,
  courseId: number,
  sessionContent: string,
  trainerId: number
}

export default ContentCard
