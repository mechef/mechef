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

    const updateFields = {};
    if (req.body.name) updateFields.name = req.body.name;
    if (req.body.ingredients) {
        updateFields.ingredients = req.body.ingredients;
        updateFields.sum = 0;
        for (let i = 0; i < updateFields.ingredients.length; i += 1) {
          updateFields.sum += updateFields.ingredients[i].amount;
        }
    }

    Memo.findOneAndUpdate({ _id: req.params.id, email: decoded.email }, { $set: updateFields },
      { projection: { __v: false, email: false },
       new: true, upsert: true }, (error) => {
    if (error) {
      res.status(500).json({ status: constants.fail });
      return;
    }

    res.json({ status: constants.success, memo });
    });
  });
};
