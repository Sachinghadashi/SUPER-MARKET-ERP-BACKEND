const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const axios = require("axios");
const cron = require("node-cron");
const connectDB = require("./config/db");

// Route imports
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const salesRoutes = require("./routes/salesRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const notifyRoutes = require("./routes/notifyRoutes");
const reportRoutes = require("./routes/reportRoutes");

dotenv.config();
connectDB();

// 🔴 IMPORTANT: app must be created BEFORE using app.use
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/notify", notifyRoutes);
app.use("/api/reports", reportRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Supermarket ERP API Running");
});

/* ===============================
   ⏰ CRON JOB (Every 1 Minute)
================================ */
cron.schedule("* * * * *", async () => {
  try {
    await axios.get("https://super-market-erp-backend.onrender.com");
    console.log("🔁 Keep-alive ping successful");
  } catch (error) {
    console.error("❌ Keep-alive ping failed:", error.message);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
