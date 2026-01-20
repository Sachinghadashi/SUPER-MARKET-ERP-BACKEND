const express = require("express");
const {
  createSale,
  getSales,
  getMySales,
} = require("../controllers/salesController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// Cashier
router.post("/", protect, createSale);
router.get("/my", protect, getMySales);

// Admin
router.get("/", protect, adminOnly, getSales);

module.exports = router;
