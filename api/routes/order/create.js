const Order = require('../../models/order');
const Menu = require('../../models/menu');
const Delivery = require('../../models/delivery');
const constants = require('../../utils/constants');
const mailer = require('../../utils/mailer');
const verifier = require('../../utils/verifier');
const Promise = require('bluebird');

function updateOneMenu(menu) {
  return Menu.findOneAndUpdate(
    { _id: menu.menuId },
    { $inc: { quantity: -menu.quantity } },
    { new: true },
  )
    .exec()
    .then(menu => {
      return menu;
    })
    .catch(err => console.error(err));
}

module.exports = (req, res) => {
  let verifyResponse = verifier.checkRequiredParametersInBody(req, ['buyerName', 'buyerEmail', 'buyerPhoneNumber', 'menuList', 'deliveryTime', 'deliveryId']);
  if (!verifyResponse.isPass) {
    res
      .status(400)
      .json({ status: constants.fail, reason: `${constants.verifyRequestMessage} ${verifyResponse.errorFields}`  });
    return;
  }

  const order = new Order();
  order.buyerName = req.body.buyerName;
  order.buyerEmail = req.body.buyerEmail;
  order.buyerPhoneNumber = req.body.buyerPhoneNumber;
  order.messageFromBuyer
  order.menuList = req.body.menuList;
  order.state = constants.order_state.waiting;
  order.orderTime = Date.now();
  order.deliveryTime = req.body.deliveryTime;
  order.deliveryId = req.body.deliveryId;

  Promise.all(order.menuList.map(menu => updateOneMenu(menu))).then(
    menuList => {
      Delivery.findOne({ _id: order.deliveryId }, (err, delivery) => {
        if (err) {
          res
            .status(404)
            .json({ status: constants.fail, reason: constants.id_not_found });
          return;
        }

        order.deliveryAddress = delivery.meetupAddress;
        order.deliveryLatitude = delivery.meetupLatitude;
        order.deliveryLongitude = delivery.meetupLongitude;

        let amount = 0;
        for (let i = 0; i < menuList.length; i++) {
          const menu = menuList[i];
          order.menuList[i].dishName = menu.dishName;
          if (menu.images.length > 0) {
            order.menuList[i].image = menu.images[0];
          } else {
            order.menuList[i].image = '';
          }
          order.menuList[i].sellerEmail = menu.email;
          order.menuList[i].subtotal =
            order.menuList[i].quantity * menu.unitPrice;

          amount += order.menuList[i].quantity * menu.unitPrice;
          console.log(menu);
          if (menu.quantity == 0) {
            // send email to alert seller
            if (constants.mailTurnOn) {
              const mailOptions = {
                from: '"Mechef" <mechef@mechef.com>',
                to: order.sellerEmail,
                subject: 'Your menu is sold out',
                html: `Hi, the order is sold out, please see <a href="${
                  constants.domain
                }/menu/${menu._id}/">${constants.domain}/menu/${menu._id}</a>`,
              };

              mailer.sendMail(mailOptions, erro => {
                if (erro) {
                  console.log(erro);
                  res.status(500).json({ status: constants.fail });
                  return;
                }
              });
            }
          } else if (menu.quantity < 0) {
            // maybe there will be race condition
            Menu.findOneAndUpdate(
              { _id: menu._id },
              { $set: { quantity: 0 } },
              function(error) {
                console.log(error);
                res.status(500).json({
                  status: constants.fail,
                  reason: 'quantity is negative',
                });
                return;
              },
            );
          }
        }

        order.amount = amount;

        order.save((error, savedOrder) => {
          if (error) {
            console.log(error);
            res.status(500).json({ status: constants.fail });
            return;
          }

          if (constants.mailTurnOn) {
            const mailOptions = {
              from: '"Mechef" <mechef@mechef.com>',
              to: order.buyerEmail,
              subject: 'Order Complete Confirmation',
              html: `order complete, please see <a href="${
                constants.domain
              }/order/${savedOrder._id}/">${constants.domain}/order/${
                savedOrder._id
              }</a>`,
            };

            mailer.sendMail(mailOptions, erro => {
              if (erro) {
                console.log(erro);
                // TODO write log file
              }
              res.json({ status: constants.success, order: order.toOrder() });
            });
          } else {
            res.json({ status: constants.success, order: order.toOrder() });
          }
        });
      });
    },
  );
};
