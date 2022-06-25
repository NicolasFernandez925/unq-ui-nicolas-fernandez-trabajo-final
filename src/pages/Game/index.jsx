import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGame } from 'context/Game';
import { listItemsImages } from 'constants';

import { jugadaSeleccionada, jugadaSeleccionadaJugadorDos, reiniciarJuego, seleccionarModo } from 'context/Game/action';

import "./style.css"
import { MODO } from 'constants/enums';

const Game = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const [activate, setActivate] = useState(false);

  const {state, dispatch, puntosGanadosJugadorUno,jugadorDos, jugadorUno, puntosPerdidosJugadorUno, empatados, jugadorMaquina,jugadaActualJugadorUno,jugadaActualJugadorDos,realizoJugadaJugadorUno,realizoJugadaJugadorDos} = useGame();
  const handleGoBack = () => {
    dispatch(reiniciarJuego());
    navigate(-1);
  }

  const handleSelectedImageGame = (imagesGame, nameImage) => {
    const params = new URLSearchParams(location.search);
    const getMode = params.get('mode');

    if(getMode === "singlePlayer") dispatch(jugadaSeleccionada(imagesGame, nameImage));
  
    if(getMode === "multiplayer") {
      if(!realizoJugadaJugadorUno) {
        dispatch(jugadaSeleccionada(imagesGame, nameImage));
        return;
      }
      if(!realizoJugadaJugadorDos) dispatch(jugadaSeleccionadaJugadorDos(imagesGame, nameImage));
    }
  }

  const handleReset = () => {
    setActivate((prev) => !prev);
    dispatch(reiniciarJuego());
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const getMode = params.get('mode');
    if(getMode === "singlePlayer"){
      dispatch(seleccionarModo(MODO.JUGADOR_UNO));
    }
    else{
      dispatch(seleccionarModo(MODO.JUGADOR_DOS));
    }

  }, [location.search, dispatch, activate])

  return (
    <Container fluid="lg">
        <div className='menu_game d-flex'>
          <button type='button' onClick={handleGoBack} className='btn_go-back'>Volver</button>
          <button type='button' onClick={handleReset} className='btn_reiniciar-partida'>Reiniciar</button>
        </div>    
        <Row className="d-flex justify-content-center align-items-center">
          <Col xs={5} lg={2}>   
              <p className='name_selected'>JUGADOR 1</p>   
              {
                jugadaActualJugadorUno?.image ? 
                    <div>                 
                      <p className='name_selected'>{jugadaActualJugadorUno.name}</p>
                     
                      <img className='image_selected' src={jugadaActualJugadorUno?.image} alt="image_selected" />
                    </div>

                    : <div className='selected-image'></div>   
              }
          </Col>
          <Col xs={2} lg={1} className='text-center'>
              <span className='text_vs'>VS</span>
          </Col>        
          <Col xs={5} lg={2}>  
              <p className='name_selected'>{state.modo === MODO.JUGADOR_DOS ? "JUGADOR 2" : "MAQUINA"}</p>        
              {
                jugadorMaquina?.image || jugadaActualJugadorDos?.image ? 
                <div>                 
                    <p className='name_selected'>{state.modo === MODO.JUGADOR_DOS ? jugadaActualJugadorDos.name : jugadorMaquina.name}</p>
                    <img className='image_selected' src={ state.modo === MODO.JUGADOR_DOS ? jugadaActualJugadorDos?.image : jugadorMaquina?.image} alt="image_selected" />
                </div>

                : <div className='selected-image'></div>         
              }         
          </Col>
        </Row>
        <Row className="d-flex justify-content-center align-items-center mt-5">
          <Col xs={4} lg={3} className='text-center'>
            <div>
              <p className='m-0 text_ganados'>{state.modo === MODO.JUGADOR_DOS ? "Ganados Jugador 1" : "Ganados"}</p>
              <span className='puntos_ganados'>{state.modo === MODO.JUGADOR_DOS ? jugadorUno.ganados : puntosGanadosJugadorUno}</span>
            </div>
          </Col>
          <Col xs={4} lg={3} className='text-center'>
              <div>
                <p className='m-0 text_empatados'>Empatados</p>   
                <span className='puntos_empatados'>{empatados}</span>
              </div>
          </Col>        
          <Col xs={4} lg={3} className='text-center'>
            <div><p className='m-0 text-perdidos'>{state.modo === MODO.JUGADOR_DOS ? "Ganados Jugador 2" : "Perdidos"}</p></div>   
            <span className='puntos_perdidos'>{state.modo === MODO.JUGADOR_DOS ? jugadorDos.ganados : puntosPerdidosJugadorUno}</span>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center mt-5">
          <Col lg={8} className="d-flex justify-content-center flex-wrap">
            {

            }
            <p className='descripcion_victoria'>{state.descripcionVictoria}</p>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center container_images-selected">
          <Col lg={8} className="d-flex justify-content-center flex-wrap">
            {
              listItemsImages.map(imagesGame => (
                <img onClick={() => handleSelectedImageGame(imagesGame.image, imagesGame.name)} className='image-game rotate' src={imagesGame.image} alt='img-game' key={crypto.randomUUID()} />
              ))
            }
          </Col>
        </Row>
    </Container>
  )
}

export default Game