import React, { useEffect } from "react";
// import { DataContext } from "./../Context/DataContext";

import Beverages from "./Beverages";
import Pizzas from "./Pizzas";

import { CartProvider } from "./../Context/CartContext";
import CartAndTrack from "./CartAndTrack";

function Main({ user }) {
  // const { pizzas, beverages, loading, error } = useContext(DataContext);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;

  return (
    <CartProvider>
      <main className="grid-3-col main-grid">
        <Beverages user={user} />
        <Pizzas user={user} />
        <CartAndTrack user={user} />
      </main>
    </CartProvider>
  );
}

export default Main;
