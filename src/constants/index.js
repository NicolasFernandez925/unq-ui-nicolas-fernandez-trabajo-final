import Tijera from "assets/tijera.png";
import Lagarto from "assets/lagarto.png";
import Papel from "assets/papel.png";
import Spock from "assets/spock.png";
import Piedra from "assets/piedra.png";
import { JUGADA } from "./enums";

export const listaDeJugadas = [
  { image: Tijera, name: JUGADA.TIJERA },
  { image: Lagarto, name: JUGADA.LAGARTO },
  { image: Papel, name: JUGADA.PAPEL },
  { image: Spock, name: JUGADA.SPOCK },
  { image: Piedra, name: JUGADA.PIEDRA },
];

export const jugadas = [
  JUGADA.TIJERA,
  JUGADA.LAGARTO,
  JUGADA.PAPEL,
  JUGADA.SPOCK,
  JUGADA.PIEDRA,
];

export const winstTo = {
  [JUGADA.TIJERA]: {
    gana: [JUGADA.PAPEL, JUGADA.LAGARTO],
    pierde: [JUGADA.PIEDRA, JUGADA.SPOCK],
  },
  [JUGADA.LAGARTO]: {
    gana: [JUGADA.PAPEL, JUGADA.SPOCK],
    pierde: [JUGADA.TIJERA, JUGADA.PIEDRA],
  },
  [JUGADA.SPOCK]: {
    gana: [JUGADA.TIJERA, JUGADA.PIEDRA],
    pierde: [JUGADA.PAPEL, JUGADA.LAGARTO],
  },
  [JUGADA.PAPEL]: {
    gana: [JUGADA.PIEDRA, JUGADA.SPOCK],
    pierde: [JUGADA.TIJERA, JUGADA.LAGARTO],
  },
  [JUGADA.PIEDRA]: {
    gana: [JUGADA.TIJERA, JUGADA.LAGARTO],
    pierde: [JUGADA.PAPEL, JUGADA.SPOCK],
  },
};
