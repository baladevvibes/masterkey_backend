const mongoose = require("mongoose");

const home_testimonials_key = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  sub: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    required: true,
  },
  alt_tag:{
    type: String,
    required: true,
  },
  position: {
    type: Number,
    required: true,
  },
  content:{
    type: String,
    required: true,
  },
  ipAddress: {
    type: String,
    required: false,
  },
},{ timestamps: true });

module.exports = mongoose.model("home_testimonials_key", home_testimonials_key);
