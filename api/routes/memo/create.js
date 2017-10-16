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

    const memo = new Memo();
    memo.email = decoded.email;
    memo.name = req.body.name;
    memo.ingredients = req.body.ingredients;
    memo.sum = 0;

    for (let i = 0; memo.ingredients && i < memo.ingredients.length; i += 1) {
      memo.sum += memo.ingredients[i].amount;
    }

    memo.save((error, memo) => {
      if (error) {
        res.status(500).json({ status: constants.fail });
        return;
      }
      
      res.json({ status: constants.success, memo });
    });
  });
};
