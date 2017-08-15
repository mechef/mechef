var Seller = require('../../models/seller');
var mailer = require('../../utils/mailer');
const uuidv4 = require('uuid/v4');
var constants = require('../../utils/constants');

module.exports = (req, res) => {

	var resetPassHash = uuidv4() + uuidv4();

	Seller.update( { email: req.body.email }, { resetPassHash: resetPassHash } , function(err, seller, resp) {
		if (err) {
			console.log(err);
			res.json({ status: constants.fail });
			return;
		}

		var mailOptions = {
				from: '"Mechef" <mechef@mechef.com>', // sender address
				to: req.body.email, // list of receivers
				subject: 'Reset password Email From Mechef', // Subject line
				html: `<a href="http://localhost:3001/seller/resetpass/${resetPassHash}">http://localhost:3001/seller/resetpass/${resetPassHash}</a>` // html body
		};

		mailer.sendMail(mailOptions, (error, info) => {
				if (error) {
					console.log(error);
					res.json({ status: constants.fail });
					return;
				}
				res.json({ status: constants.success });
		});
	});
};
