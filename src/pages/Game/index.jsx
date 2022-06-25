import React from 'react'
import Tijera from 'assets/tijera.png'
import Lagarto from 'assets/lagarto.png'
import Papel from 'assets/papel.png'
import Spock from 'assets/spock.png'
import Piedra from 'assets/piedra.png'
import { Col, Container, Row } from 'react-bootstrap'

import "./style.css"
import { useNavigate } from 'react-router-dom'

const Game = () => {

  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <Container fluid="lg">
        <span role='button' onClick={handleGoBack} className='btn_go-back'>Go back</span>
        <Row className="d-flex justify-content-center align-items-center">
          <Col xs={5} lg={2}>
            <div className='selected-image'></div>
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