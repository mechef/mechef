const Menu = require('../../models/menu');
const Delivery = require('../../models/delivery');
const constants = require('../../utils/constants');

module.exports = (req, res) => {
  Menu.findById(req.params.id, (err, menu) => {
    if (err) {
      res.status(404).json({ status: constants.fail, reason: constants.id_not_found });
      return;
    }

    Delivery.find({ email: decoded.email }, (err, deliveryList) => {
      if (err) {
        res.status(500).json({ status: constants.fail });
        return;
      }

      const deliveryDetailList = Delivery.toDeliveryDetail(deliveryList, menu.deliveryList);
      menu.deliveryList = deliveryDetailList;

      res.json({ status: constants.success, menu });
    });
  });
};
