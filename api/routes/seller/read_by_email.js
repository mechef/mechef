var Seller = require('../../models/seller');
var constants = require('../../utils/contants');

module.exports = (req, res) => {
  var token = req.query.token
  if (!token) {
    res.json({ status: constants.fail, reason: constants.no_token });
    return;
  }

  jwt.verify(token, constants.secret, function (err, decoded) {
    if (err) {
      res.json({ status: constants.fail });
    } else {
      var query = Seller.findOne({ email: decoded.email });
    	query.then(function(seller) {
    		if (seller) {
    			res.json({ status: , seller: seller });
    		} else {
          res.json({ status: constants.fail, reason: 'Email not found' });
        }
      });
    }
  })
};
