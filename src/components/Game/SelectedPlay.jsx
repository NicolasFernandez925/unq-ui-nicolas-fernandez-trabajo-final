import React from 'react'

const SelectedPlay = ({conditionToShow, mostrarNombreJugadaSeleccionada, mostrarJugadaDelJugador, namePlayer, messageReady = '', jugadorUno, jugadorDos}) => {

  return (
    <>
        <p className='name_selected'>{namePlayer}</p>
        {
            conditionToShow ?
            <div>                 
                <p className='name_selected'>{mostrarNombreJugadaSeleccionada(jugadorUno?.name, jugadorDos?.name, messageReady)}</p>                   
                <img className='image_selected' src={mostrarJugadaDelJugador(jugadorUno?.image, jugadorDos?.image)} alt="" />
            </div>
            : <div className='selected-image'></div> 
        }
        
    </>
  )
}

export default SelectedPlay