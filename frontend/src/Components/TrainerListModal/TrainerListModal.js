import { array, bool, func, object } from 'prop-types';
import TrainerImages from '../../Assets/TrainerImages/TrainerImages'
import Modal from 'react-bootstrap/Modal'
import * as Bs from 'react-icons/bs'
import './TrainerListModal.css'

const TrainerListModal = (props) => {

    return (
        <>
            <Modal show={props.show} onHide={props.onHide} centered>
                <div className="modal-box">
                    <h5>
                        Select Trainer
                        <button className='closing-icon' onClick={props.onHide}>
                            <Bs.BsX size={30} />
                        </button>
                    </h5>
                    {props.trainerList.map((employee) => (
                        <div
                            key={employee.id}
                            className="trainer-row"
                            onClick={() => {
                                props.setTrainerID(employee.id)
                                props.onHide()
                            }}>
                            <img
                                src={TrainerImages[employee.id % 8].default}
                                className="profile-image shadow trainer-image"
                            />
                            <div className="trainer-desc">
                                <h5>{employee.name}</h5>
                                <p className="trainer-role">{props.userTypeString[employee.user_type]}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Modal>
        </>
    )
}
TrainerListModal.propTypes = {
    trainerList: array,
    show: bool,
    onHide: func,
    setTrainerID: func,
    userTypeString: object,
}

export default TrainerListModal;