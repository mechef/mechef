const Cart = require('../../models/cart');

module.exports = (req, res) => {
  Cart.findById(req.params.id, (err, cart) => {
    if (err || !cart) {
      res.status(404).json({ status: constants.fail, reason: constants.id_not_found });
      return;
    }

    res.json({ status: constants.success, cart });
  });
};
