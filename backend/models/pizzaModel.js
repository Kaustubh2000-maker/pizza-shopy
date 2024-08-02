const express = require("express");
const mongoose = require("mongoose");

const slugify = require("slugify");
const pizzaSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: [5, "Name should be more than 5 characters"],
    maxlength: [20, "Name should be less than 20 characters"],
    required: [true, "a Pizza must have name"],
    unique: true,
  },
  slug: String,
  summary: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  discovery_year: {
    type: Number,
  },
  country_of_origin: {
    type: String,
  },
  totalRatings: {
    type: Number,
  },
  averageRatings: {
    type: Number,
  },
  isVegetarian: {
    type: Boolean,
    default: true,
  },
  taste: {
    type: Array,
  },
  price: {
    type: Number,
  },
  sizeOptions: {
    type: Array,
  },
  photo: String,
});

pizzaSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Pizza = mongoose.model("Pizza", pizzaSchema);
module.exports = Pizza;
