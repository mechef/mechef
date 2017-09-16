const Menu = require('../../models/menu');
const constants = require('../../utils/constants');

module.exports = (req, res) => {
  const query = Menu.find({ email: req.query.email });
  query.then((menu) => {
    if (menu) {
      res.json({ status: constants.success, menu });
    } else {
      res.status(404).json({ status: constants.fail, reason: constants.email_not_found });
    }
  });
};
