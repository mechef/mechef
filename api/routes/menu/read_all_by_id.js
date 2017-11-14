const Menu = require('../../models/menu');
const Seller = require('../../models/seller');
const Delivery = require('../../models/delivery');
const constants = require('../../utils/constants');
const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    Seller.findById(req.query.id, (err, seller) => {
      if (err) {
        res.status(404).json({ status: constants.fail, reason: constants.id_not_found });
        return;
      }
      const query = Menu.find({ email: seller.email, publish: true });
      query.then((menuList) => {
        if (menuList) {
          Delivery.find({ email: decoded.email }, (err, deliveryList) => {
            if (err) {
              res.status(500).json({ status: constants.fail });
              return;
            }

            menuList.forEach(function(menu) {
              const deliveryDetailList = Delivery.toDeliveryDetail(deliveryList, menu.deliveryIdList);
              menu.deliveryList = deliveryDetailList;
            });

            res.json({ status: constants.success, menuList });
          });
        } else {
          res.status(404).json({ status: constants.fail, reason: constants.email_not_found });
        }
      });
    });
  } else {
    jwt.verify(token, constants.secret, (err, decoded) => {
      if (err) {
        res.status(404).json({ status: constants.fail });
        return;
      }

      const query = Menu.find({ email: decoded.email });
      query.then((menuList) => {
        if (menuList) {
          menuList[0].deliveryList = [{}];
          Delivery.find({ email: decoded.email }, (err, deliveryList) => {
            if (err) {
              res.status(500).json({ status: constants.fail });
              return;
            }

            menuList.forEach(function(menu) {
              const deliveryDetailList = Delivery.toDeliveryDetail(deliveryList, menu.deliveryIdList);
              menu.deliveryList = deliveryDetailList;
            });

            res.json({ status: constants.success, menuList: menuList });
          });
        } else {
          res.status(404).json({ status: constants.fail, reason: constants.email_not_found });
        }
      });
    });
  }
};
