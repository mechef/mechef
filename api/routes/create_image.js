const constants = require('../utils/constants');
const jwt = require('jsonwebtoken');
const uuidv4 = require('uuid/v4');
const mongoose = require('mongoose');
const fs = require('fs');
const Gridfs = require('gridfs-stream');

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

    req.file.filename = uuidv4();

    const db = mongoose.connection.db;
    const mongoDriver = mongoose.mongo;
    const gfs = new Gridfs(db, mongoDriver);

    const writestream = gfs.createWriteStream({
      filename: req.file.filename,
      mode: 'w',
      content_type: req.file.mimetype,
      metadata: {
        email: decoded.email,
        path: req.file.path,
      },
    });

    fs.createReadStream(req.file.path).pipe(writestream);

    writestream.on('close', file => {
      fs.unlink(file.metadata.path, erro => {
        if (erro) {
          console.log(erro);
        }
        res.json({ status: constants.success, image: req.file.filename });
      });
    });
  });
};
