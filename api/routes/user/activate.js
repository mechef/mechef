var User = require('../../models/user');
var constants = require('../../utils/contants');

module.exports = (req, res) => {

  User.update( { activateHash: req.params.hash }, { isActivate: true }, function(err, user, resp) {
    if (err) {
      console.log(err);
      res.json({ status: constants.fail });
      return;
    }

    res.json({ status: constants.success });

  });
};
