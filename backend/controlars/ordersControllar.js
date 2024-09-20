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

  res.status(201).json({
    newOrder,
  });
});

// exports.createCheckoutSession = catchAsync(async (req, res, next) => {
//   const { newOrder } = req; // Extract the new order from the request object
//   const { userId } = req.body;
//   console.log(newOrder);

//   console.log(req.body);

//   // Prepare line items for Stripe
//   const lineItems = newOrder.items.map((item) => ({
//     price_data: {
//       currency: "usd", // Adjust currency if needed
//       product_data: {
//         name: item.name,
//         images: [item.photo], // Assuming item.photo contains a URL to the product image
//       },
//       unit_amount: Math.round(item.price * 100), // Convert price to cents
//     },
//     quantity: item.quantity,
//   }));

//   // Create Stripe Checkout session
//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ["card"],
//     line_items: lineItems,
//     mode: "payment",
//     success_url: `${req.protocol}://${req.get("host")}/success`, // Adjust success URL
//     cancel_url: `${req.protocol}://${req.get("host")}/cancel`, // Adjust cancel URL
//     client_reference_id: userId,
//   });

//   // Send the session ID back to the client
//   res.status(200).json({
//     status: "success",
//     sessionId: session.id,
//   });
// });
exports.createCheckoutSession = catchAsync(async (req, res, next) => {
  const { userId, finalPrice, imageUrl, cartData, OrderId } = req.body; // Extracting data from the request body

  console.log(req.body);

  if (!userId || !finalPrice || !cartData) {
    return next(new AppError("Missing required fields", 400));
  }

  // Prepare line items for Stripe from cartData
  const lineItems = cartData.map((item) => ({
    price_data: {
      currency: "usd", // Adjust currency if needed
      product_data: {
        name: item.name,
        images: [item.photo || imageUrl], // Use the item's photo or fallback to imageUrl
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
    success_url: `http://localhost:3000/success?orderId=${OrderId}&userId=${userId}`, // Use localhost for success
    cancel_url: `http://localhost:3000/`, // Use localhost for cancel
    client_reference_id: userId, // Store user ID in Stripe session
  });

  // Send the session ID back to the client
  res.status(200).json({
    status: "success",
    sessionId: session.id,
    OrderId, // Pass the session ID back to the frontend
  });
});
// controllers/orderController.js

exports.updatePaymentStatus = catchAsync(async (req, res, next) => {
  const { orderId } = req.params;

  // Check if the orderId is provided
  if (!orderId) {
    return next(new AppError("Missing order ID", 400));
  }

  // Find the order by ID and update payment status
  const updatedOrder = await Order.findByIdAndUpdate(
    orderId,
    { paymentCompleted: true },
    { new: true, runValidators: true }
  );

  // Check if the order exists
  if (!updatedOrder) {
    return next(new AppError("Order not found", 404));
  }

  // Send success response with the updated order
  res.status(200).json({
    status: "success",
    message: "Payment status updated successfully",
    data: {
      order: updatedOrder,
    },
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
