const IngredientList = require('../../models/ingredientList');
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

    IngredientList.find({ email: decoded.email }, (err, ingredientLists) => {
      if (err) {
        res.status(404).json({ status: constants.fail, reason: constants.id_not_found });
        return;
      }
      res.json({ status: constants.success, ingredientLists });
    });
  });
};
