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

    // email: String,
    // type: String,
    // meetupAddress: String,
    // meetupLatitude: Number,
    // meetLongitude: Number,
    // meetupSunday: Boolean,
    // meetupMonday: Boolean,
    // meetupTuesday: Boolean,
    // meetupWednesday: Boolean,
    // meetupThursday: Boolean,
    // meetupFriday: Boolean,
    // meetupSaturday: Boolean,
    // meetupStartTime: String,
    // meetupEndTime: String,
    // shippingAreas: [String],
    // shippingCost: Number,
    // note: String,

    const delivery = new Delivery();
    delivery.email = decoded.email;
    if (!(req.body.type in constants.delivery_type)) {
      res.status(400).json({ status: constants.fail, reason: 'delivery type not match, meetup|shipping' });
      return;
    }
    delivery.type = req.body.type;
    if (req.body.meetupAddress) {
      delivery.meetupAddress = req.body.meetupAddress;
    } else {
      delivery.meetupAddress = '';
    }

    if (req.body.meetupLatitude) {
      delivery.meetupLatitude = req.body.meetupLatitude;
    } else {
      delivery.meetupLatitude = 0.0;
    }

    if (req.body.meetLongitude) {
      delivery.meetLongitude = req.body.meetLongitude;
    } else {
      delivery.meetLongitude = 0.0;
    }

    if (req.body.meetupSunday) {
      delivery.meetupSunday = req.body.meetupSunday;
    } else {
      delivery.meetupSunday = false;
    }

    if (req.body.meetupMonday) {
      delivery.meetupMonday = req.body.meetupMonday;
    } else {
      delivery.meetupMonday = false;
    }

    if (req.body.meetupTuesday) {
      delivery.meetupTuesday = req.body.meetupTuesday;
    } else {
      delivery.meetupTuesday = false;
    }

    if (req.body.meetupWednesday) {
      delivery.meetupWednesday = req.body.meetupWednesday;
    } else {
      delivery.meetupWednesday = false;
    }

    if (req.body.meetupThursday) {
      delivery.meetupThursday = req.body.meetupThursday;
    } else {
      delivery.meetupThursday = false;
    }

    if (req.body.meetupFriday) {
      delivery.meetupFriday = req.body.meetupFriday;
    } else {
      delivery.meetupFriday = false;
    }

    if (req.body.meetupSaturday) {
      delivery.meetupSaturday = req.body.meetupSaturday;
    } else {
      delivery.meetupSaturday = false;
    }

    if (req.body.meetupStartTime) {
      delivery.meetupStartTime = req.body.meetupStartTime;
    } else {
      delivery.meetupStartTime = '';
    }

    if (req.body.meetupEndTime) {
      delivery.meetupEndTime = req.body.meetupEndTime;
    } else {
      delivery.meetupEndTime = '';
    }

    if (req.body.shippingAreas) {
      delivery.shippingAreas = req.body.shippingAreas;
    } else {
      delivery.shippingAreas = [];
    }

    if (req.body.shippingCost) {
      delivery.shippingCost = req.body.shippingCost;
    } else {
      delivery.shippingCost = 0.0;
    }

    if (req.body.note) {
      delivery.note = req.body.note;
    } else {
      delivery.note = '';
    }

    delivery.save((error) => {
      if (error) {
        res.status(500).json({ status: constants.fail });
        return;
      }

      res.json({ status: constants.success, delivery });
    });
  });
};
