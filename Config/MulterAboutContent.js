const multer = require('multer');
// Multer setup
const storage = multer.diskStorage({
    destination: './uploads/about_content',
    filename: (req, file, cb) => {
        // console.log(req);
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload_about_content = multer({ storage });

module.exports = upload_about_content;