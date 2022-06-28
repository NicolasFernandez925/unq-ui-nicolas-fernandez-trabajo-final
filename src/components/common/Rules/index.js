import React from "react";
import Tijera from "assets/tijera.png";
import Lagarto from "assets/lagarto.png";
import Papel from "assets/papel.png";
import Spock from "assets/spock.png";
import Piedra from "assets/piedra.png";
import ItemRule from "./ItemRule";

const Rules = () => {
  return (
    <>
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
    </>
  );
};

export default Rules;
