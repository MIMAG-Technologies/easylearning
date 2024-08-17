const express = require("express");
const router = express.Router();
const ContactForm = require("../models/ContactForm");
const nodemailer = require("nodemailer");

// POST /contactus
router.post("/contactus", async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    contactNumber,
    city,
    state,
    country,
    message,
  } = req.body;

  try {
    // Save form data to MongoDB
    const newContact = new ContactForm({
      firstname,
      lastname,
      email,
      contactNumber,
      city,
      state,
      country,
      message,
    });

    await newContact.save();

    // Create email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email content for admin
    const adminMailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: process.env.EMAIL_USERNAME,
      subject: `New Contact Form Submission from ${firstname} ${lastname}`,
      text: `Dear Psycortex Online Education Team,\n\nYou have received a new message from your contact form.\n\nDetails:\n- First Name: ${firstname}\n- Last Name: ${lastname}\n- Email: ${email}\n- Contact Number: ${contactNumber}\n- City: ${city}\n- State: ${state}\n- Country: ${country}\n\nMessage:\n${message}\n\nBest regards,\nPsycortex Online Education System`,
    };

    const userMailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: `Thank you for contacting us, ${firstname}`,
      text: `Dear ${firstname},\n\nThank you for reaching out to us at Psycortex Online Education. We have received your message and will get back to you shortly.\n\nBest regards,\nThe Psycortex Online Education Team`,
    };

    // Send emails

    res.status(200).json({ message: "Form submitted successfully" });
    await transporter.sendMail(adminMailOptions).catch((error) => {
      console.error("Error sending email:", error);
    });
    await transporter.sendMail(userMailOptions).catch((error) => {
      console.error("Error sending email:", error);
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to submit form", error });
  }
});

module.exports = router;
