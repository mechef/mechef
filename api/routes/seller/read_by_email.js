const Seller = require('../../models/seller');
const constants = require('../../utils/constants');
const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
  const token = req.query.token;
  if (!token) {
    res.json({ status: constants.fail, reason: constants.no_token });
    return;
  }

  jwt.verify(token, constants.secret, (err, decoded) => {
    if (err) {
      res.json({ status: constants.fail });
    } else {
      const query = Seller.findOne({ email: decoded.email });
      query.then((seller) => {
        if (seller) {
          res.json({ status: constants.success, seller });
        } else {
          res.json({ status: constants.fail, reason: 'Email not found' });
        }
      });
    }
  });
};
