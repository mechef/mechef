const Menu = require('../../models/menu');
const constants = require('../../utils/constants');

module.exports = (req, res) => {
  Menu.findById(req.params.id, (err, menu) => {
    if (err || !menu) {
      res
        .status(404)
        .json({ status: constants.fail, reason: constants.id_not_found });
      return;
    }

    if (req.query.quantity <= menu.quantity) {
      res.json({ status: constants.success, isOrderable: true });
    } else {
      res.json({ status: constants.success, isOrderable: false });
    }
  });
};
