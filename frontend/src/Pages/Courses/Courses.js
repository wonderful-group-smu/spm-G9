import CourseCard from '../../Components/CourseCard/CourseCard'
import '../Pagelayout.css'
import './Courses.css'
import * as Cg from 'react-icons/cg'
import * as Im from 'react-icons/im'
import * as Bi from 'react-icons/bi';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CourseData = () => {
  let temp = [];
  for (let i = 1; i < 7; i++) {
    temp.push(
      {
        courseID: i,
        cardTitle: "IS110: Python Programming",
        cardText: "12 Jan 2021 to 31 Jan 2021"
      },
    )
  }
  return temp;
}

const Courses = () => {
  const [pageTitle, setPageTitle] = useState("Courses")
  const [deleteMode, setDeleteMode] = useState(false)

  const [courseDataArr, setCourseDataArr] = useState(CourseData)
  const [selectedArr, setSelectedArr] = useState([])

  const handleDeleteMode = () => {
    setPageTitle(deleteMode ? "Courses" : "Delete Course")
    setDeleteMode(!deleteMode);
  };

  const handleDelete = () => {
    setCourseDataArr(courseDataArr.filter(item => !(selectedArr.includes(item.courseID))));
    setSelectedArr([])
  }

  return (
    <div id='pagelayout'>
      <div id='section-header'>
        <button hidden={!deleteMode} onClick={handleDeleteMode}><Bi.BiArrowBack className="back-arrow" /></button>
        <h5 id='page-title'>{pageTitle}</h5>
        <Link to='/createcourse'>
          <button hidden={deleteMode} className="btn-sm btn-secondary">
            <Cg.CgMathPlus className="plus-icon" />Create a Course
          </button>
        </Link>
        <button hidden={deleteMode} className="btn-sm btn-secondary" onClick={handleDeleteMode}>
          <Im.ImBin className="bin-icon" />Delete Courses
        </button>
        <button hidden={!deleteMode} className="btn-sm btn-secondary" onClick={handleDelete}>Delete Selected Courses</button>
        {/* <button hidden={!deleteMode} className="btn-sm btn-secondary" onClick={handleDeleteMode}>Exit</button> */}

      </div>

      <div className='row' >
        <div>
          {courseDataArr.map((data, i) => (
            <CourseCard key={{ i }}
              courseID={data.courseID}
              cardTitle={data.cardTitle}
              cardText={data.cardText}
              // trainer={data.trainer}
              deleteMode={deleteMode}
              selectedArr={selectedArr}
              setSelectedArr={setSelectedArr}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Courses
