// src/components/BeverageCard.js
import React, { useContext, useState } from "react";
import { CartContext } from "./../Context/CartContext";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

const BeverageCard = ({ beverage, user }) => {
  const { addToCart } = useContext(CartContext);
  const { showAlert } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleAddClick = async () => {
    setLoading(true);

    const cartItem = {
      productId: beverage._id,
      name: beverage.name,
      quantity: 1,
      price: beverage.price,
      photo: beverage.photo,
      size: beverage.size,
    };

    let currentUser = user;
    if (currentUser == null) currentUser = undefined;
    let userId;

    if (currentUser) {
      userId = currentUser._id;

      try {
        const response = await axios.post(
          `http://127.0.0.1:8000/api/v1/users/addToCart/${userId}`,
          cartItem
        );

        if (response.status === 200) {
          addToCart(cartItem);
          // console.log("Item added to cart:", response.data);
          showAlert("Item added to cart");
        }
      } catch (error) {
        console.error("Error adding item to cart:", error);
        showAlert("Error adding item to cart");
      }
    } else {
      addToCart(cartItem);
      console.log("Item added to cart locally");
    }

    setLoading(false);
  };

  return (
    <div className="beverages-card">
      <img
        src={`./pizzaImages/beverages/${beverage.photo}`}
        alt={beverage.name}
        className="beverages-image"
      />
      <h4 className="beverages-name">{beverage.name}</h4>
      <button
        className="beverages-add-btn"
        onClick={handleAddClick}
        disabled={loading} // Disable button while loading
      >
        {loading ? "Wait.." : "+Add"}
      </button>
    </div>
  );
};

export default BeverageCard;
