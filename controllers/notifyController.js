const nodemailer = require("nodemailer");
const twilio = require("twilio");

// ================= EMAIL =================
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ================= TWILIO =================
const twilioClient = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH
);

// Send bill via Email
exports.sendBillEmail = async (req, res) => {
  try {
    const { email, billText } = req.body;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Supermarket Bill",
      text: billText,
    });

    res.json({ message: "Bill sent via Email" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Send bill via SMS
exports.sendBillSMS = async (req, res) => {
  try {
    const { phone, billText } = req.body;

    await twilioClient.messages.create({
      body: billText,
      from: process.env.TWILIO_PHONE,
      to: phone,
    });

    res.json({ message: "Bill sent via SMS" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
