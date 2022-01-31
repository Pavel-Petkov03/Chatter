

const multer = require('multer');
const allowedExtensions = ['image/gif', 'image/jpg', 'image/png', 'image/jpeg'];

const upload = multer({
    fileFilter: function (req, file, cb) {
        if (!allowedExtensions.includes(file.mimetype)) {
            // req.errorMessage = `${file.mimetype.split('/')[1]} is not allowed mimetype`;
            req.errorMessage = 'Error: this mimetype is not allowed.';
            return cb(null, false);
        }
        cb(null, true);
    },
});

module.exports = upload