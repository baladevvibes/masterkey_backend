const banner_title = require("../../Models/Home/BannerTitleModel");


exports.createBannerTitle = async (req, res) => {
    const ipAddress =
        req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    try {
        const { file, body } = req; // Destructure for cleaner code
        // if (!file) return res.status(400).send('No file uploaded.');
        var banner = await banner_title.find();
        console.log(banner.length > 0);
        if (banner.length > 0) {
            return res.status(400).send('Banner Title Only one.');
        }

        await banner_title.create({
            ...req.body,
            ipAddress: req.ip,
        });
        res.status(200).send("Banner Title Successfully");

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
        console.log("Internal Server Error");
    }
};

exports.getBannerTitle = async (req, res) => {
    const ipAddress =
        req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    try {
        var banner = await banner_title.find();
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

exports.updateBannerTitle = async (req, res) => {
    const ipAddress =
        req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    try {
        // Prepare the update object
        const updateData = {
            title: req.body.title,
            ipAddress: ipAddress,
        };
        console.log(updateData);
        const updatedPost = await banner_title.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        // Check if post was found
        if (!updatedPost) {
            return res.status(404).json({ message: "Banner Tittle   not found" });
        }

        res.json(updatedPost);
    } catch (error) {
        console.error("Error updating Banner Title  content:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};



exports.deleteBannerTitle = async (req, res) => {
    const id = (req.params.id)
    try {

        const coursecarddata = await banner_title.findOne({ _id: id });
        if (!coursecarddata) {
            return res.status(404).send("Banner Title not found");
        }
        await banner_title.deleteOne({ _id: id });
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