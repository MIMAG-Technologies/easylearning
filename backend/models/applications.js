const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  position: String,
  resume: String,
});

module.exports = mongoose.model("Application", applicationSchema);
