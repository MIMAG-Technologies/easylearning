const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  instructor: { type: Schema.Types.ObjectId, ref: "User" },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  whatWillLearn: [{ type: String, required: true }],
  description: { type: String, required: true },
  thumbnailUrl: { type: String, required: true },
  modules: [{ type: Schema.Types.ObjectId, ref: "Module" }],
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  studentsEnrolled: [{ type: Schema.Types.ObjectId, ref: "User" }],
  providingInstitution: { type: String, required: true },
  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advance"],
    required: true,
  },
  belongTo: {
    type: String,
    enum: [
      "For Individuals",
      "For Corporates",
      "For Universities",
      "For Governments",
    ],
    required: true,
  },
  expectedDuration: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Course", CourseSchema);
