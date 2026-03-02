const Wallet = require("../models/Wallet");

exports.getBalance = async (req, res) => {
  try {
    const client_id = req.headers["client-id"];

    const wallet = await Wallet.findOne({ client_id });

    res.json({ balance: wallet ? wallet.balance : 0 });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
