import React from "react";

const Track = () => {
  return (
    <div className="track-box">
      <h1 className="cart-track-heading">track orders</h1>
      <div className="track-map-box"></div>
      <div className="track-order-list">
        <ul>
          <li>Four-Cheese(2),Peporoni(1)</li>
          <li>margarita(1)</li>
          <li>Peporoni(1),Four-Cheese(2)</li>
          <li>Four-Cheese(2),Peporoni(1)</li>
        </ul>
      </div>
    </div>
  );
};

export default Track;
