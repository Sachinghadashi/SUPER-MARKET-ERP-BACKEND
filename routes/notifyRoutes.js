const express = require("express");
const {
  sendBillEmail,
  sendBillSMS,
} = require("../controllers/notifyController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/email", protect, sendBillEmail);
router.post("/sms", protect, sendBillSMS);

module.exports = router;
