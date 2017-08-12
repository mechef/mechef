var Seller = require('../../models/seller');
var cryptoUtils = require('../../utils/crypto');
var constants = require('../../utils/constants');

module.exports = (req, res) => {
  var email = req.body.email;
  console.log(email);

  Seller.findOne({ email: email }, function(err, seller) {
    if (err) {
      console.log(err);
      res.json({ status: constants.fail, reason: error });
    }
    // console.log(seller);
    if (seller) {
      if (!seller.isActivate) {
        res.json({ status: constants.fail, reason: 'Email not activated' });
      } else {
        var password = req.body.password;
        var combined = seller.passwordCombined;
        cryptoUtils.verifyPassword(password, combined, function(err, verify) {
          if (verify) {
            var token = jwt.sign({ email: email } , constants.secret, {
              expiresIn: 60*60*24
            });

            res.json({ status: constants.success, token: token });
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
