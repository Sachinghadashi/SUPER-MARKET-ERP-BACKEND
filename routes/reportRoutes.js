const express = require("express");
const {
  getTotalReport,
  getDateReport,
  getMonthReport,
  getYearReport,
} = require("../controllers/reportController");

const router = express.Router();

router.get("/total", getTotalReport);
router.get("/date", getDateReport);
router.get("/month", getMonthReport);
router.get("/year", getYearReport);

module.exports = router;
