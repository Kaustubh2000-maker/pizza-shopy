import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "./../Context/CartContext";
import CartCard from "./CartCard";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const Cart = (props) => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const { showAlert } = useContext(AuthContext);
  const [userCart, setUserCart] = useState([]);
  const [newCartItems, setNewCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.user) {
      setUserCart(props.user.cart || []);
    }
  }, [props.user]);

  useEffect(() => {
    const combinedItems = combineCartItems([...cartItems, ...userCart]);
    setNewCartItems(combinedItems);
  }, [cartItems, userCart]);

  const combineCartItems = (cartItems) => {
    let combinedItems = {};

    cartItems.forEach((item) => {
      let key = `${item.productId}-${item.size}`;

      if (!combinedItems[key]) {
        combinedItems[key] = { ...item };
      } else {
        combinedItems[key].quantity =
          Number(combinedItems[key].quantity) + Number(item.quantity);
      }
    });

    return Object.values(combinedItems);
  };

  const calculateTotalPrice = (cartItems) => {
    return cartItems.reduce((total, item) => {
      return total + item.quantity * item.price;
    }, 0);
  };

  let finalPrice = calculateTotalPrice(newCartItems);

  const removeItem = async (productId, size) => {
    try {
      await axios.patch(
        `http://127.0.0.1:8000/api/v1/users/deleteProduct/${props.user._id}/${productId}/${size}`
      );

      setNewCartItems((prevItems) =>
        prevItems.filter(
          (item) => !(item.productId === productId && item.size === size)
        )
      );
      setUserCart((prevItems) =>
        prevItems.filter(
          (item) => !(item.productId === productId && item.size === size)
        )
      );

      setCartItems((prevItems) =>
        prevItems.filter(
          (item) => !(item.productId === productId && item.size === size)
        )
      );
      showAlert("Item Removed From Cart");
    } catch (error) {
      console.error(
        "Error removing product:",
        error.response ? error.response.data : error.message
      );
    }
  };
  const handleCheckout = async () => {
    if (!props.user) return; // Ensure user is logged in

    setLoading(true);

    try {
      const orderItems = newCartItems.map((item) => ({
        name: item.name,
        size: item.size,
        photo: item.photo,
        quantity: item.quantity,
      }));
      console.log(props.user._id);
      console.log(orderItems);
      console.log(finalPrice);

      const response = await axios.post(
        `http://127.0.0.1:8000/api/v1/orders/save-order`,
        {
          userId: props.user._id,
          cartItems: orderItems,
          finalPrice: finalPrice,
          paymentCompleted: false, // Assuming payment is not completed immediately
        }
      );

      console.log(response);

      if (response.status === 201) {
        showAlert("Order placed successfully!");
        setNewCartItems([]);
        setCartItems([]);
        setUserCart([]);
      } else {
        showAlert("Failed Placeing Order. Try Again.");
      }
    } catch (error) {
      console.error(
        "Error placing order:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  if (!props.user) {
    return (
      <div className="cart-tack-box">
        <div className="cart-box">
          <h1 className="cart-track-heading">Cart</h1>
          <img className="cart-empty-img" src="/loginfirst.png" alt="" />
          <h3 className="cart-empty-heading">Knock knock, Log in First</h3>
          <Link to="/login" className="cart-buy-all-btn cart-card-btn">
            Login
          </Link>
        </div>
      </div>
    );
  }

  if (newCartItems.length === 0) {
    return (
      <div className="cart-tack-box">
        <div className="cart-box">
          <h1 className="cart-track-heading">Cart</h1>
          <img className="cart-login-img" src="/chef-with-pizza.png" alt="" />
          {/* <h3 className="cart-empty-heading">what would you like to have</h3> */}
          <Link to="/" className="cart-buy-all-btn cart-card-btn">
            Get Your Favorite Meal
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-tack-box">
      <div className="cart-box">
        <h1 className="cart-track-heading">Cart</h1>
        <div className="cart-card-box">
          {newCartItems.map((item, index) => (
            <CartCard
              key={index}
              user={props.user}
              item={item}
              onRemove={removeItem}
            />
          ))}
        </div>

        <div className="cart-button-box">
          <button
            className="cart-buy-all-btn cart-card-btn"
            onClick={handleCheckout}
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : finalPrice === 0
              ? "Add items to Cart"
              : `Checkout ${finalPrice.toFixed(2)} /-`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
