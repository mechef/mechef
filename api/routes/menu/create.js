const Menu = require('../../models/menu');
const uuidv4 = require('uuid/v4');
const fs = require('fs');
const constants = require('../../utils/constants');
const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
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
    menu.deliveryIdList = req.body.deliveryIdList;
    menu.publish = true;
    menu.images = req.body.images;

    menu.save((error, savedMenu) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: constants.fail });
        return;
      }

      res.json({ status: constants.success, menu: savedMenu });
    });
  });
};
