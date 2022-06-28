import { useModalGlobal } from "context/Modal";
import React from "react";
import { Button, Modal } from "react-bootstrap";

const FinishedRound = () => {
  const { hideModal, store } = useModalGlobal();
  const { modalProps } = store || {};
  const { title, btnClose } = modalProps || {};

  const handleModalToggle = () => {
    hideModal();
  };

  return (
    <Modal
      show={true}
      onHide={handleModalToggle}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {title || "Rules"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h2>FINISHED ROUND</h2>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={handleModalToggle}>
          {btnClose || "Close"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FinishedRound;
