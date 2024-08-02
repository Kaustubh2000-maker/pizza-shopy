const orderControllar = require("./../controlars/ordersControllar");

const userController = require("./../controlars/usercontroller");

const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

router.route("/").post(orderControllar.createOrder, userController.deleteCart);

router.get("/getAllOrdersByUserId/:userId", orderControllar.getOrdersByUserId);

module.exports = router;
