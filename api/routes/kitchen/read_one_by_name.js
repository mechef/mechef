const Kitchen = require('../../models/kitchen');
const Delivery = require('../../models/delivery');
const Menu = require('../../models/menu');
const Seller = require('../../models/seller');
const constants = require('../../utils/constants');

module.exports = (req, res) => {
  Seller.findOne({ kitchenName: req.params.name })
  .then((seller, err) => {
    if (err) {
      res.status(500).json({ status: constants.fail });
      return;
    }

    if (!seller) {
      res.status(404).json({ status: constants.id_not_found });
      return;
    }

    const query = Menu.find({ email: seller.email, publish: true });
    query.then((menuList) => {
      if (menuList) {
        Delivery.find({ email: seller.email }, (err, deliveryList) => {
          if (err) {
            res.status(500).json({ status: constants.fail });
            return;
          }

          menuList.map((menu) => {
            const deliveryDetailList = Delivery.toDeliveryDetail(deliveryList, menu.deliveryIdList);
            menu.deliveryList = deliveryDetailList;
            menu.deliveryIdList = undefined;
            return menu.toKitchenMenu();
          });

          const kitchen = new Kitchen(
            { kitchenName: seller.kitchenName,
              kitchenDescription: seller.kitchenDescription,
              coverPhoto: seller.coverPhoto,
              profileImage: seller.profileImage,
              email: seller.email,
              coverPhoto: seller.coverPhoto,
              menuList: menuList
            }
          );
          res.json({ status: constants.success, kitchen });
        });

      } else {
        res.status(404).json({ status: constants.fail, reason: constants.email_not_found });
      }
    });
  });
};
