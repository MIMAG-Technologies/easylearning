const bcrypt = require("bcrypt");

// Function to hash a value using bcrypt
const hashValue = async (value) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedValue = await bcrypt.hash(value, salt);
    return hashedValue;
  } catch (error) {
    throw new Error(`Error hashing value: ${error.message}`);
  }
};

// Function to compare a value with a hashed value using bcrypt
const compareValues = async (value, hashedValue) => {
  try {
    const match = await bcrypt.compare(value, hashedValue);
    return match;
  } catch (error) {
    throw new Error(`Error comparing values: ${error.message}`);
  }
};

module.exports = {
  hashValue,
  compareValues,
};
