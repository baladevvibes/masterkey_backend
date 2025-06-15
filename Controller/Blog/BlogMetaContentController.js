// controllers/postController.js
const BlogsMetaContent = require('../../Models/Blog/BlogsMetaContent');
const { decrypt } = require('../../Utils/EncryptDecrypt');
const path = require("path");
const fs = require("fs");
const { log } = require("console");

const uploadFolder = path.join(__dirname, "../../uploads/blogs"); // your uploads folder

function getImagePaths() {
  const dirPath = path.join(__dirname, "../../uploads/blogs");

  if (!fs.existsSync(dirPath)) {
    console.warn(`Directory not found: ${dirPath}`);
    return []; // or handle as needed
  }

  return fs.readdirSync(dirPath);
}


exports.DeleteBlogsImagesController = async (req, res) => {
  const docs = await BlogsMetaContent.find();
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

exports.createBlogMetaContentController = async (req, res) => {

  const ipAddress =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  try {
    const { file, body } = req; // Destructure for cleaner code


    if (!file) return res.status(400).send('No file uploaded.');
    console.log("Received blogContent (string):", body.blogContent, req.body.blogContent);

    const blogContents = JSON.parse(req.body.blogContent); // Parse it back into an object
    await BlogsMetaContent.create({
      ...req.body,
      blogContent: blogContents,
      image: req.file?.path,
      ipAddress: req.ip,
    });
    res.status(200).send("Blog Posted Successfully");

  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
    console.log("Internal Server Error");
  }
  // try {
  //     const file = req.file;
  //     if (!file) return res.status(400).send('No file uploaded.');

  //     const post = new BlogsMetaContent({
  //         title: req.body.title,
  //         image: `/uploads/${file.filename}`,
  //     });

  //     console.log(file);

  //     await post.save();
  //     res.status(201).json(post);
  // } catch (err) {
  //     res.status(500).json({ error: err.message });
  // }
};


exports.getBlogMetaContentController = async (req, res) => {
  const posts = await BlogsMetaContent.find();
  res.json(posts);
};


exports.getIDBlogMetaContentController = async (req, res) => {
  const post = await BlogsMetaContent.findById(req.params.id);
  res.json(post);
};

exports.updateBlogMetaContentController = async (req, res) => {
  console.log("Received blogContent (string):", req.body.blogContent, req.body.blogContent);

  const blogContents = JSON.parse(req.body.blogContent); // Parse it back into an object
  const updateData = {
    uid: req.body.uid,
    url: req.body.url,
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    category: req.body.category,
    tags: req.body.tags,
    blogContent: blogContents,
    ispublished: req.body.ispublished,
    ismetapublished: req.body.ismetapublished,
  };
  if (req.file) {
    updateData.image = `/uploads/${req.file.filename}`;
  }
  const updatedPost = await BlogsMetaContent.findByIdAndUpdate(req.params.id, updateData, { new: true });
  res.json(updatedPost);
};


exports.deleteBlogMetaContentController = async (req, res) => {
  try {
    var Id = (req.params.id)
    var deleteData = await BlogsMetaContent.findOneAndDelete(Id, { new: true })
    res.status(200).json({
      status: "success",
    })
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err
    })
  }
};

exports.getBlogMetaDescription = async (req, res) => {
  console.log(req.params);

  try {
    await BlogsMetaContent
      .findOne({ url: req.params.blogId })
      .then((data) => {
        // res.status(200).send(data);
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

exports.createMetaBlogsController = async (req, res) => {
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
    await BlogsMetaContent
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
