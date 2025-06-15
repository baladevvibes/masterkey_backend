const mongoose = require("mongoose");
const Counter = require("./counter"); // Adjust path if needed

const book_enquire = mongoose.Schema({
    leadNumber: {
        type: String,
        unique: true,
        index: true,
    },
    city: {
        type: String,
        require: false,
    },
    country: {
        type: String,
        require: false,
    },
    device: {
        type: String,
        require: false,
    },
    district: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    latitude: {
        type: Number,
        required: false,
    },
    longitude: {
        type: Number,
        required: false,
    },
    name: {
        type: String,
        required: false,
    },
    os: {
        type: String,
        required: false,
    },
    other: {
        type: String,
        required: false,
    },
    othermsg: {
        type: String,
        required: false,
    },
    parameter: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: false,
    },
    pincode: {
        type: String,
        required: false,
    },
    price: {
        type: Number,
        required: false,
    },
    selling_price: {
        type: Number,
        required: false,
    },
    payment: {
        type: Boolean,
        required: false,
        default: false
    },
    overall: {
        type: Boolean,
        required: false,
        default: false
    },
    business_status: {
        type: Boolean,
        required: false,
        default: false
    },
    status: {
        type: String,
        required: false,
    },
    state: {
        type: String,
        required: false,
    },
    book: {
        type: String,
        required: false,
    },
    tracking: {
        type: String,
        required: false,
    },
    courier: {
        type: String,
        required: false,
    },
    utmmedium: {
        type: String,
        required: false,
    },
    version: {
        type: String,
        required: false,
    },
    ipAddress: {
        type: String,
        required: false,
    },

}, { timestamps: true });

// Auto-increment leadNumber before saving a new document
book_enquire.pre("save", async function (next) {
    if (this.isNew) {
        try {
            const counter = await Counter.findByIdAndUpdate(
                { _id: "book_enquire_leadNumber" },  // counter id for this model
                { $inc: { seq: 1 } },
                { new: true, upsert: true }
            );
            const seqString = counter.seq.toString().padStart(4, "0"); // e.g., 0001
            this.leadNumber = `LEAD${seqString}`;
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

module.exports = mongoose.model("book_enquire", book_enquire);
