const Menu = require('../../models/menu');
const constants = require('../../utils/constants');
const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
  const token = req.query.token;
  if (!token) {
    res.status(404).json({ status: constants.fail, reason: constants.no_token });
    return;
  }

  jwt.verify(token, constants.secret, (err, decoded) => {
    if (err) {
      res.status(404).json({ status: constants.fail });
      return;
    }
    const query = Menu.find({ email: decoded.email });
    query.then((menu) => {
      if (menu) {
        res.json({ status: constants.success, menu });
      } else {
        res.status(404).json({ status: constants.fail, reason: 'Email not found' });
      }
    });
  });
};
