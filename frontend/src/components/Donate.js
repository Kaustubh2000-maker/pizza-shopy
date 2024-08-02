import React, { useState } from "react";

function Donate() {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    country: "",
    taste: "",
    size: "",
    summary: "",
    description: "",
    procedure: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleClear = () => {
    setFormData({
      name: "",
      type: "",
      country: "",
      taste: "",
      size: "",
      summary: "",
      description: "",
      procedure: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to backend
    console.log("Form submitted:", formData);
  };

  return (
    <div className="donate-container">
      <h1 className="donate-form-heading">
        Contribute Your Culinary Creations
      </h1>
      <form className="donate-form" onSubmit={handleSubmit}>
        <div>
          <label className="donate-label" htmlFor="name">
            Enter Name
          </label>
          <input
            className="donate-input"
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="donate-label" htmlFor="type">
            Enter type veg or non-veg
          </label>
          <input
            className="donate-input"
            type="text"
            id="type"
            value={formData.type}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="donate-label" htmlFor="country">
            Enter country of origin
          </label>
          <input
            className="donate-input"
            type="text"
            id="country"
            value={formData.country}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="donate-label" htmlFor="taste">
            Enter tastes
          </label>
          <input
            className="donate-input"
            type="text"
            id="taste"
            value={formData.taste}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="donate-label" htmlFor="size">
            Enter sizes
          </label>
          <input
            className="donate-input"
            type="text"
            id="size"
            value={formData.size}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="donate-label" htmlFor="summary">
            Enter summary
          </label>
          <textarea
            className="donate-input"
            id="summary"
            value={formData.summary}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label className="donate-label" htmlFor="description">
            Enter description
          </label>
          <textarea
            className="donate-input"
            id="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label className="donate-label" htmlFor="procedure">
            Enter procedure
          </label>
          <textarea
            className="donate-input"
            id="procedure"
            value={formData.procedure}
            onChange={handleChange}
          ></textarea>
        </div>
        <button
          type="button"
          className="donate-btn donate-btn--clear"
          onClick={handleClear}
        >
          Clear
        </button>
        <button type="submit" className="donate-btn donate-btn--submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Donate;
