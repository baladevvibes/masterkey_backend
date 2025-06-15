const mongoose = require("mongoose");

const contact = mongoose.Schema({
    firstname: {
        type: String,
        require: true,
    },
    lastname: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    phone: {
        type: Number,
        require: true,
    },
    message: {
        type: String,
        require: true,
    },
});

module.exports = mongoose.model("contact", contact);
