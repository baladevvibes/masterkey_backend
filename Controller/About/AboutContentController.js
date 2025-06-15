const about_content = require("../../Models/About/AboutContentModel");
const path = require("path");
const fs = require("fs");
const { log } = require("console");
const sendLeadMail = require("../../Email/leadTemp");

const uploadFolder = path.join(__dirname, "../../uploads/about_content"); // your uploads folder

function getImagePaths() {
  const dirPath = path.join(__dirname, "../../uploads/about_content");

  if (!fs.existsSync(dirPath)) {
    console.warn(`Directory not found: ${dirPath}`);
    return []; // or handle as needed
  }

  return fs.readdirSync(dirPath);
}


exports.DeleteAboutContentImagesController = async (req, res) => {
  const docs = await about_content.find();
  let arr = [];
  let factImag = [];

  
  docs?.forEach((el) => {
    if (el?.image?.includes("\\") === true) {
      factImag.push(el?.image?.split("\\").at(-1));
    }
    if (el?.image?.includes("/") === true) {
      factImag.push(el?.image?.split("/").at(-1));
    }
    arr.push(el.content?.blocks);
  });
  let images = [];

  arr?.forEach((el) => {
    el?.forEach((al) => {
      if (al.type === "image") {
        images.push(al.data?.file?.url?.split("/").at(-1));
      }
    });
  });
  const imagePaths = getImagePaths();
  //   res.send(images);

  let dataImage = [];
  imagePaths?.forEach((el) => {
    dataImage.push(el?.split("\\").at(-1));
  });
  let merImage = [...factImag, ...images];
  // console.log(factImag);

  const data = {
    filesToKeep: merImage,
  };
  if (!Array.isArray(data?.filesToKeep)) {
    return res.status(400).json({ message: "filesToKeep must be an array" });
  }
  // res.json(data); // Return image paths as a JSON response

  fs.readdir(uploadFolder, (err, files) => {
    if (err) {
      console.error("Error reading upload folder:", err);
      return res.status(500).json({ message: "Failed to read upload folder" });
    }
    // console.log(images, dataImage, factImag);

    // Files to delete = all files not in the keep list
    const filesToDelete = files.filter(
      (file) => !data?.filesToKeep.includes(file)
    );

    // Delete files
    filesToDelete.forEach((file) => {
      const filePath = path.join(uploadFolder, file);

      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error deleting file ${file}:`, err);
        } else {
          console.log(`Deleted file: ${file}`);
        }
      });
    });
    res.json({ message: "Cleanup complete", deletedFiles: filesToDelete });
  });
};

exports.createAboutContent = async (req, res) => {
  const ipAddress =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  try {
    const { file, body } = req; // Destructure for cleaner code


    if (!file) return res.status(400).send('No file uploaded.');

    var aboutcontent = await about_content.find();
            if (aboutcontent.length > 0) {
                return res.status(400).send('about content Only one.');
            }

    await about_content.create({
      ...req.body,
      image: req.file?.path,
      ipAddress: ipAddress,
    });
    res.status(200).send("About Content  Posted Successfully");

  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
    console.log("Internal Server Error");
  }
};

exports.getAboutContent = async (req, res) => {
  const ipAddress =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  try {
    var course = await about_content.find();
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

exports.updateAboutContent = async (req, res) => {
  const ipAddress =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  try {
    // Prepare the update object
    const updateData = {
      title: req.body.title,
      image: req.body.image,
      alt_tag: req.body.alt_tag,
      content: req.body.content,
      ipAddress: ipAddress,
    };
    console.log(updateData);

    if (req.file) {
      updateData.image = `/uploads/about_content/${req.file.filename}`;
    }

    const updatedPost = await about_content.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    // Check if post was found
    if (!updatedPost) {
      return res.status(404).json({ message: "About Content    not found" });
    }

    res.json(updatedPost);
  } catch (error) {
    console.error("Error updating About Content :", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};



exports.deleteAboutContent = async (req, res) => {
  const id = (req.params.id)
  try {

    const aboutsdata = await about_content.findOne({ _id: id });
    if (!aboutsdata) {
      return res.status(404).send("About Content  not found");
    }
    await about_content.deleteOne({ _id: id });
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