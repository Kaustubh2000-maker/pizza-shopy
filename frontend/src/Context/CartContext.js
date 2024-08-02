import React, { createContext, useState } from "react";

// Create Context
export const CartContext = createContext();

// Create a provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (pizzadata) => {
    setCartItems([...cartItems, pizzadata]);
  };

  const removeFromCart = (productId, size) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) => !(item.productId === productId && item.size === size)
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, setCartItems, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
