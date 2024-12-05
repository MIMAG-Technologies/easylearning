const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  profilePhotoUrl: { type: String },
  bio: { type: String, default: "" },
  socialMedia: {
    facebook: { type: String, default: "" },
    twitter: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    instagram: { type: String, default: "" },
    youtube: { type: String, default: "" }, // Added YouTube
  },
  headline: { type: String, default: "" },
  role: { type: String, enum: ["student", "teacher", "admin"], required: true },
  enrolledCourses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  enrolledCoursesCount: [
    {
      courseId: { type: Schema.Types.ObjectId, ref: "Course" },
      quantity: {
        type: Number,
      },
    },
  ],
  assignedCourses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  contactNumber: { type: String, default: "" }, // Added contact number
  address: {
    appartmentNo: { type: String, default: "" },
    street: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    country: { type: String, default: "" },
    postalCode: { type: String, default: "" },
  }, // Added address details
  dateOfBirth: { type: Date }, // Added date of birth
  createdAt: { type: Date, default: Date.now }, // Added creation date
  updatedAt: { type: Date, default: Date.now }, // Added update date
});

module.exports = mongoose.model("User", UserSchema);
