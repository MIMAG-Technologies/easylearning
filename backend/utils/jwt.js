require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.jwtSecret;

// Function to generate a JWT token
const generateToken = (payload) => {
  try {
    const token = jwt.sign(payload, jwtSecret, { expiresIn: "7d" });
    return token;
  } catch (error) {
    throw new Error(`Error generating JWT token: ${error.message}`);
  }
};

// Function to verify a JWT token
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, jwtSecret);
    return decoded;
  } catch (error) {
    throw new Error(`Error verifying JWT token: ${error.message}`);
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
