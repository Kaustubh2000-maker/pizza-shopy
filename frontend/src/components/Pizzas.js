// src/components/Pizzas.js
import React, { useContext, useEffect } from "react";
import { DataContext } from "./../Context/DataContext";
import PizzaCard from "./PizzaCard";

const Pizzas = (user) => {
  const { pizzas, loading, error, fetchData } = useContext(DataContext);

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="main-content height-width-border-scroll">
      <h1 className="box-headings">Find Your Servings</h1>

      <div className="main-items-box veg">
        <div className="type-heading-box">
          <img
            className="type-logo"
            src={`./pizzaImages/veg-logo.png`}
            alt="Vegetarian Pizza"
          />
          <h1 className="main-heading-veg">Veg Delight</h1>
        </div>
        <div className="pizza-container">
          {pizzas
            .filter((pizza) => pizza.isVegetarian === true)
            .map((pizza) => (
              <PizzaCard pizza={pizza} user={user} key={pizza.slug} />
            ))}
        </div>
      </div>

      <div className="main-items-box non-veg">
        <div className="type-heading-box">
          <img
            className="type-logo"
            src={`./pizzaImages/non-veg-logo.png`}
            alt="Non-Vegetarian Pizza"
          />
          <h1 className="main-heading-non-veg">Non-Veg Feast</h1>
        </div>
        <div className="pizza-container">
          {pizzas
            .filter((pizza) => pizza.isVegetarian === false)
            .map((pizza) => (
              <PizzaCard pizza={pizza} user={user} key={pizza.slug} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Pizzas;
