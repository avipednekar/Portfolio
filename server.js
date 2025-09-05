// server.js
const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// POST route for contact form
app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Configure transporter (using Gmail)
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "avinashpednekar431@gmail.com",
        pass: `${process.env.pass}`,
      },
    });

    // Email options
    let mailOptions = {
      from: email,
      to: "avinashpednekar431@gmail.com",
      subject: `New Message from ${name}`,
      text: `You got a new message from your portfolio site:
      
Name: ${name}
Email: ${email}
Message: ${message}
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to send message." });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});