// Load required packages
const mongoose = require('mongoose');
// Define our user schema
// schema types http://mongoosejs.com/docs/schematypes.html
const SellerSchema = new mongoose.Schema({
  email: String,
  passwordCombined: Buffer,
  activateHash: String,
  isActivate: Boolean,
  resetPassHash: String,
  coverPhoto: String,
  profileImage: String,
  kitchenDescription: String,
  firstName: String,
  lastName: String,
  phoneNumber: String,
});

// Export the Mongoose model
module.exports = mongoose.model('Seller', SellerSchema);
