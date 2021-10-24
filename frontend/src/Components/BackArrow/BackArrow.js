import * as Bi from 'react-icons/bi'
import { useHistory } from 'react-router-dom';

const BackArrow = () => {
    let history = useHistory();
    return (<button onClick={() => history.goBack()}>
        <Bi.BiArrowBack className="back-arrow" />
    </button>
    )
}

export default BackArrow