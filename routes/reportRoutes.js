const express = require("express");
const {
  getTotalRevenue,
  getDateWiseSales,
  getMonthWiseSales,
  getYearWiseSales,
} = require("../controllers/reportController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/total", protect, adminOnly, getTotalRevenue);
router.get("/date", protect, adminOnly, getDateWiseSales);
router.get("/month", protect, adminOnly, getMonthWiseSales);
router.get("/year", protect, adminOnly, getYearWiseSales);

module.exports = router;
