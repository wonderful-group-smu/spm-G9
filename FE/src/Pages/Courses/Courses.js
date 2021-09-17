import CourseCard from '../../Components/CourseCard/CourseCard'
import '../Pagelayout.css'

const Courses = () => {
  return (
    <div id='pagelayout'>
      <h5>Courses</h5>

      <div className='row' >
        <div>
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <CourseCard />
          
          ))}
        </div>
      </div>
    </div>
  )
}

export default Courses
