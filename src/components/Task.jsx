import React from "react";
import { Button } from "react-bootstrap";
import { BsPencil } from "react-icons/bs";

export default function Task(props) {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        <input
          style={{
            marginRight: "35px",
            width: "25px",
            height: "25px",
            outlineStyle: "none !important",
            border: "2px solid red !important",
            borderRadius: "2px",
          }}
          type="checkbox"
        ></input>
        <div style={{ marginTop: "5px" }}>
          <div className="" style={{ fontSize: "24px" }}>
            <span>{props.task.name}</span>
          </div>
          <div className="" style={{ fontSize: "12px" }}>
            {props.task.date ? (
              new Date(props.task.date + " ").toLocaleDateString("en-CA")
            ) : (
              <span> &#x200b;</span>
            )}
          </div>
        </div>
      </div>
      <div>{props.editTask}</div>
    </div>
  );
}
