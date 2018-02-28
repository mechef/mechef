const Kitchen = require('../../models/kitchen');
const Menu = require('../../models/menu');
const Seller = require('../../models/seller');
const constants = require('../../utils/constants');

module.exports = (req, res) => {
  Seller.findOne({ kitchenName: req.params.name })
  .then((err, seller) => {
      if (err) {
        res.status(500).json({ status: constants.fail });
        return;
      }

      if (!seller) {
        res.status(404).json({ status: constants.fail });
        return;
      }

      const query = Menu.find({ email: seller.email, publish: true });
      query.then((menuList) => {
        if (menuList) {
          const kitchen = new Kitchen(
            { kitchenName: seller.kitchenName,
              kitchenDescription: seller.kitchenDescription,
              coverPhoto: seller.coverPhoto,
              menuList,
            }
          );
          res.json({ status: constants.success, kitchen });
        } else {
          res.status(404).json({ status: constants.fail, reason: constants.email_not_found });
        }
      });

  });
};
