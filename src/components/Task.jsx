import React from "react";
import { BsPencil } from "react-icons/bs";
import {useState} from "react";
import SeagullFly from "./seagullFly";



export default function Task(props) {

  const [checked, setChecked] = useState(false); 
  const completeTask = () =>{
    setChecked(!checked)
  }

  return (
    <div className="d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        <input style={{marginRight: "35px", width: "25px", height: "25px", outlineStyle: "none !important", border: "2px solid red !important", borderRadius: "2px"}} 
        type="checkbox" 
        onChange={completeTask} 
        >
        </input>
        <div style={{marginTop: "5px"}}>
          <div className="" style={{fontSize: "24px"}}>
            <span>{props.task.name}</span>
          </div>
          <div className="" style={{fontSize: "12px"}}>
            24/07/2000
          </div>
        </div>
      </div>
      <div>
        <BsPencil size={25}/>
      </div>
      {checked ? <SeagullFly/> : null}

    </div>
  );
}
