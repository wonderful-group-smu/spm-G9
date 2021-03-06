import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from 'react-router-dom'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import * as Bs from 'react-icons/bs'
import * as Fi from 'react-icons/fi'
import 'react-day-picker/lib/style.css';
import '../Pagelayout.css';
import './CreateClass.css';
import GeneralModal from "../../Components/GeneralModal/GeneralModal";
import BackArrow from "../../Components/BackArrow/BackArrow";
import { addNewCourseClass, getEmployees } from "../../Apis/Api";
import TrainerListModal from "../../Components/TrainerListModal/TrainerListModal";
import TrainerImages from '../../Assets/TrainerImages/TrainerImages'

const CreateClass = () => {
  const location = useLocation()
  const { courseID, courseName } = location.state
  const [employees, setEmployees] = useState([])
  const [trainerID, setTrainerID] = useState("");
  const [classSize, setClassSize] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showTrainerModal, setShowTrainerModal] = useState(false)
  const userTypeString = {
    "ENG": "Engineer",
    "HR": "Human Resources"
  }
  let history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addNewCourseClass({
      "class_size": classSize,
      "course_id": courseID,
      "end_date": endDate,
      "start_date": startDate,
      "trainer_id": trainerID,
    })
    setShowModal(true)
  }

  useEffect(async () => {
    let response = await getEmployees();
    setEmployees(response.data.results)
  }, [])

  return (
    <div id='pagelayout'>

      <div id='section-header'>
        <BackArrow />
        <h5 id='page-title'>Create a Class</h5>
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="inputTrainer" className="input-label">
          <Bs.BsPersonFill/> Trainer
        </label>
        {trainerID === ""
          ?
          <div
            id="inputTrainer"
            onClick={() => setShowTrainerModal(true)}
          >
            <Bs.BsPeopleCircle size={35} className="peopleIcon" color={"rgb(163, 163, 163)"} />
            <p className="inputTrainerText">No Trainer Selected</p>
          </div>
          :
          <div
            id="inputTrainer"
            style={{ color: "rgb(50, 50, 50)" }}
            onClick={() => setShowTrainerModal(true)}
          >
            <img
              src={TrainerImages[trainerID % 8].default}
              className="selected-trainer-image shadow"
            />
            <div className="trainer-desc">
              <h5>
                {employees.find(employee => employee.id === trainerID).name}
              </h5>
              <p className="trainer-role">
                {userTypeString[employees.find(employee => employee.id === trainerID).user_type]}
              </p>
            </div>
          </div>
        }
        <TrainerListModal
          show={showTrainerModal}
          onHide={() => setShowTrainerModal(false)}
          trainerList={employees}
          setTrainerID={setTrainerID}
          userTypeString={userTypeString}
        />

        <label htmlFor="inputClassSize" className="input-label">
          <Bs.BsPeopleFill/> Class Size
        </label>
        <input
          className="form-control"
          type="number"
          id="inputClassSize"
          placeholder="Input Class Size..."
          onChange={e => setClassSize(e.target.value)}
        />



        <label className="input-label">
          <Fi.FiCalendar/> Class Dates
        </label>
        <div className="input-group" id="date-picker-group">
          <span className="input-group-text">Start Date</span>
          <DayPickerInput onDayChange={day => setStartDate(day)} />
          <span className="input-group-text">End Date</span>
          <DayPickerInput onDayChange={day => setEndDate(day)} />
        </div>

        <button type="submit" className="fitted-button submit">Create Class</button>
        <GeneralModal
          show={showModal}
          onHide={() => history.goBack()}
          modal_title='Created Class'
          modal_content={'You have created a class for ' + courseName}
          button_content='Back to Classes'
          button_action={() => history.goBack()}
        />

      </form >
    </div >
  )
}

export default CreateClass
