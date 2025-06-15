const mongoose = require("mongoose");

const user = mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    enum: ["admin", "user", "emp"],
    default: "emp",
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("user", user);
