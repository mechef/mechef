const mongoose = require('mongoose');
const Gridfs = require('gridfs-stream');

module.exports = (req, res, next) => {
  const db = mongoose.connection.db;
  const mongoDriver = mongoose.mongo;
  const gfs = new Gridfs(db, mongoDriver);

  const readstream = gfs.createReadStream({
    filename: req.params.name,
  });

  //error handling, e.g. file does not exist
  readstream.on('error', function(err) {
    console.log('An error occurred!', err);
    next(err);
  });

  readstream.pipe(res);
};
