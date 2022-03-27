import React from "react";
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
          {props.folder?.name} (
          {props.folder.tasks ? props.folder.tasks.length : 0})
        </span>
      </div>
      {openDropdown ? (
        <div style={{ marginLeft: "25px" }}>
          {props.folder?.tasks?.map((task, index) => {
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
