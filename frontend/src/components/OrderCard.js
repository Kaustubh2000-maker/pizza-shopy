import React, { useState } from "react";

const OrderCard = ({ order }) => {
  const [showItems, setShowItems] = useState(false);

  const orderDate = new Date(order.createdAt);
  const formattedDate = orderDate.toLocaleDateString();
  const formattedTime = orderDate.toLocaleTimeString();

  const handleError = (e) => {
    e.target.src = `./pizzaImages/beverages/${order.items[0].photo}`;
  };

  const toggleItemsVisibility = () => {
    setShowItems(!showItems);
  };

  return (
    <div>
      <div className="order-card">
        <div className="order-card-div-photo-name">
          <img
            src={`./pizzaImages/pizza-photoes/${order.items[0].photo}`}
            alt=""
            className="order-card-photo"
            onError={handleError}
          />
          <p className="order-card-detail">{order.items[0].name}</p>
        </div>
        <div className="order-card-div">
          <p className="order-card-detail">
            {formattedDate}
            <br />
            {formattedTime}
          </p>
        </div>
        <div className="order-card-div">
          <p className="order-card-detail">
            {order.paymentCompleted ? "Success" : "Pending"}
          </p>
        </div>
        <div className="order-card-div">
          <p className="order-card-detail">
            {order.orderReceived ? "Received" : "Pending"}
          </p>
        </div>

        <button
          className="order-card-show-button"
          onClick={toggleItemsVisibility}
        >
          {showItems ? "🔺" : "🔻"}
        </button>
      </div>

      {showItems && (
        <div className="order-items-list">
          {order.items.map((item, index) => (
            <div key={index} className="order-item-drop">
              <img
                src={`./pizzaImages/pizza-photoes/${item.photo}`}
                alt=""
                className="order-item-drop-photo"
                onError={(e) => {
                  e.target.src = `./pizzaImages/beverages/${item.photo}`;
                }}
              />
              <p className="order-item-drop-detail">Name: {item.name}</p>
              <p className="order-item-drop-detail">Size: {item.size}</p>
              <p className="order-item-drop-detail">
                Quantity: {item.quantity}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderCard;
