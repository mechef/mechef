const Seller = require('../../models/seller');
const constants = require('../../utils/constants');

module.exports = (req, res) => {
  Seller.update({ activateHash: req.params.hash },
    { isActivate: true },
    (err) => {
      if (err) {
        console.log(err);
        res.json({ status: constants.fail });
        return;
      }
      res.json({ status: constants.success });
    });
};
