import React from "react";

function PizzaList({ pizzas, onEditClick, onInfoClick, onDeleteClick }) {
  return (
    <div className="admin-pizza-card-box">
      <div className="admin-pizza-cards">
        {pizzas.map((pizza) => (
          <div key={pizza._id} className="admin-pizza-card">
            <div className="admin-pizza-card-img-name">
              <img
                className="admin-pizza-card-img"
                src={`./pizzaImages/pizza-photoes/${pizza.photo}`}
                alt={pizza.name}
              />
              <h3 className="admin-pizza-card-name">{pizza.name}</h3>
            </div>
            <div className="admin-pizza-card-btns">
              <button
                id="admin-pizza-icon"
                className="admin-pizza-card-btn admin-pizza-card-btn-info"
                onClick={() => onInfoClick(pizza)}
              >
                <ion-icon name="information-circle-outline"></ion-icon>
              </button>
              <button
                id="admin-pizza-icon"
                className="admin-pizza-card-btn admin-pizza-card-btn-edit"
                onClick={() => onEditClick(pizza)}
              >
                <ion-icon name="create-outline"></ion-icon>
              </button>
              <button
                id="admin-pizza-icon"
                className="admin-pizza-card-btn admin-pizza-card-btn-delete"
                onClick={() => onDeleteClick(pizza._id)}
              >
                <ion-icon name="trash-outline"></ion-icon>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PizzaList;
