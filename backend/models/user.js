const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["student", "teacher", "admin"], required: true },
  enrolledCourses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  assignedCourses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
});

module.exports = mongoose.model("User", UserSchema);
