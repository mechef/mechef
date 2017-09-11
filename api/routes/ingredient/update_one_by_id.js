const IngredientList = require('../../models/ingredientList');
const constants = require('../../utils/constants');
const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(404).json({ status: constants.fail, reason: constants.no_token });
    return;
  }

  jwt.verify(token, constants.secret, (err, decoded) => {
    if (err) {
      res.status(404).json({ status: constants.fail });
      return;
    }

    const updateFields = {};
    if (req.body.name) updateFields.name = req.body.name;
    if (req.body.ingredients) updateFields.ingredients = req.body.ingredients;

    IngredientList.findOneAndUpdate({ _id: req.params.id, email: decoded.email }, { $set: updateFields }, (error, ingredientList) => {
    if (error) {
      res.json({ status: constants.fail });
      return;
    }

    res.json({ status: constants.success, ingredientList});
    });
  });
};
