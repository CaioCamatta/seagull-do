import React from "react";
import { Button } from "react-bootstrap";
import { BsPencil } from "react-icons/bs";
import { useState } from "react";
import SeagullFly from "./seagullFly";
import "../style/animateTask.css";

export default function Task(props) {
  var taskName = props.task.name;
  const [checked, setChecked] = useState(false);
  const completeTask = () => {
    document.getElementById(taskName).classList.add("task-container");
    document.getElementById(taskName).classList.add("task--one");

    setChecked(!checked);
    setTimeout(() => {
      setChecked(checked);
      const updatedTask = { ...props.task, completed: !checked };
      props.editTaskFunction(props.task.id, updatedTask);
    }, 3000);
  };

// Play a seagull scream.
const playScream = () => {
    let temp = JSON.parse(localStorage.getItem("seagull_settings"));
    let path = require("../screams/" + temp.seagull_scream);
    let audio = new Audio(path);
    audio.play();
};

  return (
    <div
      id={taskName}
      className="d-flex justify-content-between align-items-center"
    >
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
          onChange={completeTask}
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
      {checked ? playScream() : null}
      {checked ? <SeagullFly /> : null}
    </div>
  );
}
