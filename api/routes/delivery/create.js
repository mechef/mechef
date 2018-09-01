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

    const delivery = new Delivery();
    delivery.email = decoded.email;
    if (!(req.body.type in constants.delivery_type)) {
      res.status(400).json({
        status: constants.fail,
        reason: 'delivery type not match, meetup|shipping',
      });
      return;
    }
    delivery.type = req.body.type;

    if (typeof req.body.meetupAddress !== 'undefined') {
      delivery.meetupAddress = req.body.meetupAddress;
    } else {
      delivery.meetupAddress = '';
    }

    if (typeof req.body.meetupLatitude !== 'undefined') {
      delivery.meetupLatitude = req.body.meetupLatitude;
    } else {
      delivery.meetupLatitude = 0.0;
    }

    if (typeof req.body.meetupLongitude !== 'undefined') {
      delivery.meetupLongitude = req.body.meetupLongitude;
    } else {
      delivery.meetupLongitude = 0.0;
    }

    if (typeof req.body.meetupSunday !== 'undefined') {
      delivery.meetupSunday = req.body.meetupSunday;
    } else {
      delivery.meetupSunday = false;
    }

    if (typeof req.body.meetupMonday !== 'undefined') {
      delivery.meetupMonday = req.body.meetupMonday;
    } else {
      delivery.meetupMonday = false;
    }

    if (typeof req.body.meetupTuesday !== 'undefined') {
      delivery.meetupTuesday = req.body.meetupTuesday;
    } else {
      delivery.meetupTuesday = false;
    }

    if (typeof req.body.meetupWednesday !== 'undefined') {
      delivery.meetupWednesday = req.body.meetupWednesday;
    } else {
      delivery.meetupWednesday = false;
    }

    if (typeof req.body.meetupThursday !== 'undefined') {
      delivery.meetupThursday = req.body.meetupThursday;
    } else {
      delivery.meetupThursday = false;
    }

    if (typeof req.body.meetupFriday !== 'undefined') {
      delivery.meetupFriday = req.body.meetupFriday;
    } else {
      delivery.meetupFriday = false;
    }

    if (typeof req.body.meetupSaturday !== 'undefined') {
      delivery.meetupSaturday = req.body.meetupSaturday;
    } else {
      delivery.meetupSaturday = false;
    }

    if (typeof req.body.meetupStartTime !== 'undefined') {
      delivery.meetupStartTime = req.body.meetupStartTime;
    } else {
      delivery.meetupStartTime = '';
    }

    if (typeof req.body.meetupEndTime !== 'undefined') {
      delivery.meetupEndTime = req.body.meetupEndTime;
    } else {
      delivery.meetupEndTime = '';
    }

    if (typeof req.body.shippingAreas !== 'undefined') {
      delivery.shippingAreas = req.body.shippingAreas;
    } else {
      delivery.shippingAreas = [];
    }

    if (typeof req.body.shippingCost !== 'undefined') {
      delivery.shippingCost = req.body.shippingCost;
    } else {
      delivery.shippingCost = 0.0;
    }

    if (typeof req.body.note !== 'undefined') {
      delivery.note = req.body.note;
    } else {
      delivery.note = '';
    }

    delivery.save((error, delivery) => {
      if (error || !delivery) {
        console.log(error);
        res.status(500).json({ status: constants.fail });
        return;
      }

      res.json({ status: constants.success, delivery: delivery.toObject() });
    });
  });
};
