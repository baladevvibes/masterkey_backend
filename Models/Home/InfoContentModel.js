const mongoose = require("mongoose");

const info_content = mongoose.Schema({
    info: {
        type: String,
        require: true,
    },
    content: {
        type: String,
        require: true,
    },
    ipAddress: {
        type: String,
        required: false,
    },
}, { timestamps: true });

module.exports = mongoose.model("info_content", info_content);
