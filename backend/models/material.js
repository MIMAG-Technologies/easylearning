const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MaterialSchema = new Schema({
  // Common fields
  title: { type: String, required: true },
  module: { type: Schema.Types.ObjectId, ref: "Module", required: true },
  kind: {
    type: String,
    required: true,
    enum: ["MCQ", "Notes", "OnlineClassLink"],
  },
  isCompleted: { type: Boolean, required: true, default: false },

  // Notes
  content: { type: String },

  // Meet
  link: { type: String },
  scheduledTime: { type: Date },

  // MCQ specific fields
  questions: [
    {
      question: String,
      options: [String],
      correctAnswer: String,
      studentAnswer: String,
      examined: { type: Boolean, default: false },
    },
  ],
});

module.exports = mongoose.model("Material", MaterialSchema);
