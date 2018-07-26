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
      res.status(500).json({ status: constants.fail });
      return;
    }

    Delivery.find({ email: decoded.email }, (err, deliveryList) => {
      if (err) {
        console.log(err);
        res.status(500).json({ status: constants.fail });
        return;
      }
      const processedDeliveryList = Delivery.getDeliveryList(deliveryList);

      res.json({
        status: constants.success,
        deliveryList: processedDeliveryList,
      });
    });
  });
};
