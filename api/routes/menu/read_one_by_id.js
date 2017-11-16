const Menu = require('../../models/menu');
const Delivery = require('../../models/delivery');
const constants = require('../../utils/constants');

module.exports = (req, res) => {
  Menu.findById(req.params.id, (err, menu) => {
    if (err) {
      res.status(404).json({ status: constants.fail, reason: constants.id_not_found });
      return;
    }

    res.json({ status: constants.success, menu });
  });
};
