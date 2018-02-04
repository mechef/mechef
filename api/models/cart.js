// Load required packages
const mongoose = require('mongoose');
// Define our user schema
// schema types http://mongoosejs.com/docs/schematypes.html
const CartSchema = new mongoose.Schema({
  menuList: [mongoose.Schema.Types.Mixed],
  amount: Number,
}, { versionKey: false, });

// Export the Mongoose model
module.exports = mongoose.model('Cart', CartSchema);
