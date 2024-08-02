const express = require("express");
const mongoose = require("mongoose");

const beveragesControllar = require("./../controlars/beveragesCpntrollar");
const router = express.Router();

router
  .route("/")
  .get(beveragesControllar.getAllBeverages)
  .post(beveragesControllar.createBeverages);

module.exports = router;
