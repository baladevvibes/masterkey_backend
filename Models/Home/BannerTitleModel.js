const mongoose = require("mongoose");

const banner_title = mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    ipAddress: {
        type: String,
        required: false,
    },
}, { timestamps: true });

module.exports = mongoose.model("banner_title", banner_title);
