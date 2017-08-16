const Seller = require('../../models/seller');
const constants = require('../../utils/constants');
const cryptoUtils = require('../../utils/crypto');

module.exports = (req, res) => {
  const resetPassHash = req.params.hash;
  const password = req.body.password;
  cryptoUtils.hashPassword(password, (err, combined) => {
    if (err) {
      console.log(err);
      res.json({ status: constants.fail });
      return;
    }

    Seller.update({ resetPassHash }, { passwordCombined: combined },
      (error) => {
        if (error) {
          console.log(error);
          res.json({ status: constants.fail });
          return;
        }

        res.json({ status: constants.success });
      });
  });
};
