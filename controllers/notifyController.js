const nodemailer = require("nodemailer");

/* ================= EMAIL ================= */

exports.sendEmail = async (req, res) => {
  try {
    const { email, billText } = req.body;

    if (!email || !billText) {
      return res.status(400).json({ message: "Missing data" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Supermarket ERP" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Purchase Bill",
      text: billText,
    });

    res.json({ message: "Email sent successfully" });
  } catch (err) {
    console.error("Email Error:", err);
    res.status(500).json({ message: "Email failed" });
  }
};

/* ================= SMS (Twilio) ================= */

exports.sendSMS = async (req, res) => {
  try {
    const { phone, billText } = req.body;

    if (!phone || !billText) {
      return res.status(400).json({ message: "Missing data" });
    }

    const twilio = require("twilio")(
      process.env.TWILIO_SID,
      process.env.TWILIO_TOKEN
    );

    await twilio.messages.create({
      body: billText,
      from: process.env.TWILIO_PHONE,
      to: phone,
    });

    res.json({ message: "SMS sent successfully" });
  } catch (err) {
    console.error("SMS Error:", err);
    res.status(500).json({ message: "SMS failed" });
  }
};
