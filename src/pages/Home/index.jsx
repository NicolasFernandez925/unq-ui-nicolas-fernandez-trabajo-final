import React from "react";
import ImageGame from "assets/game.png";
import { Container, Col, Row } from "react-bootstrap";
import { useModalGlobal } from "context/Modal";
import { MODAL_TYPES } from "constants";

import "./style.css";

const Home = () => {
  const { showModal } = useModalGlobal();

  const handleOpenModalReadRules = () => {
    showModal(MODAL_TYPES.RULES, {
      title: "Reglas",
      btnClose: "Cerrar",
    });
  };

  const handleOpenModalSelectRoundsAndName = (path) => {
    showModal(MODAL_TYPES.ROUNDS, {
      title: "Seleccionar rondas",
      pathRedirect: path,
    });
  };

  return (
    <Container fluid="lg">
      <Row className="d-flex justify-content-center">
        <Col xs={8} md={4}>
          <img
            className="image-logo-game rotate"
            src={ImageGame}
            alt="img-game"
          />
        </Col>
      </Row>
      <Row className="my-5 d-flex justify-content-center">
        <h2 className="text-center text_select-mode">Seleccionar modo</h2>
      </Row>
      <Row className="d-flex justify-content-center align-items-center">
        <Col xs={5} md={3} lg={2} className="d-flex justify-content-center">
          <button
            onClick={() =>
              handleOpenModalSelectRoundsAndName("/game?mode=singlePlayer")
            }
            className="button_select-player w-100"
            type="button"
          >
            1 jugador
          </button>
        </Col>
        <Col xs={5} md={3} lg={2} className="d-flex justify-content-center">
          <button
            onClick={() =>
              handleOpenModalSelectRoundsAndName("/game?mode=multiplayer")
            }
            className="button_select-player w-100"
            type="button"
          >
            2 jugadores
          </button>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center mt-5">
        <Col lg={2}>
          <span
            role="button"
            onClick={handleOpenModalReadRules}
            className="btn_read-rules"
            type="button"
          >
            Leer reglas
          </span>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
