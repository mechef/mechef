const Menu = require('../../models/menu');
const Seller = require('../../models/seller');
const constants = require('../../utils/constants');
const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
  if (req.query.id) {
    Seller.findById(req.query.id, (err, seller) => {
      if (err || !seller) {
        res
          .status(404)
          .json({ status: constants.fail, reason: constants.id_not_found });
        return;
      }
      const query = Menu.find({ email: seller.email, publish: true });
      query.then(menuList => {
        if (menuList) {
          res.json({ status: constants.success, menuList });
        } else {
          res.status(404).json({
            status: constants.fail,
            reason: constants.email_not_found,
          });
        }
      });
    });
  } else {
    const token = req.headers.authorization;
    if (!token) {
      res
        .status(400)
        .json({ status: constants.fail, reason: constants.no_token });
      return;
    }
    jwt.verify(token, constants.secret, (err, decoded) => {
      if (err) {
        res.status(400).json({
          status: constants.fail,
          reason: constants.jwt_verification_error,
        });
        return;
      }

      const query = Menu.find({ email: decoded.email });
      query.then(menuList => {
        if (menuList) {
          res.json({ status: constants.success, menuList: menuList });
        } else {
          res.status(404).json({
            status: constants.fail,
            reason: constants.email_not_found,
          });
        }
      });
    });
  }
};
