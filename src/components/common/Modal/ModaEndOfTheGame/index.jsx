import { useGame } from "context/Game";
import { reiniciarJuego } from "context/Game/action";
import { useModalGlobal } from "context/Modal";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const ModalEndOfTheGame = () => {
  const { hideModal, store } = useModalGlobal();
  const {
    dispatch,
    puntosGanadosJugadorUno,
    puntosPerdidosJugadorUno,
    puntosGanadosJugadorDos,
  } = useGame();
  const location = useLocation();
  const navigate = useNavigate();
  const { modalProps } = store || {};
  const { btnClose } = modalProps || {};

  const handleRedirectToStart = () => {
    hideModal();
    navigate("/");
    dispatch(reiniciarJuego());
  };

  const params = new URLSearchParams(location.search);
  const getMode = params.get("mode");
  console.log(puntosGanadosJugadorUno, puntosPerdidosJugadorUno);
  const winningMessage = () => {
    let message = "";
    if (
      puntosGanadosJugadorUno - puntosPerdidosJugadorUno < 0 &&
      getMode === "singlePlayer"
    ) {
      message = "La máquina ha ganado";
    } else if (
      puntosGanadosJugadorUno - puntosPerdidosJugadorUno > 0 &&
      getMode === "singlePlayer"
    ) {
      message = "Jugador 1  ha ganado";
    } else if (
      puntosGanadosJugadorUno - puntosGanadosJugadorDos > 0 &&
      getMode === "multiplayer"
    ) {
      message = "Jugador 1  ha ganado";
    } else if (
      puntosGanadosJugadorUno - puntosGanadosJugadorDos < 0 &&
      getMode === "multiplayer"
    ) {
      message = "Jugador 2  ha ganado";
    } else {
      message = "Hubo un empate";
    }
    return message;
  };

  return (
    <Modal
      show={true}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header></Modal.Header>
      <Modal.Body>
        <h2 className="text-center">End of the game</h2>
        <p className="text-center mt-3 fw-bold">{winningMessage()}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={handleRedirectToStart}>
          {btnClose || "Go to start"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEndOfTheGame;
