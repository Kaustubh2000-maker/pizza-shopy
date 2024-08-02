const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });

const DB = process.env.Databace.replace("<username>", process.env.USER).replace(
  "<password>",
  process.env.PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log("Pizppy databace connected successfully");
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT} `);
});
