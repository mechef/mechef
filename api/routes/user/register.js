var User = require('../../models/user');
var cryptoUtils = require('../../utils/crypto');
var mailer = require('../../utils/mailer');
const uuidv4 = require('uuid/v4');
var constants = require('../../utils/contants');

module.exports = (req, res) => {
	var query = User.findOne({ email: req.body.email });
	query.then(function(user) {
		if (user) {
			res.json({ status: constants.fail, reason: 'Duplicated email' });
			return;
		}

		var user = new User();

		user.name = req.body.name;
		user.email = req.body.email;
		var password = cryptoUtils.hashPassword(req.body.password, function(err, combined) {
			if (err) {
				console.log(err);
				res.json({ status: constants.fail });
				return;
			}

			user.passwordCombined = combined;
			user.activateHash = uuidv4() + uuidv4()
			user.isActivate = false

			user.save(function(err, user) {
					if (err) {
						console.log(err);
						res.json({ status: constants.fail });
						return;
					}

					var mailOptions = {
							from: '"Mechef" <mechef@mechef.com>', // sender address
							to: user.email, // list of receivers
							subject: 'Activation Email From Mechef', // Subject line
							html: `<a href="http://localhost:3001/user/activate/${user.activateHash}">http://localhost:3001/user/activate/${user.activateHash}</a>` // html body
					};

					mailer.sendMail(mailOptions, (error, info) => {
							if (error) {
								console.log(error);
								res.json({ status: constants.fail });
								return;
							}
							console.log('Message %s sent: %s', info.messageId, info.response);
							res.json({ status: constants.success, user: user });
					});
				});
		});
	});
};
