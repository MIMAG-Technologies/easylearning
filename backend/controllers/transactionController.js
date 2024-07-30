const { generateToken, verifyToken } = require("../utils/jwt");

// Mongoose models
const Transaction = require("../models/transaction");
const User = require("../models/user");

// Helper function to validate request data
const validateInitiateTransaction = (data) => {
  const { userId, courseId, amount } = data;
  if (!userId || typeof userId !== "string") {
    return "Invalid or missing 'userId'";
  }
  if (!courseId || typeof courseId !== "string") {
    return "Invalid or missing 'courseId'";
  }
  if (!amount || typeof amount !== "string" || amount.length > 50) {
    return "Invalid or missing 'amount'";
  }
  return null;
};

const validateCompleteTransaction = (data) => {
  const {
    token,
    transactionState,
    transactionIdentifier,
    dateTime,
    errorMessage,
  } = data;
  if (!token || typeof token !== "string") {
    return "Invalid or missing 'token'";
  }
  if (!transactionState || typeof transactionState !== "string") {
    return "Invalid or missing 'transactionState'";
  }
  if (!transactionIdentifier || typeof transactionIdentifier !== "string") {
    return "Invalid or missing 'transactionIdentifier'";
  }
  if (!dateTime || isNaN(Date.parse(dateTime))) {
    return "Invalid or missing 'dateTime'";
  }
  if (errorMessage && typeof errorMessage !== "string") {
    return "Invalid 'errorMessage'";
  }
  return null;
};

const isValidAddress = (address) => {
  if (!address) return false;
  const { appartmentNo, street, city, state, country, postalCode } = address;
  return street && city && state && country && postalCode && appartmentNo;
};

const initiateTransaction = async (req, res) => {
  try {
    // Validate the request body
    const error = validateInitiateTransaction(req.body);
    if (error) {
      return res.status(400).json({ message: error });
    }

    const { userId, courseId, amount } = req.body;

    // Check if user exists and has a valid address
    const user = await User.findById(userId);
    if (!user || !isValidAddress(user.address)) {
      return res.status(400).json({ message: "Enter valid address" });
    }

    // Check if user is already enrolled in the course
    const isEnrolled = user.enrolledCourses.includes(courseId);
    if (isEnrolled) {
      return res
        .status(400)
        .json({ message: "User is already enrolled in this course" });
    }

    // Create a new transaction entry with state pending
    const newTransaction = new Transaction({
      userId,
      courseId,
      amount,
      transactionState: "pending",
    });

    await newTransaction.save();

    // Payload to include in the JWT token
    const payload = {
      transactionId: newTransaction._id,
      userId,
      courseId,
      amount,
    };

    // Sign the token
    const token = generateToken(payload);

    // Send the token to the user
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error initiating transaction:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const completeTransaction = async (req, res) => {
  try {
    const userToken = req.headers.authorization?.replace("Bearer ", "");

    // If token is not provided, return 401 status code with a message
    if (!userToken) {
      return res
        .status(401)
        .json({ message: "Authorization token is required" });
    }

    // Validate the request body
    const error = validateCompleteTransaction(req.body);
    if (error) {
      return res.status(400).json({ message: error });
    }

    const {
      token,
      transactionState,
      transactionIdentifier,
      dateTime,
      errorMessage,
    } = req.body;

    // Decode the token to get the payload
    let decoded;
    try {
      decoded = verifyToken(token);
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    // Get the transactionId from the decoded token
    let { transactionId } = decoded;

    // Verify if the transaction details match the existing entry
    const existingTransaction = await Transaction.findById(transactionId);

    if (!existingTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Update the transaction with the details from the payment gateway
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      transactionId,
      {
        transactionState,
        transactionIdentifier,
        dateTime: new Date(dateTime),
        errorMessage: errorMessage || existingTransaction.errorMessage,
      },
      { new: true }
    );

    // Send the updated transaction details to the user
    res.status(200).json({ updatedTransaction });
  } catch (error) {
    console.error("Error completing transaction:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { initiateTransaction, completeTransaction };
