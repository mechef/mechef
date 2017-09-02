const Order = require('../../models/order');
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
    if (req.body.buyerName) updateFields.buyerName = req.body.buyerName;
    if (req.body.buyerEmail) updateFields.buyerEmail = req.body.buyerEmail;
    if (req.body.state && req.body.state in constants.order_state) updateFields.state = req.body.state;
    if (req.body.quantity) updateFields.quantity = req.body.quantity;
    if (req.body.deliveryTime) updateFields.deliveryTime = req.body.deliveryTime;
    if (req.body.deliveryAddress) updateFields.deliveryAddress = req.body.deliveryAddress;

    Order.findOneAndUpdate({ _id: req.params.id, sellerEmail: decoded.email }, { $set: updateFields }, (error, order) => {
    if (error) {
      res.json({ status: constants.fail });
      return;
    }

    res.json({ status: constants.success });
    });
  });
};
