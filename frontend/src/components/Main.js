import React, { useEffect, useState } from "react";
// import { DataContext } from "./../Context/DataContext";

import Beverages from "./Beverages";
import Pizzas from "./Pizzas";
import { useLocation } from "react-router-dom";

import { CartProvider } from "./../Context/CartContext";
import CartAndTrack from "./CartAndTrack";
import { DataProvider } from "../Context/DataContext";

function Main({ user }) {
  return (
    <CartProvider>
      <DataProvider>
        <main className="grid-3-col main-grid">
          <Beverages user={user} />
          <Pizzas user={user} />
          <CartAndTrack user={user} />
        </main>
      </DataProvider>
    </CartProvider>
  );
}

export default Main;
