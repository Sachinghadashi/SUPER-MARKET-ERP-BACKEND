const express = require("express");

const {
  sendEmail,
  sendSMS,
} = require("../controllers/notifyController");

const router = express.Router();

router.post("/email", sendEmail);
router.post("/sms", sendSMS);

module.exports = router;
