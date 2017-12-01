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
    const condition = { sellerEmail: decoded.email };
    if (req.query.state) condition.state = req.query.state;

    const query = Order.find(condition);
    query.then((orders) => {
      if (orders) {
        res.json({ status: constants.success, orders: Order.getOrderList(orders) });
      } else {
        res.status(400).json({ status: constants.fail, reason: constants.email_not_found });
      }
    });
  });
};
