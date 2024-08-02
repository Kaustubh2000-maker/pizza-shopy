const express = require("express");
const mongoose = require("mongoose");

const Pizza = require("./../models/pizzaModel");
const factory = require("./handllerFactory");
const catchAsync = require("../utils/catchAsync");

// exports.getAllPizza = catchAsync(async (req, res, next) => {
//   const allPizza = await Pizza.find();

//   res.status(200).json({
//     status: "Success",
//     totalPizzaFound: allPizza.length,
//     data: allPizza,
//   });
// });

exports.getAllPizza = factory.getAll(Pizza);
exports.getPizza = factory.getOne(Pizza);
exports.createPizza = factory.createOne(Pizza);
exports.updatePizza = factory.updateOne(Pizza);
exports.deletePizza = factory.deleteOne(Pizza);
