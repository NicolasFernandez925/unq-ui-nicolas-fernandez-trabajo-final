import React from "react";

const GameItem = ({ handleSelectedImageGame, item }) => {
  return (
    <img
      onClick={() => handleSelectedImageGame(item.image, item.name)}
      className="image-game rotate"
      src={item.image}
      alt="img-game"
    />
  );
};

export default GameItem;
