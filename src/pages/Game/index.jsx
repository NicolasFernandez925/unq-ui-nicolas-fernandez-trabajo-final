import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useGame } from 'context/Game'

import "./style.css"
import { listItemsImages } from 'constants'
import { jugadaSeleccionada, reiniciarJuego } from 'context/Game/action'

const Game = () => {

  const navigate = useNavigate();
  const {state, dispatch} = useGame();

  const handleGoBack = () => {
    dispatch(reiniciarJuego());
    navigate(-1);
  }

  const handleSelectedImageGame = (imagesGame, nameImage) => {
    dispatch(jugadaSeleccionada(imagesGame, nameImage))
  }

  return (
    <Container fluid="lg">
        <span role='button' onClick={handleGoBack} className='btn_go-back'>Go back</span>
        <Row className="d-flex justify-content-center align-items-center">
          <Col xs={5} lg={2}>
            <div className='selected-image'>
              <img className='image_selected-user-one' src={state.jugadorUno.jugadaActual.image} alt="" />
            </div>
          </Col>
          <Col xs={2} lg={1} className='text-center'>
              <span className='text_vs'>VS</span>
          </Col>        
          <Col xs={5} lg={2}>
            <div className='selected-image'></div>    
          </Col>
        </Row>
        <Row className="d-flex justify-content-center align-items-center mt-5">
          <Col xs={2} className='text-center'>
            <div><p className='m-0 text-white'>Won</p></div>
          </Col>
          <Col xs={2}className='text-center'>
              <div><p className='m-0 text-white'>Tied</p></div>
          </Col>        
          <Col xs={2}className='text-center'>
            <div><p className='m-0 text-white'>Lost</p></div>   
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