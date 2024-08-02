const express = require("express");
const mongoose = require("mongoose");

const pizzaControllar = require("./../controlars/pizzaControllar");
const router = express.Router();

router
  .route("/")
  .get(pizzaControllar.getAllPizza)
  .post(pizzaControllar.createPizza);

router
  .route("/:id")
  .get(pizzaControllar.getPizza)
  .patch(pizzaControllar.updatePizza)
  .delete(pizzaControllar.deletePizza);

module.exports = router;
