const express = require("express");
const router = express();
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static(path.resolve(__dirname, "public")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const stockController = require("../Controller/stockController");

router.post(
  "/import-stock",
  upload.single("file"),
  stockController.importStock
  // (req,res)=>{
  //     console.log("got");
  // }
);

router.get(
  "/export-stock",
  stockController.exportStock
  // (req,res)=>{
  //     console.log("got");
  // }
);

module.exports = router;
