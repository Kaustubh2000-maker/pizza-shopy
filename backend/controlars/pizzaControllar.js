const express = require("express");
const mongoose = require("mongoose");

const Pizza = require("./../models/pizzaModel");
const factory = require("./handllerFactory");
const catchAsync = require("../utils/catchAsync");
const slugify = require("slugify");
// const image = require("./../../frontend/public/pizzaImages/pizza-photoes/");

// exports.getAllPizza = catchAsync(async (req, res, next) => {
//   const allPizza = await Pizza.find();

//   res.status(200).json({
//     status: "Success",
//     totalPizzaFound: allPizza.length,
//     data: allPizza,
//   });
// });

const fs = require("fs");
const path = require("path");
exports.createPizza = catchAsync(async (req, res, next) => {
  // console.log(req);

  const {
    name,
    summary,
    description,
    discovery_year,
    country_of_origin,
    totalRatings,
    averageRatings,
    isVegetarian,
    taste,
    price,
    sizeOptions,
  } = req.body;
  console.log(req.body);

  // Handle file upload
  if (req.file) {
    const photoName =
      slugify(name, { lower: true }) + path.extname(req.file.originalname);
    const photoPath = path.join(
      __dirname,
      "./../../frontend/public/pizzaImages/pizza-photoes",
      photoName
    );

    fs.writeFileSync(photoPath, req.file.buffer);
    req.body.photo = photoName;
  }

  // Create the new pizza document
  const newPizza = await Pizza.create({
    name,
    summary,
    description,
    discovery_year,
    country_of_origin,
    totalRatings,
    averageRatings,
    isVegetarian,
    taste,
    price,
    sizeOptions,
    photo: req.body.photo, // Save the photo name as text in the database
  });

  res.status(201).json({
    status: "Success",
    data: newPizza,
  });
});

exports.getAllPizza = factory.getAll(Pizza);
exports.getPizza = factory.getOne(Pizza);
// exports.createPizza = factory.createOne(Pizza);
exports.updatePizza = factory.updateOne(Pizza);
exports.deletePizza = factory.deleteOne(Pizza);
