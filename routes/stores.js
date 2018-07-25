const express = require('express');
const multer = require('multer');
const Store = require('../models/store');

const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});


router.get('',(req,res,next)=>{
  
  Store.find()
  .then((stores)=> {
    res.status(200).json({
      stores:stores
    });
  }).catch((e) => {
    res.status(404).json({
      message:"Error Occured",
      error:e
    });
  });
});


module.exports = router;
