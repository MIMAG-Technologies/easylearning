const nodemailer = require("nodemailer");

// Function to send an email using NodeMailer
const sendEmail = async (to, subject, htmlContent) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to,
      subject,
      html: htmlContent, // Use html property for HTML content
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    throw new Error(`Error sending email: ${error.message}`);
  }
};

module.exports = {
  sendEmail,
};
