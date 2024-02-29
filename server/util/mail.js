const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "yrao@argusoft.com", // Replace with your Gmail email
      pass: `${process.env.GMAIL_PASS}`, // Replace with your Gmail password
    },
  });


  module.exports = {transporter}