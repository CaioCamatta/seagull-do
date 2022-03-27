import React, { useMemo } from "react";
import { useState } from "react";
import { BsFolder, BsFolder2Open } from "react-icons/bs";
import {
  FaFolder,
  FaRegFolder,
  FaFolderOpen,
  FaRegFolderOpen,
} from "react-icons/fa";
import Task from "./Task";
import AddTodo, { EDIT } from "./AddTodo";

export default function Folder(props) {
  let [openDropdown, setOpenDropdown] = useState(false);

  const count = useMemo(() => {
    let c = 0;

    if (props.folder.tasks) {
      for (let task of props?.folder?.tasks) {
        if (!task.completed) c++;
      }
    }

    return c;
  }, [props?.folder?.tasks]);

  return (
    <div>
      <div
        className="d-flex align-items-center"
        onClick={() => {
          setOpenDropdown(!openDropdown);
        }}
      >
        {!openDropdown ? (
          props.folder?.colorCode ? (
            <FaFolder
              size={40}
              style={{ marginRight: "17px" }}
              color={props.folder?.colorCode}
            />
          ) : (
            <FaRegFolder size={40} style={{ marginRight: "17px" }} />
          )
        ) : props.folder?.colorCode ? (
          <FaFolderOpen
            size={40}
            style={{ marginRight: "17px" }}
            color={props.folder?.colorCode}
          />
        ) : (
          <FaRegFolderOpen size={40} style={{ marginRight: "17px" }} />
        )}

        <span style={{ fontSize: "24px" }}>
          {props.folder?.name} ({props.folder.tasks ? count : 0})
        </span>
      </div>
      {openDropdown ? (
        <div style={{ marginLeft: "25px" }}>
          {props.folder?.tasks?.map((task, index) => {
            if (!task.completed)
              return (
                <Task
                  key={index}
                  task={task}
                  editTask={
                    <AddTodo
                      folders={props.folders}
                      mode={EDIT}
                      editTask={props.editTask}
                      existingTodo={task}
                    />
                  }
                />
              );
          })}
        </div>
      ) : null}
    </div>
  );
}
