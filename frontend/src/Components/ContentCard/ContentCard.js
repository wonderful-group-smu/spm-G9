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
            SESSION<div>{props.sessionNumber}</div>
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
        sessionContent='Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae unde commodi aspernatur enim, consectetur. Cumque deleniti temporibus ipsam atque a dolores quisquam quisquam adipisci possimus laboriosam. Quibusdam facilis doloribus debitis! Sit quasi quod accusamus eos quod. Ab quos consequuntur eaque quo rem! Mollitia reiciendis porro quo magni incidunt dolore amet atque facilis ipsum deleniti rem!'
      />
    </>
  )
}

ContentCard.propTypes = {
  status: bool,
  sessionNumber: string,
  sessionTitle: string,
  courseId: number,
}

export default ContentCard
