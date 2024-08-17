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
  isDeleted: { type: Boolean, default: false },
  reviews: [
    {
      _id: { type: Schema.Types.ObjectId, ref: "Review" },
      rating: { type: Number },
    },
  ],
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
  expectedDuration: {
    type: String,
    enum: ["1-4 weeks", "1-4 months", "4-8 months", "8-12 months", "1-2 years"],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Course", CourseSchema);
