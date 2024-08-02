const express = require("express");
const mongoose = require("mongoose");

const Beverages = require("../models/beveragesModel");
const factory = require("./handllerFactory");

exports.getAllBeverages = factory.getAll(Beverages);
exports.getBeverages = factory.getOne(Beverages);
exports.createBeverages = factory.createOne(Beverages);
exports.updateBeverages = factory.updateOne(Beverages);
exports.deleteBeverages = factory.deleteOne(Beverages);
