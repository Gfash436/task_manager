
const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");

const sendEmail = async (options, attachment = false) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  try {
    const message = {
      from: `${process.env.FROM_NAME} <${process.env.USER_EMAIL}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
      html: options.message,
    };


    const info = await transporter.sendMail(message);
    console.log("Message sent: %s", info.messageId);

    return info;
  } catch (error) {
    console.log(error);
    return error;
  }
};



module.exports = sendEmail;
