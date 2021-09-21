import { array } from 'prop-types'
import '../Pagelayout.css'

const CreateCourse = (props) => {
  return (
    <div id='pagelayout'>

      <div id='section-header'>
        <h5 id='page-title'>Create a Course</h5>
      </div>

      <form>
        <label htmlFor="inputCourseTitle" className="form-label">Course Title</label>
        <input className="form-control" id="inputCourseTitle"/>

        <label htmlFor="inputTrainer" className="form-label">Trainer</label>
        <input className="form-control" list="trainerDatalist" id="inputTrainer" placeholder="Search..."/>
        <datalist id="trainerDatalist">
          {props.trainer.map((trainer, i) => (
            <option value={trainer} key={i}/>
          ))}
        </datalist>

        <label htmlFor="form-check" className="form-label">Prerequisites</label>
        <div className="form-check">  
          {props.prerequisites.map((prereq, i) => (
            <div key={i}>
              <input className="form-check-input" type="checkbox" value={i} id="inputPrerequisites"/>
              <label htmlFor="inputPrerequisites" className="form-check-label" >{prereq}</label>
            </div>
          ))}
        </div>

        <label htmlFor="inputDescription" className="form-label">Descripton</label>
        <input className="form-control" id="inputDescription"/>

      </form>

      

    </div>
  )
}

CreateCourse.defaultProps = {
  trainer: ["Daniel Lim", "Brock Place", "Misty Holder"],
  prerequisites: ["IS110", "IS111", "IS112", "IS113"],
}

CreateCourse.propTypes = {
  trainer: array,
  prerequisites: array,
}

export default CreateCourse
