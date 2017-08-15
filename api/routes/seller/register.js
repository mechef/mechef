var Seller = require('../../models/seller');
var cryptoUtils = require('../../utils/crypto');
var mailer = require('../../utils/mailer');
const uuidv4 = require('uuid/v4');
var constants = require('../../utils/constants');

module.exports = (req, res) => {
	var query = Seller.findOne({ email: req.body.email });
	query.then(function(seller) {
		if (seller) {
			res.json({ status: constants.fail, reason: 'Duplicated email' });
			return;
		}

		var password = cryptoUtils.hashPassword(req.body.password, function(err, combined) {
			if (err) {
				console.log(err);
				res.json({ status: constants.fail });
				return;
			}

			var seller = new Seller();
			seller.name = req.body.name;
			seller.email = req.body.email;
			seller.passwordCombined = combined;
			seller.activateHash = uuidv4() + uuidv4()
			seller.isActivate = false

			seller.save(function(err, seller) {
					if (err) {
						console.log(err);
						res.json({ status: constants.fail });
						return;
					}

					var mailOptions = {
							from: '"Mechef" <mechef@mechef.com>', // sender address
							to: seller.email, // list of receivers
							subject: 'Activation Email From Mechef', // Subject line
							html: `<a href="http://localhost:3001/seller/activate/${seller.activateHash}">http://localhost:3001/seller/activate/${seller.activateHash}</a>` // html body
					};

					mailer.sendMail(mailOptions, (error, info) => {
							if (error) {
								console.log(error);
								res.json({ status: constants.fail });
								return;
							}
							console.log('Message %s sent: %s', info.messageId, info.response);
							res.json({ status: constants.success });
					});
				});
		});
	});
};
