const mongoose = require("mongoose");

const about_content_key = mongoose.Schema({
  title: {
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
  content:{
    type: String,
    required: true,
  },
  ipAddress: {
    type: String,
    required: false,
  },
},{ timestamps: true });

module.exports = mongoose.model("about_content_key", about_content_key);
