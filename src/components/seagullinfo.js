import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import seagull1 from "../images/seagull1.png";
import seagull2 from "../images/seagull2.png";
import seagull3 from "../images/seagull3.png";
import seagull4 from "../images/seagull4.png";
import seagull5 from "../images/seagull5.png";
import mainSeagullImage from "../images/main-seagull.png";
import "../style/darkMode.css";
function SetSeagull(props) {
  if (!props.lv || props.lv === 0) {
    return (
      <img
        src={seagull1}
        alt="..."
        className="img-thumbnail"
        style={{ width: "8rem", height: " 8rem", border: "none" }}
      />
    );
  } else if (props.lv > 0 && props.lv < 10) {
    return (
      <img
        src={seagull2}
        alt="..."
        className="img-thumbnail"
        style={{ width: "8rem", height: " 8rem", border: "none" }}
      />
    );
  } else if (props.lv >= 10 && props.lv < 15) {
    return (
      <img
        src={seagull3}
        alt="..."
        className="img-thumbnail"
        style={{ width: "8rem", height: " 8rem", border: "none" }}
      />
    );
  } else if (props.lv >= 15 && props.lv < 20) {
    return (
      <img
        src={seagull4}
        alt="..."
        className="img-thumbnail"
        style={{ width: "8rem", height: " 8rem", border: "none" }}
      />
    );
  } else if (props.lv >= 20) {
    return (
      <img
        src={seagull5}
        alt="..."
        className="img-thumbnail"
        style={{ width: "8rem", height: " 8rem", border: "none" }}
      />
    );
  }
}

const SeagullInfo = ({ tasksCompleted, settings }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const tasks_for_level_up = settings?.tasks_for_level_up;
  const level = Math.round(tasksCompleted / tasks_for_level_up);

  var seagull = <SetSeagull lv={level} />;
  return (
    <div>
      <img
        onClick={() => setShow(true)}
        src={mainSeagullImage}
        width={40}
        style={{ cursor: "pointer" }}
      />
      <Modal
        show={show}
        onHide={handleClose}
        style={{ textAlign: "center", border: "none", top: "20%" }}
        class="justify-content-center"
        id="dark-modal"
      >
        <Modal.Body id="dark-modal" style={{ border: "none"}}>
          {seagull}
          <h2 style={{ paddingTop: "0.5em" }}>Level {level}</h2>
          <p>Tasks Completed: {tasksCompleted}</p>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default SeagullInfo;
