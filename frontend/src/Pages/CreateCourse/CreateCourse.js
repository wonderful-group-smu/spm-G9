import React, { useState } from "react";
import { array } from 'prop-types'
import '../Pagelayout.css'
import './CreateCourse.css'

const CreateCourse = (props) => {
  const [courseName, setCourseName] = useState("");
  const [trainer, setTrainer] = useState("");
  const [desc, setDesc] = useState("");
  const [prereqs, setPrereqs] = useState([]);

  const addPrereq = (event) => {
    setPrereqs([
      ...prereqs,
      event.target.value,
    ]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
    alert(`Submitted ${courseName}, ${trainer}, ${desc}, ${prereqs}`)
  }

  return (
    <div id='pagelayout'>

      <div id='section-header'>
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

        <label htmlFor="inputTrainer" className="form-label">Trainer</label>
        <input
          className="form-control"
          list="trainerDatalist"
          id="inputTrainer"
          placeholder="Search..."
          onChange={e => setTrainer(e.target.value)}
        />
        <datalist id="trainerDatalist">
          {props.trainer.map((trainer, i) => (
            <option value={trainer} key={i} />
          ))}
        </datalist>

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
          {props.prereqs.map((prereq, i) => (
            <div key={i}>
              <input className="form-check-input" type="checkbox" value={prereq} id="inputPrereq" />
              <label htmlFor="inputPrereq" className="form-check-label" >{prereq}</label>
            </div>
          ))}
        </div>

        <button type="submit" className="btn btn-secondary">Create Course</button>

      </form>
    </div>
  )
}

CreateCourse.defaultProps = {
  trainer: ["Daniel Lim", "Brock Place", "Misty Holder"],
  prereqs: ["IS110", "IS111", "IS112", "IS113"],
}

CreateCourse.propTypes = {
  trainer: array,
  prereqs: array,
}

export default CreateCourse
