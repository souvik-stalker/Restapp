const express = require('express');
const multer = require('multer');
const Store = require('../models/store');
const Brand = require('../models/brand');
const Category = require('../models/category');
const Product = require('../models/product');

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
router.get('/brand/:id',(req,res,next)=>{
  const id = req.params.id;
  Brand.find({ storeid: id })
  .then((brands)=> {
    res.status(200).json({
      brands:brands
    });
  }).catch((e) => {
    res.status(404).json({
      message:"Error Occured",
      error:e
    });
  });
});
router.get('/category/:brandid',(req,res,next)=>{
  const brandid = req.params.brandid;
  Category.find({ brandid: brandid })
  .then((categories)=> {
    res.status(200).json({
      categories:categories
    });
  }).catch((e) => {
    res.status(404).json({
      message:"Error Occured",
      error:e
    });
  });
});
router.get('/products',(req,res,next)=>{
  Product.find()
  .populate('storeid')
  .populate('brandid')
  .populate('categoryid')
  .then((products)=> {
    res.status(200).json({
      products:products
    });
  }).catch((e) => {
    res.status(404).json({
      message:"Error Occured",
      error:e
    });
  });
});


module.exports = router;
