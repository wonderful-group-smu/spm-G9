import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
// import { array } from 'prop-types'
import '../Pagelayout.css'
import './CreateCourse.css'
import { addNewCourse, getCourseList } from '../../Apis/Api'
// import CreateSubmitModal from '../../Components/CreateSubmitModal/CreateSubmitModal'
import GeneralModal from '../../Components/GeneralModal/GeneralModal'

import BackArrow from '../../Components/BackArrow/BackArrow'
// import CourseListModal from '../../Components/CourseListModal/CourseListModal'

const CreateCourse = () => {
  const [courseID, setCourseID] = useState(0)
  const [courseName, setCourseName] = useState('')
  const [courseDataArr, setCourseDataArr] = useState([])
  const [desc, setDesc] = useState('')
  const [prereqs, setPrereqs] = useState([])
  const [showModal, setShowModal] = useState(false)
  let history = useHistory()

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
          <label htmlFor='inputCourseName' className='input-label'>
            Course Name
          </label>
          <input
            className='form-control'
            id='inputCourseName'
            placeholder='Input Course Name...'
            onChange={(e) => setCourseName(e.target.value)}
          />

          <label htmlFor='inputDesc' className='input-label'>
            Description
          </label>
          <textarea
            className='form-control'
            id='inputDesc'
            placeholder='Input Course Description...'
            rows='3'
            onChange={(e) => setDesc(e.target.value)}
          />

          <label htmlFor='form-check' className='input-label'>
            Prerequisites
          </label>

          <div className="list-group" id="prereq-list-group">
            {courseDataArr.map(course => {
              const selected = prereqs.find(prereq => prereq.prereq_id === course.course_id) ? "active" : ""
              return (
                <button
                  type="button"
                  id="list-group-item-action"
                  className={`list-group-item list-group-item-action ${selected}`}
                  key={course.course_id}
                  onClick={() => {
                    let prereq = {
                      course_id: courseID,
                      prereq_id: course.course_id,
                    }
                    if (prereqs.some((obj) => obj.prereq_id === course.course_id)) {
                      setPrereqs(prereqs.filter((obj) => obj.prereq_id !== course.course_id))
                    } else {
                      setPrereqs([...prereqs, prereq])
                    }
                  }}
                >
                  {course.name}
                </button>
              )
            })}
          </div>

          <button
            id='submit-create-course'
            type='submit'
            className='fitted-button'
            data-bs-toggle='modal'
            data-bs-target='create-submit-modal'
          >
            Create Course
          </button>
        </form>
      </div>

      <GeneralModal
        show={showModal}
        onHide={() => history.push('/')}
        modal_title='Created Course'
        modal_content={'You have created ' + courseName}
        button_content='Back Home'
        button_action={() => history.push('/')}
      />
    </>
  )
}

export default CreateCourse
