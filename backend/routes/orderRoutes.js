const orderControllar = require("./../controlars/ordersControllar");

const userController = require("./../controlars/usercontroller");

const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

router.route("/save-order").post(orderControllar.createOrder);

router.route("/delete-cart").patch(userController.deleteCart);

router
  .route("/update-order-status/:orderId")
  .patch(orderControllar.updatePaymentStatus);
router.route("/checkout").post(orderControllar.createCheckoutSession);

router.get("/getAllOrdersByUserId/:userId", orderControllar.getOrdersByUserId);

module.exports = router;
