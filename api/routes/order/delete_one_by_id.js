const Order = require('../../models/order');
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
      res.status(500).json({ status: constants.fail });
      return;
    }

    Order.remove({ _id: req.params.id, email: decoded.email }, e => {
      if (e) {
        res.status(500).json({ status: constants.fail });
        return;
      }
      res.json({ status: constants.success });
    });
  });
};
