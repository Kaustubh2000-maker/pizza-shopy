import React, { useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";

function AdminAddPizza() {
  const { showAlert } = useContext(AuthContext);
  const [pizzaData, setPizzaData] = useState({
    name: "",
    summary: "",
    description: "",
    discovery_year: "",
    country_of_origin: "",
    totalRatings: "",
    averageRatings: "",
    isVegetarian: true, // Default value as per schema
    taste: ["", ""],
    price: "",
    sizeOptions: ["", "", ""],
    photo: null, // Updated to null to handle file input
    slug: "", // Slug will be auto-generated
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handlesubmit");

    // Create a FormData object to handle file uploads
    const formData = new FormData();
    formData.append("name", pizzaData.name);
    formData.append("summary", pizzaData.summary);
    formData.append("description", pizzaData.description);
    formData.append("discovery_year", pizzaData.discovery_year);
    formData.append("country_of_origin", pizzaData.country_of_origin);
    formData.append("totalRatings", Number(pizzaData.totalRatings));
    formData.append("averageRatings", Number(pizzaData.averageRatings));
    formData.append("isVegetarian", pizzaData.isVegetarian);

    // Append each taste item individually
    pizzaData.taste.forEach((taste) => {
      formData.append("taste", taste);
    });

    // Append each size option individually
    pizzaData.sizeOptions.forEach((size) => {
      formData.append("sizeOptions", Number(size));
    });

    if (pizzaData.photo) {
      formData.append("photo", pizzaData.photo); // Append the File object
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/pizzas",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Pizza added successfully:", response.data);
      showAlert("Created successfully");
    } catch (error) {
      showAlert("Please change the name or try again later");
      console.error("Error adding pizza:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "photo") {
      setPizzaData({ ...pizzaData, photo: e.target.files[0] });
    } else if (name === "taste1") {
      setPizzaData({ ...pizzaData, taste: [value, pizzaData.taste[1]] });
    } else if (name === "taste2") {
      setPizzaData({ ...pizzaData, taste: [pizzaData.taste[0], value] });
    } else if (name.startsWith("sizeOption")) {
      const index = parseInt(name.replace("sizeOption", "")) - 1;
      const newSizeOptions = [...pizzaData.sizeOptions];
      newSizeOptions[index] = value;
      setPizzaData({ ...pizzaData, sizeOptions: newSizeOptions });
    } else {
      setPizzaData({ ...pizzaData, [name]: value });
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setPizzaData({ ...pizzaData, [name]: checked });
  };

  return (
    <div className="add-pizza-container">
      {/* <h2 className="add-pizza-header">Add a New Pizza</h2> */}
      <form className="add-pizza-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="account-pizza-add-form-label" htmlFor="name">
            Name
          </label>
          <input
            placeholder="(5-20 characters)"
            type="text"
            id="name"
            name="name"
            value={pizzaData.name}
            onChange={handleChange}
            className="add-pizza-input"
            minLength={5}
            maxLength={20}
            required
          />
        </div>
        <div className="form-group">
          <label className="account-pizza-add-form-label" htmlFor="summary">
            Summary
          </label>
          <input
            type="text"
            id="summary"
            name="summary"
            placeholder="(50-100 characters)"
            value={pizzaData.summary}
            onChange={handleChange}
            className="add-pizza-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="account-pizza-add-form-label" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="(150-400 characters)"
            value={pizzaData.description}
            onChange={handleChange}
            className="add-pizza-textarea"
            required
          />
        </div>
        <div className="form-group">
          <label
            className="account-pizza-add-form-label"
            htmlFor="discovery_year"
          >
            Discovery Year
          </label>
          <input
            type="number"
            id="discovery_year"
            name="discovery_year"
            value={pizzaData.discovery_year}
            onChange={handleChange}
            className="add-pizza-input"
            required
          />
        </div>
        <div className="form-group">
          <label
            className="account-pizza-add-form-label"
            htmlFor="country_of_origin"
          >
            Country of Origin
          </label>
          <input
            type="text"
            id="country_of_origin"
            name="country_of_origin"
            value={pizzaData.country_of_origin}
            onChange={handleChange}
            className="add-pizza-input"
            required
          />
        </div>
        <div className="form-group">
          <label
            className="account-pizza-add-form-label"
            htmlFor="averageRatings"
          >
            Average Ratings
          </label>
          <input
            type="number"
            id="averageRatings"
            name="averageRatings"
            placeholder="(0.0 - 5.0)"
            value={pizzaData.averageRatings}
            onChange={handleChange}
            className="add-pizza-input"
            step="0.1"
            min="0"
            max="5"
            required
          />
        </div>
        <div className="form-group">
          <label
            className="account-pizza-add-form-label"
            htmlFor="totalRatings"
          >
            Total Ratings
          </label>
          <input
            type="number"
            id="totalRatings"
            name="totalRatings"
            value={pizzaData.totalRatings}
            onChange={handleChange}
            className="add-pizza-input"
            required
          />
        </div>
        <div className="form-group">
          <label
            className="account-pizza-add-form-label"
            htmlFor="isVegetarian"
          >
            Vegetarian
          </label>
          <input
            type="checkbox"
            id="isVegetarian"
            name="isVegetarian"
            checked={pizzaData.isVegetarian}
            onChange={handleCheckboxChange}
            className="add-pizza-checkbox"
          />
        </div>
        <div className="form-group">
          <label className="account-pizza-add-form-label" htmlFor="taste">
            Taste
          </label>
          <div>
            <input
              type="text"
              id="taste1"
              name="taste1"
              value={pizzaData.taste[0]}
              onChange={handleChange}
              className="add-pizza-input add-taste-input"
              placeholder="Taste 1"
              required
            />
            <input
              type="text"
              id="taste2"
              name="taste2"
              value={pizzaData.taste[1]}
              onChange={handleChange}
              className="add-pizza-input add-taste-input"
              placeholder="Taste 2"
            />
          </div>
        </div>
        <div className="form-group">
          <label className="account-pizza-add-form-label" htmlFor="price">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={pizzaData.price}
            onChange={handleChange}
            className="add-pizza-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="account-pizza-add-form-label" htmlFor="sizeOptions">
            Size Options
          </label>
          <div>
            <input
              type="number"
              id="sizeOption1"
              name="sizeOption1"
              value={pizzaData.sizeOptions[0]}
              onChange={handleChange}
              className="add-pizza-input"
              placeholder="Size 1"
              required
            />
            <input
              type="number"
              id="sizeOption2"
              name="sizeOption2"
              value={pizzaData.sizeOptions[1]}
              onChange={handleChange}
              className="add-pizza-input"
              placeholder="Size 2"
            />
            <input
              type="number"
              id="sizeOption3"
              name="sizeOption3"
              value={pizzaData.sizeOptions[2]}
              onChange={handleChange}
              className="add-pizza-input"
              placeholder="Size 3"
            />
          </div>
        </div>
        <div className="form-group">
          <label className="account-pizza-add-form-label" htmlFor="photo">
            Photo
          </label>
          <input
            type="file"
            id="photo"
            name="photo"
            onChange={handleChange}
            className="add-pizza-file-input"
            required
          />
        </div>
        <div className="add-pizza-submit-div">
          <button type="submit" className="add-pizza-submit-btn">
            Add Pizza
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminAddPizza;
