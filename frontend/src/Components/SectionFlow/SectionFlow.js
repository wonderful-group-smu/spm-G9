// import { useState } from 'react'
import { array } from 'prop-types'
import * as Vsc from 'react-icons/vsc'
import './SectionFlow.css'

const SectionFlow = (props) => {
    // const [sections, setSections] = useState(props.sections)
    // const [dragTitle, setDragTitle] = useState();

    // const handleDrag = (e) => {
    //     setDragTitle(e.currentTarget.title);
    //     console.log(e.currentTarget)
    // };

    // const handleDrop = (e) => {
    //     const dragSection = sections.find((section) => section.title === dragTitle);
    //     const dropSection = sections.find((section) => section.title === e.currentTarget.title);

    //     const dragSectionOrder = dragSection.order;
    //     const dropSectionOrder = dropSection.order;

    //     const newSections = sections.map((section) => {
    //         if (section.title === dragTitle) {
    //             section.order = dropSectionOrder;
    //         }
    //         if (section.title === e.currentTarget.title) {
    //             section.order = dragSectionOrder;
    //         }
    //         return section;
    //     });
    //     setSections(newSections)
    // }

    return (
        <div className='column'>
            {
                props.sections
                    // .sort((a, b) => a.order - b.order)
                    .map((section, i) => (
                    <div key={i}>
                        {i == 0 ? "" : <Vsc.VscArrowRight className="section-link" />}
                        <button
                            type="button"
                            title={section.title}
                            id="section-btn"
                            className="btn btn-outline-primary"
                            // draggable={true}
                            // onDragOver={(ev) => ev.preventDefault()}
                            // onDragStart={handleDrag}
                            // onDrop={handleDrop}
                        >
                            {section.title}
                        </button>
                    </div>
                ))
                
            }
        </div>
    )
}

SectionFlow.defaultProps = {
    sections: [
        {
            title: "Variables & Operators",
            order: 1
        },
        {
            title: "Conditional Statements & Loops",
            order: 2
        },
        {
            title: "Lists, Tuples & Dictionaries",
            order: 3
        },
        {
            title: "File Read & Write",
            order: 4
        },
    ]
}

SectionFlow.propTypes = {
    sections: array,
}

export default SectionFlow;