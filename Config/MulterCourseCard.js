const multer = require('multer');
// Multer setup
const storage = multer.diskStorage({
    destination: './uploads/course_card',
    filename: (req, file, cb) => {
        // console.log(req);
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload_course_card = multer({ storage });

module.exports = upload_course_card;