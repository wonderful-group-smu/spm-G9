import CourseCard from '../../Components/CourseCard/CourseCard'
import '../Pagelayout.css'
import './Courses.css'

import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CourseData = [
  {
    cardTitle: "IS110: Python Programming",
    cardText: "Starts on 12 Jan 2021, End on 12 Mar 2021",
    instructor: "Daniel Lim (Senior Engineer)",
  },
  {
    cardTitle: "IS110: Python Programming",
    cardText: "Starts on 12 Jan 2021, End on 12 Mar 2021",
    instructor: "Daniel Lim (Senior Engineer)",
  },
  {
    cardTitle: "IS110: Python Programming",
    cardText: "Starts on 12 Jan 2021, End on 12 Mar 2021",
    instructor: "Daniel Lim (Senior Engineer)",
  },
  {
    cardTitle: "IS110: Python Programming",
    cardText: "Starts on 12 Jan 2021, End on 12 Mar 2021",
    instructor: "Daniel Lim (Senior Engineer)",
  },
  {
    cardTitle: "IS110: Python Programming",
    cardText: "Starts on 12 Jan 2021, End on 12 Mar 2021",
    instructor: "Daniel Lim (Senior Engineer)",
  },
  {
    cardTitle: "IS110: Python Programming",
    cardText: "Starts on 12 Jan 2021, End on 12 Mar 2021",
    instructor: "Daniel Lim (Senior Engineer)",
  },
]

const Courses = () => {
  const [pageTitle, setPageTitle] = useState("Courses")
  const [deleteMode, setDeleteMode] = useState(false)
  
  const [deleteList, setDeleteList] = useState([]);

  const handleDeleteMode = () => {
    setPageTitle(deleteMode ? "Courses" : "Delete Course" )
    setDeleteMode(!deleteMode);
  };

  // const handleDelete = () => {

  // }

  // const check = () => {
  //   console.log("check deleteMode: ", deleteMode);
  //   console.log("check deleteList: ", deleteList);
  // }

  return (
    <div id='pagelayout'>
      {/* <button onClick={check}>Check me</button> */}

      <div id='section-header'>
        <h5 id='page-title'>{pageTitle}</h5>
        <Link to='/createcourse'>
          <button hidden={deleteMode} className="btn btn-secondary">Create a Course</button>
        </Link>
        <button hidden={deleteMode} className="btn btn-secondary" onClick={handleDeleteMode}>Delete Courses</button>
        <button hidden={!deleteMode} className="btn btn-secondary">Delete Selected Courses</button>
        <button hidden={!deleteMode} className="btn btn-secondary" onClick={handleDeleteMode}>Exit</button>
      </div>

      <div className='row' >
        <div>
          {CourseData.map((data, i) => (
            <CourseCard key={{ i }}
              cardTitle={data.cardTitle}
              cardText={data.cardText}
              instructor={data.instructor}
              deleteMode={deleteMode}
              deleteList={deleteList}
              setDeleteList={setDeleteList}
            />
          ))}

        </div>
      </div>
    </div>
  )
}
export default Courses
