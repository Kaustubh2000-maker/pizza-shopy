// src/components/PizzaDetails.js
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "./../Context/DataContext";

const PizzaDetails = () => {
  const { slug } = useParams();
  const { pizzas } = useContext(DataContext);
  const pizza = pizzas.find((p) => p.slug === slug);
  console.log(pizzas);

  if (!pizza) {
    return <p>Pizza not found</p>;
  }

  return (
    <div className="data-body-container">
      <div className="data_body">
        <figure className="data-img-box">
          <img
            className="data-img"
            src={`./pizzaImages/pizza-photoes/${pizza.photo}`}
            alt={pizza.name}
          />
        </figure>
        <h1 className="data-pizza-heading">{pizza.name} Pizza</h1>
        <div className="data-description-box">
          <p className="data-description">{pizza.description}</p>
        </div>
        <div className="data-details-box">
          <p className="data-detail-type">
            <ion-icon id="data-detail-icon" name="calendar"></ion-icon>
            Discovery Year:
            <span className="data-detail-type-value">
              {pizza.discovery_year}
            </span>
          </p>
          <p className="data-detail-type">
            <ion-icon id="data-detail-icon" name="earth"></ion-icon>
            Country of Origin:
            <span className="data-detail-type-value">
              {pizza.country_of_origin}
            </span>
          </p>
          <p className="data-detail-type">
            <ion-icon id="data-detail-icon" name="chatbubbles"></ion-icon>
            Total Ratings:
            <span className="data-detail-type-value">{pizza.totalRatings}</span>
          </p>
          <p className="data-detail-type">
            <ion-icon
              id="data-detail-icon"
              name="chatbubble-ellipses"
            ></ion-icon>
            Average Ratings:
            <span className="data-detail-type-value">
              {pizza.averageRatings}
            </span>
          </p>
          <p className="data-detail-type">
            <ion-icon id="data-detail-icon" name="nutrition"></ion-icon>
            Vegetarian:
            <span className="data-detail-type-value">
              {pizza.isVegetarian ? "Yes" : "No"}
            </span>
          </p>
          <p className="data-detail-type">
            <ion-icon id="data-detail-icon" name="pizza"></ion-icon>
            Taste:
            <span className="data-detail-type-value">
              {" "}
              {pizza.taste.join(" and ")}
            </span>
          </p>
          <p className="data-detail-type">
            <ion-icon id="data-detail-icon" name="cash"></ion-icon>
            Price:
            <span className="data-detail-type-value"> ${pizza.price}</span>
          </p>
          <p className="data-detail-type">
            <ion-icon id="data-detail-icon" name="resize"></ion-icon>
            Size Options:
            <span className="data-detail-type-value">
              {pizza.sizeOptions.join(", ")}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PizzaDetails;
