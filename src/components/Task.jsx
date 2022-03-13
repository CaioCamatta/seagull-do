import React from "react";
import { BsPencil } from "react-icons/bs";

export default function Task(props) {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        <input style={{marginRight: "35px", width: "20px", height: "20px"}} type="checkbox"></input>
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
    </div>
  );
}
