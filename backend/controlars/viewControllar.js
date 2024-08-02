const Pizza = require("./../models/pizzaModel");
const Beverages = require("./../models/beveragesModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
// const User = require("./../models/userModel");

exports.getOverview = catchAsync(async (req, res, next) => {
  const pizzas = await Pizza.find();
  const beverages = await Beverages.find();

  res.status(200).render("overview", {
    title: "All Pizzas",
    pizzas,
    beverages,
  });
});

exports.getpizza = catchAsync(async (req, res, next) => {
  const pizza = await Pizza.findOne({ slug: req.params.slug });
  // console.log(pizza);

  res.status(200).render("pizzaData", {
    title: `${pizza.name} Pizza`,
    pizza,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  res.status(200).render("login", {
    title: "Login",
  });
});

exports.signin = catchAsync(async (req, res, next) => {
  res.status(200).render("signin", {
    title: "signin",
  });
});

exports.donate = catchAsync(async (req, res, next) => {
  res.status(200).render("donate", {
    title: "donate",
  });
});
