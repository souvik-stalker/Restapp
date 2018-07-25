const mongoose  = require('mongoose');

const postSchema = mongoose.Schema({
  storename: { type: String, required: true },
  storeowner:{ type: String, required: true },
  storemanager: { type: String, required: true },
  map: { type: String },
  storephone: { type: String, required: true },
  storelocation: { type: String },
  storeimage:{ type: String }
});

module.exports= mongoose.model('Store',postSchema);
