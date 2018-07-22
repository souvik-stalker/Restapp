
const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
var AWS = require('aws-sdk');
var fs = require('fs-extra');


var app= express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());
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
    accessKeyId: "AKIAJGFJQRHJ4UPJXE5Q",
    secretAccessKey: "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"
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
		  let jsonString = JSON.stringify(data,null,2);  
		  res.status(200).json({
				message:jsonString
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

        var blob = new Blob([ab], {
          type: "image/jpeg"
        });

        return ab;
      }

app.listen(port,()=>{
    console.log("Server is running on port ",port);
});

module.exports.app = app;