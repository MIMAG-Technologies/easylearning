const express = require("express");
const multer = require("multer");
const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
const Application = require("../models/applications");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../uploads/applications");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

const sendEmail = async (to, subject, htmlContent, attachments = []) => {
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
      html: htmlContent,
      attachments,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    throw new Error(`Error sending email: ${error.message}`);
  }
};

router.post("/apply", upload.single("resume"), async (req, res) => {
  const { name, email, phone, address, position } = req.body;
  const resumePath = req.file.path;

  const existingApplication = await Application.findOne({ email });
  if (existingApplication) {
    return res
      .status(200)
      .json({ message: "Application with this email already exists" });
  }

  const newApplication = new Application({
    name,
    email,
    phone,
    address,
    position,
    resume: resumePath,
  });

  await newApplication.save();

  const applicantEmailContent = `
        <p>Dear ${name},</p>
        <p>Thank you for applying for the ${position} position. We have received your application.</p>
        <p>Best regards,</p>
        <p>Psycortex Online Education</p>
    `;

  const companyEmailContent = `
        <p>New application received from ${name} for the ${position} position.</p>
        <p>Email: ${email}</p>
        <p>Phone: ${phone}</p>
        <p>Address: ${address}</p>
        <p>Resume attached.</p>
    `;

  try {
    await sendEmail(email, "Application Received", applicantEmailContent, [
      {
        filename: req.file.originalname,
        path: resumePath,
      },
    ]);

    await sendEmail(
      process.env.ADMIN_EMAIL,
      "New Instructor Application",
      companyEmailContent,
      [
        {
          filename: req.file.originalname,
          path: resumePath,
        },
      ]
    );
    res.status(200).send("Application received.");
  } catch (error) {
    res.status(500).send(`Error sending email: ${error.message}`);
  }
});

router.get("/applications", async (req, res) => {
  const applications = await Application.find();
  res.status(200).json(applications);
});

module.exports = router;
