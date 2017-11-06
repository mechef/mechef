const Delivery = require('../../models/delivery');
const constants = require('../../utils/constants');
const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(400).json({ status: constants.fail, reason: constants.no_token });
    return;
  }

  jwt.verify(token, constants.secret, (err, decoded) => {
    if (err) {
      res.status(500).json({ status: constants.fail });
      return;
    }

    const updateFields = {};
    if (req.body.type && req.body.type in constants.delivery_type) updateFields.type = req.body.type;
    if (req.body.meetupAddress) {
      updateFields.meetupAddress = req.body.meetupAddress;
    }
    if (req.body.meetupLatitude) {
      updateFields.meetupLatitude = req.body.meetupLatitude;
    }
    if (req.body.meetupLongitude) {
      updateFields.meetupLongitude = req.body.meetupLongitude;
    }
    if (req.body.meetupSunday) {
      updateFields.meetupSunday = req.body.meetupSunday;
    }
    if (req.body.meetupMonday) {
      updateFields.meetupMonday = req.body.meetupMonday;
    }
    if (req.body.meetupTuesday) {
      updateFields.meetupTuesday = req.body.meetupTuesday;
    }
    if (req.body.meetupWednesday) {
      updateFields.meetupWednesday = req.body.meetupWednesday;
    }
    if (req.body.meetupThursday) {
      updateFields.meetupThursday = req.body.meetupThursday;
    }
    if (req.body.meetupFriday) {
      updateFields.meetupFriday = req.body.meetupFriday;
    }
    if (req.body.meetupSaturday) {
      updateFields.meetupSaturday = req.body.meetupSaturday;
    }
    if (req.body.meetupStartTime) {
      updateFields.meetupStartTime = req.body.meetupStartTime;
    }
    if (req.body.meetupEndTime) {
      updateFields.meetupEndTime = req.body.meetupEndTime;
    }
    if (req.body.shippingAreas) {
      updateFields.shippingAreas = req.body.shippingAreas;
    }
    if (req.body.shippingCost) {
      updateFields.shippingCost = req.body.shippingCost;
    }
    if (req.body.note) {
      updateFields.note = req.body.note;
    }

    Delivery.findOneAndUpdate({ _id: req.params.id, email: decoded.email }, { $set: updateFields },
      { projection: { __v: false }, new: true, upsert: true }, (error, delivery) => {
    if (error) {
      res.status(500).json({ status: constants.fail });
      return;
    }

    res.json({ status: constants.success, delivery });
    });
  });
};
