require("dotenv").config();

const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function sendEmail(message) {
  return sgMail.send(message);
}

module.exports = sendEmail;
