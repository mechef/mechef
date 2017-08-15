// Load required packages
var mongoose = require('mongoose');

// Define our user schema
// schema types http://mongoosejs.com/docs/schematypes.html
var SellerSchema   = new mongoose.Schema({
  name: String,
  email: String,
  passwordCombined: Buffer,
  activateHash: String,
  isActivate: Boolean,
  resetPassHash: String


});

// Export the Mongoose model
module.exports = mongoose.model('Seller', SellerSchema);
