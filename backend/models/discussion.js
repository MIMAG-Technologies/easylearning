const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DiscussionSchema = new Schema(
  {
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", default: null },
    messages: [
      {
        _id: { type: Schema.Types.ObjectId, auto: true },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Add indexes for faster queries
DiscussionSchema.index({ course: 1, userId: 1 });

module.exports = mongoose.model("Discussion", DiscussionSchema);
