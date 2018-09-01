const Delivery = require('../../models/delivery');
const constants = require('../../utils/constants');
const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    res
      .status(400)
      .json({ status: constants.fail, reason: constants.no_token });
    return;
  }

  jwt.verify(token, constants.secret, (err, decoded) => {
    if (err) {
      console.log(err);
      res.status(400).json({
        status: constants.fail,
        reason: constants.jwt_verification_error,
      });
      return;
    }

    const updateFields = {};
    if (req.body.type && req.body.type in constants.delivery_type)
      updateFields.type = req.body.type;
    if (typeof req.body.meetupAddress !== 'undefined') {
      updateFields.meetupAddress = req.body.meetupAddress;
    }
    if (typeof req.body.meetupLatitude !== 'undefined') {
      updateFields.meetupLatitude = req.body.meetupLatitude;
    }
    if (typeof req.body.meetupLongitude !== 'undefined') {
      updateFields.meetupLongitude = req.body.meetupLongitude;
    }
    if (typeof req.body.meetupSunday !== 'undefined') {
      updateFields.meetupSunday = req.body.meetupSunday;
    }
    if (typeof req.body.meetupMonday !== 'undefined') {
      updateFields.meetupMonday = req.body.meetupMonday;
    }
    if (typeof req.body.meetupTuesday !== 'undefined') {
      updateFields.meetupTuesday = req.body.meetupTuesday;
    }
    if (typeof req.body.meetupWednesday !== 'undefined') {
      updateFields.meetupWednesday = req.body.meetupWednesday;
    }
    if (typeof req.body.meetupThursday !== 'undefined') {
      updateFields.meetupThursday = req.body.meetupThursday;
    }
    if (typeof req.body.meetupFriday !== 'undefined') {
      updateFields.meetupFriday = req.body.meetupFriday;
    }
    if (typeof req.body.meetupSaturday !== 'undefined') {
      updateFields.meetupSaturday = req.body.meetupSaturday;
    }
    if (typeof req.body.meetupStartTime !== 'undefined') {
      updateFields.meetupStartTime = req.body.meetupStartTime;
    }
    if (typeof req.body.meetupEndTime !== 'undefined') {
      updateFields.meetupEndTime = req.body.meetupEndTime;
    }
    if (typeof req.body.shippingAreas !== 'undefined') {
      updateFields.shippingAreas = req.body.shippingAreas;
    }
    if (typeof req.body.shippingCost !== 'undefined') {
      updateFields.shippingCost = req.body.shippingCost;
    }
    if (typeof req.body.note !== 'undefined') {
      updateFields.note = req.body.note;
    }

    Delivery.findOneAndUpdate(
      { _id: req.params.id, email: decoded.email },
      { $set: updateFields },
      { projection: { __v: false }, new: true, upsert: true },
      (error, delivery) => {
        if (error || !delivery) {
          console.log(error);
          res.status(404).json({ status: constants.fail });
          return;
        }

        res.json({ status: constants.success, delivery });
      },
    );
  });
};
