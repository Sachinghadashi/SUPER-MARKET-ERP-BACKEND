const express = require("express");
const {
  getSummary,
  dailySales,
  bestProducts,
} = require("../controllers/dashboardController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/summary", protect, adminOnly, getSummary);
router.get("/daily-sales", protect, adminOnly, dailySales);
router.get("/best-products", protect, adminOnly, bestProducts);

module.exports = router;
