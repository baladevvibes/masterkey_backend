const multer = require('multer');
// Multer setup
const storage = multer.diskStorage({
    destination: './uploads/home_testimonials',
    filename: (req, file, cb) => {
        // console.log(req);
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload_home_testimonials = multer({ storage });

module.exports = upload_home_testimonials;