var User = require('../../models/user');

module.exports = (req, res) => {
  var updateFields = {};
  if (req.body.name) updateFields.name = req.body.name;
  if (req.body.email) updateFields.email = req.body.email;



  User.update( { email: req.body.email }, updateFields, function(err, user, resp) {
    if (err) {
      console.log(err);
      res.json({ status: constants.fail });
      return;
    }

    res.json({ status: constants.success });

  });
};
