import React from "react";
import { Button, Modal } from "react-bootstrap";
import Rule from "../Rules";
import "./style.css";

const CustomModal = (props) => {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Reglas</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Rule />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={props.onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
