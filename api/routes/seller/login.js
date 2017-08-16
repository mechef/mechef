const Seller = require('../../models/seller');
const cryptoUtils = require('../../utils/crypto');
const constants = require('../../utils/constants');
const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
  const email = req.body.email;

  Seller.findOne({ email }, (err, seller) => {
    if (err) {
      console.log(err);
      res.json({ status: constants.fail, reason: err });
    }
    // console.log(seller);
    if (seller) {
      if (!seller.isActivate) {
        res.json({ status: constants.fail, reason: 'Email not activated' });
      } else {
        const password = req.body.password;
        const combined = seller.passwordCombined;
        cryptoUtils.verifyPassword(password, combined, (error, verify) => {
          if (verify) {
            const token = jwt.sign({ email }, constants.secret, {
              expiresIn: 60 * 60 * 24,
            });

            res.json({ status: constants.success, token });
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
