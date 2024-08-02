const express = require("express");
const mongoose = require("mongoose");

const beveragesSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: [5, "Name should be more than 5 characters"],
    maxlength: [20, "Name should be less than 20 characters"],
    required: [true, "a beverage must have name"],
    unique: true,
  },

  price: {
    type: Number,
    required: [true, "a beverage must have price"],
  },
  photo: {
    type: String,
    required: [true, "a beverage must have photo"],
  },
});

const Beverages = mongoose.model("Beverages", beveragesSchema);
module.exports = Beverages;
