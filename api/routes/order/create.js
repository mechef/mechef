const Order = require('../../models/order');
const constants = require('../../utils/constants');
const mailer = require('../../utils/mailer');

module.exports = (req, res) => {
  const order = new Order();
  order.buyerName = req.body.buyerName;
  order.buyerEmail = req.body.buyerEmail;
  order.menuId = req.body.menuId;
  order.sellerEmail = req.body.sellerEmail;
  order.state = constants.order_state.pending;
  order.quantity = req.body.quantity;
  order.orderTime = Date.now();
  order.deliveryTime = req.body.deliveryTime;
  order.deliveryAddress = req.body.deliveryAddress;

  order.save((error, savedOrder) => {
    if (error) {
      console.log(error);
      res.json({ status: constants.fail });
      return;
    }

    const mailOptions = {
      from: '"Mechef" <mechef@mechef.com>',
      to: buyerEmail.email,
      subject: 'Order Complete Confirmation',
      html: `order complete, please see <a href="${constants.domain}/order/${savedOrder._id}/">${constants.domain}/order/${savedOrder._id}</a>`,
    };

    mailer.sendMail(mailOptions, (erro) => {
      if (erro) {
        console.log(erro);
        res.json({ status: constants.fail });
        return;
      }
      res.json({ status: constants.success });
    });
  });
};
