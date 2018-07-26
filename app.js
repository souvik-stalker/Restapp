
const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
const path = require('path');
var AWS = require('aws-sdk');
var fs = require('fs-extra');
var atob = require('atob');
var Blob = require('blob');
const mongoose = require('mongoose');

const storesRoutes = require('./routes/stores');


var app= express();
var port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;
 mongoose.connect("mongodb://souvik:souvik9038@ds253891.mlab.com:53891/store")
//mongoose.connect("mongodb://localhost:27017/store")
.then(()=> {
  console.log("Connected to database");
}).catch((e) => {
  console.log("Connection failed Error is ",e);
});

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended:false}));

app.use("/images",express.static(path.join("images")));

app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PATCH,PUT,DELETE,OPTIONS');
  next();
});

app.post('/api/images',(req,res,next)=>{
  const rekognition = new AWS.Rekognition({
    region: "us-west-2",
    accessKeyId: req.body.KeyId,
    secretAccessKey: req.body.secretId,
  });
  var params = {
    Image: {
      Bytes: getBinary(req.body.image),
    },
    Attributes: [
      'ALL',
      /* more items */
    ]
  };
  rekognition.detectFaces(params, function(err, data) {
      if (err) {
        console.log(err, err.stack);
        return res.status(400).json({
          message:"ERROR OCCURED, Please check network issue"
          });
      } // an error occurred
      else {
      if(data.FaceDetails.length >0){
        let return_data = {'ageRange': data.FaceDetails[0].AgeRange,'gender': data.FaceDetails[0].Gender,'smile':data.FaceDetails[0].Smile,'eyeGlasses': data.FaceDetails[0].Eyeglasses}; 
        return res.status(200).json({
            message:return_data
            });
      } else {
        return res.status(400).json({
          message:"Please Pass Proper Image, Uploaded image doen't contain any Face"
          });
      }
		  
	  }		  // successful response
    });
  
});

 function getBinary(encodedFile) {
        var base64Image = encodedFile.split("data:image/jpeg;base64,")[1];
        var binaryImg = atob(base64Image);
        var length = binaryImg.length;
        var ab = new ArrayBuffer(length);
        var ua = new Uint8Array(ab);
        for (var i = 0; i < length; i++) {
          ua[i] = binaryImg.charCodeAt(i);
        }

        //var blob = new Blob([ab], {
         // type: "image/jpeg"
        //});

        return ab;
      }

app.listen(port,()=>{
    console.log("Server is running on port ",port);
});
app.use("/api/stores",storesRoutes);

module.exports.app = app;