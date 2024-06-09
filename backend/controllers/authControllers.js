const OTPGenerator = require("otp-generator");
const User = require("../models/user");
const Otp = require("../models/otp");
const { sendEmail } = require("../utils/mailSender");
const { hashPassword, comparePassword } = require("../utils/hashing");
const { generateToken } = require("../utils/jwt");

const sendOTP = async (req, res) => {
  const { email } = req.body;
  const otp = OTPGenerator.generate(6, {
    upperCase: false,
    specialChars: false,
  });
  try {
    // Check if Otp already exists for the email
    let otpRecord = await Otp.findOne({ email });
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    if (otpRecord) {
      // Update existing Otp
      otpRecord.otp = otp;
      otpRecord.createdAt = Date.now();
    } else {
      // Create new Otp record
      otpRecord = new Otp({ email, otp, createdAt: Date.now() });
    }

    await otpRecord.save();
    await sendEmail(email, "Your Otp Code", `<h1>Your Otp code is ${otp}</h1>`);

    res.status(200).json({ message: "Otp sent successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error sending Otp", error: error.message });
  }
};

const checkOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const otpRecord = await Otp.findOne({ email, otp });

    if (!otpRecord) {
      return res.status(400).json({ message: "Invalid Otp" });
    }

    const currentTime = Date.now();
    const otpAge = currentTime - otpRecord.createdAt;

    if (otpAge > 15 * 60 * 1000) {
      // 15 minutes
      return res.status(400).json({ message: "Otp expired" });
    }

    res.status(200).json({ message: "Otp verified successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error verifying Otp", error: error.message });
  }
};

const createStudent = async (req, res) => {
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
      role: "student",
    });

    await user.save();

    const payload = { user: { id: user.id, role: user.role } };
    const token = generateToken(payload);

    res.status(201).json({ message: "Student registered successfully", token });
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

    res.status(200).json({ token });
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

    res.status(200).json({ token });
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

    // const isMatch = await comparePassword(password, user.password);

    // if (!isMatch) {
    //   return res.status(400).json({ message: "Invalid credentials" });
    // }

    const payload = { user: { id: user.id, role: user.role } };

    const token = generateToken(payload);

    res.status(200).json({ token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error logging in admin", error: error.message });
  }
};

module.exports = {
  sendOTP,
  checkOTP,
  createStudent,
  studentLogin,
  createTeacher,
  teacherLogin,
  adminLogin,
};
