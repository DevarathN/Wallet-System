const mongoose = require("mongoose");

const ledgerSchema = new mongoose.Schema(
  {
    client_id: String,
    type: { type: String, enum: ["CREDIT", "DEBIT", "ORDER"] },
    amount: Number,
    reference_id: String,
  },
  { timestamps: true },
);

ledgerSchema.index({ client_id: 1 });

module.exports = mongoose.model("Ledger", ledgerSchema);
