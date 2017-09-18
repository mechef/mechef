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

    const delivery = new Delivery();
    delivery.email = decoded.email;
    if (!(req.body.type in constants.delivery_type)) {
      res.status(400).json({ status: constants.fail, reason: 'delivery type not match' });
      return;
    }
    delivery.type = req.body.type;
    delivery.address = req.body.address;
    if (!(req.body.day in constants.day)) {
      res.status(400).json({ status: constants.fail, reason: 'delivery day not match' });
      return;
    }
    delivery.day = req.body.day;
    delivery.startTime = req.body.startTime;
    delivery.endTime = req.body.endTime;

    delivery.save((error) => {
      if (error) {
        res.status(500).json({ status: constants.fail });
        return;
      }

      res.json({ status: constants.success });
    });
  });
};