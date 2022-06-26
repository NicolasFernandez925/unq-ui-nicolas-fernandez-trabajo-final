import { MODO } from 'constants/enums'
import React from 'react'
import { Col, Row } from 'react-bootstrap'

const ScoreDetails = React.memo(({ modo, jugadorUno, jugadorDos, puntosGanadosJugadorUno, empatados, puntosPerdidosJugadorUno }) => {
  return (
    <Row className="d-flex justify-content-center align-items-center mt-5">
        <Col xs={4} lg={3} className='text-center'>
        <div>
            <p className='m-0 text_ganados'>{modo === MODO.JUGADOR_DOS ? "Ganados Jugador 1" : "Ganados"}</p>
            <span className='puntos_ganados'>{modo === MODO.JUGADOR_DOS ? jugadorUno.ganados : puntosGanadosJugadorUno}</span>
        </div>
        </Col>
        <Col xs={4} lg={3} className='text-center'>
            <div>
            <p className='m-0 text_empatados'>Empatados</p>   
            <span className='puntos_empatados'>{empatados}</span>
            </div>
        </Col>        
        <Col xs={4} lg={3} className='text-center'>
        <div><p className='m-0 text-perdidos'>{modo === MODO.JUGADOR_DOS ? "Ganados Jugador 2" : "Perdidos"}</p></div>   
        <span className='puntos_perdidos'>{modo === MODO.JUGADOR_DOS ? jugadorDos.ganados : puntosPerdidosJugadorUno}</span>
        </Col>
  </Row>
  )
})

export default ScoreDetails