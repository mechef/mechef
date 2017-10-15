// Load required packages
const mongoose = require('mongoose');
// Define our user schema
// schema types http://mongoosejs.com/docs/schematypes.html
const OrderSchema = new mongoose.Schema({
  buyerName: String,
  buyerEmail: String,
  menuId: String,
  sellerEmail: String,
  state: String,
  quantity: Number,
  orderTime: Date,
  deliveryTime: Date,
  deliveryAddress: String,
}, { versionKey: false, });

// Export the Mongoose model
module.exports = mongoose.model('Order', OrderSchema);
