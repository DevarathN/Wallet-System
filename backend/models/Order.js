const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    client_id: String,
    amount: Number,
    status: {
      type: String,
      enum: ["PENDING", "COMPLETED", "FAILED"],
      default: "PENDING",
    },
    fulfillment_id: String,
  },
  { timestamps: true },
);

orderSchema.index({ client_id: 1 });

module.exports = mongoose.model("Order", orderSchema);
