//-----------------------------------
//Image

const multer = require("multer"); // Multer File upload settings
const DIR = "./assets/products";
var upload = multer({ dest: 'assets/products/' })

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, DIR);
//     },
//     filename: (req, file, cb) => {
//         const fileName = file.originalname.toLowerCase().split(" ").join("-");
//         cb(null, fileName);
//     },
// });

//-----------------------
// const storage = multer.diskStorage({
//     destination: DIR,
//     filename: (req, file, cb) => {
//         const fileName = file.originalname.toLowerCase().split(" ").join("-");
//         cb(null, fileName);
//     },
// });

// Multer Mime Type Validation
// var upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 1024 * 1024 * 5,
//     },
//     fileFilter: (req, file, cb) => {
//         console.log('imgggggggggg')
//         if (
//             file.mimetype == "image/png" ||
//             file.mimetype == "image/jpg" ||
//             file.mimetype == "image/jpeg"
//         ) {
//             cb(null, true);
//         } else {
//             cb(null, false);
//             return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
//         }
//     },
// });
//.single("image");

//-----------------------------------

module.exports = upload;