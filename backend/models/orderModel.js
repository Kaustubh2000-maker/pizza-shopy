const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      name: { type: String, required: true },
      size: { type: String, required: true },
      quantity: { type: Number, required: true },
      photo: { type: String, required: true },
    },
  ],
  finalPrice: { type: Number, required: true },
  paymentCompleted: { type: Boolean, default: false },
  orderReceived: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
