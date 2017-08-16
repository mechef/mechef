const Seller = require('../../models/seller');
const constants = require('../../utils/constants');
const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
  const token = req.body.token;
  if (!token) {
    res.json({ status: constants.fail, reason: constants.no_token });
    return;
  }

  const updateFields = {};
  if (req.body.name) updateFields.name = req.body.name;
  if (req.body.email) updateFields.email = req.body.email;
  // TODO

  jwt.verify(token, constants.secret, (err, decoded) => {
    if (err) {
      res.json({ status: constants.fail });
    } else {
      Seller.update({ email: decoded.email }, updateFields, (error) => {
        if (error) {
          console.log(error);
          res.json({ status: constants.fail });
          return;
        }

        res.json({ status: constants.success });
      });
    }
  });
};
