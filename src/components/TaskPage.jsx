import React, { useState, useEffect } from "react";
import Task from "./Task";
import Folder from "./Folder";
import AddTodo from "../components/AddTodo";

export default function TaskPage(props) {
  // Formatted data from local storage to make mapping easier
  let [taskData, setTaskData] = useState(null);

  /* Functions for handling folders */
  const getFolders = () => {
    return taskData.folders;
  };

  /* Functions for handling tasks */
  const AddFolder = (folder) => {
    // Update local storage
    let temp = JSON.parse(localStorage.getItem("task_data"));
    let max = -1;
    for (const key in temp.folders) {
      if (key > max) {
        max = key;
      }
    }
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
    temp.tasks.push(task);
    localStorage.setItem("task_data", JSON.stringify(temp));
    setTaskData(formatTaskData(temp));
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
      <div style={{ paddingLeft: "10%", paddingRight: "10%" }}>
        {Object.keys(taskData.folders).map((key) => {
          return <Folder key={key} folder={taskData.folders[key]} />;
        })}
        {taskData.otherTasks.map((task, index) => {
          return <Task key={index} task={task} />;
        })}
        <AddTodo />
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}
