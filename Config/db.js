const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

mongoose.Promise = global.Promise;

//Connecting DB
mongoose
  .connect(process.env.CONT_STR)
  .then(() => {
    console.log("Connected to the database successfully");
  })
  .catch((err) => {
    console.log(err);
    process.exit();
  });
