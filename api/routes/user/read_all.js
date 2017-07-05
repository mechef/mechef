var User = require('../../models/user');

module.exports = (req, res) => {
  User.find(function(err, users) {
    if (err)
      res.send(err);

    res.json(users);
  });
};
