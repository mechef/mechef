const Menu = require('../../models/menu');
const uuidv4 = require('uuid/v4');
const fs = require('fs');
const Gridfs = require('gridfs-stream');
const mongoose = require('mongoose');
const constants = require('../../utils/constants');

module.exports = (req, res) => {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
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
    menu.images = [];
    for (var file in req.files) {
      file.name = uuid() + '_' + file.name;
      menu.images.push(file.name);
    }

    menu.save((error, savedMenu) => {
      if (error) {
        console.log(error);
        res.json({ status: constants.fail });
        return;
      }

      var db = mongoose.connection.db;
      var mongoDriver = mongoose.mongo;
      var gfs = new Gridfs(db, mongoDriver);

      for (var file in req.files) {
        var writestream = gfs.createWriteStream({
          filename: file.name,
          metadata: {
            email: decoded.email,
            menuId: savedMenu._id
          }
        });

        fs.createReadStream(file.path).pipe(writestream);
        writestream.on('close', function(file) {
          fs.unlink(req.files.file.path, function(err) {
            if (err) {
              console.log(err);
            }
          });
        });
      }
      res.json({ status: constants.success });
    });
  });
};
