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
import { GrAddCircle } from "react-icons/gr";
import { ImCheckmark, ImCross } from "react-icons/im";
import TodoFolderSelect from "./TodoFolderSelect";
import TodoPrioritySelect from "./TodoPrioritySelect";

const AddTodo = ({ addTask, folders }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [priority, setPriority] = useState();
  const [folder, setFolder] = useState();
  const [title, setTitle] = useState();
  const [date, setDate] = useState();

  const handleCreate = () => {
    let task = {
      name: title,
      folder,
      priority,
      date,
      completed: false,
    };

    addTask(task);
    handleClose();
  };

  return (
    <>
      <Button
        onClick={handleShow}
        style={{ backgroundColor: "transparent", border: "transparent" }}
      >
        <GrAddCircle size={40} />
      </Button>

      <Modal show={show} onHide={handleClose} fullscreen>
        <Modal.Header>
          <Modal.Title>Add Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Task Title"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </Form.Group>

            <InputGroup className="mb-3">
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
            </InputGroup>
            <InputGroup className="mb-3">
              <TodoFolderSelect setFolder={setFolder} folders={folders} />
            </InputGroup>
            <InputGroup className="mb-3">
              <TodoPrioritySelect setPriority={setPriority} />
            </InputGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
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
                <ImCross size={40} color="black" />
              </Button>
            </Col>
            <Col xs={8} />
            <Col xs={2}>
              <Button
                onClick={handleCreate}
                style={{
                  backgroundColor: "transparent",
                  border: "transparent",
                  padding: 0,
                  margin: 0,
                }}
              >
                <ImCheckmark size={40} color="black" />
              </Button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddTodo;
