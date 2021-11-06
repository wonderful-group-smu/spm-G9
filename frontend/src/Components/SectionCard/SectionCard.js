import { useState } from 'react';
import { array, bool, func, number, object } from "prop-types";
import * as Vsc from 'react-icons/vsc';
import './SectionCard.css';

const SectionCard = (props) => {
    const section = props.section;
    const uniqueID = `${section.course_id}${section.trainer_id}${props.index}`;
    const [selected, setSelected] = useState(false);

    const handleClickSelect = (event) => {
        event.preventDefault()
        if (!selected) {
            props.setSelectedArr([...props.selectedArr, section.section_id])
        } else {
            props.setSelectedArr(
                props.selectedArr.filter((item) => {
                    return item !== section.section_id
                })
            )
        }
        setSelected(!selected)
    }



    return (
        <>
            {props.index == 0 ? "" : <Vsc.VscArrowRight className="section-link" />}
            <div
                className={`card ${props.deleteMode ? "sectionCard" : ""}`}
                id={(props.deleteMode && selected) ? "selectedSectionCard" : ""}
                onClick={handleClickSelect}
            >
                <div className="card-header">
                    ENG {uniqueID}
                </div>
                <div className="card-body">
                    {section.section_name}
                </div>
            </div>
        </>
    )
}

SectionCard.propTypes = {
    section: object,
    index: number,
    deleteMode: bool,
    selectedArr: array,
    setSelectedArr: func,
}

export default SectionCard;