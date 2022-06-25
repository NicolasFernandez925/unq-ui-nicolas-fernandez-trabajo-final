import React from 'react'
import ImageGame from "assets/game.png"
import { Container, Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useModal } from 'context/Modal'
import { useGame } from 'context/Game'
import { seleccionarModo } from 'context/Game/action'
import { MODO } from 'constants/enums'

import './style.css'

const Home = () => {
  const navigate = useNavigate();
  const {setModalShow} = useModal();
  const {dispatch} = useGame();

  const handleOnePlayer = () => {
      dispatch(seleccionarModo(MODO.JUGADOR_UNO));
      navigate('/game');
  }

  const handleTwoPlayer = () => {
    dispatch(seleccionarModo(MODO.JUGADOR_DOS));
      navigate('/game');
  }

  const handleOpenModalReadRules = () => {
    setModalShow(prev => !prev);
  }

  return (  
      <Container fluid="lg">
        <Row className='d-flex justify-content-center'>
          <Col xs={8} md={4}> 
            <img className='image-logo-game rotate' src={ImageGame} alt='img-game' />
          </Col>
        </Row>
        <Row className='mt-5'>
          <h2 className='text-center text_select-mode'>Seleccionar modo</h2>
          <Col className='d-flex justify-content-center mt-5'> 
              <button onClick={handleOnePlayer} className='button_select-player' type='button'>1 jugador</button>
              <button onClick={handleTwoPlayer} className='button_select-player' type='button'>2 jugadores</button>
              <span role="button" onClick={handleOpenModalReadRules} className='btn_read-rules' type='button'>Leer reglas</span>
          </Col>
        </Row>
      </Container>
  )
}

export default Home