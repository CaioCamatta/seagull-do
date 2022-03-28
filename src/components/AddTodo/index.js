import { useState } from "react";
import {
  Button,
  Form,
  Modal,
  InputGroup,
  FormControl,
  Row,
  Col,
} from "react-bootstrap";
import { MdAddCircleOutline } from "react-icons/md";
import { ImCheckmark, ImCross } from "react-icons/im";
import { IoTrashBin } from "react-icons/io5";
import { BsPencil } from "react-icons/bs";
import TodoFolderSelect from "./TodoFolderSelect";
import TodoPrioritySelect from "./TodoPrioritySelect";
//For Darkseid
import "../../style/darkMode.css";
export const EDIT = "EDIT";
export const CREATE = "CREATE";

const AddTodo = ({ addTask, editTask, folders, mode, existingTodo }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    if (!!title) {
      if (
        window.confirm(
          "Are you sure you want to cancel adding this task? Your input will be lost."
        )
      ) {
        setShow(false);
      }
    } else {
      setShow(false);
    }
  };
  const handleShow = () => setShow(true);

  const [priority, setPriority] = useState(existingTodo?.priority);
  const [folder, setFolder] = useState(existingTodo?.folder);
  const [title, setTitle] = useState(existingTodo?.name);
  const [date, setDate] = useState(existingTodo?.date);

  const [showError, setShowError] = useState(false);

  const handleConfirm = () => {
    if (!title) {
      setShowError(true);
    } else {
      let task = {
        name: title,
        folder,
        priority,
        date,
        completed: false,
      };

      if (mode === CREATE) addTask(task);
      if (mode === EDIT) editTask(existingTodo.id, task);
      setShow(false);
    }
  };

  const handleDelete = () => {
    if (
      window.confirm(
        "Are you sure you want to delete this todo? You will not earn any Seagul Points"
      )
    ) {
      editTask(existingTodo.id, { ...existingTodo, completed: true });
      handleClose();
    }
  };

  console.log({ existingTodo });

  return (
    <>
      {mode === CREATE && (
        <Button
          onClick={handleShow}
          style={{ backgroundColor: "transparent", border: "transparent" }}
        >
          <MdAddCircleOutline size={40} id="fp-icon" />
        </Button>
      )}
      {mode === EDIT && (
        <Button
          onClick={handleShow}
          style={{
            backgroundColor: "transparent",
            border: "transparent",
            padding: 0,
            margin: 0,
            color: "black",
          }}
        >
          <BsPencil size={25} />
        </Button>
      )}

      <Modal show={show} onHide={handleClose} fullscreen>
        <Modal.Header id="dark-modal">
          <Modal.Title>{mode === CREATE ? "Add" : "Edit"} Todo</Modal.Title>
          {mode === EDIT && (
            <Button
              style={{
                backgroundColor: "transparent",
                border: "transparent",
                padding: 0,
                margin: 0,
                color: "red",
                fontSize: 24,
              }}
              onClick={() => handleDelete()}
            >
              <IoTrashBin />
            </Button>
          )}
        </Modal.Header>
        <Modal.Body id="dark-modal">
          <Form>
            <Form.Group className="mb-3">
              {showError && !title && (
                <span className="text-danger">Required</span>
              )}
              <Form.Control
                isInvalid={showError && !title}
                type="text"
                placeholder="Task Title"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                defaultValue={existingTodo?.name}
              />
            </Form.Group>

            <InputGroup className="mb-3">
              {mode === CREATE || !existingTodo.date ? (
                <FormControl
                  placeholder="Date"
                  aria-label="Date"
                  type="text"
                  style={{ paddingRight: 5 }}
                  onFocus={(e) => {
                    e.currentTarget.type = "date";
                  }}
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                />
              ) : (
                <FormControl
                  placeholder="Date"
                  aria-label="Date"
                  type="date"
                  style={{ paddingRight: 5 }}
                  defaultValue={existingTodo?.date}
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                />
              )}
            </InputGroup>
            <InputGroup className="mb-3">
              <TodoFolderSelect
                setFolder={setFolder}
                folders={folders}
                defaultValue={existingTodo?.folder}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <TodoPrioritySelect
                setPriority={setPriority}
                defaultValue={existingTodo?.priority}
              />
            </InputGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer id="dark-modal">
          <Row style={{ width: "100%", padding: 0 }}>
            <Col xs={2}>
              <Button
                onClick={handleClose}
                style={{
                  backgroundColor: "transparent",
                  border: "transparent",
                  padding: 0,
                  margin: 0,
                }}
              >
                <ImCross size={40} id="fp-icon" />
              </Button>
            </Col>
            <Col xs={8} />
            <Col xs={2}>
              <Button
                onClick={handleConfirm}
                style={{
                  backgroundColor: "transparent",
                  border: "transparent",
                  padding: 0,
                  margin: 0,
                }}
              >
                <ImCheckmark size={40} id="fp-icon" />
              </Button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddTodo;
