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

DeliverySchema.methods.toMeetup = function() {
  return {
    _id: this._id,
    meetupAddress: this.meetupAddress,
    meetupLatitude: this.meetupLatitude,
    meetLongitude: this.meetLongitude,
    meetupSunday: this.meetupSunday,
    meetupMonday: this.meetupMonday,
    meetupTuesday: this.meetupTuesday,
    meetupWednesday: this.meetupWednesday,
    meetupThursday: this.meetupThursday,
    meetupFriday: this.meetupFriday,
    meetupSaturday: this.meetupSaturday,
    meetupStartTime: this.meetupStartTime,
    meetupEndTime: this.meetupEndTime,
    note: this.note
  }
};

DeliverySchema.methods.toShipping = function() {
  return {
    _id: this._id,
    shippingAreas: this.shippingAreas,
    shippingCost: this.shippingCost,
    note: this.note,
  }
};
// Export the Mongoose model
module.exports = mongoose.model('Delivery', DeliverySchema);
