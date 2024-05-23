const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TopicSchema = new Schema({
  title: { type: String, required: true },
  module: { type: Schema.Types.ObjectId, ref: "Module" },
  order: { type: Number, required: true },
  about: { type: String, required: true },
  materials: [
    {
      type: Schema.Types.ObjectId,
      ref: "Material",
    },
  ],
});

module.exports = mongoose.model("Topic", TopicSchema);
