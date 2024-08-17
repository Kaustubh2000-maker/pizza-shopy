const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const upload = multer();

// Use this middleware on the route that handles the file upload
// app.post("/api/v1/pizzas", upload.single("photo"), createPizza);

const pizzaControllar = require("./../controlars/pizzaControllar");
const router = express.Router();

router
  .route("/")
  .get(pizzaControllar.getAllPizza)
  .post(upload.single("photo"), pizzaControllar.createPizza);

router
  .route("/:id")
  .get(pizzaControllar.getPizza)
  .patch(pizzaControllar.updatePizza)
  .delete(pizzaControllar.deletePizza);

module.exports = router;
