import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from 'react-bootstrap/Modal';
import seagull1 from '../image/seagull1.png'
import seagull2 from '../image/seagull2.png'
import seagull3 from '../image/seagull3.png'
import seagull4 from '../image/seagull4.png'
import seagull5 from '../image/seagull5.png'

import SeagullFly from './seagullFly';
function SetSeagull(props){
    if (props.lv === 0){
        return <img src={seagull1} alt="..."  className='img-thumbnail' style={{ width: '8rem', height: ' 8rem', border: 'none' }}/>
    }
    else if (props.lv > 0 && props.lv < 10){
        return <img src={seagull2} alt="..."  className='img-thumbnail' style={{ width: '8rem' , height: ' 8rem', border: 'none'}}/>
    }
    else if (props.lv >= 10 && props.lv < 15){
        return <img src={seagull3} alt="..."  className='img-thumbnail' style={{ width: '8rem' , height: ' 8rem', border: 'none'}}/>
    }
    else if (props.lv >= 15 && props.lv < 20){
        return <img src={seagull4} alt="..."  className='img-thumbnail' style={{ width: '8rem' , height: ' 8rem', border: 'none'}}/> 
    }
    else if (props.lv >= 20){
        return <img src={seagull5} alt="..."  className='img-thumbnail' style={{ width: '8rem' , height: ' 8rem', border: 'none'}}/> 
    }
    
    
}

const SeagullInfo = ({tasksCompleted, level}) => {
    var seagull = <SetSeagull lv = {15}/>

    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);

    return (
        <Modal show={show} onHide={handleClose} style={{textAlign: "center", border: 'none', top:'20%'}} class="justify-content-center">
            
            <Modal.Body style={{border:'none'}}>
                {seagull}
                <h2 style={{paddingTop:"0.5em"}}>Level {level}</h2>
                <p>Tasks Completed: {tasksCompleted}</p>
            </Modal.Body>
            <SeagullFly />
        </Modal>
    )
}
export default SeagullInfo;