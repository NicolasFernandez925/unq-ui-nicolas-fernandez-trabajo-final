import React from "react";
import Tijera from "assets/tijera.png";
import Lagarto from "assets/lagarto.png";
import Papel from "assets/papel.png";
import Spock from "assets/spock.png";
import Piedra from "assets/piedra.png";
import { Button, Modal } from "react-bootstrap";

import "./style.css";
import ItemRule from "../Rules";

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
          <ItemRule
            image={Tijera}
            nameJugada="Tijera"
            gana={["Papel", "lagarto"]}
            pierde={["Piedra", "spock"]}
          />
          <ItemRule
            image={Lagarto}
            nameJugada="Lagarto"
            gana={["Papel", "Spock"]}
            pierde={["Tijera", "Piedra"]}
          />
          <ItemRule
            image={Spock}
            nameJugada="Spock"
            gana={["Tijera", "Piedra"]}
            pierde={["Papel", "Lagarto"]}
          />
          <ItemRule
            image={Papel}
            nameJugada="Papel"
            gana={["Piedra", "Spock"]}
            pierde={["Tijera", "Lagarto"]}
          />
          <ItemRule
            image={Piedra}
            nameJugada="Piedra"
            gana={["Tijera", "Lagarto"]}
            pierde={["Papel", "Spock"]}
          />
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
