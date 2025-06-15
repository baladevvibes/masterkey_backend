const contact = require("../../Models/Contact/ContactModel");


exports.createContact= async (req, res) => {
    const ipAddress =
        req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    try {
        const { file, body } = req; // Destructure for cleaner code
        // if (!file) return res.status(400).send('No file uploaded.');
     

        await contact.create({
            ...req.body,
        });
        res.status(201).send("contact Successfully");

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
        console.log("Internal Server Error");
    }
};

exports.getContact = async (req, res) => {
    const ipAddress =
        req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    try {
        var contactData = await contact.find();
        res.status(200).json({
            status: "success",
            data: contactData,
        });
    } catch (err) {
        res.status(500).json({
            status: "failed",
            message: err,
        });
    }
};