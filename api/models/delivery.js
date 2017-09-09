// Load required packages
const mongoose = require('mongoose');
// Define our user schema
// schema types http://mongoosejs.com/docs/schematypes.html
const DeliverySchema = new mongoose.Schema({
  email: String,
  type: String,
  address:  String,
  day:  String,
  startTime:  String,
  endTime:  String,
});

// Export the Mongoose model
module.exports = mongoose.model('Delivery', DeliverySchema);
