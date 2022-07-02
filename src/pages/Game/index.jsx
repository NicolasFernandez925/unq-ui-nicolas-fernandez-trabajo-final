import React, { useCallback, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useGame } from "context/Game";
import {
  jugadaSeleccionada,
  jugadaSeleccionadaJugadorDos,
  jugarRevancha,
  reiniciarJuego,
  seleccionarModo,
} from "context/Game/action";
import { MODO } from "constants/enums";
import "./style.css";
import ScoreDetails from "components/Game/ScoreDetails";
import GameItem from "components/Game/GameItem";
import { listaDeJugadas } from "constants";
import SelectedPlay from "components/Game/SelectedPlay";
import { MODAL_TYPES } from "constants";
import { useModalGlobal } from "context/Modal";
import { useGetQueryParams } from "Hooks/useGetQueryParams";
import { useBeforeUnload } from "Hooks/useBeforeUnload";

const Game = () => {
  const navigate = useNavigate();

  const [activate, setActivate] = useState(false);
  const { showModal } = useModalGlobal();

  const {
    state,
    dispatch,
    puntosGanadosJugadorUno,
    jugadorDos,
    jugadorUno,
    puntosPerdidosJugadorUno,
    empatados,
    jugadorMaquina,
    jugadaActualJugadorUno,
    jugadaActualJugadorDos,
    realizoJugadaJugadorUno,
    realizoJugadaJugadorDos,
  } = useGame();
  const { param: getMode } = useGetQueryParams("mode");
  const handleGoBack = () => {
    dispatch(reiniciarJuego());
    navigate(-1);
  };

  useBeforeUnload(realizoJugadaJugadorUno, realizoJugadaJugadorDos);

  const handleOpenModalEndOfTheGame = useCallback(() => {
    showModal(MODAL_TYPES.END_OF_THE_GAME, {
      title: "End of the game",
    });
  }, []);

  useEffect(() => {
    if (state.rondas === 0) {
      handleOpenModalEndOfTheGame();
    }
  }, [state.rondas, handleOpenModalEndOfTheGame, getMode]);

  const handleSelectedImageGame = (imagesGame, nameImage) => {
    if (getMode === "singlePlayer")
      dispatch(jugadaSeleccionada(imagesGame, nameImage));

    if (getMode === "multiplayer") {
      if (!realizoJugadaJugadorUno) {
        dispatch(jugadaSeleccionada(imagesGame, nameImage));
        return;
      }
      if (!realizoJugadaJugadorDos)
        dispatch(jugadaSeleccionadaJugadorDos(imagesGame, nameImage));
    }
  };

  const handleReset = () => {
    setActivate((prev) => !prev);
    dispatch(reiniciarJuego());
  };

  useEffect(() => {
    if (getMode === "singlePlayer") {
      dispatch(seleccionarModo(MODO.JUGADOR_UNO));
    } else {
      dispatch(seleccionarModo(MODO.JUGADOR_DOS));
    }
  }, [dispatch, activate, getMode]);

  const handleRevancha = () => {
    dispatch(jugarRevancha());
  };

  const mostrarJugadaDelJugador = (jugadaUno, jugadaDos) => {
    if (state.modo === MODO.JUGADOR_DOS) {
      if (ambosJugadoresRealizaronJugada()) {
        return jugadaUno;
      }
    } else {
      return jugadaDos;
    }
  };

  const mostrarNombreJugadaSeleccionada = (
    nombreJugadaUno,
    nombrejugadaDos,
    mensajeJugadaLista
  ) => {
    if (state.modo === MODO.JUGADOR_DOS) {
      if (ambosJugadoresRealizaronJugada()) {
        return nombreJugadaUno;
      } else {
        return mensajeJugadaLista;
      }
    } else {
      return nombrejugadaDos;
    }
  };

  const mostrarBotonDeRevancha = () => {
    return state.modo === MODO.JUGADOR_DOS && ambosJugadoresRealizaronJugada();
  };

  const ambosJugadoresRealizaronJugada = () => {
    return realizoJugadaJugadorUno && realizoJugadaJugadorDos;
  };

  return (
    <Container fluid="lg">
      <div className="menu_game">
        <div className=" d-flex">
          <button type="button" onClick={handleGoBack} className="btn_go-back">
            Inicio
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="btn_reiniciar-partida"
          >
            Reiniciar
          </button>
        </div>
      </div>
      <Row className="text-center mb-3">
        <Col>
          <p className="rounds_played">
            <span className="fw-bold">Ronda {state.rondas}</span>
          </p>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center align-items-center">
        <Col xs={4} md={3} lg={2}>
          <SelectedPlay
            conditionToShow={jugadaActualJugadorUno?.image}
            mostrarNombreJugadaSeleccionada={mostrarNombreJugadaSeleccionada}
            mostrarJugadaDelJugador={mostrarJugadaDelJugador}
            namePlayer={jugadorUno.nombre}
            messageReady={"Jugador 1 listo"}
            jugadorUno={jugadaActualJugadorUno}
            jugadorDos={jugadaActualJugadorUno}
          />
        </Col>
        <Col xs={2} md={2} lg={1} className="text-center">
          <span className="text_vs">VS</span>
        </Col>
        <Col xs={4} md={3} lg={2}>
          <SelectedPlay
            conditionToShow={
              jugadorMaquina?.image || jugadaActualJugadorDos?.image
            }
            mostrarNombreJugadaSeleccionada={mostrarNombreJugadaSeleccionada}
            mostrarJugadaDelJugador={mostrarJugadaDelJugador}
            namePlayer={
              state.modo === MODO.JUGADOR_DOS
                ? jugadorDos.nombre
                : state.maquina.nombre
            }
            jugadorUno={jugadaActualJugadorDos}
            jugadorDos={jugadorMaquina}
          />
        </Col>
      </Row>
      <ScoreDetails
        modo={state.modo}
        jugadorUno={jugadorUno}
        jugadorDos={jugadorDos}
        puntosGanadosJugadorUno={puntosGanadosJugadorUno}
        empatados={empatados}
        puntosPerdidosJugadorUno={puntosPerdidosJugadorUno}
      />
      <Row className="d-flex justify-content-center xs-mt-2 lg-mt-5">
        <Col lg={8} className="d-flex justify-content-center flex-wrap">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <p className="descripcion_victoria md-mt-5">
              {state.descripcionVictoria}
            </p>
            {mostrarBotonDeRevancha() && (
              <button
                type="button"
                onClick={handleRevancha}
                className="btn_reiniciar-revancha w-50"
              >
                Revancha
              </button>
            )}
          </div>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center container_images-selected">
        <Col xs={12} lg={8} className="d-flex justify-content-center flex-wrap">
          {listaDeJugadas.map((imagesGame) => (
            <GameItem
              key={crypto.randomUUID()}
              handleSelectedImageGame={handleSelectedImageGame}
              item={imagesGame}
            />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Game;
