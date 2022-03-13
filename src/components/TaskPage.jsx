import React, { useState, useEffect } from "react";
import Task from "./Task";
import Folder from "./Folder";

export default function TaskPage(props) {
  let [taskData, setTaskData] = useState(null);

  const getTaskData = () => {
    let temp = JSON.parse(localStorage.getItem("task_data"));

    // Put tasks into their folders and group tasks without a folder
    for (let i = 0; i < temp.tasks.length; i++) {
      const taskFolder = temp.tasks[i].folder;
      if (taskFolder) {
        if (!temp.folders[taskFolder].tasks) {
          temp.folders[taskFolder].tasks = [];
        }
        temp.folders[taskFolder].tasks.push(temp.tasks[i]);
      } else {
        if (!temp.otherTasks) {
          temp.otherTasks = [];
        }
        temp.otherTasks.push(temp.tasks[i]);
      }
    }
    setTaskData(temp);
  };

  useEffect(() => {
    getTaskData();
  }, []);

  if (taskData) {
    return (
      <div style={{ paddingLeft: "10%", paddingRight: "10%" }}>
        <Folder folder={taskData.folders[1]} />
        <Task task={taskData.otherTasks[0]} />
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}
