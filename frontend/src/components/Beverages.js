// src/components/Beverages.js
import React, { useContext } from "react";
import { DataContext } from "./../Context/DataContext";
import BeverageCard from "./BeverageCard";

const Beverages = (props) => {
  const { beverages, loading, error } = useContext(DataContext);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="beverages-box height-width-border-scroll">
      <h1 className="box-headings">Beverages</h1>
      <div className="beverages-container">
        {beverages.map((beverage, index) => (
          <BeverageCard key={index} beverage={beverage} user={props.user} />
        ))}
      </div>
    </div>
  );
};

export default Beverages;
