const Delivery = require('../../models/delivery');
const constants = require('../../utils/constants');
const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
  const token = req.body.token;
  if (!token) {
    res.status(404).json({ status: constants.fail, reason: constants.no_token });
    return;
  }

  jwt.verify(token, constants.secret, (err, decoded) => {
    if (err) {
      res.status(404).json({ status: constants.fail });
      return;
    }

    const updateFields = {};
    if (req.body.type) updateFields.type = req.body.type;
    if (req.body.address) updateFields.address = req.body.address;
    if (req.body.day) updateFields.day = req.body.day;
    if (req.body.startTime) updateFields.startTime = req.body.startTime;
    if (req.body.endTime) updateFields.endTime = req.body.endTime;

    Delivery.findOneAndUpdate({ _id: req.params.id, email: decoded.email }, { $set: updateFields }, (error, deliverys) => {
    if (error) {
      res.json({ status: constants.fail });
      return;
    }

    res.json({ status: constants.success });
    });
  });
};
