const Delivery = require('../../models/delivery');
const constants = require('../../utils/constants');

module.exports = (req, res) => {
  const token = req.body.token;
  if (!token) {
    res.status(404).json({ status: constants.fail, reason: constants.no_token });
    return;
  }

  jwt.verify(token, constants.secret, (err, decoded) => {
    if (err) {
      res.status(404).json({ status: constants.fail });
      return;
    }

    Delivery.findOne({ _id: req.params.id, email: decoded.email }, (err, deliverys) => {
      if (err) {
        res.status(404).json({ status: constants.fail, reason: constants.id_not_found });
        return;
      }
      res.json({ status: constants.success, deliverys });
    });
  });
};
