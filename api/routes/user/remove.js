var User = require('../../models/user');

module.exports = (req, res) => {
  User.findByIdAndRemove(req.params.user_id, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'User removed!' });
  });
};
