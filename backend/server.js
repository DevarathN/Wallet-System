require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const adminRoutes = require("./routes/adminRoutes");
const orderRoutes = require("./routes/orderRoutes");
const walletRoutes = require("./routes/walletRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/admin", adminRoutes);
app.use("/orders", orderRoutes);
app.use("/wallet", walletRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`),
);
