const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true },
  comment: { type: String },
});

module.exports = mongoose.model("Review", ReviewSchema);
