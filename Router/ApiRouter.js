const upload_course_card = require("../Config/MulterCourseCard");
const upload = require("../Config/MulterBlog")
const { createCourseCard, getCourseCard, updateCourseCard, deleteCourseCard, DeleteCourseImagesController, createMetaCourseCardController, getCourseMetaDescription, getIDCourseCardMetaContentController } = require("../Controller/Home/CourseCardController");
const { RegisterController, LoginController } = require("../Controller/UserController");
const { createBlogMetaContentController, getBlogMetaContentController, getIDBlogMetaContentController, updateBlogMetaContentController, deleteBlogMetaContentController, createMetaBlogsController, getBlogMetaDescription, DeleteBlogsImagesController } = require("../Controller/Blog/BlogMetaContentController");
const upload_home_testimonials = require("../Config/MulterTestimonials");
const { createHomeTestimonials, getHomeTestimonials, updateHomeTestimonials, deleteHomeTestimonials, DeleteTestimonialsImagesController } = require("../Controller/Home/HomeTestimonialsController");
const bookcardupload = require("../Config/BookMulter");
const { DeleteBookImagesController, createBookCard, getBookCard, updateBookCard, deleteBookCard, getBookMetaDescription, createMetaBookCardController, getIDBookCardMetaContentController } = require("../Controller/Book/BookCardController");
const { createBannerTitle, getBannerTitle, updateBannerTitle, deleteBannerTitle } = require("../Controller/Home/BannerTitleController");
const { createBookEnquire, getBooksEnquire, updateBookEnquireStatus, updateBookEnquireSellingPrice, deleteBookEnquire, DatePickerhandler, updateBookEnquireOverallTicketClose } = require("../Controller/Book/BookEnquireController");
const { createInfoContent, getInfoContent, updateInfoContent, deleteInfoContent } = require("../Controller/Home/InfoContentController");
const upload_about_content = require("../Config/MulterAboutContent");
const { deleteAboutContent, updateAboutContent, getAboutContent, createAboutContent, DeleteAboutContentImagesController } = require("../Controller/About/AboutContentController");
const { getContact, createContact } = require("../Controller/Contact/ContactController");

const Router = require("express").Router();

Router.route('/createbookenquire').post(createBookEnquire);
Router.route('/getbookenquire').get(getBooksEnquire);
Router.route('/getbookenquirestatus/:id').put(updateBookEnquireStatus);
Router.route('/getbookenquiresellingprice/:id').put(updateBookEnquireSellingPrice);
Router.route('/getbookenquirescloseticket/:id').put(updateBookEnquireOverallTicketClose);
Router.route("/deletebookenquire/:id").delete(deleteBookEnquire);
Router.route("/data").get(DatePickerhandler);


//Add home Banner Title 
Router.route('/createbannertitle').post(createBannerTitle);
//get home Banner Title 
Router.route("/getbannertitle").get(getBannerTitle);
//update home Banner Title 
Router.route('/updatebannertitle/:id').put(updateBannerTitle)
//delete home Banner Title 
Router.route("/deletebannertitle/:id").delete(deleteBannerTitle);

//Add Contact
Router.route('/createcontact').post(createContact);
//get Contact 
Router.route("/getcontact").get(getContact);


//Add home Info Content
Router.route('/createinfocontent').post(createInfoContent);
//get home Info Content 
Router.route("/getinfocontent").get(getInfoContent);
//update home Info Content 
Router.route('/updateinfocontent/:id').put(updateInfoContent)
//delete home Info Content 
Router.route("/deleteinfocontent/:id").delete(deleteInfoContent);

//Add about content 
Router.route('/createaboutcontent').post(upload_about_content.single('image'), createAboutContent);
//get about content  
Router.route("/getaboutcontent").get(getAboutContent);
//update about content 
Router.route('/updateaboutcontent/:id').put(upload_about_content.single('image'), updateAboutContent)
//delete about content  
Router.route("/deleteaboutcontent/:id").delete(deleteAboutContent);
Router.route("/delete-about-content-image").get(DeleteAboutContentImagesController);


//Add home testimonials 
Router.route('/createhometestimonials').post(upload_home_testimonials.single('image'), createHomeTestimonials);
//get home testimonials 
Router.route("/gethometestimonials").get(getHomeTestimonials);
//update home testimonials
Router.route('/updatehometestimonials/:id').put(upload_home_testimonials.single('image'), updateHomeTestimonials)
//delete home testimonials 
Router.route("/deletehometestimonials/:id").delete(deleteHomeTestimonials);
Router.route("/delete-testimonials-image").get(DeleteTestimonialsImagesController);

//Add home Course card
Router.route('/createcoursecard').post(upload_course_card.single('image'), createCourseCard);
//get home Course card
Router.route("/getcoursecard").get(getCourseCard);
//update home Course card
Router.route('/updatecoursecard/:id').put(upload_course_card.single('image'), updateCourseCard)
//delete home Course card
Router.route("/deletecoursecard/:id").delete(deleteCourseCard);



//Add home Course card
Router.route('/createbookcard').post(bookcardupload.single('image'), createBookCard);
//get home Course card
Router.route("/getbookcard").get(getBookCard);
//update home Course card
Router.route("/getidmetabook/:id").get(getIDBookCardMetaContentController);
//
Router.route('/updatebookcard/:id').put(bookcardupload.single('image'), updateBookCard)
//delete home Course card
Router.route("/deletebookcard/:id").delete(deleteBookCard);
Router.route("/createmetabookcard").post(createMetaBookCardController);
Router.route("/metabookcardId/:bookwithId").get(getBookMetaDescription);
Router.route("/delete-book-image").get(DeleteBookImagesController);



//Add home Course card
Router.route('/createcoursecard').post(upload_course_card.single('image'), createCourseCard);
//get home Course card
Router.route("/getcoursecard").get(getCourseCard);
//update home Course card
Router.route("/getidmetacourse/:id").get(getIDCourseCardMetaContentController);
//
Router.route('/updatecoursecard/:id').put(upload_course_card.single('image'), updateCourseCard)
//delete home Course card
Router.route("/deletecoursecard/:id").delete(deleteCourseCard);
Router.route("/createmetacoursecard").post(createMetaCourseCardController);
Router.route("/metacoursecardId/:bookId").get(getCourseMetaDescription);
Router.route("/delete-course-image").get(DeleteCourseImagesController);



Router.route('/createmetablog').post(upload.single('image'), createBlogMetaContentController);
Router.route("/getmetablogs").get(getBlogMetaContentController);
Router.route("/getidmetablogs/:id").get(getIDBlogMetaContentController);
Router.route('/updatemetablog/:id').put(upload.single('image'), updateBlogMetaContentController)
Router.route("/deleteidmetablogs/:id").delete(deleteBlogMetaContentController);
Router.route("/createmetablogs").post(createMetaBlogsController);
Router.route("/metaunquieId/:blogId").get(getBlogMetaDescription);
Router.route("/delete-blog-image").get(DeleteBlogsImagesController);

Router.route('/upload-image').post(upload.single('image'), (req, res) => {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ success: 0, message: 'No file uploaded' });
    }
  
    const imageUrl = `http://localhost:5000/uploads/blogs/${file.filename}`;
  
    return res.status(200).json({
      success: 1,
      file: { url: imageUrl },
    });
  });



Router.route("/register").post(RegisterController);
// Login Controller
Router.route("/login").post(LoginController);
// Get All API Limit Page Blogs Controller
module.exports = Router;
