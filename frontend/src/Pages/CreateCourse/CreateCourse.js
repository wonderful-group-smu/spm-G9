import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
// import { array } from 'prop-types'
import '../Pagelayout.css'
import './CreateCourse.css'
import { addNewCourse, getCourseList } from '../../Apis/Api'
// import CreateSubmitModal from '../../Components/CreateSubmitModal/CreateSubmitModal'
import GeneralModal from '../../Components/GeneralModal/GeneralModal'

import BackArrow from '../../Components/BackArrow/BackArrow'

const CreateCourse = () => {
  const [courseID, setCourseID] = useState(0)
  const [courseName, setCourseName] = useState('')
  const [courseDataArr, setCourseDataArr] = useState([])
  const [desc, setDesc] = useState('')
  const [prereqs, setPrereqs] = useState([])
  const [showModal, setShowModal] = useState(false)
  let history = useHistory()

  const addPrereq = (e) => {
    let prereqID = e.target.value
    let prereq = {
      course_id: 3,
      prereq_id: prereqID,
    }
    if (prereqs.some((obj) => obj.prereq_id === prereqID)) {
      setPrereqs(prereqs.filter((course) => course.prereq_id !== prereqID))
    } else {
      setPrereqs([...prereqs, prereq])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let response = await addNewCourse({
      course_id: courseID,
      name: courseName,
      description: desc,
      prereqs: prereqs,
    })
    console.log(response.data)
    setShowModal(true)
  }

  useEffect(async () => {
    let response = await getCourseList()
    let results = response.data.results

    console.log(results[0])

    let max_id = 0
    for await (let num of results) {
      console.log(num.course_id)
      if (num.course_id > max_id) {
        max_id = num.course_id
      }
    }

    setCourseDataArr(results)

    setCourseID(max_id + 1)
  }, [])

  return (
    <>
      <div id='pagelayout'>
        <div id='section-header'>
          <BackArrow />
          <h5 id='page-title'>Create a Course</h5>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor='inputCourseName' className='form-label'>
            Course Name
          </label>
          <input
            className='form-control'
            id='inputCourseName'
            placeholder='Input Course Name...'
            onChange={(e) => setCourseName(e.target.value)}
          />

          <label htmlFor='inputDesc' className='form-label'>
            Description
          </label>
          <textarea
            className='form-control'
            id='inputDesc'
            placeholder='Input Course Description...'
            rows='3'
            onChange={(e) => setDesc(e.target.value)}
          />

          <label htmlFor='form-check' className='form-label'>
            Prerequisites
          </label>
          <div className='form-check' onChange={addPrereq}>
            {courseDataArr.map((course, i) => (
              <div key={i}>
                <label className='form-check-label'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    value={course.course_id}
                    id='inputPrereq'
                  />

                  {course.name}
                </label>
              </div>
            ))}
          </div>

          <button
            id='submit-create-course'
            type='submit'
            className='fitted-button'
            // className='btn btn-secondary submit'
            data-bs-toggle='modal'
            data-bs-target='create-submit-modal'
          >
            Create Course
          </button>

          {/* <CreateSubmitModal
          show={showModal}
          setShow={setShowModal}
          history={history}
          subject='Course'
          title={'course ' + courseName}
        />  */}
        </form>
      </div>

      <GeneralModal
        show={showModal}
        onHide={() => setShowModal(false)}
        modal_title='Created Course'
        modal_content={'You have created ' + courseName}
        button_content='Back Home'    
        button_action={()=>history.push('/')}
      />
    </>
  )
}

// CreateCourse.defaultProps = {
//   prereqs: ["IS110", "IS111", "IS112", "IS113"],
// }

// CreateCourse.propTypes = {
//   prereqs: array,
// }

export default CreateCourse
