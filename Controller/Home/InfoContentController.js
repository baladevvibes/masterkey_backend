const info_content = require("../../Models/Home/InfoContentModel");


exports.createInfoContent= async (req, res) => {
    const ipAddress =
        req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    try {
        const { file, body } = req; // Destructure for cleaner code
        // if (!file) return res.status(400).send('No file uploaded.');
        var content = await info_content.find();
        console.log(content.length > 2);
        if (content.length > 2) {
            return res.status(400).send('content  Only three.');
        }

        await info_content.create({
            ...req.body,
            ipAddress: req.ip,
        });
        res.status(200).send("Info Content Successfully");

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
        console.log("Internal Server Error");
    }
};

exports.getInfoContent = async (req, res) => {
    const ipAddress =
        req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    try {
        var banner = await info_content.find();
        res.status(200).json({
            status: "success",
            data: banner,
        });
    } catch (err) {
        res.status(500).json({
            status: "failed",
            message: err,
        });
    }
};

exports.updateInfoContent = async (req, res) => {
    const ipAddress =
        req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    try {
        // Prepare the update object
        const updateData = {
            info: req.body.info,
            content: req.body.content,
            ipAddress: ipAddress,
        };
        console.log(updateData);
        const updatedPost = await info_content.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        // Check if post was found
        if (!updatedPost) {
            return res.status(404).json({ message: "Info Content not found" });
        }

        res.json(updatedPost);
    } catch (error) {
        console.error("Error updating Info Content:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};



exports.deleteInfoContent = async (req, res) => {
    const id = (req.params.id)
    try {

        const infocard = await info_content.findOne({ _id: id });
        if (!infocard) {
            return res.status(404).send("Info Content not found");
        }
        await info_content.deleteOne({ _id: id });
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