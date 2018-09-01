const Kitchen = require('../../models/kitchen');
const Delivery = require('../../models/delivery');
const Menu = require('../../models/menu');
const Seller = require('../../models/seller');
const constants = require('../../utils/constants');

module.exports = (req, res) => {
  Seller.findOne({ kitchenName: req.params.name }).then((seller, err) => {
    if (err) {
      console.log(error);
      res.status(500).json({ status: constants.fail });
      return;
    }

    if (!seller) {
      res
        .status(404)
        .json({ status: constants.fail, reason: 'kitchen name not found' });
      return;
    }

    const query = Menu.find({ email: seller.email, publish: true });
    query.then(menuList => {
      if (menuList) {
        Delivery.find({ email: seller.email }, (err, deliveryList) => {
          if (err) {
            console.log(err);
            res.status(500).json({ status: constants.fail });
            return;
          }

          menuList = menuList.map(menu => {
            return menu.toKitchenMenu();
          });

          const kitchen = new Kitchen({
            kitchenName: seller.kitchenName,
            kitchenDescription: seller.kitchenDescription,
            coverPhoto: seller.coverPhoto,
            profileImage: seller.profileImage,
            email: seller.email,
            coverPhoto: seller.coverPhoto,
            deliveryList: deliveryList,
            menuList: menuList,
          });
          res.json({ status: constants.success, kitchen });
        });
      } else {
        res
          .status(404)
          .json({ status: constants.fail, reason: constants.email_not_found });
      }
    });
  });
};
