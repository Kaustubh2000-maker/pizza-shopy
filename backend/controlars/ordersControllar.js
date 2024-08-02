const express = require("express");
const mongoose = require("mongoose");

const Order = require("./../models/orderModel");
const Pizza = require("../models/pizzaModel");
const factory = require("./handllerFactory");
const catchAsync = require("../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.createOrder = catchAsync(async (req, res, next) => {
  const { userId, cartItems, finalPrice, paymentCompleted } = req.body;

  if (!userId || !cartItems || !finalPrice) {
    return next(new AppError("Missing required fields", 400));
  }

  const items = cartItems.map((item) => ({
    name: item.name,
    size: item.size,
    quantity: item.quantity,
    photo: item.photo,
  }));

  const newOrder = await Order.create({
    userId,
    items,
    finalPrice,
    paymentCompleted,
  });

  req.currentUserId = userId;
  req.newOrder = newOrder; // Store the new order in request object

  next(); // Call next to move to deleteCart middleware
});

exports.getOrdersByUserId = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  if (!userId) {
    return next(new AppError("User ID is required", 400));
  }

  // Find all orders for the given user ID
  const orders = await Order.find({ userId }).select(
    "items paymentCompleted createdAt orderReceived"
  );

  if (!orders.length) {
    // return next(new AppError("No orders found for this user", 404));
    res.status(200).json({
      status: "success",
      results: "No orders",
    });
  }

  if (orders.length) {
    res.status(200).json({
      status: "success",
      results: orders.length,
      data: {
        orders,
      },
    });
  }
});
