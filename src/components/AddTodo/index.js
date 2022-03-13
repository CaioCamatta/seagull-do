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

const AddTodo = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
              <Form.Control type="text" placeholder="Task Title" />
            </Form.Group>

            <InputGroup className="mb-3">
              <FormControl
                placeholder="Date"
                aria-label="Date"
                type="date"
                style={{ paddingRight: 5 }}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <TodoFolderSelect />
            </InputGroup>
            <InputGroup className="mb-3">
              <TodoPrioritySelect />
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
                onClick={handleClose}
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
