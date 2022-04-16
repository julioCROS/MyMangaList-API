const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

var transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVICE,
  port: process.env.EMAIL_PORT,
  secure: true,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS
  }
});


exports.send = async (to, subject, html) => {
  var mailOptions = {
    from: process.env.USER,
    to: to,
    subject: subject,
    html: html
  };  

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
} 