const mongoose  = require('mongoose');

const brandSchema = mongoose.Schema({
  storeid: { type: String, required: true },
  brandname:{ type: String, required: true },
  brandimage: { type: String, required: true }
});

module.exports= mongoose.model('Brand',brandSchema);
