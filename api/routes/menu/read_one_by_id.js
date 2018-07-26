const Menu = require('../../models/menu');
const Delivery = require('../../models/delivery');
const constants = require('../../utils/constants');

module.exports = (req, res) => {
  Menu.findById(req.params.id, (err, menu) => {
    if (err) {
      res
        .status(404)
        .json({ status: constants.fail, reason: constants.id_not_found });
      return;
    }

    Delivery.find({ email: menu.email }, (err, deliveryList) => {
      if (err) {
        res.status(500).json({ status: constants.fail });
        return;
      }

      const deliveryDetailList = Delivery.toDeliveryDetail(
        deliveryList,
        menu.deliveryIdList,
      );
      menu.deliveryList = deliveryDetailList;
      menu.deliveryIdList = undefined;

      res.json({ status: constants.success, menu });
    });
  });
};
