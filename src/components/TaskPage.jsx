import React, { useState, useEffect } from "react";
import Task from "./Task";
import Folder from "./Folder";

export default function TaskPage(props) {
  // Formatted data from local storage to make mapping easier
  let [taskData, setTaskData] = useState(null);

  /* Functions for manipulating tasks */
  const addTask = (task) => {
      // Update local storage
    let temp = JSON.parse(localStorage.getItem("task_data"));
    temp.tasks.push(task)
    localStorage.setItem("task_data", JSON.stringify(temp));

    // Update the formatted data with this task (add to correct folder or group with non-foldered tasks)
    let tempTaskData = taskData
    if (task.folder) {
        tempTaskData.folders[task.folder].tasks.push(task)
    } else {
        tempTaskData.otherTasks.push(task)
    }
    
  };

  const editTask = (taskId, task) => {};

  const completeTask = () => {};

  const deleteTask = () => {};

  // Get the task data from local storage
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
        {Object.keys(taskData.folders).map((key) => {
          return <Folder key={key} folder={taskData.folders[key]} />;
        })}
        {taskData.otherTasks.map((task, index) => {
          return <Task key={index} task={task} />;
        })}
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}
