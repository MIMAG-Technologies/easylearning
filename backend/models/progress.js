const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProgressSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  completedModules: [{ type: Schema.Types.ObjectId, ref: "Module" }],
  completedTopics: [{ type: Schema.Types.ObjectId, ref: "Topic" }],
});

module.exports = mongoose.model("Progress", ProgressSchema);
