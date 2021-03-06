const Delivery = require('../../models/delivery');
const constants = require('../../utils/constants');
const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    res
      .status(400)
      .json({ status: constants.fail, reason: constants.no_token });
    return;
  }

  jwt.verify(token, constants.secret, (err, decoded) => {
    if (err) {
      console.log(err);
      res.status(400).json({
        status: constants.fail,
        reason: constants.jwt_verification_error,
      });
      return;
    }

    Delivery.remove({ _id: req.params.id, email: decoded.email }, e => {
      if (e) {
        console.log(e);
        res.status(404).json({ status: constants.fail });
        return;
      }
      res.json({ status: constants.success });
    });
  });
};
