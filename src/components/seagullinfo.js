import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from 'react-bootstrap/Modal';
import seagull1 from '../image/seagull1.png'
import seagull2 from '../image/seagull2.png'
import seagull3 from '../image/seagull3.png'
import seagull4 from '../image/seagull4.png'
import seagull5 from '../image/seagull5.png'

function SetSeagull(props){
    if (props.lv === 0){
        return <img src={seagull1} alt="..."  className='img-thumbnail' style={{ width: '8rem',  }}/>
    }
    else if (props.lv > 0 && props.lv < 10){
        return <img src={seagull2} alt="..."  className='img-thumbnail' style={{ width: '8rem' }}/>
    }
    else if (props.lv >= 10 && props.lv < 15){
        return <img src={seagull3} alt="..."  className='img-thumbnail' style={{ width: '8rem' }}/>
    }
    else if (props.lv >= 15 && props.lv < 20){
        return <img src={seagull4} alt="..."  className='img-thumbnail' style={{ width: '8rem' }}/> 
    }
    else if (props.lv >= 20){
        return <img src={seagull5} alt="..."  className='img-thumbnail' style={{ width: '8rem' }}/> 
    }
    
    
}

const SeagullInfo = ({tasksCompleted, level, closeModal}) => {
    var seagull = <SetSeagull lv = {20}/>
    
    return (
        <div style={closeModal ? {display: "None"}:{}}>
            <Modal.Dialog>
                <Modal.Body>
                    {seagull}
                    <h2>Level {level}</h2>
                    <p>Tasks Completed: {tasksCompleted}</p>
                </Modal.Body>
            </Modal.Dialog>
        </div>
    )
}
export default SeagullInfo;