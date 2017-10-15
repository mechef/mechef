const Memo = require('../../models/memo');
const constants = require('../../utils/constants');
const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(400).json({ status: constants.fail, reason: constants.no_token });
    return;
  }

  jwt.verify(token, constants.secret, (err, decoded) => {
    if (err) {
      res.status(500).json({ status: constants.fail });
      return;
    }

    Memo.find({ email: decoded.email }, { __v: false, email: false }).sort({ _id: -1 }).exec((err, memos) => {
      if (err) {
        res.status(500).json({ status: constants.fail });
        return;
      }
      res.json({ status: constants.success, memos });
    });
  });
};
