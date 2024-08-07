import React, { useEffect, useState } from "react";
// import { DataContext } from "./../Context/DataContext";

import Beverages from "./Beverages";
import Pizzas from "./Pizzas";
import { useLocation } from "react-router-dom";

import { CartProvider } from "./../Context/CartContext";
import CartAndTrack from "./CartAndTrack";

function Main({ user }) {
  // const location = useLocation();
  // // const [hasReloaded, setHasReloaded] = useState(false);

  // let hasReloaded = false;

  // console.log(!hasReloaded);

  // useEffect(() => {
  //   // Only reload if the path is '/' and it has not been reloaded before
  //   if (location.pathname === "/" && !hasReloaded) {
  //     // window.location.reload(); // Reload the page
  //     hasReloaded = !true;
  //     console.log(hasReloaded);
  //   }
  // }, [location, hasReloaded]);

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
