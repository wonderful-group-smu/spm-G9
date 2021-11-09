import React, { useEffect, useState } from 'react'
import './CreateCourseModal.css'
import * as Bs from 'react-icons/bs'
import * as Md from 'react-icons/md'
import * as Gi from 'react-icons/gi'
import { addNewCourse, getCourseList } from '../../Apis/Api'
import Modal from 'react-bootstrap/Modal'
import { bool, func } from 'prop-types'

const CreateCourseModal = (props) => {
  const [courseID, setCourseID] = useState(0)
  const [courseName, setCourseName] = useState('')
  const [courseDataArr, setCourseDataArr] = useState([])
  const [desc, setDesc] = useState('')
  const [prereqs, setPrereqs] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    addNewCourse({
      course_id: courseID,
      name: courseName,
      description: desc,
      prereqs: prereqs,
    })
      .then(() => {
        props.hideWithReload()
      })
  }

  useEffect(async () => {
    let response = await getCourseList()
    let results = response.data.results

    let max_id = 0
    for await (let num of results) {
      if (num.course_id > max_id) {
        max_id = num.course_id
      }
    }

    setCourseDataArr(results)
    setCourseID(max_id + 1)
  }, [])

  return (
    <Modal {...props} centered>
      <div className="modal-box">
        <h5>
          Create a Course
          <button className='closing-icon' onClick={props.onHide}>
            <Bs.BsX size={30} />
          </button>
        </h5>

        <form onSubmit={handleSubmit}>
          <label htmlFor='inputCourseName' className='input-label'>
            <Md.MdTextFields/> Course Name
          </label>
          <input
            className='form-control'
            id='inputCourseName'
            placeholder='Input Course Name...'
            onChange={(e) => setCourseName(e.target.value)}
          />

          <label htmlFor='inputDesc' className='input-label'>
            <Bs.BsFileEarmarkText/> Description
          </label>
          <textarea
            className='form-control'
            id='inputDesc'
            placeholder='Input Course Description...'
            rows='3'
            onChange={(e) => setDesc(e.target.value)}
          />

          <label htmlFor='form-check' className='input-label'>
            <Gi.GiCheckboxTree />Prerequisites
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
            className='confirm-enroll col'
          >
            Create Course
          </button>
        </form>
      </div>
    </Modal>
  )
}

CreateCourseModal.propTypes = {
  show: bool,
  onHide: func,
  hideWithReload: func,
}

export default CreateCourseModal
