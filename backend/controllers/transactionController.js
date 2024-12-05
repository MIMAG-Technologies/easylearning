// Mongoose models
const Transaction = require("../models/transaction");
const User = require("../models/user");
const Course = require("../models/course");
const Module = require("../models/module");
const { sendEmail } = require("../utils/mailSender");

const sendTransactionEmail = async (req, res) => {
  try {
    const { username, cart, email, htmlContent } = req.body; // Expecting email, adminEmail, and htmlContent in the request body

    if (!email || !htmlContent) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const userHTML = `
        <h3>Dear Customer,</h3>
        <p>Thank you for your purchase. Please find your transaction details below:</p>
        ${htmlContent} <!-- Inject the HTML content for the invoice -->
        <p>For any issues, please contact us at info.edu@psycortex.in.</p>
        <p>Best regards,<br>Psycortex Online Education</p>
      `;
    const Admin_HTML = `
        <h3>Dear Admin,</h3>
        <p>A new transaction has been completed. Below are the details:</p>
        ${htmlContent} <!-- Inject the HTML content for the invoice -->
        <p>Regards,<br>Psycortex Online Education</p>
      `;

    // Send both emails
    await sendEmail(
      email,
      "Transaction Successful - Invoice Attached",
      userHTML
    );
    await sendEmail(
      process.env.ADMIN_EMAIL,
      "New Transaction Alert",
      Admin_HTML
    );

    const MailPromises = cart.map(async (item) => {
      const emailContent = `
  <h1>Welcome to ${item.title}, ${username}!</h1>
  <p>Congratulations on enrolling in our course. We're excited to have you on board.</p>
  <p>This course is designed to provide you with the best learning experience, and we're here to support you every step of the way.</p>
  <p>Here are some quick tips to get you started:</p>
  <ul>
<li>Access the 'My Learning' section by selecting the user menu in the top right corner of the website on desktop or by tapping the 3-line button and then the user menu on mobile.</li>
    <li>Once there, you will see all your enrolled courses. Click on any course to access it.</li>
    <li>There will be modules, and the teacher will upload material frequently.</li>
    <li>For discussions, there is a chat section with the teacher.</li>
  </ul>
  <p>If you have any questions or need assistance, don't hesitate to reach out to our support team at info.edu@psycortex.in.</p>
  <p>Happy Learning!</p>
  <p>Best regards,<br>Psycortex Online Education Team</p>
`;
      const mail = await sendEmail(
        email,
        `Welcome to Your New Course , ${item.title}!`,
        emailContent
      );

      return mail;
    });

    await Promise.all(MailPromises);

    res.status(200).json({ message: "Emails sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send emails.", error });
  }
};

const makeTransaction = async (req, res) => {
  try {
    const { items, user, transactionData } = req.body;

    // Validate request body
    if (!items || !user || !transactionData) {
      return res.status(400).json({ message: "Invalid request format." });
    }

    // Validation helpers
    const validateFields = (obj, fields, objName) => {
      for (const field of fields) {
        if (!obj[field]) {
          throw new Error(`Missing ${objName} field: ${field}`);
        }
      }
    };

    try {
      validateFields(
        user,
        ["name", "email", "contactNumber", "address"],
        "user"
      );
      validateFields(
        user.address,
        ["appartmentNo", "street", "city", "state", "country", "postalCode"],
        "address"
      );
      validateFields(
        transactionData,
        ["amount", "transactionState", "transactionIdentifier"],
        "transactionData"
      );
    } catch (validationError) {
      return res.status(400).json({ message: validationError.message });
    }

    // Check if user exists or create a new one
    let dbUser = await User.findOne({ email: user.email });
    if (!dbUser) {
      dbUser = new User({
        name: user.name,
        email: user.email,
        role: "student",
        contactNumber: user.contactNumber,
        address: user.address,
      });
      await dbUser.save();
    }

    // Create transactions and update user
    const transactions = [];
    const newModulesByCourse = {};

    for (const item of items) {
      const transaction = new Transaction({
        userId: dbUser._id,
        courseId: item.id,
        amount: transactionData.amount,
        quantity: item.quantity,
        transactionState: transactionData.transactionState,
        transactionIdentifier: transactionData.transactionIdentifier,
        errorMessage: transactionData.errorMessage || null,
        dateTime: new Date(),
      });
      await transaction.save();
      transactions.push(transaction);

      // Update enrolled courses and modules
      const existingCourse = dbUser.enrolledCoursesCount.find(
        (course) => course.courseId.toString() === item.id
      );

      if (existingCourse) {
        existingCourse.quantity += item.quantity;
      } else {
        dbUser.enrolledCoursesCount.push({
          courseId: item.id,
          quantity: item.quantity,
        });
        dbUser.enrolledCourses.push(item.id);
      }

      // Populate course modules for new users
      const course = await Course.findById(item.id).populate({
        path: "modules",
        match: { isCommon: true },
      });

      const newModules = [];
      for (const module of course.modules) {
        const newModuleData = {
          ...module.toObject(),
          isCommon: false,
          userid: dbUser._id,
        };
        delete newModuleData._id;

        const newModule = new Module(newModuleData);
        await newModule.save();
        newModules.push(newModule._id);
      }

      // Store new modules to avoid redundant saves
      newModulesByCourse[item.id] = newModules;
      course.modules.push(...newModules);
      course.studentsEnrolled.addToSet(dbUser._id);
      await course.save();
    }

    // Update user address only if successful transaction and address changes
    if (
      transactionData.transactionState === "success" &&
      JSON.stringify(dbUser.address) !== JSON.stringify(user.address)
    ) {
      dbUser.address = user.address;
    }

    await dbUser.save();

    return res.status(201).json({
      message: "Transaction successful.",
      transactions,
    });
  } catch (error) {
    console.error("Error in makeTransaction:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports = { makeTransaction, sendTransactionEmail };
