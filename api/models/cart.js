// Load required packages
const mongoose = require('mongoose');
// Define our user schema
// schema types http://mongoosejs.com/docs/schematypes.html
const CartSchema = new mongoose.Schema({
  dishes: [String],
}, { versionKey: false, });

// Export the Mongoose model
module.exports = mongoose.model('Cart', CartSchema);
