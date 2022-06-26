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
      navigate('/game?mode=singlePlayer');
  }

  const handleTwoPlayer = () => {
    dispatch(seleccionarModo(MODO.JUGADOR_DOS));
      navigate('/game?mode=multiplayer');
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
        <Row className='my-5 d-flex justify-content-center'>
          <h2 className='text-center text_select-mode'>Seleccionar modo</h2>
        </Row>
        <Row className='d-flex justify-content-center align-items-center'>
            <Col xs={5} lg={2}  className='d-flex justify-content-center'> 
                <button onClick={handleOnePlayer} className='button_select-player w-100' type='button'>1 jugador</button>
            </Col>
            <Col xs={5} lg={2}  className='d-flex justify-content-center'>          
                <button onClick={handleTwoPlayer} className='button_select-player w-100' type='button'>2 jugadores</button>
            </Col>
         
        </Row>
        <Row className='d-flex justify-content-center mt-5'>
            <Col lg={2}> 
                <span role="button" onClick={handleOpenModalReadRules} className='btn_read-rules' type='button'>Leer reglas</span>
            </Col>
        </Row>
      </Container>
  )
}

export default Home