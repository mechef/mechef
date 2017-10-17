const Delivery = require('../../models/delivery');
const constants = require('../../utils/constants');
const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(400).json({ status: constants.fail, reason: constants.no_token });
    return;
  }

  jwt.verify(token, constants.secret, (err, decoded) => {
    if (err) {
      res.status(500).json({ status: constants.fail });
      return;
    }

    Delivery.find({ email: decoded.email }, (err, deliveryList) => {
      if (err) {
        res.status(500).json({ status: constants.fail });
        return;
      }

      const processedDeliveryList = {}
      processedDeliveryList.meetupList = [];
      processedDeliveryList.shippingList = [];
      deliveryList.forEach(function(delivery) {
        if (delivery.type == constants.delivery_type.meetup) {
          processedDeliveryList.meetupList.push(delivery.toMeetup());
        } else if (delivery.type == constants.delivery_type.shipping) {
          processedDeliveryList.shippingList.push(delivery.toShipping());
        }
      });

      res.json({ status: constants.success, deliveryList: processedDeliveryList });
    });
  });
};
