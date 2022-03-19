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
import { FiFolderPlus } from "react-icons/fi";
import FolderColorSelect from "./FolderColorSelect";

const AddFolder = ({ addFolder }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [title, setTitle] = useState();
  const [color, setColor] = useState();

  const handleCreate = () => {
    let folder = {
      name: title,
      colorName: color.name,
      colorCode: color.code,
    };

    addFolder(folder);
    handleClose();
  };

  return (
    <>
      <Button
        onClick={handleShow}
        style={{ backgroundColor: "transparent", border: "transparent" }}
      >
        <FiFolderPlus size={40} color="black" />
      </Button>

      <Modal show={show} onHide={handleClose} fullscreen>
        <Modal.Header>
          <Modal.Title>Add Folder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Folder Title"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </Form.Group>

            <InputGroup className="mb-3">
              <FolderColorSelect setColor={setColor} />
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

export default AddFolder;
