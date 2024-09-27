// src/contexts/DataContext.js
import React, { createContext, useState, useEffect } from "react";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [pizzas, setpizzas] = useState([]);
  const [beverages, setbeverages] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(null);

  const fetchData = async () => {
    try {
      const [pizzasResponse, beveragesResponse] = await Promise.all([
        fetch("https://pizza-shopy-backend.onrender.com/api/v1/pizzas"),
        fetch("http://127.0.0.1:8000/api/v1/beverages"),
      ]);

      const pizzasData = await pizzasResponse.json();
      const beveragesData = await beveragesResponse.json();

      // console.log(pizzasData.data.doc);

      setpizzas(pizzasData.data.doc);
      setbeverages(beveragesData.data.doc);
      setloading(false);
      seterror(null);
    } catch (error) {
      setpizzas([]);
      setbeverages([]);
      setloading(false);
      seterror(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataContext.Provider
      value={{ pizzas, beverages, loading, error, fetchData }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
