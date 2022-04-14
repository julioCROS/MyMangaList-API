const dotenv = require('dotenv');
dotenv.config();

let sendgrid = require('sendgrid')(process.env.SENDGRID_API_KEY);

exports.send = async (to, subject, html) => {
  sendgrid.send({
    to: to,
    from: process.env.EMAIL_FROM,
    subject: subject,
    html: html
  });
} 