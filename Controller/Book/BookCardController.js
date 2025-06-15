const book_card = require("../../Models/Book/BookCardModel");

const path = require("path");
const fs = require("fs");
const { log } = require("console");
const { decrypt } = require("../../Utils/EncryptDecrypt");

const uploadFolder = path.join(__dirname, "../../uploads/book_card"); // your uploads folder

function getImagePaths() {
  const dirPath = path.join(__dirname, "../../uploads/book_card");

  if (!fs.existsSync(dirPath)) {
    console.warn(`Directory not found: ${dirPath}`);
    return []; // or handle as needed
  }

  return fs.readdirSync(dirPath);
}


exports.DeleteBookImagesController = async (req, res) => {
  const docs = await book_card.find();
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

exports.createBookCard = async (req, res) => {
    const ipAddress =
        req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    try {
        const { file, body } = req; // Destructure for cleaner code


        if (!file) return res.status(400).send('No file uploaded.');

        await book_card.create({
            ...req.body,
            image: req.file?.path,
            ipAddress: req.ip,
        });
        res.status(200).send("Blog Posted Successfully");

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
        console.log("Internal Server Error");
    }
};

exports.getIDBookCardMetaContentController = async (req, res) => {
  const post = await book_card.findById(req.params.id);
  res.json(post);
};

exports.getBookCard = async (req, res) => {
    const ipAddress =
        req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    try {
        var course = await book_card.find();
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

exports.updateBookCard = async (req, res) => {
    const ipAddress =
        req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    try {
        // Prepare the update object
        const updateData = {
            title: req.body.title,
            des:req.body.des,
            url: req.body.url,
            image: req.body.image,
            alt_tag: req.body.alt_tag,
            position: req.body.position,
            price:req.body.price,
        };
        console.log(updateData);

        if (req.file) {
            updateData.image = `/uploads/book_card/${req.file.filename}`;
        }

        const updatedPost = await book_card.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        // Check if post was found
        if (!updatedPost) {
            return res.status(404).json({ message: "course card not found" });
        }

        res.json(updatedPost);
    } catch (error) {
        console.error("Error updating course card content:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};



exports.deleteBookCard = async (req, res) => {
    const id = (req.params.id)
    try {

        const coursecarddata = await book_card.findOne({ _id: id });
        if (!coursecarddata) {
            return res.status(404).send("Blog not found");
        }
        await book_card.deleteOne({ _id: id });
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



exports.getBookMetaDescription = async (req, res) => {
   console.log(req.params);
   
   try {
     await book_card
       .findOne({ url: req.params.bookwithId })
       .then((data) => {
         // res.status(200).send(data);
         console.log(book_card);
         
         res.status(200).send(
           JSON.stringify({
             title: data?.title,
             description: data?.description,
             metatitle: data?.metatitle,
             metadescription: data?.metadescription,
             keywords: data?.keywords,
             date: data?.date,
             updatedDate: data?.updatedDate,
             author: data?.author,
             ogdescription: data?.ogdescription,
             ogtitle: data?.ogtitle,
             ogurl: data?.ogurl,
             ogimg: data?.ogimg,
             ogalt: data?.ogalt,
             schema: data?.schema,
             url: data?.url,
           })
         );
         // data.map((v) => res.status(200).send(v.metadescription));
         // console.log(data.metadescription);
       })
       .catch((err) => {
         res.status(404).send(err);
         console.log(err);
       });
   } catch (error) {
     res.status(500).send("Internal Server Error");
   }
};

exports.createMetaBookCardController = async (req, res) => {
  const id = JSON.parse(decrypt(req.body.data));
  // console.log(id.blogid);
  const ipAddress =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  try {
    const {
      metatitle,
      metadescription,
      keywords,
      canonical,
      schema,
      ogtitle,
      ogdescription,
      ogurl,
      ogalt,
      ismetapublished,
    } = id;
    const updatedMeta = {
      $set: {
        metatitle,
        metadescription,
        keywords,
        canonical,
        schema,
        ogtitle,
        ogdescription,
        ogurl,
        ogalt,
        ismetapublished,
        ipAddress: ipAddress,
        timeStamp: Date.now(),
      },
    };
    await book_card
      .updateOne({ _id: id.blogid }, updatedMeta, { new: true })
      .then(() => {
        res.status(200).send("Blog Meta Data Saved Succefully");
        // console.log("Meta Blog Data Updated");
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  } catch (error) {
    console.log("error :", error);
  }
};