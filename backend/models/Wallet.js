const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema(
  {
    client_id: { type: String, unique: true, required: true },
    balance: { type: Number, default: 0 },
  },
  { timestamps: true },
);

walletSchema.index({ client_id: 1 });

module.exports = mongoose.model("Wallet", walletSchema);
