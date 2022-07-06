import { useGame } from "context/Game";
import { reiniciarJuego } from "context/Game/action";
import { useModalGlobal } from "context/Modal";
import { useGetQueryParams } from "Hooks/useGetQueryParams";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ModalEndOfTheGame = () => {
  const { hideModal, store } = useModalGlobal();
  const {
    dispatch,
    empatados,
    puntosGanadosJugadorUno,
    puntosPerdidosJugadorUno,
    puntosGanadosJugadorDos,
  } = useGame();

  const navigate = useNavigate();
  const { param: getMode } = useGetQueryParams("mode");
  const { modalProps } = store || {};
  const { btnClose } = modalProps || {};

  const handleRedirectToStart = () => {
    hideModal();
    navigate("/");
    dispatch(reiniciarJuego());
  };

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
    } else if (empatados !== 0) {
      message = "Hubo un empate";
    }

    return message;
  };

  return (
    <Modal
      show={true}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Body className="my-2">
        <h2 className="text-center">End of the game</h2>
        <p className="text-center m-0 fw-bold">{winningMessage()}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={handleRedirectToStart}>
          {btnClose || "Play again"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEndOfTheGame;
