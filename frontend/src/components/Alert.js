// Alert.js
import React from "react";
// import "./Alert.css"; // Add your CSS file for styling the alert

const Alert = ({ message, onClose }) => {
  return (
    <div className="alert">
      <span className="alert-message">{message}</span>
      <button className="alert-close-btn" onClick={onClose}>
        &times;
      </button>
    </div>
  );
};

export default Alert;
