import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { DataContext } from "../../Context/DataContext";
import { AuthContext } from "./../../Context/AuthContext";

import PizzaList from "./PizzaList";
import EditPizzaForm from "./EditPizzaForm";
import AdminAddPizza from "./AdminAddPizza";

function AdminPizza() {
  const { showAlert } = useContext(AuthContext);
  const {
    pizzas: initialPizzas,
    loading,
    error,
    fetchData,
  } = useContext(DataContext);

  useEffect(() => {
    fetchData();
  }, []);
  const [pizzas, setPizzas] = useState([]); // Start with an empty array
  const [selectedPizza, setSelectedPizza] = useState(null);
  const [newPizza, setNewPizza] = useState({ name: "", photo: "" });
  const [editPizza, setEditPizza] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setPizzas(initialPizzas);
  }, [initialPizzas]);

  const handleEditPizzaClick = (pizza) => {
    setEditPizza(pizza);
    setSelectedPizza(null);
  };

  const handleInfoClick = (pizza) => {
    navigate(`/${pizza.slug}`);
  };

  const handleAddPizza = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/pizzas",
        newPizza
      );
      setNewPizza({ name: "", photo: "" });
      setPizzas([...pizzas, response.data]);
    } catch (error) {
      console.error("Error adding pizza:", error);
    }
  };

  const handleUpdatePizza = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/v1/pizzas/${editPizza._id}`,
        editPizza
      );
      setPizzas(
        pizzas.map((pizza) =>
          pizza._id === editPizza._id ? { ...pizza, ...response.data } : pizza
        )
      );

      showAlert(`${editPizza.name} updated successfully`);
    } catch (error) {
      console.error("Error updating pizza:", error);
    }
  };

  const handleDeletePizza = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/v1/pizzas/${id}`);

      setPizzas(pizzas.filter((pizza) => pizza._id !== id));
      showAlert(`Deleted successfully`);
      if (editPizza && editPizza._id === id) {
        setEditPizza(null);
      }
      setSelectedPizza(null);
    } catch (error) {
      console.error("Error deleting pizza:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="admin-pizza-page">
      <div className="admin-pizza-container">
        <h1 className="admin-pizza-page-heading">Manage all Pizzas</h1>
        <div className="admin-pizza-card-box-edit">
          <div className="admin-pizza-card-box-and-heading">
            <h2 className="admin-pizza-card-box-heading">All Pizzas</h2>
            <div className="admin-pizza-card-box">
              <PizzaList
                pizzas={pizzas}
                onEditClick={handleEditPizzaClick}
                onInfoClick={handleInfoClick}
                onDeleteClick={handleDeletePizza}
              />
            </div>
          </div>

          <div className="account-pizza-edit-box">
            {editPizza && !selectedPizza && (
              <EditPizzaForm
                editPizza={editPizza}
                setEditPizza={setEditPizza}
                handleUpdatePizza={handleUpdatePizza}
              />
            )}
          </div>
        </div>
        <div className="pizza-add-div">
          <h1 className="admin-pizza-page-heading">Add new Pizzas</h1>

          <AdminAddPizza></AdminAddPizza>
        </div>
      </div>
    </div>
  );
}

export default AdminPizza;
