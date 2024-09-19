const express = require("express");
const mongoose = require("mongoose");
const stripe = require("stripe")(
  "sk_test_51Pbx7HEYfpKViFpOvSK6cIU4vfJQyaLuzhQ9XKDDrXhGEAUgbSZCCcr9tfPfO4fUmnXKSGd9CMDSaCWZppHT37Cu00PPDC49RD"
);
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

exports.createCheckoutSession = catchAsync(async (req, res, next) => {
  const { userId, finalPrice, imageUrl, cartData } = req.body;

  // Validate incoming data
  if (!userId || !finalPrice || !cartData || cartData.length === 0) {
    return next(new AppError("Missing required fields", 400));
  }

  // Prepare line items for Stripe
  const lineItems = cartData.map((item) => ({
    price_data: {
      currency: "usd", // Adjust currency if needed
      product_data: {
        name: item.name,
        images: [imageUrl], // Use the image URL provided for the product
      },
      unit_amount: Math.round(finalPrice * 100), // Convert price to cents
    },
    quantity: item.quantity,
  }));

  // Create Stripe Checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/", // Adjust success URL to a React route (e.g., /success)
    cancel_url: "http://localhost:3000/", // Adjust cancel URL to a React route (e.g., /cancel)
    client_reference_id: userId,
  });

  // Send the session ID back to the client
  res.status(200).json({
    status: "success",
    sessionId: session.id,
  });
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
