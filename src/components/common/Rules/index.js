import React from "react";

const ItemRule = ({ image, nameJugada, gana, pierde }) => {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        <img className="image-game-rules" src={image} alt="img-game" />
        <p className="m-0">{nameJugada}</p>
      </div>
      <div>
        <p className="m-0">
          <span className="text-gana">Gana: </span>
          {gana[0]}, {gana[1]}
        </p>
        <p className="m-0">
          <span className="text-pierde">Pierde: </span>
          {pierde[0]}, {pierde[1]}
        </p>
      </div>
    </div>
  );
};

export default ItemRule;
