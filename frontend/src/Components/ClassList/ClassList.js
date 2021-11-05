import React, { useState, useEffect } from 'react'
import './ClassList.css'
import * as Md from 'react-icons/md'
// import * as Bs from 'react-icons/bs'
import HrAssignModal from '../HrAssignModal/HrAssignModal'
import { number } from 'prop-types'
import { getClassDetails,  } from '../../Apis/Api'


const ClassList = (props) => {
  const [modalShow, setModalShow] = useState(false)
  const [enrollmentsArr, setEnrollmentArr] = useState([])

  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    getClassDetails(props.course_id, props.trainer_id)
      .then((response) => {
        console.log(response.data.enrollments, 'hiii')
        setEnrollmentArr(response.data.enrollments)
      })
      .then(() => {
        setLoading(false)
      })
    
    console.log("reload!!!");
  }, [modalShow])

  return (
    <>
      {isLoading ? (
        <h5 className='retrieving'>Retrieving class list... </h5>
      ) : (
        <>
          <div style={{ textAlign: 'right' }}>
            <button className='add-engineer' onClick={() => setModalShow(true)}>
              <Md.MdAdd size={20} /> ADD ENGINEERS
            </button>
          </div>

          <div className='white-bg'>
            <div className='row header-row-class'>
              <div className='col-2'>Engineer ID</div>
              <div className='col-4'>Name</div>
              <div className='col-4'>Email</div>
            </div>
            {enrollmentsArr.map((data) => {
              if (data.is_official) {
                return (
                  <>
                    <div className='row content-row' key={data.eng.id}>
                      <div className='col-2'>{data.eng.id}</div>
                      <div className='col-4'>{data.eng.name}</div>
                      <div className='col-4'>{data.eng.name}@gmail.com</div>
                    </div>
                  </>
                )
              }
            })}
          </div>
        </>
      )}

      <HrAssignModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        course_id={props.course_id}
        trainer_id={props.trainer_id}
        // submit={setModalShow(false)}
        submit={() => {
          setTimeout(function() {
            setModalShow(false);
          }, 500);
          
        }}
      />
    </>
  )
}

ClassList.propTypes = {
  course_id: number,
  trainer_id: number,
}

export default ClassList
