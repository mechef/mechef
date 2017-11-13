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
      const query = Menu.find({ email: seller.email });
      query.then((menuList) => {
        if (menuList) {
          Delivery.find({ email: decoded.email }, (err, deliveryList) => {
            if (err) {
              res.status(500).json({ status: constants.fail });
              return;
            }

            for (let index = 0; index < menuList.length; index++) {
              const deliveryDetailList = Delivery.toDeliveryDetail(deliveryList, menuList[index].deliveryList);
              console.log("ha");
              menuList[index].deliveryList = deliveryDetailList;
            }
            // menuList.forEach(function(menu, index) {
            //   const deliveryDetailList = Delivery.toDeliveryDetail(deliveryList, menuList[index].deliveryList);
            //   menuList[index].deliveryList = deliveryDetailList;
            // });
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
          Delivery.find({ email: decoded.email }, (err, deliveryList) => {
            if (err) {
              res.status(500).json({ status: constants.fail });
              return;
            }

            // for (let index = 0; index < menuList.length; index++) {
            //   // let deliveryDetailList = Delivery.toDeliveryDetail(deliveryList, menuList[index].deliveryList);
            //   console.log(index);
            //   // console.log(deliveryDetailList);
            //   // console.log(menuList[index]);
            //   // menuList[index].deliveryLis = Delivery.toDeliveryDetail(deliveryList, menuList[index].deliveryList);
            //   menuList[index].deliveryLis = ['fuck'];
            // }

            menuList.forEach(function(menu) {
              const deliveryDetailList = Delivery.toDeliveryDetail(deliveryList, menu.deliveryList);
              menu.deliveryList = [];

              for (let index = 0; index < deliveryDetailList.length; index++) {
                  menu.deliveryList.push(deliveryDetailList[index]);
              }

              // menuList[index] = menu;
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
