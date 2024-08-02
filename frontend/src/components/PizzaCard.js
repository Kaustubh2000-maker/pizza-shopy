import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./../Context/CartContext";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

const PizzaCard = ({ pizza, user }) => {
  const { addToCart } = useContext(CartContext);
  const { showAlert } = useContext(AuthContext);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(pizza.sizeOptions[0]);
  const [photo, setphoto] = useState(pizza.photo);
  const [loading, setLoading] = useState(false);

  let currentUser = user.user;
  if (currentUser == null) currentUser = undefined;
  let userId;

  const handleAddClick = async () => {
    setLoading(true);

    // Use setTimeout to delay execution
    setTimeout(async () => {
      let adjustedPrice = pizza.price;

      // Adjust the price based on the pizza size
      if (size === 8) {
        adjustedPrice *= 1.25; // Increase price by 25%
      } else if (size === 10) {
        adjustedPrice *= 1.5; // Increase price by 50%
      }

      adjustedPrice = Math.round(adjustedPrice);

      const cartItem = {
        productId: pizza._id,
        name: pizza.name,
        quantity,
        size,
        price: adjustedPrice,
        photo: photo,
      };

      if (currentUser) {
        userId = currentUser._id;

        try {
          const response = await axios.post(
            `http://127.0.0.1:8000/api/v1/users/addToCart/${userId}`,
            cartItem
          );

          if (response.status === 200) {
            addToCart(cartItem);

            showAlert("Pizza added to cart");

            // console.log("Item added to cart:", response.data);
          }
        } catch (error) {
          console.error("Error adding item to cart:", error);
          showAlert("Error adding item to cart");
        }
      } else {
        addToCart(cartItem);
        console.log("Item added to cart locally");
      }

      setLoading(false); // Reset loading state
    }, 300); // 0.5-second delay
  };
  const getStarRating = (rating) => {
    let stars = "";
    for (let i = 1; i < rating; i++) {
      stars += "⭐";
    }
    return stars;
  };

  return (
    <div className="pizza-card">
      <div className="pizza-card-image-input">
        <div className="pizza-card-image-div">
          <Link to={`/${pizza.slug}`}>
            <img
              src={`./pizzaImages/pizza-photoes/${pizza.photo}`}
              alt={pizza.name}
              className="pizza-card-image"
            />
          </Link>
        </div>
        <div className="pizza-card-select-box">
          <h4 className="quantity-size-h4">Quantity</h4>
          <h4 className="quantity-size-h4">Size</h4>
          <select
            value={quantity}
            className="pizza-card-select"
            onChange={(e) => setQuantity(Number(e.target.value))}
          >
            <option value="" disabled hidden>
              Quantity
            </option>
            {[...Array(5).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
          <select
            value={size}
            className="pizza-card-select"
            onChange={(e) => setSize(Number(e.target.value))}
          >
            <option value="" disabled hidden>
              Size
            </option>
            {pizza.sizeOptions.map((sizeOption) => (
              <option key={sizeOption} value={sizeOption}>
                {sizeOption}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="card-data-details">
        <div className="card-name-add-box">
          <h2 className="card-item-name">{pizza.name}</h2>
          <button
            onClick={handleAddClick}
            className="pizza-add-btn"
            disabled={loading} // Disable button while loading
          >
            {loading ? "Wait.." : "+ Add"}
          </button>
        </div>
        <h3 className="card-item-price">
          ${pizza.price} / ${Math.round(pizza.price * 1.25)} / $
          {Math.round(pizza.price * 1.5)}
        </h3>
        <h3 className="card-item-rating">
          {/* Rating: {pizza.averageRatings} /5 ⭐⭐⭐⭐⭐ */}
          Rating: {pizza.averageRatings} /5
          <br />
          {getStarRating(pizza.averageRatings)}
        </h3>
        <p className="card-item-details">
          {pizza.summary.substring(0, 170) + " . . ."}
        </p>
      </div>
    </div>
  );
};

export default PizzaCard;
