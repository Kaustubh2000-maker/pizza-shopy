import React from "react";

const CartCard = ({ item, user, onRemove }) => {
  const handleRemove = () => {
    onRemove(item.productId, item.size);
  };

  return (
    <div className="cart-card">
      <div className="cart-card-image-name">
        <img
          className="cart-card-image"
          src={
            item.size == "750ml"
              ? `./pizzaImages/beverages/${item.photo}`
              : `./pizzaImages/pizza-photoes/${item.photo}`
          }
          alt={item.name}
        />
        <h4 className="cart-card-name">
          {item.size === "750ml" ? `${item.name}  ` : `${item.name} Pizza`}
        </h4>
      </div>
      <div className="cart-card-extra-item">
        <ul>
          <li>Quantity : {item.quantity}</li>
          <li>Size : {item.size}</li>
          <li>Price per item : {item.price} /-</li>
          <li>Total Price : {item.price * item.quantity} /-</li>
        </ul>
      </div>
      <div className="cart-card-btn-div">
        <button className="cart-card-btn btn-cancel" onClick={handleRemove}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartCard;
