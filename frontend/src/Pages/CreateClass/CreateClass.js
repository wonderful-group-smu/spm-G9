import React, { useState } from "react";
import { array } from 'prop-types';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import '../Pagelayout.css';
import './CreateClass.css';
import BackArrow from "../../Components/BackArrow/BackArrow";

const CreateClass = (props) => {
  const [trainer, setTrainer] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
    alert(`Submitted ${trainer}`);
  }

  return (
    <div id='pagelayout'>

      <div id='section-header'>
        <BackArrow/>
        <h5 id='page-title'>Create a Class</h5>
      </div>

      <form onSubmit={handleSubmit}>

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

        <div className="date-picker-container">
          <label className="form-label">Start Date</label>
          <DayPickerInput />
          <label className="form-label">End Date</label>
          <DayPickerInput />
        </div>

        <button type="submit" className="btn btn-secondary submit">Create Class</button>

      </form>
    </div>
  )
}

CreateClass.defaultProps = {
  trainer: ["Daniel Lim", "Brock Place", "Misty Holder"],
  prereqs: ["IS110", "IS111", "IS112", "IS113"],
}

CreateClass.propTypes = {
  trainer: array,
  prereqs: array,
}

export default CreateClass
