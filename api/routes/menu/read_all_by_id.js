const Menu = require('../../models/menu');
const Seller = require('../../models/seller');
const constants = require('../../utils/constants');

module.exports = (req, res) => {
  Seller.findById(req.query.id, (err, seller) => {
    if (err) {
      res.status(404).json({ status: constants.fail, reason: constants.id_not_found });
      return;
    }
    const query = Menu.find({ email: seller.email });
    query.then((menu) => {
      if (menu) {
        res.json({ status: constants.success, menuList: menu });
      } else {
        res.status(404).json({ status: constants.fail, reason: constants.email_not_found });
      }
    });
  });
};
