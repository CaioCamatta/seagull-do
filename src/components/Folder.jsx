import React from "react";
import { useState } from "react";
import { BsFolder, BsFolder2Open } from "react-icons/bs";
import Task from "./Task"

export default function Folder(props) {
  let [openDropdown, setOpenDropdown] = useState(false);
  
  return (
    <div>
      <div
        className="d-flex align-items-center"
        onClick={() => {
          setOpenDropdown(!openDropdown);
        }}
      >
        {!openDropdown ? (
          <BsFolder size={40} style={{ marginRight: "17px" }} />
        ) : (
          <BsFolder2Open size={40} style={{ marginRight: "17px" }} />
        )}

        <span style={{ fontSize: "24px" }}>{props.folder?.name}</span>
      </div>
      {openDropdown ? (
        <div style={{marginLeft: "25px"}}>
          {props.folder.tasks.map((task, index) => {
            return <Task key={index} task={task} />;
          })}
        </div>
      ) : null}
    </div>
  );
}
