const Order = require('../../models/order');
const Menu = require('../../models/menu');
const Delivery = require('../../models/delivery');
const constants = require('../../utils/constants');
const mailer = require('../../utils/mailer');
const verifier = require('../../utils/verifier');
const Promise = require('bluebird');

function updateOneMenu(menu, operationUnit) {
  return Menu.findOneAndUpdate(
    { _id: menu.menuId },
    { $inc: { quantity: operationUnit * menu.quantity } },
    { new: true },
  )
    .exec()
    .then(menu => {
      return menu;
    })
    .catch(err => console.error(err));
}

module.exports = (req, res) => {
  const verifyResponse = verifier.checkRequiredParametersInBody(req, [
    'buyerName',
    'buyerEmail',
    'buyerPhoneNumber',
    'menuList',
    'messageFromBuyer',
    'deliveryTime',
    'deliveryId',
  ]);
  if (!verifyResponse.isPass) {
    res.status(400).json({
      status: constants.fail,
      reason: `${constants.verifyRequestMessage} ${verifyResponse.errorFields}`,
    });
    return;
  }

  const order = new Order();
  order.buyerName = req.body.buyerName;
  order.buyerEmail = req.body.buyerEmail;
  order.buyerPhoneNumber = req.body.buyerPhoneNumber;
  order.menuList = req.body.menuList;
  order.messageFromBuyer = req.body.messageFromBuyer;
  order.deliveryTime = req.body.deliveryTime;
  order.deliveryId = req.body.deliveryId;
  order.state = constants.order_state.waiting;
  order.orderTime = Date.now();

  Promise.all(order.menuList.map(menu => updateOneMenu(menu, -1))).then(
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

          amount += order.menuList[i].subtotal;

          if (menu.quantity == 0) {
            // send email to alert seller
            const mailOptions = {
              to: order.sellerEmail,
              subject: 'Your menu is sold out',
              html: `Hi, the order is sold out, please see <a href="${
                constants.domain
              }/menu/${menu._id}/">${constants.domain}/menu/${menu._id}</a>`,
            };

            mailer.sendEmail(mailOptions, erro => {
              if (erro) {
                console.log(erro);
              }
            });
          } else if (menu.quantity < 0) {
            // there was something wrong so that the quantity becomes negative
            Promise.all(
              order.menuList.map(menu => updateOneMenu(menu, 1)),
            ).then(menuList => {
              console.log('Something wrong, so the quantities are reverted.');
            });
            res.status(400).json({
              status: constants.fail,
              reason: `${
                menu.dishName
              } quantity becomes negative, so this order is not created successfully.`,
            });
            return;
          }
        }

        order.amount = amount;

        order.save((error, savedOrder) => {
          if (error) {
            console.log(error);
            res.status(500).json({ status: constants.fail });
            return;
          }

          const mailOptions = {
            to: order.buyerEmail,
            subject: 'Order Complete Confirmation',
            html: `order complete, please see <a href="${
              constants.domain
            }/order/${savedOrder._id}/">${constants.domain}/order/${
              savedOrder._id
            }</a>`,
          };

          mailer.sendEmail(mailOptions, erro => {
            if (erro) {
              console.log(erro);
              res.json({
                status: constants.fail,
                reason:
                  'Order Complete Confirmation has something wrong when sending email',
              });
              return;
            }
            res.json({ status: constants.success, order: order.toOrder() });
          });
        });
      });
    },
  );
};
