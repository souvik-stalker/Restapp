const mongoose  = require('mongoose');

const categorySchema = mongoose.Schema({
  storeid: { type: String, required: true },
  brandid: { type: String, required: true },
  categoryname:{ type: String, required: true },
  categoryimage: { type: String }
});

module.exports= mongoose.model('Category',categorySchema);
