const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ModuleSchema = new Schema({
  title: { type: String, required: true },
  course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  order: { type: Number, required: true },
  userid: { type: Schema.Types.ObjectId, ref: "User", default: null },
  about: { type: String, required: true },
  timeToComplete: { type: Number, required: true },
  material: [{ type: Schema.Types.ObjectId, ref: "Material" }],
  isCommon: { type: Boolean, required: true, default: false },
});

module.exports = mongoose.model("Module", ModuleSchema);
