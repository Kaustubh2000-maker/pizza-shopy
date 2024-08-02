const express = require("express");
const userController = require("./../controlars/usercontroller");
const authController = require("./../controlars/authControllar");

const router = express.Router();

router.route("/addToCart/:userId").post(userController.addToCart);
router.route("/updateMe/:id").patch(userController.updateMe);

router.route("/updatePassword/:id").patch(authController.updatePassword);

router.route("/lgn").post(authController.isLoggedIn);
router.route("/login").post(authController.login);
router.route("/logout").get(authController.logout);
router.route("/signup").post(authController.signup);

router
  .route("/deleteProduct/:id/:productid/:size")
  .patch(userController.deleteProduct);
router.route("/:id").get(userController.getUser);

module.exports = router;
