const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

/* Import Routes */
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const salesRoutes = require("./routes/salesRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const notifyRoutes = require("./routes/notifyRoutes");
const reportRoutes = require("./routes/reportRoutes");


/* 🔍 DEBUG */
console.log("ROUTES CHECK:", {
  authRoutes,
  productRoutes,
  salesRoutes,
  dashboardRoutes,
  notifyRoutes,
});

/* Use Routes */
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/notify", notifyRoutes);
app.use("/api/reports", reportRoutes);


app.get("/", (req, res) => {
  res.send("Supermarket ERP API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});