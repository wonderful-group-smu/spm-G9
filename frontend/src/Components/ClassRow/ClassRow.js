import { useState } from 'react'
import { array, bool, func, number, object, string } from 'prop-types'
import * as Bs from 'react-icons/bs'
import * as Cg from 'react-icons/cg'
import { Link } from 'react-router-dom'
import './ClassRow.css'

const ClassRow = (props) => {
    const courseClass = props.courseClass
    const [selected, setSelected] = useState(false)

    const handleClickSelect = (event) => {
        event.preventDefault()
        if (!selected) {
            props.setSelectedArr([...props.selectedArr, courseClass.trainer_id])
        } else {
            props.setSelectedArr(
                props.selectedArr.filter((item) => {
                    return item !== courseClass.trainer_id
                })
            )
        }
        setSelected(!selected)
    }

    return (
        <div className='row content-row' onClick={props.deleteMode ? handleClickSelect : null}>
            <div className='col'>
                <div className='header-row'>Trainer ID</div>
                {courseClass.trainer.id}
            </div>
            <div className='col'>
                <div className='header-row'>Trainer Name</div>
                {courseClass.trainer.name}
            </div>
            <div className='col'>
                <div className='header-row'>Start Date</div>
                {courseClass.start_date ? courseClass.start_date.slice(0, 10) : "NIL"}
            </div>
            <div className='col'>
                <div className='header-row'>End Date</div>
                {courseClass.end_date ? courseClass.end_date.slice(0, 10) : "NIL"}
            </div>

            <div className='col'>
                <Bs.BsCircle
                    className='checkboxClass'
                    hidden={selected || !props.deleteMode}
                />
                <Bs.BsCheckCircle
                    className='checkboxClass checked'
                    hidden={!selected || !props.deleteMode}
                />
            </div>

            <div className='col'>
                <div className='header-row action'>Action</div>
                <Link
                    id='classbutton'
                    to={props.link}
                    className='arrow'
                >
                    <Cg.CgArrowLongRight size={20} />
                </Link>
            </div>
        </div>
    )
}

ClassRow.propTypes = {
    courseClass: object,
    trainer: object,
    trainer_id: number,
    start_date: string,
    end_date: string,
    deleteMode: bool,
    setSelectedArr: func,
    selectedArr: array,
    link: object,
}

export default ClassRow;