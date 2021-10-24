import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import * as Bi from 'react-icons/bi';
// import { array } from 'prop-types'
import '../Pagelayout.css'
import './CreateCourse.css'
import { addNewCourse, getCourseList } from "../../Apis/Api";

const CreateCourse = () => {
  const [courseName, setCourseName] = useState("");
  const [courseDataArr, setCourseDataArr] = useState([])
  const [desc, setDesc] = useState("");
  const [prereqs, setPrereqs] = useState([]);
  let history = useHistory();

  const addPrereq = (e) => {
    let prereqID = e.target.value;
    // let prereq = courseDataArr.filter((course) => (course.prereq_id == courseID))[0]
    let prereq = {
      "course_id": 3,
      "prereq_id": prereqID,
    }
    if (prereqs.some(obj => obj.prereq_id === prereqID)) {
      setPrereqs(prereqs.filter((course) => (course.prereq_id !== prereqID)))
    }
    else {
      setPrereqs([
        ...prereqs,
        prereq,
      ]);
    }
    console.log(prereq)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    let response = await addNewCourse({
      "course_id": 3,
      "name": courseName,
      "description": desc,
      "prereqs": prereqs,
    })
    console.log(response.data)
    alert(`Submitted ${courseName}, ${desc}, ${prereqs}`)
  }

  useEffect(async () => {
    let response = await getCourseList();
    setCourseDataArr(response.data.results)
  }, [])

  return (
    <div id='pagelayout'>
      <div id='section-header'>
        <button onClick={() => history.goBack()}><Bi.BiArrowBack className="back-arrow"/></button>
        <h5 id='page-title'>Create a Course</h5>
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="inputCourseName" className="form-label">Course Name</label>
        <input
          className="form-control"
          id="inputCourseName"
          placeholder="Input Course Name..."
          onChange={e => setCourseName(e.target.value)}
        />

        <label htmlFor="inputDesc" className="form-label">Description</label>
        <textarea
          className="form-control"
          id="inputDesc"
          placeholder="Input Course Description..."
          rows="3"
          onChange={e => setDesc(e.target.value)}
        />

        <label htmlFor="form-check" className="form-label">Prerequisites</label>
        <div className="form-check" onChange={addPrereq}>
          {courseDataArr.map((course, i) => (
            <div key={i}>
              <input className="form-check-input" type="checkbox" value={course.course_id} id="inputPrereq" />
              <label htmlFor="inputPrereq" className="form-check-label" >{course.name}</label>
            </div>
          ))}
        </div>

        <button type="submit" className="btn btn-secondary submit">Create Course</button>

      </form>
    </div>
  )
}

// CreateCourse.defaultProps = {
//   prereqs: ["IS110", "IS111", "IS112", "IS113"],
// }

// CreateCourse.propTypes = {
//   prereqs: array,
// }

export default CreateCourse
