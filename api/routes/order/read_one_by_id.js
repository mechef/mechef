const Order = require('../../models/order');
const constants = require('../../utils/constants');

module.exports = (req, res) => {
  Order.findById(req.params.id, (err, order) => {
    if (err) {
      res.status(500).json({ status: constants.fail, reason: constants.id_not_found });
      return;
    }
    res.json({ status: constants.success, order: order.toOrder() });
  });
};
