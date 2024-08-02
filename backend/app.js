const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");

const pizzaRouter = require("./routes/pizzaRoutes");
const beverageRouter = require("./routes/beverageRoutes");
const viewRouter = require("./routes/viewRoutes");
const userRouter = require("./routes/userRoutes");
const orderRouter = require("./routes/orderRoutes");

const AppError = require("./utils/appError");
const globalErrorHandlar = require("./controlars/errorControllar");
const cors = require("cors");

const app = express();
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, // This allows cookies to be sent with requests
};
app.use(cors(corsOptions));
app.use(cookieParser());

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "src")));

app.all("*", (req, res, next) => {
  console.log(req.originalUrl);
  next();
});

// app.use("/", viewRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/beverages", beverageRouter);
app.use("/api/v1/pizzas", pizzaRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`The url ${req.originalUrl} is not present`, 404));
});

app.use(globalErrorHandlar);

module.exports = app;
