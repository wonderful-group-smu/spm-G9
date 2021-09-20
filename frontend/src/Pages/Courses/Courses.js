import CourseCard from '../../Components/CourseCard/CourseCard'
import '../Pagelayout.css'

import { Link } from 'react-router-dom'

const Courses = () => {
  return (
    <div id='pagelayout'>

      <div id='section-header'>
        <h5 id='page-title'>Courses</h5>
        <Link to='/createcourse'>
          <button className="btn btn-secondary">Create a Course</button>
        </Link>
      </div>

      <div className='row' >
        <div>
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <CourseCard key={{ i }}
              cardTitle="IS110: Python Programming"
              cardText="Starts on 12 Jan 2021, End on 12 Mar 2021"
              instructor="Daniel Lim (Senior Engineer)"
            />
          ))}
          
        </div>
      </div>
    </div>
  )
}

export default Courses
