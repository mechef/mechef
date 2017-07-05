var User = require('../../models/user');
var cryptoUtils = require('../../utils/crypto');
var constants = require('../../utils/contants');

module.exports = (req, res) => {
  var email = req.body.email;
  console.log(email);

  User.findOne({ email: email }, function(err, user) {
    if (err) {
      console.log(err);
      res.json({ status: constants.fail, reason: error });
    }
    console.log(user);
    if (user) {
      if (!user.isActivate) {
        res.json({ status: constants.fail, reason: 'Email not activated' });
      } else {
        var password = req.body.password;
        var combined = user.passwordCombined;
        cryptoUtils.verifyPassword(password, combined, function(err, verify) {
          if (verify) {
            res.json({ status: constants.success });
          } else {
            res.json({ status: constants.fail, reason: 'Password not match' });
          }
        });
      }
    } else {
      res.json({ status: constants.fail, reason: 'Email not found' });
    }
  });
};
