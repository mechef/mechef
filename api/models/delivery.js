// Load required packages
const mongoose = require('mongoose');
const constants = require('../utils/constants');
// Define our user schema
// schema types http://mongoosejs.com/docs/schematypes.html
const DeliverySchema = new mongoose.Schema({
  email: String,
  type: String,
  meetupAddress: String,
  meetupLatitude: Number,
  meetupLongitude: Number,
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

DeliverySchema.methods.toObject = function() {
  if (this.type == constants.delivery_type.meetup) {
    return this.toMeetup();
  } else if (this.type == constants.delivery_type.shipping) {
    return this.toShipping();
  } else {
    return {};
  }
}

DeliverySchema.methods.toMeetup = function() {
  return {
    _id: this._id,
    email: this.email,
    type: this.type,
    meetupAddress: this.meetupAddress,
    meetupLatitude: this.meetupLatitude,
    meetupLongitude: this.meetupLongitude,
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
    email: this.email,
    type: this.type,
    shippingAreas: this.shippingAreas,
    shippingCost: this.shippingCost,
    note: this.note,
  }
};

DeliverySchema.statics.getDeliveryList = function getDeliveryList (deliveryList) {
  const processedDeliveryList = {}
  processedDeliveryList.meetupList = [];
  processedDeliveryList.shippingList = [];
  deliveryList.forEach(function(delivery) {
    if (delivery.type == constants.delivery_type.meetup) {
      processedDeliveryList.meetupList.push(delivery.toMeetup());
    } else if (delivery.type == constants.delivery_type.shipping) {
      processedDeliveryList.shippingList.push(delivery.toShipping());
    }
  });

  return processedDeliveryList;
}

DeliverySchema.statics.toDeliveryDetail = function toDeliveryDetail (deliveryList, deliveryIdList) {
  const deliveryMap = {}
  deliveryList.forEach(function(delivery) {
    if (delivery.type == constants.delivery_type.meetup) {
      deliveryMap[delivery._id] = delivery.toMeetup();
    } else if (delivery.type == constants.delivery_type.shipping) {
      deliveryMap[delivery._id] = delivery.toShipping();
    }
  });

  const list = [];
  if (deliveryIdList) {
    deliveryIdList.forEach(function(deliveryId) {
      list.push(deliveryMap[deliveryId]);
    });
  }

  return list;
}

// Export the Mongoose model
module.exports = mongoose.model('Delivery', DeliverySchema);
