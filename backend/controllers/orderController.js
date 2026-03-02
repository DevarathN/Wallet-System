const axios = require("axios");
const Wallet = require("../models/Wallet");
const Ledger = require("../models/Ledger");
const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  try {
    const client_id = req.headers["client-id"];
    const { amount } = req.body;

    // Atomic wallet deduction
    const wallet = await Wallet.findOneAndUpdate(
      { client_id, balance: { $gte: amount } },
      { $inc: { balance: -amount } },
      { new: true },
    );

    if (!wallet) return res.status(400).json({ error: "Insufficient balance" });

    // Create order
    const order = await Order.create({
      client_id,
      amount,
      status: "PENDING",
    });

    // Ledger entry
    await Ledger.create({
      client_id,
      type: "ORDER",
      amount,
      reference_id: order._id,
    });

    // Call fulfillment API
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      {
        userId: client_id,
        title: order._id.toString(),
      },
    );

    order.fulfillment_id = response.data.id;
    order.status = "COMPLETED";
    await order.save();

    res.json({ order_id: order._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getOrder = async (req, res) => {
  const client_id = req.headers["client-id"];

  const order = await Order.findOne({
    _id: req.params.id,
    client_id,
  });

  if (!order) return res.status(404).json({ error: "Not found" });

  res.json(order);
};
