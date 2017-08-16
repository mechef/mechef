const Seller = require('../../models/seller');
const cryptoUtils = require('../../utils/crypto');
const mailer = require('../../utils/mailer');
const uuidv4 = require('uuid/v4');
const constants = require('../../utils/constants');
/**
 * @api {post} /seller login seller account
 * @apiName RegisterSeller
 *
 * @apiParam {String} name seller name
 * @apiParam {String} email seller email
 * @apiParam {String} password seller password
 *
 * @apiSuccess {String} status status
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": "success"
 *     }
 *
 * @apiError {String} status status
 * @apiError {String} reason failure reason
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "status": "fail",
 *       "reason": reason
 *     }
 *
 */
module.exports = (req, res) => {
  const query = Seller.findOne({ email: req.body.email });
  query.then((user) => {
    if (user) {
      res.json({ status: constants.fail, reason: 'Duplicated email' });
      return;
    }

    cryptoUtils.hashPassword(req.body.password, (err, combined) => {
      if (err) {
        console.log(err);
        res.json({ status: constants.fail });
        return;
      }

      const seller = new Seller();
      seller.name = req.body.name;
      seller.email = req.body.email;
      seller.passwordCombined = combined;
      seller.activateHash = uuidv4() + uuidv4();
      seller.isActivate = false;

      seller.save((error) => {
        if (error) {
          console.log(error);
          res.json({ status: constants.fail });
          return;
        }

        const mailOptions = {
          from: '"Mechef" <mechef@mechef.com>', // sender address
          to: seller.email, // list of receivers
          subject: 'Activation Email From Mechef', // Subject line
          html: `<a href="http://localhost:3001/seller/activate/${seller.activateHash}">http://localhost:3001/seller/activate/${seller.activateHash}</a>`, // html body
        };

        mailer.sendMail(mailOptions, (erro) => {
          if (erro) {
            console.log(erro);
            res.json({ status: constants.fail });
            return;
          }
          res.json({ status: constants.success });
        });
      });
    });
  });
};
