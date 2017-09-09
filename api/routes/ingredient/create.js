const IngredientList = require('../../models/ingredientList');
const constants = require('../../utils/constants');
const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
  const token = req.body.token;
  if (!token) {
    res.status(404).json({ status: constants.fail, reason: constants.no_token });
    return;
  }

  jwt.verify(token, constants.secret, (err, decoded) => {
    if (err) {
      res.status(404).json({ status: constants.fail });
      return;
    }

    const ingredientList = new IngredientList();
    ingredientList.email = decoded.email;
    ingredientList.name = req.body.name;
    ingredientList.ingredients = req.body.ingredients;

    ingredientList.save((error) => {
      if (error) {
        res.json({ status: constants.fail });
        return;
      }

      res.json({ status: constants.success });
    });
  });
};
