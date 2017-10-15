const Order = require('../../models/order');
const Menu = require('../../models/menu');
const constants = require('../../utils/constants');
const mailer = require('../../utils/mailer');

module.exports = (req, res) => {
  const order = new Order();
  order.buyerName = req.body.buyerName;
  order.buyerEmail = req.body.buyerEmail;
  order.menuId = req.body.menuId;
  order.sellerEmail = req.body.sellerEmail;
  order.state = constants.order_state.pending;
  order.orderTime = Date.now();
  order.deliveryTime = req.body.deliveryTime;
  order.deliveryAddress = req.body.deliveryAddress;
  Menu.findOne({ _id: order.menuId, email: order.sellerEmail }, (err, menu) => {
    if (err) {
      res.status(500).json({ status: constants.fail, reason: constants.id_not_found });
      return;
    }
    // do quantity check
    if (menu.quantity < order.quantity) {
      res.status(400).json({ status: constants.fail, reason: 'quantity error' });
      return;
    }

    Menu.findOneAndUpdate({ _id: menu._id }, { $inc: { quantity: -order.quantity } }, { new: true }, (error, newMenu) => {
    if (error) {
      res.status(500).json({ status: constants.fail });
      return;
    }

    if (newMenu.quantity == 0) {
      // send email to alert seller
      const mailOptions = {
        from: '"Mechef" <mechef@mechef.com>',
        to: order.sellerEmail,
        subject: 'Your menu is sold out',
        html: `Hi, the order is sold out, please see <a href="${constants.domain}/menu/${newMenu._id}/">${constants.domain}/menu/${newMenu._id}</a>`,
      };

      mailer.sendMail(mailOptions, (erro) => {
        if (erro) {
          res.status(500).json({ status: constants.fail });
          return;
        }
        res.json({ status: constants.success });
      });
      return;
    } else if (newMenu.quantity < 0) {
      // maybe there will be race condition
      Menu.findOneAndUpdate({ _id: menu._id }, { $set: { quantity: 0 } });
      res.status(500).json({ status: constants.fail });
      return;
    }

    order.save((error, savedOrder) => {
      if (erro) {
        res.status(500).json({ status: constants.fail });
        return;
      }

      const mailOptions = {
        from: '"Mechef" <mechef@mechef.com>',
        to: order.buyerEmail,
        subject: 'Order Complete Confirmation',
        html: `order complete, please see <a href="${constants.domain}/order/${savedOrder._id}/">${constants.domain}/order/${savedOrder._id}</a>`,
      };

      mailer.sendMail(mailOptions, (erro) => {
        if (erro) {
          res.status(500).json({ status: constants.fail });
          return;
        }
        res.json({ status: constants.success });
        });
      });
    });
  });
};
