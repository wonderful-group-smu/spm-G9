import CourseCard from '../../Components/CourseCard/CourseCard'
import '../Pagelayout.css'

const Enrolled = () => {
  return (
    <div id='pagelayout'>

      <div id='section-header'>
        <h5 id='page-title'>Enrolled Courses</h5>
      </div>
      
      <div className='row' >
        <div>
          {Array(3).fill().map((i) => (
            <CourseCard key={{ i }}
              cardTitle="IS110: Python Programming"
              cardText="Starts on 12 Jan 2021, End on 12 Mar 2021"
              instructor="Daniel Lim (Senior Engineer)"
              link='/optionselection'
              
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Enrolled
