const bcrypt = require("bcryptjs");

// Function to hash a value using bcrypt
const hashPassword = async (value) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedValue = await bcrypt.hash(value, salt);
    return hashedValue;
  } catch (error) {
    throw new Error(`Error hashing value: ${error.message}`);
  }
};

// Function to compare a value with a hashed value using bcrypt
const comparePassword = async (value, hashedValue) => {
  try {
    const match = await bcrypt.compare(value, hashedValue);
    return match;
  } catch (error) {
    throw new Error(`Error comparing values: ${error.message}`);
  }
};

module.exports = {
  hashPassword,
  comparePassword,
};
