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
    res
      .status(404)
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

    const updateFields = {};
    if (typeof req.body.dishName !== 'undefined')
      updateFields.dishName = req.body.dishName;
    if (typeof req.body.unitPrice !== 'undefined')
      updateFields.unitPrice = req.body.unitPrice;
    if (typeof req.body.quantity !== 'undefined')
      updateFields.quantity = req.body.quantity;
    if (typeof req.body.category !== 'undefined')
      updateFields.category = req.body.category;
    if (typeof req.body.ingredients !== 'undefined')
      updateFields.ingredients = req.body.ingredients;
    if (typeof req.body.description !== 'undefined')
      updateFields.description = req.body.description;
    if (typeof req.body.cookingBuffer !== 'undefined')
      updateFields.cookingBuffer = req.body.cookingBuffer;
    if (typeof req.body.serving !== 'undefined')
      updateFields.serving = req.body.serving;
    if (typeof req.body.publish !== 'undefined')
      updateFields.publish = req.body.publish;
    if (typeof req.body.images !== 'undefined')
      updateFields.images = req.body.images;

    Menu.findOneAndUpdate(
      { _id: req.params.id, email: decoded.email },
      { $set: updateFields },
      { projection: { __v: false }, new: false, upsert: true },
      (error, menu) => {
        if (error || !menu) {
          res.statys(404).json({ status: constants.fail });
          return;
        }

        if (updateFields.images) {
          const deleteSet = [];

          for (let i = 0; i < menu.images.length; i++) {
            let isDelete = true;
            for (let j = 0; j < updateFields.images.length; j++) {
              if (updateFields.images[i] == menu.images[j]) {
                isDelete = false;
                break;
              }
            }

            if (isDelete) {
              deleteSet.push(menu.images[i]);
            }
          }

          const db = mongoose.connection.db;
          const mongoDriver = mongoose.mongo;
          const gfs = new Gridfs(db, mongoDriver);

          for (let filename in deleteSet) {
            gfs.remove({ filename }, erro => {
              if (erro) {
                console.log(erro);
              }
            });
          }
        }

        Menu.findOne(
          { _id: req.params.id, email: decoded.email },
          { __v: false },
          (er, updatedMenuFields) => {
            if (er) {
              res.status(404).json({ status: constants.fail });
              return;
            }

            res.json({ status: constants.success, menu: updatedMenuFields });
          },
        );
      },
    );
  });
};
