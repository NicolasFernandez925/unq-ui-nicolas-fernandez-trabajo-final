import React from 'react'
import Tijera from 'assets/tijera.png'
import Lagarto from 'assets/lagarto.png'
import Papel from 'assets/papel.png'
import Spock from 'assets/spock.png'
import Piedra from 'assets/piedra.png'
import { Col, Container, Row } from 'react-bootstrap'

import "./style.css"

const Game = () => {
  return (
    <Container fluid="lg">
        <Row className="d-flex justify-content-center">
          <Col xs={5} lg={2}>
            <div className='selected-image'></div>
          </Col>
          <Col xs={5} lg={2}>
            <div className='selected-image'></div>    
          </Col>
        </Row>
        <Row className="d-flex justify-content-center container_images-selected">
          <Col lg={8} className="d-flex justify-content-center flex-wrap">
            <img className='image-game rotate' src={Tijera} alt='img-game' />
            <img className='image-game rotate' src={Lagarto} alt='img-game' />
            <img className='image-game rotate' src={Spock} alt='img-game' />
            <img className='image-game rotate' src={Papel} alt='img-game' />
            <img className='image-game rotate' src={Piedra} alt='img-game' />
          </Col>
        </Row>
    </Container>
  )
}

export default Game