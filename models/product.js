const mongoose  = require('mongoose');
var Schema = mongoose.Schema;
const productSchema = mongoose.Schema({
  storeid: { type: Schema.Types.ObjectId, ref: 'Store' },
  brandid: { type: Schema.Types.ObjectId, ref: 'Brand' },
  categoryid:{ type: Schema.Types.ObjectId, ref: 'Category' },
  name: { type: String, required: true },
  pimage: { type: String, required: true },
  gender: { type: String, required: true },
  age: { type: Number, required: true },
  ethnicity: { type: String },
  price: { type: String },
  rackno: { type: String },
  quantity: { type: String }
});

module.exports= mongoose.model('Product',productSchema);
