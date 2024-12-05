const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
    min: 1,
  },
  transactionState: {
    type: String,
    enum: ["success", "failure"],
  },
  transactionIdentifier: {
    type: String,
    default: null,
  },
  dateTime: {
    type: Date,
    default: Date.now,
  },
  errorMessage: {
    type: String,
    default: null,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
