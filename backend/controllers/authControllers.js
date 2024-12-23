const OTPGenerator = require("otp-generator");
const User = require("../models/user");
const Otp = require("../models/otp");
const { sendEmail } = require("../utils/mailSender");
const { hashPassword, comparePassword } = require("../utils/hashing");
const { generateToken } = require("../utils/jwt");
const { decrypt } = require("../utils/cryptoUtils");


const sendOTPForLogin = async (req, res) => {
  const { email } = req.body;

  // Generate a 6-digit OTP
  const otp = OTPGenerator.generate(6, {
    upperCase: false,
    specialChars: false,
  });

  try {
    // Save OTP to the database with a timestamp
    await Otp.findOneAndUpdate(
      { email },
      { otp, createdAt: Date.now() },
      { upsert: true, new: true }
    );

    // Send OTP to user's email
    const subject = "Your OTP Code for Login";
    const emailContent = `
      <h1>Hello,</h1>
      <p>Your OTP code for login is: <strong>${otp}</strong>.</p>
      <p>It is valid for 15 minutes. Do not share this OTP with anyone.</p>
      <p>Best regards,<br>Psycortex Online Education Team</p>
    `;
    await sendEmail(email, subject, emailContent);

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error sending OTP", error: error.message });
  }
}; 

const googleLogin = async (req, res) => {
  try {
    const DECRYPTION_KEY = process.env.DECRYPTION_KEY; // Fetch key from .env
    const { encryptedData } = req.body;
    const decryptedData = decrypt(encryptedData, DECRYPTION_KEY);
    const { name, email } = JSON.parse(decryptedData);
    if (!email || !name) {
      return res.status(400).json({ success: false, error: "Invalid request" });
    }

    // Check if the user exists in the database
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name,
        email,
        profilePhotoUrl: "",
        contactNumber: "",
        role: "student",
      });
    }

    // Generate a JWT for the user
 const payload = { user: { id: user.id, role: user.role } };
 const token = generateToken(payload);

 res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.log(error);

    res.status(500).json({ success: false, error: "Invalid or expired token" });
  }
};

const verifyOTPAndLogin = async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Find the OTP record for the given email
    const otpRecord = await Otp.findOne({ email, otp });

    if (!otpRecord) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Check if the OTP is expired (15-minute validity)
    const currentTime = Date.now();
    const otpAge = currentTime - otpRecord.createdAt.getTime();

    if (otpAge > 15 * 60 * 1000) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // Check if the user exists
    let user = await User.findOne({ email });

    if (!user) {
      // If user does not exist, create a new user
      user = new User({
        name: "",
        email,
        profilePhotoUrl: "",
        contactNumber: "",
        role: "student",
      });
      await user.save();
    }

    // Generate a JWT token for the user
    const payload = { user: { id: user.id, role: user.role } };
    const token = generateToken(payload);

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error during OTP verification", error: error.message });
  }
};


const sendOTP = async (req, res) => {
  const { email, newUser } = req.body;
  const otp = OTPGenerator.generate(6, {
    upperCase: false,
    specialChars: false,
  });

  try {
    const user = await User.findOne({ email });

    if (newUser) {
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }
    } else {
      if (!user) {
        return res.status(404).json({ message: "User does not exist" });
      }
    }

    // Create or update the OTP record
    await Otp.findOneAndUpdate(
      { email },
      { otp, createdAt: Date.now() },
      { upsert: true, new: true }
    );

    const subject = newUser
      ? "Your OTP Code for Sign-in"
      : "Your OTP Code for Resetting Password";

    const emailContent = `
      <h1>Dear User,</h1>
      <p>Your OTP code is <strong>${otp}</strong>.</p>
      <p>Thank you for using Psycortex Online Education.</p>
      <p>Best regards,<br>Psycortex Online Education Team</p>
    `;

    await sendEmail(email, subject, emailContent);

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error sending OTP", error: error.message });
  }
};

const checkOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const otpRecord = await Otp.findOne({ email, otp });

    if (!otpRecord) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const currentTime = Date.now();
    const otpAge = currentTime - otpRecord.createdAt.getTime();

    if (otpAge > 15 * 60 * 1000) {
      // 15 minutes
      return res.status(400).json({ message: "OTP expired" });
    }

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error verifying OTP", error: error.message });
  }
};

