import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useGame } from 'context/Game';
import { listItemsImages } from 'constants';
import { jugadaSeleccionada, reiniciarJuego } from 'context/Game/action';

import "./style.css"

const Game = () => {

  const navigate = useNavigate();
  const {state, dispatch, puntosGanadosJugadorUno, puntosPerdidosJugadorUno, empatados, jugadorMaquina,jugadorUno} = useGame();

  const handleGoBack = () => {
    dispatch(reiniciarJuego());
    navigate(-1);
  }

  const handleSelectedImageGame = (imagesGame, nameImage) => {
    dispatch(jugadaSeleccionada(imagesGame, nameImage))
  }
console.log(jugadorUno)
  return (
    <Container fluid="lg">
        <span role='button' onClick={handleGoBack} className='btn_go-back'>Volver</span>
        <Row className="d-flex justify-content-center align-items-center">
          <Col xs={5} lg={2}>      
              {
                jugadorUno?.image ? 
                    <div>
                      <p className='name_selected'>{jugadorUno.name}</p>
                      <img className='image_selected' src={jugadorUno?.image} alt="image_selected" />
                    </div>

                    : <div className='selected-image'></div>   
              }
          </Col>
          <Col xs={2} lg={1} className='text-center'>
              <span className='text_vs'>VS</span>
          </Col>        
          <Col xs={5} lg={2}>          
              {
                jugadorMaquina?.image ? 
                <div>
                    <p className='name_selected'>{jugadorMaquina.name}</p>
                    <img className='image_selected' src={jugadorMaquina?.image} alt="image_selected" />
                </div>

                : <div className='selected-image'></div>         
              }         
          </Col>
        </Row>
        <Row className="d-flex justify-content-center align-items-center mt-5">
          <Col xs={4} lg={2} className='text-center'>
            <div>
              <p className='m-0 text_ganados'>Ganados</p>
              <span className='puntos_ganados'>{puntosGanadosJugadorUno}</span>
            </div>
          </Col>
          <Col xs={4} lg={2} className='text-center'>
              <div>
                <p className='m-0 text_empatados'>Empatados</p>   
                <span className='puntos_empatados'>{empatados}</span>
              </div>
          </Col>        
          <Col xs={4} lg={2} className='text-center'>
            <div><p className='m-0 text-perdidos'>Perdidos</p></div>   
            <span className='puntos_perdidos'>{puntosPerdidosJugadorUno}</span>
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