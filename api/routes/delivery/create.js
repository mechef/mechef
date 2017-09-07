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

    const delivery = new Delivery();
    delivery.email = decoded.email;
    delivery.type = req.body.type;
    delivery.address = req.body.address;
    delivery.day = req.body.day;
    delivery.startTime = req.body.startTime;
    delivery.endTime = req.body.endTime;

    delivery.save((error) => {
      if (error) {
        res.json({ status: constants.fail });
        return;
      }

      res.json({ status: constants.success });
    });
  });
};
