const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MaterialSchema = new Schema({
  type: {
    type: String,
    enum: ["reading", "video", "quiz", "online_class"],
    required: true,
  },
  content: { type: Schema.Types.Mixed, required: true },
});

module.exports = mongoose.model("Material", MaterialSchema);
