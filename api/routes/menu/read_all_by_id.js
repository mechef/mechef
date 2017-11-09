const Menu = require('../../models/menu');
const Seller = require('../../models/seller');
const constants = require('../../utils/constants');
const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
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
  } else {
    jwt.verify(token, constants.secret, (err, decoded) => {
      if (err) {
        res.status(404).json({ status: constants.fail });
        return;
      }

      const query = Menu.find({ email: decoded.email });
      query.then((menu) => {
        if (menu) {
          res.json({ status: constants.success, menuList: menu });
        } else {
          res.status(404).json({ status: constants.fail, reason: constants.email_not_found });
        }
      });
    });
  }
};
