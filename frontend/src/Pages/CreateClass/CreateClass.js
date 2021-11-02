import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from 'react-router-dom'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import '../Pagelayout.css';
import './CreateClass.css';
import CreateSubmitModal from "../../Components/CreateSubmitModal/CreateSubmitModal";
import BackArrow from "../../Components/BackArrow/BackArrow";
import { addNewCourseClass, getEmployees } from "../../Apis/Api";

const CreateClass = () => {
  const location = useLocation()
  const { courseID, courseName } = location.state
  const [employees, setEmployees] = useState([])
  const [trainerID, setTrainerID] = useState("");
  const [classSize, setClassSize] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  let history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    let response = await addNewCourseClass({
      "class_size": classSize,
      "course_id": courseID,
      "end_date": endDate,
      "start_date": startDate,
      "trainer_id": trainerID,
    })
    console.log(response.data)
    setShowModal(true)
    // console.log(event);
    // alert(`Submitted ${trainerID}, ${classSize}, ${startDate}, ${endDate}, ${courseID}`);
  }

  useEffect(async () => {
    let response = await getEmployees();
    console.log(response.data.results)
    setEmployees(response.data.results)
  }, [])

  return (
    <div id='pagelayout'>

      <div id='section-header'>
        <BackArrow />
        <h5 id='page-title'>Create a Class</h5>
      </div>

      <form onSubmit={handleSubmit}>

        <label htmlFor="inputTrainer" className="form-label">Trainer</label>
        <input
          className="form-control"
          list="trainerDatalist"
          id="inputTrainer"
          placeholder="Search..."
          onChange={e => setTrainerID(
            employees.find(employees => employees.name === e.target.value).id
          )}
        />
        <datalist id="trainerDatalist">
          {employees.map((employee, i) => (
            <option value={employee.name} key={i} />
          ))}
        </datalist>

        <label htmlFor="inputClassSize" className="form-label">Class Size</label>
        <input
          className="form-control"
          id="inputClassSize"
          placeholder="Input Class Size..."
          onChange={e => setClassSize(e.target.value)}
        />

        <div className="date-picker-container">
          <label className="form-label">Start Date</label>
          <DayPickerInput onDayChange={day => setStartDate(day)} />
          <label className="form-label">End Date</label>
          <DayPickerInput onDayChange={day => setEndDate(day)} />
        </div>

        <button type="submit" className="btn btn-secondary submit">Create Class</button>
        <CreateSubmitModal
          show={showModal} setShow={setShowModal} history={history}
          subject="Class" title={"a class for " + courseName}
        />

      </form>
    </div>
  )
}

export default CreateClass
