var Seller = require('../../models/seller');
var constants = require('../../utils/contants');

module.exports = (req, res) => {

  Seller.update( { activateHash: req.params.hash }, { isActivate: true }, function(err, seller, resp) {
    if (err) {
      console.log(err);
      res.json({ status: constants.fail });
      return;
    }

    res.json({ status: constants.success });

  });
};
