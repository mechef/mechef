const Seller = require('../../models/seller');
const mailer = require('../../utils/mailer');
const uuidv4 = require('uuid/v4');
const constants = require('../../utils/constants');
/**
 * @api {post} /resetpass login seller account
 * @apiName ResetSellerPasswordSendEmail
 *
 * @apiParam {String} email seller email
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
  const resetPassHash = uuidv4() + uuidv4();

  Seller.update({ email: req.body.email }, { resetPassHash }, (err) => {
    if (err) {
      console.log(err);
      res.json({ status: constants.fail });
      return;
    }

    const mailOptions = {
      from: '"Mechef" <mechef@mechef.com>', // sender address
      to: req.body.email, // list of receivers
      subject: 'Reset password Email From Mechef', // Subject line
      html: `<a href="http://localhost:3001/seller/resetpass/${resetPassHash}">http://localhost:3001/seller/resetpass/${resetPassHash}</a>`, // html body
    };

    mailer.sendMail(mailOptions, (error) => {
      if (error) {
        console.log(error);
        res.json({ status: constants.fail });
        return;
      }
      res.json({ status: constants.success });
    });
  });
};
