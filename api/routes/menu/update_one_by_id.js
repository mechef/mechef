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
    if (req.body.dishName) updateFields.dishName = req.body.dishName;
    if (req.body.unitPrice) updateFields.unitPrice = req.body.unitPrice;
    if (req.body.quantity) updateFields.quantity = req.body.quantity;
    if (req.body.category) updateFields.category = req.body.category;
    if (req.body.ingredients) updateFields.ingredients = req.body.ingredients;
    if (req.body.description) updateFields.description = req.body.description;
    if (req.body.cookingBuffer) updateFields.cookingBuffer = req.body.cookingBuffer;
    if (req.body.serving) updateFields.serving = req.body.serving;
    if (req.body.deliveryId) updateFields.deliveryId = req.body.deliveryId;

    if (req.files && req.files.length > 0) {
      updateFields.images = [];
      for (let i = 0; i < req.files.length; i += 1) {
        req.files[i].filename = uuidv4() + req.files[i].filename;
        updateFields.images.push(req.files[i].filename);
      }
    }

    Menu.findOneAndUpdate({ _id: req.params.id, email: decoded.email }, { $set: updateFields },
      { projection: { __v: false }, new: false, upsert: true }, (error, menu) => {
    if (error) {
      res.json({ status: constants.fail });
      return;
    }

    if (updateFields.images) {
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
            menuId: menu._id,
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

      for (let filename in menu.images) {
        gfs.remove({ filename }, (erro) => {
          if (erro) {
            console.log(erro);
          }
        });
      }
    }

    Menu.findOne({ _id: req.params.id, email: decoded.email },
      { __v: false }, (er, updatedMenu) => {
        if (er) {
          res.json({ status: constants.fail });
          return;
        }

        res.json({ status: constants.success, menu : updatedMenu});
        });
    });
  });
};
