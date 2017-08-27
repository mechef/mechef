const Menu = require('../../models/menu');
const uuidv4 = require('uuid/v4');
const fs = require('fs');
const Gridfs = require('gridfs-stream');
const mongoose = require('mongoose');
const constants = require('../../utils/constants');
const jwt = require('jsonwebtoken');

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
    for (let i = 0; i < req.files.length; i += 1) {
      console.log(req.files[i]);
      req.files[i].filename = uuidv4() + req.files[i].filename;
      menu.images.push(req.files[i].filename);
    }

    menu.save((error, savedMenu) => {
      if (error) {
        console.log(error);
        res.json({ status: constants.fail });
        return;
      }

      const db = mongoose.connection.db;
      const mongoDriver = mongoose.mongo;
      const gfs = new Gridfs(db, mongoDriver);

      for (let i = 0; i < req.files.length; i += 1) {
        const writestream = gfs.createWriteStream({
          filename: req.files[i].filename,
          mode: 'w',
          content_type: req.files[i].mimetype,
          metadata: {
            email: decoded.email,
            menuId: savedMenu._id,
            path: req.files[i].path,
          },
        });

        fs.createReadStream(req.files[i].path).pipe(writestream);
        writestream.on('close', (file) => {
          fs.unlink(file.metadata.path, (erro) => {
            if (erro) {
              console.log(err);
            }
          });
        });
      }
      res.json({ status: constants.success });
    });
  });
};
