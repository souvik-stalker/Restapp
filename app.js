
const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
var AWS = require('aws-sdk');
var fs = require('fs-extra');
var atob = require('atob');
var Blob = require('blob');


var app= express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended:false}));
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
      if (err) console.log(err, err.stack); // an error occurred
      else {
		  let return_data = {'ageRange': data.FaceDetails[0].AgeRange,'gender': data.FaceDetails[0].Gender,'smile':data.FaceDetails[0].Smile,'eyeGlasses': data.FaceDetails[0].Eyeglasses}; 
		  res.status(200).json({
				message:return_data
			  });
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

module.exports.app = app;