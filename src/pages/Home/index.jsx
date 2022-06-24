import React from 'react'
import ImageGame from "assets/game.png"
import { Container, Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import './style.css'

const Home = () => {
  const navigate = useNavigate()

  const handleOnePlayer = () => {
      navigate('/game')
  }

  const handleTwoPlayer = () => {
      navigate('/game')
  }

  return (  
      <Container fluid="lg">
        <Row className='d-flex justify-content-center'>
          <Col xs={8} md={4}> 
            <img className='image-logo-game rotate' src={ImageGame} alt='img-game' />
          </Col>
        </Row>
        <Row className='mt-5'>
          <h2 className='text-center text_select-mode'>Select mode</h2>
          <Col className='d-flex justify-content-center mt-5'> 
              <button onClick={handleOnePlayer} className='button_select-player' type='button'>1 player</button>
              <button onClick={handleTwoPlayer} className='button_select-player' type='button'>2 player</button>
          </Col>
        </Row>
      </Container>
  )
}

export default Home