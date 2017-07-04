var mongoose = require('../../utils/dbconnection');
var User = require('../../models/user');

module.exports = (req, res) => {
  User.findById(req.params.user_id, function(err, user) {
    if (err)
      res.send(err);

      res.json(user);
  });
};
