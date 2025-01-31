const nodemailer = require("nodemailer");
require("dotenv").config(); 
 
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {  
    user: process.env.EMAIL_SERVICE_GMAIL,
    pass: process.env.EMAIL_SERVICE_PASS
  } 
}); 

async function sendOTPEmail(email, otp) {
  const mailOptions = {
    from: process.env.EMAIL_SERVICE_GMAIL,
    to: email,
    subject: "Your OTP Code",
    text: `Dear User, 😁 Thank you for using our service. please use the following One-Time Password,This OTP is valid for the next 60 seconds. Please do not share this code with anyone. If you did not request this code, please contact our support team immediately😍.
    \nOTP - ${otp}
    \nThank you
    `
  };
  return transporter.sendMail(mailOptions);
}


module.exports = sendOTPEmail;