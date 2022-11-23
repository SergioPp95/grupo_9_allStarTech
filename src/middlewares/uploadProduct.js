const multer = require('multer');
const path = require("path");

// ** Multer **
const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      const fileLocation = path.resolve(__dirname, "../../public/images/products") 
      cb(null, fileLocation)
   },
   filename: function (req, file, cb) {
       cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
   }
});

const upload = multer({ storage: storage })

module.exports = upload