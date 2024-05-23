const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuizSchema = new Schema({
  title: { type: String, required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  topic: { type: Schema.Types.ObjectId, ref: "Topic", required: true },
});

module.exports = mongoose.model("Quiz", QuizSchema);
