const Order = require('../../models/order');
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
    if (req.body.state && req.body.state in constants.order_state) updateFields.state = req.body.state;

    Order.findOneAndUpdate({ _id: req.params.id, sellerEmail: decoded.email }, { $set: updateFields }, (error, order) => {
    if (error) {
      res.status(500).json({ status: constants.fail });
      return;
    }

    res.json({ status: constants.success, order: order.toOrder() });
    });
  });
};
