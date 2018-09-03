const Seller = require('../../models/seller');
const cryptoUtils = require('../../utils/crypto');
const constants = require('../../utils/constants');
const jwt = require('jsonwebtoken');

/**
 * @api {post} /seller/login login seller account
 * @apiName LoginSeller
 *
 * @apiParam {String} email seller email
 * @apiParam {String} password seller password
 *
 * @apiSuccess {String} status status
 * @apiSuccess {String} token jwt token
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": "success",
 *       "token": jwt token
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
  const email = req.body.email;

  Seller.findOne({ email }, (err, seller) => {
    if (err) {
      console.log(err);
      res.status(500).json({ status: constants.fail, reason: err });
    }
    if (seller) {
      if (!seller.isActivate) {
        res
          .status(401)
          .json({ status: constants.fail, reason: 'Email not activated' });
      } else {
        const password = req.body.password;
        const combined = seller.passwordCombined;
        cryptoUtils.verifyPassword(password, combined, (error, verify) => {
          if (verify) {
            const token = jwt.sign({ email }, constants.secret, {
              expiresIn: 60 * 60 * 24 * 30,
            });

            res.json({ status: constants.success, token });
          } else {
            res
              .status(401)
              .json({ status: constants.fail, reason: 'Password not match' });
          }
        });
      }
    } else {
      res
        .status(401)
        .json({ status: constants.fail, reason: constants.email_not_found });
    }
  });
};
