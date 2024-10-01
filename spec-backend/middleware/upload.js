// // middleware/multer.js
// const multer = require('multer');
// const path = require('path');

// // Set up Multer storage configuration
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     // Specify the destination folder for uploaded images
//     cb(null, 'uploads/'); // Ensure 'uploads/' folder exists
//   },
//   filename: function (req, file, cb) {
//     // Create unique file names
//     cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to avoid duplicate file names
//   }
// });

// // File filter to allow only images
// const fileFilter = (req, file, cb) => {
//   const fileTypes = /jpeg|jpg|png/;
//   const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
//   const mimeType = fileTypes.test(file.mimetype);

//   if (extname && mimeType) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only .jpeg, .jpg, and .png files are allowed'), false);
//   }
// };

// // Initialize Multer with storage and file filter options
// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: { fileSize: 1024 * 1024 * 5 } // Limit file size to 5MB
// });

// module.exports = upload;
const multer = require('multer');
const path = require('path');

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (extname && mimeType) {
    cb(null, true);
  } else {
    cb(new Error('Only .jpeg, .jpg, and .png file types are allowed'), false);
  }
};

// Initialize multer with storage, file filter, and size limit
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 },
});

// File upload handler for multiple images
// const uploadMultiple = multer({ storage }).array('images', 5); // Field name 'images'
const uploadMultiple = multer({ storage }).array('images', 5); // Field name 'images'


module.exports = uploadMultiple;
