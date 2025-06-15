const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // e.g., 'book_enquire_leadNumber'
  seq: { type: Number, default: 0 }
});

module.exports = mongoose.model("Counter", counterSchema);
