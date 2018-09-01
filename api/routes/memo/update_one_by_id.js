const Memo = require('../../models/memo');
const constants = require('../../utils/constants');
const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    res
      .status(400)
      .json({ status: constants.fail, reason: constants.no_token });
    return;
  }

  jwt.verify(token, constants.secret, (err, decoded) => {
    if (err) {
      res.status(400).json({
        status: constants.fail,
        reason: constants.jwt_verification_error,
      });
      return;
    }

    const updateFields = {};
    if (typeof req.body.name !== 'undefined') updateFields.name = req.body.name;
    if (typeof req.body.ingredients !== 'undefined') {
      updateFields.ingredients = req.body.ingredients;
      updateFields.sum = 0;
      for (let i = 0; i < updateFields.ingredients.length; i += 1) {
        updateFields.sum += parseInt(updateFields.ingredients[i].amount) || 0;
      }
    }

    Memo.findOneAndUpdate(
      { _id: req.params.id, email: decoded.email },
      { $set: updateFields },
      {
        projection: { __v: false, email: false },
        new: true,
        upsert: true,
      },
      (error, memo) => {
        if (error || !memo) {
          console.log(error);
          res.status(404).json({ status: constants.fail });
          return;
        }

        res.json({ status: constants.success, memo });
      },
    );
  });
};
