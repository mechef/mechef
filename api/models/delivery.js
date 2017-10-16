// Load required packages
const mongoose = require('mongoose');
// Define our user schema
// schema types http://mongoosejs.com/docs/schematypes.html
const DeliverySchema = new mongoose.Schema({
  email: String,
  type: String,
  meetupAddress: String,
  meetupLatitude: Number,
  meetLongitude: Number,
  meetupSunday: Boolean,
  meetupMonday: Boolean,
  meetupTuesday: Boolean,
  meetupWednesday: Boolean,
  meetupThursday: Boolean,
  meetupFriday: Boolean,
  meetupSaturday: Boolean,
  meetupStartTime: String,
  meetupEndTime: String,
  shippingAreas: [String],
  shippingCost: Number,
  note: String,
}, { versionKey: false, });

// Export the Mongoose model
module.exports = mongoose.model('Delivery', DeliverySchema);
