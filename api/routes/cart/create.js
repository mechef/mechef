const Cart = require('../../models/cart');

module.exports = (req, res) => {
  const cart = new Cart();
  cart.menuList = [];
  cart.amount = 0;
  cart.save((error, savedCart) => {
    if (error) {
      console.log(error);
      res.status(500).json({ status: constants.fail });
      return;
    }
    res.json({ status: constants.success, cart: savedCart });
  });
};
