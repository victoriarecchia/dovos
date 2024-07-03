// en un archivo como mailer.js

const nodemailer = require("nodemailer");

// Configuración del transportador SMTP
const transporter = nodemailer.createTransport({
  host: "dovosgestor@gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "your-email@example.com",
    pass: "your-email-password",
  },
});

module.exports = transporter;
