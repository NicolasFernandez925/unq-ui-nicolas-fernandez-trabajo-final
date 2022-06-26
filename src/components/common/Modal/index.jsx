import React from "react";
import Tijera from "assets/tijera.png";
import Lagarto from "assets/lagarto.png";
import Papel from "assets/papel.png";
import Spock from "assets/spock.png";
import Piedra from "assets/piedra.png";
import { Button, Modal } from "react-bootstrap";

import "./style.css";

const CustomModal = (props) => {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Reglas</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <img className="image-game-rules" src={Tijera} alt="img-game" />
              <p className="m-0">Tijera</p>
            </div>
            <div>
              <p className="m-0">
                <span className="text-gana">Gana: </span>Papel, lagarto
              </p>
              <p className="m-0">
                <span className="text-pierde">Pierde: </span>Piedra, spock
              </p>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <img className="image-game-rules" src={Lagarto} alt="img-game" />
              <p className="m-0">Lagarto</p>
            </div>
            <div>
              <p className="m-0">
                <span className="text-gana">Gana: </span>Papel, Spock
              </p>
              <p className="m-0">
                <span className="text-pierde">Pierde: </span>Tijera, Piedra
              </p>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center ">
            <div className="d-flex align-items-center">
              <img className="image-game-rules" src={Spock} alt="img-game" />
              <p className="m-0">Spock</p>
            </div>
            <div>
              <p className="m-0">
                <span className="text-gana">Gana: </span>Tijera, Piedra
              </p>
              <p className="m-0">
                <span className="text-pierde">Pierde: </span>Papel, Lagarto
              </p>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <img className="image-game-rules" src={Papel} alt="img-game" />
              <p className="m-0">Papel</p>
            </div>
            <div>
              <p className="m-0">
                <span className="text-gana">Gana: </span>Piedra, Spock
              </p>
              <p className="m-0">
                <span className="text-pierde">Pierde: </span>Tijera, Lagarto
              </p>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <img className="image-game-rules" src={Piedra} alt="img-game" />
              <p className="m-0">Piedra</p>
            </div>
            <div>
              <p className="m-0">
                <span className="text-gana">Gana: </span>Tijera, lagarto
              </p>
              <p className="m-0">
                <span className="text-pierde">Pierde: </span>Papel, spock
              </p>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={props.onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
