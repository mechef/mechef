// Load required packages
var mongoose = require('mongoose');

// Define our user schema
// schema types http://mongoosejs.com/docs/schematypes.html
var UserSchema   = new mongoose.Schema({
  name: String,
  email: String,
  passwordCombined: Buffer,
  activateHash: String,
  isActivate: Boolean


});

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);
