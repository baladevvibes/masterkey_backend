
const book_enquire = require("../../Models/Book/BookEnquireModel");
const sendLeadMail = require('../../Email/leadTemp'); // import your email sending module
const sendThankYouLeadMail = require("../../Email/ThankyouLead");
const sendStatusMail = require("../../Email/LeadStatus");

exports.createBookEnquire = async (req, res) => {
    try {
        const data = {
            ...req.body,
            ipAddress:
                req.ip || req.headers["x-forwarded-for"] || req.connection.remoteAddress,
        };

        const newEnquire = await book_enquire.create(data);

        // ✅ SEND MAIL ONCE AFTER SUCCESSFUL CREATE
        await sendLeadMail(newEnquire);
        await sendThankYouLeadMail(newEnquire)

        res.status(200).send(`Enquire Successfully. Lead Number: ${newEnquire.leadNumber}`);
    } catch (error) {
        console.error("Error in createBookEnquire:", error);
        res.status(500).send("Internal Server Error");
    }
};



exports.getBooksEnquire = async (req, res) => {
    const ipAddress =
        req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    try {
        var course = await book_enquire.find();
        res.status(200).json({
            status: "success",
            data: course,
            // eachPrice:
        });
    } catch (err) {
        res.status(500).json({
            status: "failed",
            message: err,
        });
    }
};


exports.updateBookEnquireStatus = async (req, res) => {
    const ipAddress =
        req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    try {
        // Prepare the update object
        const updateData = {
            status: req.body.status,
            tracking: req.body.tracking,
            courier: req.body.courier
        };

        const updatedPost = await book_enquire.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        // Check if post was found
        if (!updatedPost) {
            return res.status(404).json({ message: "Book Status   not found" });
        }

        await sendStatusMail(updatedPost)

        res.json(updatedPost);
    } catch (error) {
        console.error("Error updating Category  content:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};



exports.updateBookEnquireSellingPrice = async (req, res) => {
    const ipAddress =
        req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    try {
        // Prepare the update object
        const updateData = {
            payment: req.body.payment,
            selling_price: req.body.selling_price,
        };

        const updatedPost = await book_enquire.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        // Check if post was found
        if (!updatedPost) {
            return res.status(404).json({ message: "Book Selling Price  not found" });
        }
        res.json(updatedPost);
    } catch (error) {
        console.error("Error updating Category  content:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


exports.updateBookEnquireOverallTicketClose = async (req, res) => {
    const ipAddress =
        req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    try {
        // Prepare the update object
        const updateData = {
            overall: req.body.overall,
        };
        const coursecarddata = await book_enquire.findOne({ _id: req.params.id });
        if (coursecarddata.status === undefined) {
            return res.status(404).send("Close the Status");
        }


        const updatedPost = await book_enquire.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        // Check if post was found
        if (!updatedPost) {
            return res.status(404).json({ message: "Book Selling Price  not found" });
        }
        res.json(updatedPost);
    } catch (error) {
        console.error("Error updating Category  content:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

exports.deleteBookEnquire = async (req, res) => {
    const id = (req.params.id)
    try {

        const coursecarddata = await book_enquire.findOne({ _id: id });
        if (!coursecarddata) {
            return res.status(404).send("Category not found");
        }
        await book_enquire.deleteOne({ _id: id });
        console.log("Deleted");
        res.status(200).send("Deleted");


    } catch (err) {
        console.log(err);

        res.status(500).json({
            status: "failed",
            message: err
        })
    }
}


exports.DatePickerhandler = async (req, res) => {
    const { startdate, enddate } = req.query;

    if (!startdate || !enddate) {
        return res.status(400).json({ error: 'Missing startdate or enddate query parameters' });
    }

    const start = new Date(startdate);
    const end = new Date(enddate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return res.status(400).json({ error: 'Invalid date format' });
    }

    try {
        const data = await book_enquire.find({
            updatedAt: {
                $gte: start,
                $lte: end,
            },
        }).exec();

        res.status(200).json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
}