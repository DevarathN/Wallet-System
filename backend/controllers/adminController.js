const Wallet = require("../models/Wallet");
const Ledger = require("../models/Ledger");

exports.creditWallet = async (req, res) => {
  try {
    const { client_id, amount } = req.body;

    const wallet = await Wallet.findOneAndUpdate(
      { client_id },
      { $inc: { balance: amount } },
      { new: true, upsert: true },
    );

    await Ledger.create({
      client_id,
      type: "CREDIT",
      amount,
    });

    res.json({ message: "Wallet credited", balance: wallet.balance });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.debitWallet = async (req, res) => {
  try {
    const { client_id, amount } = req.body;

    const wallet = await Wallet.findOneAndUpdate(
      { client_id, balance: { $gte: amount } },
      { $inc: { balance: -amount } },
      { new: true },
    );

    if (!wallet) return res.status(400).json({ error: "Insufficient balance" });

    await Ledger.create({
      client_id,
      type: "DEBIT",
      amount,
    });

    res.json({ message: "Wallet debited", balance: wallet.balance });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
