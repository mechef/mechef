var Seller = require('../../models/seller');
var mailer = require('../../utils/mailer');
const uuidv4 = require('uuid/v4');
var constants = require('../../utils/constants');
var cryptoUtils = require('../../utils/crypto');

module.exports = (req, res) => {


	var resetPassHash = req.params.hash;
	var password = req.body.password;
	cryptoUtils.hashPassword(password, function(err, combined) {
		if (err) {
			console.log(err);
			res.json({ status: constants.fail });
			return;
		}

		Seller.update( { resetPassHash: resetPassHash }, { passwordCombined: combined } , function(err, seller, resp) {
			if (err) {
				console.log(err);
				res.json({ status: constants.fail });
				return;
			}

			res.json({ status: constants.success });
		});
	});
};