const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;

    await user.save();

    // Send email notification
    const emailContent = `
      <h1>Dear ${user.name},</h1>
      <p>Your password has been successfully updated.</p>
      <p>If you did not request this change, please contact our support team immediately.</p>
      <p>Best regards,<br>Psycortex Online Education Team</p>
    `;

    res.status(200).json({ message: "Password reset successfully" });
    await sendEmail(email, "Password Successfully Updated", emailContent).catch(
      (error) => {
        console.error("Error sending email:", error);
      }
    );
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error resetting password", error: error.message });
  }
};

const createStudent = async (req, res) => {
  const { name, email, password, contactNumber } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const user = new User({
      name,
      email,
      profilePhotoUrl: "",
      contactNumber,
      password: hashedPassword,
      role: "student",
    });

    await user.save();

    const payload = { user: { id: user.id, role: user.role } };
    const token = generateToken(payload);

    // Send email notification
    const emailContent = `
     <h1>Welcome ${user.name}!</h1>
     <p>You have successfully registered as a student on Psycortex Online Education.</p>
     <p>We are excited to have you on board.</p>
     <p>Best regards,<br>Psycortex Online Education Team</p>
   `;

    res.status(201).json({ message: "Student registered successfully", token });
    await sendEmail(
      email,
      "Welcome to Psycortex Online Education",
      emailContent
    ).catch((error) => {
      console.error("Error sending email:", error);
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering student", error: error.message });
  }
};

const studentLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.role !== "student") {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const payload = { user: { id: user.id, role: user.role } };

    const token = generateToken(payload);
    // Send email notification
    const emailContent = `
      <h1>Dear ${user.name},</h1>
      <p>You have successfully logged in to Psycortex Online Education.</p>
      <p>If this wasn't you, please contact our support team immediately.</p>
      <p>Best regards,<br>Psycortex Online Education Team</p>
    `;

    res.status(200).json({ token });
    await sendEmail(email, "Login Notification", emailContent).catch(
      (error) => {
        console.error("Error sending email:", error);
      }
    );
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error logging in student", error: error.message });
  }
};

const createTeacher = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const user = new User({
      name,
      email,
      profilePhotoUrl: "",
      password: hashedPassword,
      role: "teacher",
    });

    await user.save();

    const payload = { user: { id: user.id, role: user.role } };
    const token = generateToken(payload);

    res.status(201).json({ message: "Teacher registered successfully", token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering teacher", error: error.message });
  }
};

const teacherLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.role !== "teacher") {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const payload = { user: { id: user.id, role: user.role } };

    const token = generateToken(payload);

    // Send email notification
    const emailContent = `
        <h1>Dear ${user.name},</h1>
        <p>You have successfully logged in to Psycortex Online Education as a teacher.</p>
        <p>If this wasn't you, please contact our support team immediately.</p>
        <p>Best regards,<br>Psycortex Online Education Team</p>
      `;

    res.status(200).json({ token });
    await sendEmail(email, "Login Notification", emailContent).catch(
      (error) => {
        console.error("Error sending email:", error);
      }
    );
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error logging in teacher", error: error.message });
  }
};

const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.role !== "admin") {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const payload = { user: { id: user.id, role: user.role } };

    const token = generateToken(payload);

    res.status(200).json({ token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error logging in admin", error: error.message });
  }
};

const createAdminUser = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    // Check if the admin user already exists
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (!existingAdmin) {
      // Hash the password
      const hashedPassword = await hashPassword(adminPassword);

      // Create the admin user
      const adminUser = new User({
        name: "Admin",
        email: adminEmail,
        password: hashedPassword,
        role: "admin",
      });

      await adminUser.save();
      console.log("Admin user created successfully");
    } else {
      console.log("Admin user already exists");
    }
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
};

const resetAdminPassword = async (req, res) => {
  const { oldpassword, password } = req.body;
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  try {
    const user = await User.findById(req.user.id);

    const isMatch = await comparePassword(oldpassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid old password" });
    }

    const hashedPassword = await hashPassword(password);

    user.password = hashedPassword;

    await user.save();

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error  in  password resetting of admin",
      error: error.message,
    });
  }
};

module.exports = {
  sendOTP,
  checkOTP,
  createAdminUser,
  createStudent,
  resetAdminPassword,
  studentLogin,
  googleLogin,
  createTeacher,
  teacherLogin,
  adminLogin,
  resetPassword,
  sendOTPForLogin,
  verifyOTPAndLogin,
};
