const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: String,
  quantity: String,
  descrip: String
});



module.exports = mongoose.model('Product', ProductSchema);

