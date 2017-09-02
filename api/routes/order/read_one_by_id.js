const Order = require('../../models/order');
const constants = require('../../utils/constants');

module.exports = (req, res) => {
  Order.findById(req.params.id, (err, order) => {
    if (err) {
      res.status(404).json({ status: constants.fail, reason: 'id not found' });
      return;
    }
    res.json({ status: constants.success, order });
  });
};
