
const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');


var app= express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.post('/api/images',(req,res,next)=>{
   console.log(req.body);
  res.status(200).json({
    message:req.body
  });
});


app.listen(port,()=>{
    console.log("Server is running on port ",port);
});

module.exports.app = app;