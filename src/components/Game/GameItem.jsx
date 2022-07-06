import { useGetQueryParams } from "Hooks/useGetQueryParams";
import React from "react";

const GameItem = ({
  handleSelectedImageGame,
  item,
  realizoJugadaJugadorUno,
  realizoJugadaJugadorDos,
}) => {
  const { param: getMode } = useGetQueryParams("mode");
  return (
    <img
      onClick={() => handleSelectedImageGame(item.image, item.name)}
      className={`image-game rotate ${
        getMode === "multiplayer" &&
        realizoJugadaJugadorUno &&
        realizoJugadaJugadorDos &&
        "disabled-click"
      }`}
      src={item.image}
      alt="img-game"
    />
  );
};

export default GameItem;
