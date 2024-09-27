const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

// Load environment variables from .env file
dotenv.config({ path: "./config.env" });

// Correct the spelling of the environment variable
const DB = process.env.DATABASE.replace("<username>", process.env.USER).replace(
  "<password>",
  process.env.PASSWORD
);

// Connect to the database
mongoose.connect(DB).then(() => {
  console.log("Pizppy database connected successfully");
});

// Set the port from the environment variable or default to 9000
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
