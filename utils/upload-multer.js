const path = require("path");
const multer = require("multer");
const uuid = require("uuid");

const product_storoage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/products");
  },
  filename: function (req, file, cb) {
    console.log(file);
    const extension = path.parse(file.originalname).ext;
    const random_name = uuid.v4() + extension;
    cb(null, );
  },
});

module.export.uploadProductImage = multer = { storage: product_storoage };
