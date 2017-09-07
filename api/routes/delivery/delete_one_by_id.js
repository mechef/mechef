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

    Delivery.remove({ _id: req.params.id, email: decoded.email }, (e) => {
      if (e) {
        res.status(404).json({ status: constants.fail });
        return;
      }
      res.json({ status: constants.success });
    });
  });
};
