const Menu = require('../../models/menu');
const uuidv4 = require('uuid/v4');
const fs = require('fs');
const constants = require('../../utils/constants');
const jwt = require('jsonwebtoken');
const verifier = require('../../utils/verifier');

module.exports = (req, res) => {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
  const token = req.headers.authorization;
  if (!token) {
    res
      .status(400)
      .json({ status: constants.fail, reason: constants.no_token });
    return;
  }

  jwt.verify(token, constants.secret, (err, decoded) => {
    if (err) {
      console.log(err);
      res.status(400).json({
        status: constants.fail,
        reason: constants.jwt_verification_error,
      });
      return;
    }

    const verifyResponse = verifier.checkRequiredParametersInBody(req, [
      'dishName',
      'unitPrice',
      'quantity',
      'category',
      'ingredients',
      'description',
      'cookingBuffer',
      'serving',
      'images',
    ]);
    if (!verifyResponse.isPass) {
      res.status(400).json({
        status: constants.fail,
        reason: `${constants.verifyRequestMessage} ${
          verifyResponse.errorFields
        }`,
      });
      return;
    }

    const menu = new Menu();
    menu.email = decoded.email;
    menu.dishName = req.body.dishName;
    menu.unitPrice = req.body.unitPrice;
    menu.quantity = req.body.quantity;
    menu.category = req.body.category;
    menu.ingredients = req.body.ingredients;
    menu.description = req.body.description;
    menu.cookingBuffer = req.body.cookingBuffer;
    menu.serving = req.body.serving;
    menu.publish = true;
    menu.images = req.body.images;

    menu.save((error, savedMenu) => {
      if (error || !savedMenu) {
        console.log(error);
        res.status(500).json({ status: constants.fail });
        return;
      }

      res.json({ status: constants.success, menu: savedMenu });
    });
  });
};
