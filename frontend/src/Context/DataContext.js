// src/contexts/DataContext.js
import React, { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({
    pizzas: [],
    beverages: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pizzasResponse, beveragesResponse] = await Promise.all([
          fetch("http://127.0.0.1:8000/api/v1/pizzas"),
          fetch("http://127.0.0.1:8000/api/v1/beverages"),
        ]);

        const pizzasData = await pizzasResponse.json();
        const beveragesData = await beveragesResponse.json();

        const pizzas = pizzasData.data.doc;
        const beverages = beveragesData.data.doc;

        setData({
          pizzas: pizzas,
          beverages: beverages,
          loading: false,
          error: null,
        });
      } catch (error) {
        setData({
          pizzas: [],
          beverages: [],
          loading: false,
          error: error.message,
        });
      }
    };

    fetchData();
  }, []);

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};
