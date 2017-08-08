var User = require('../../models/user');
var constants = require('../../utils/contants');

module.exports = (req, res) => {
  var query = User.findOne({ email: req.params.email });
	query.then(function(user) {
		if (user) {
			res.json({ status: , user: user });
		} else {
      res.json({ status: constants.fail, reason: 'Email not found' });
    }
  });
};
