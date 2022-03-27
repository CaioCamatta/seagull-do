import React, { useState, useEffect } from "react";
import Task from "./Task";
import Folder from "./Folder";
import AddTodo from "../components/AddTodo";
import AddFolder from "../components/AddFolder";
import {
  Button,
  Form,
  Modal,
  InputGroup,
  FormControl,
  Row,
  Col,
  Navbar,
} from "react-bootstrap";
import { GrUserSettings } from "react-icons/gr";
import { BsFillGearFill } from "react-icons/bs";
import { AiOutlineInfoCircle } from "react-icons/ai";
import seagull from "../images/main-seagull.png";
import { SETTINGS_PAGE } from "../App";
import ReactTooltip from "react-tooltip";

export default function TaskPage(props) {
  // Formatted data from local storage to make mapping easier
  let [taskData, setTaskData] = useState(null);

  /* Functions for handling folders */
  const getFolders = () => {
    return taskData.folders;
  };

  /* Functions for handling tasks */
  const addFolder = (folder) => {
    // Update local storage
    let temp = JSON.parse(localStorage.getItem("task_data"));
    let max = -1;
    for (const key in temp.folders) {
      if (key > max) {
        max = key;
      }
    }

    max = parseInt(max);

    temp.folders[max + 1] = folder;
    localStorage.setItem("task_data", JSON.stringify(temp));
    setTaskData(formatTaskData(temp));
  };

  const editFolder = (folderId, folder) => {
    // Update local storage
    let temp = JSON.parse(localStorage.getItem("task_data"));
    temp.folders[folderId] = folder;
    localStorage.setItem("task_data", JSON.stringify(temp));
    setTaskData(formatTaskData(temp));
  };

  const deleteFolder = (taskId) => {
    // Update local storage
    let temp = JSON.parse(localStorage.getItem("task_data"));
    delete temp.folders[taskId];
    localStorage.setItem("task_data", JSON.stringify(temp));
    setTaskData(formatTaskData(temp));
  };

  /* Functions for handling tasks */
  const addTask = (task) => {
    // Update local storage
    let temp = JSON.parse(localStorage.getItem("task_data"));
    task = { ...task, id: getMaxId() + 1 };
    temp.tasks.push(task);
    localStorage.setItem("task_data", JSON.stringify(temp));
    setTaskData(formatTaskData(temp));
  };

  const getMaxId = () => {
    let temp = JSON.parse(localStorage.getItem("task_data"));

    console.log({ temp });

    let max = -1;
    for (let task of temp.tasks) {
      max = Math.max(max, task.id);
    }
    return max;
  };

  const editTask = (taskId, task) => {
    // Update local storage
    let temp = JSON.parse(localStorage.getItem("task_data"));
    for (let i = 0; i < temp.tasks.length; i++) {
      if (temp.tasks[i].id === taskId) {
        temp.tasks[i] = task;
        break;
      }
    }
    localStorage.setItem("task_data", JSON.stringify(temp));
    setTaskData(formatTaskData(temp));
  };

  const completeTask = (taskId) => {
    // Update local storage
    let temp = JSON.parse(localStorage.getItem("task_data"));
    for (let i = 0; i < temp.tasks.length; i++) {
      if (temp.tasks[i].id === taskId) {
        temp.tasks[i].completed = true;
        break;
      }
    }
    localStorage.setItem("task_data", JSON.stringify(temp));
    setTaskData(formatTaskData(temp));
  };

  const deleteTask = (taskId) => {
    // Update local storage
    let temp = JSON.parse(localStorage.getItem("task_data"));
    for (let i = 0; i < temp.tasks.length; i++) {
      if (temp.tasks[i].id === taskId) {
        temp.tasks.splice(i, 1);
        break;
      }
    }
    localStorage.setItem("task_data", JSON.stringify(temp));
    setTaskData(formatTaskData(temp));
  };

  // Format the local storage data to be used in taskData hook
  const formatTaskData = (data) => {
    // Put tasks into their folders and group tasks without a folder
    for (let i = 0; i < data.tasks.length; i++) {
      const taskFolder = data.tasks[i].folder;
      if (taskFolder) {
        if (!data.folders[taskFolder].tasks) {
          data.folders[taskFolder].tasks = [];
        }
        data.folders[taskFolder].tasks.push(data.tasks[i]);
      } else {
        if (!data.otherTasks) {
          data.otherTasks = [];
        }
        data.otherTasks.push(data.tasks[i]);
      }
    }
    delete data.tasks;
    return data;
  };

  // Get the task data from local storage
  const getTaskData = () => {
    let temp = JSON.parse(localStorage.getItem("task_data"));
    setTaskData(formatTaskData(temp));
  };

  useEffect(() => {
    getTaskData();
  }, []);

  if (taskData) {
    return (
      <div>
        <Header setPage={props.setPage} />
        <div style={{ borderBottom: "solid black 4px", marginBottom: 10 }} />
        <div style={{ paddingLeft: "10%", paddingRight: "10%" }}>
          {Object.keys(taskData.folders).map((key) => {
            return <Folder key={key} folder={taskData.folders[key]} />;
          })}
          {taskData.otherTasks.map((task, index) => {
            return <Task key={index} task={task} />;
          })}
          <Footer
            addFolder={addFolder}
            addTask={addTask}
            folders={getFolders()}
          />
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}

const Header = ({ setPage }) => {
  const tooltip_info =
    "Welcome to Seagull Do! To get started, hit the bottom left button to make a folder. The bottom right button will create a task. Then you can use the pencil icon to edit that task! Good luck!";
  return (
    <Navbar>
      <Row style={{ width: "100%", padding: 0 }}>
        <Col xs={1}>
          <BsFillGearFill
            className="mt-1"
            color="black"
            onClick={() => setPage(SETTINGS_PAGE)}
            size={30}
          />
        </Col>
        <Col xs={2}>
          <AiOutlineInfoCircle
            className="mt-1"
            color="black"
            size={30}
            data-tip={tooltip_info}
            data-for="info-tooltip"
          />
        </Col>
        <Col xs={7} style={{ textAlign: "center" }}>
          <span style={{ fontSize: 24 }}> Seagull - Do</span>
        </Col>
        <Col xs={2}>
          <img src={seagull} width={40} />
        </Col>
      </Row>
      <ReactTooltip id="info-tooltip" place="right" overridePosition={()=>{return {top: 2}}}/>
    </Navbar>
  );
};

const Footer = ({ addFolder, addTask, folders }) => {
  return (
    <Navbar fixed="bottom">
      <Row
        style={{ width: "100%", padding: 0, paddingLeft: 25, paddingRight: 25 }}
      >
        <Col xs={2}>
          <AddFolder addFolder={addFolder} />
        </Col>
        <Col xs={8} />
        <Col xs={2}>
          <AddTodo addTask={addTask} folders={folders} />
        </Col>
      </Row>
    </Navbar>
  );
};
