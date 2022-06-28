import { MODO } from "constants/enums";
import { useGame } from "context/Game";
import { rondas, seleccionarModo } from "context/Game/action";
import { useModalGlobal } from "context/Modal";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ModalRounds = () => {
  const { hideModal, store } = useModalGlobal();
  const [messageErrorForm, setMessageErrorForm] = useState("");
  const [round, setRound] = useState("");
  const { dispatch } = useGame();
  const navigate = useNavigate();
  const { modalProps } = store || {};
  const { title, btnClose, btnPlay, pathRedirect } = modalProps || {};

  const handleModalToggleToRedirectPlay = () => {
    if (Boolean(round.length)) {
      hideModal();
      dispatch(seleccionarModo(MODO.JUGADOR_UNO));
      dispatch(rondas(round));
      navigate(pathRedirect);
    }
    setMessageErrorForm("The rounds are mandatory");
  };

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
        <div className="px-4 my-3">
          <Form.Select
            name="select-rounds"
            value={round}
            aria-label="Default select example"
            onChange={(event) => [
              setRound(event.target.value),
              setMessageErrorForm(""),
            ]}
          >
            <option value="">Select rounds</option>
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="8">8</option>
          </Form.Select>
        </div>
        <p className="text-danger mt-3 px-4">{messageErrorForm}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="" onClick={handleModalToggle}>
          {btnClose || "Close"}
        </Button>
        <Button variant="dark" onClick={handleModalToggleToRedirectPlay}>
          {btnPlay || "Play"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRounds;
