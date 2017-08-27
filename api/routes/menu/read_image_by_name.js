const mongoose = require('mongoose');
const Gridfs = require('gridfs-stream');

module.exports = (req, res) => {
  const db = mongoose.connection.db;
  const mongoDriver = mongoose.mongo;
  const gfs = new Gridfs(db, mongoDriver);

  const readstream = gfs.createReadStream({
    filename: req.params.name,
  });

  readstream.pipe(res);
};
