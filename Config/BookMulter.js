const multer = require('multer');
// Multer setup
const storage = multer.diskStorage({
    destination: './uploads/book_card',
    filename: (req, file, cb) => {
        // console.log(req);
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const bookcardupload = multer({ storage });

module.exports = bookcardupload;