import CourseCard from '../../Components/CourseCard/CourseCard'
import '../Pagelayout.css'
import './Courses.css'

import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CourseData = [
  {
    courseID: 1,
    cardTitle: "IS110: Python Programming",
    cardText: "Starts on 12 Jan 2021, End on 12 Mar 2021",
    trainer: "Daniel Lim (Senior Engineer)",
  },
  {
    courseID: 2,
    cardTitle: "IS110: Python Programming",
    cardText: "Starts on 12 Jan 2021, End on 12 Mar 2021",
    trainer: "Daniel Lim (Senior Engineer)",
  },
  {
    courseID: 3,
    cardTitle: "IS110: Python Programming",
    cardText: "Starts on 12 Jan 2021, End on 12 Mar 2021",
    trainer: "Daniel Lim (Senior Engineer)",
  },
  {
    courseID: 4,
    cardTitle: "IS110: Python Programming",
    cardText: "Starts on 12 Jan 2021, End on 12 Mar 2021",
    trainer: "Daniel Lim (Senior Engineer)",
  },
  {
    courseID: 5,
    cardTitle: "IS110: Python Programming",
    cardText: "Starts on 12 Jan 2021, End on 12 Mar 2021",
    trainer: "Daniel Lim (Senior Engineer)",
  },
  {
    courseID: 6,
    cardTitle: "IS110: Python Programming",
    cardText: "Starts on 12 Jan 2021, End on 12 Mar 2021",
    trainer: "Daniel Lim (Senior Engineer)",
  },
]

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
        <h5 id='page-title'>{pageTitle}</h5>
        <Link to='/createcourse'>
          <button hidden={deleteMode} className="btn btn-secondary">Create a Course</button>
        </Link>
        <button hidden={deleteMode} className="btn btn-secondary" onClick={handleDeleteMode}>Delete Courses</button>
        <button hidden={!deleteMode} className="btn btn-secondary" onClick={handleDelete}>Delete Selected Courses</button>
        <button hidden={!deleteMode} className="btn btn-secondary" onClick={handleDeleteMode}>Exit</button>

      </div>

      <div className='row' >
        <div>
          {courseDataArr.map((data, i) => (
            <CourseCard key={{ i }}
              courseID={data.courseID}
              cardTitle={data.cardTitle}
              cardText={data.cardText}
              trainer={data.trainer}
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
