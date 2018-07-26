const Menu = require('../../models/menu');
const constants = require('../../utils/constants');
const jwt = require('jsonwebtoken');
const Gridfs = require('gridfs-stream');
const mongoose = require('mongoose');

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
      res.status(500).json({ status: constants.fail });
      return;
    }

    Menu.findOne(
      { _id: req.params.id, email: decoded.email },
      (error, menu) => {
        if (error) {
          res.status(500).json({ status: constants.fail });
          return;
        }

        const db = mongoose.connection.db;
        const mongoDriver = mongoose.mongo;
        const gfs = new Gridfs(db, mongoDriver);

        for (let filename in menu.images) {
          gfs.remove({ filename }, erro => {
            if (erro) {
              console.log(erro);
            }
          });
        }

        Menu.remove({ _id: req.params.id }, e => {
          if (e) {
            res.status(500).json({ status: constants.fail });
            return;
          }
          res.json({ status: constants.success });
        });
      },
    );
  });
};
