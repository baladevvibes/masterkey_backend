const mongoose = require("mongoose");

const book_card = mongoose.Schema({
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  title: {
    type: String,
    require: true,
  },
  url: {
    type: String,
    require: true,
  },
  des: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  position: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  alt_tag: {
    type: String,
    required: true,
  },
  ispublished: {
    type: String,
    enum: ["Published", "Unpublished"],
    required: true,
  },
  ismetapublished: {
    type: String,
    enum: ["meta", "notmeta"],
    required: true,
  },
  metatitle: {
    type: String,
    required: false,
  },
  metadescription: {
    type: String,
    required: false,
  },
  keywords: {
    type: String,
    required: false,
  },
  canonical: {
    type: String,
    required: false,
  },
  schema: {
    type: String,
    required: false,
  },
  ogtitle: {
    type: String,
    required: false,
  },
  ogdescription: {
    type: String,
    required: false,
  },
  ogurl: {
    type: String,
    required: false,
  },
  ogalt: {
    type: String,
    required: false,
  },
  ipAddress: {
    type: String,
    required: false,
  },

}, { timestamps: true });

module.exports = mongoose.model("book_card", book_card);
