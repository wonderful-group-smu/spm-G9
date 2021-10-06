import React from 'react'
import "./HrClasses.css"
import * as Cg from 'react-icons/cg'
import { Link} from 'react-router-dom'

const HrAssign = () => {
  return (
    <div id='pagelayout'>
      <div className='white-bg'>
        <h5>All Classes</h5>

        <div className='row content-row'>
          <div className='col'>
            <div className='header-row'>Course ID</div>IS211
          </div>
          <div className='col'>
            <div className='header-row'>Trainer ID</div>
            T2519
          </div>
          <div className='col'>
            <div className='header-row'>Start Date</div>
            23 Mar 2022
          </div>
          <div className='col'>
            <div className='header-row'>End Date</div>
            30 Mar 2022
          </div>
       
          <div className='col'>
            <div className='header-row action'>Action</div>
            <Link to='/hrclassdetails' className='arrow'>
              <Cg.CgArrowLongRight size={20} />
            </Link>
          </div>
        </div>


        <div className='row content-row'>
          <div className='col'>
            <div className='header-row'>Course ID</div>IS211
          </div>
          <div className='col'>
            <div className='header-row'>Trainer ID</div>
            T2519
          </div>
          <div className='col'>
            <div className='header-row'>Start Date</div>
            23 Mar 2022
          </div>
          <div className='col'>
            <div className='header-row'>End Date</div>
            30 Mar 2022
          </div>
       
          <div className='col'>
            <div className='header-row action'>Action</div>
            <button className='arrow'>
              <Cg.CgArrowLongRight size={20} />
            </button>
          </div>
        </div>


        <div className='row content-row'>
          <div className='col'>
            <div className='header-row'>Course ID</div>IS211
          </div>
          <div className='col'>
            <div className='header-row'>Trainer ID</div>
            T2519
          </div>
          <div className='col'>
            <div className='header-row'>Start Date</div>
            23 Mar 2022
          </div>
          <div className='col'>
            <div className='header-row'>End Date</div>
            30 Mar 2022
          </div>
       
          <div className='col'>
            <div className='header-row action'>Action</div>
            <button className='arrow'>
              <Cg.CgArrowLongRight size={20} />
            </button>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default HrAssign