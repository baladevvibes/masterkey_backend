const multer = require('multer');
// Multer setup
const storage = multer.diskStorage({
    destination: './uploads/blogs',
    filename: (req, file, cb) => {
        // console.log(req);
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage });

module.exports = upload;