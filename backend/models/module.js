const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ModuleSchema = new Schema({
  title: { type: String, required: true },
  course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  order: { type: Number, required: true },
  about: { type: String, required: true },
  timeToComplete: { type: Number, required: true },
  topics: [{ type: Schema.Types.ObjectId, ref: "Topic" }],
});

module.exports = mongoose.model("Module", ModuleSchema);
