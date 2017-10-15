const Seller = require('../../models/seller');
const constants = require('../../utils/constants');
const cryptoUtils = require('../../utils/crypto');

/**
 * @api {post} /resetpass/:hash login seller account
 * @apiName ResetSellerPassword
 *
 * @apiParam {String} hash seller reset password hash
 * @apiParam {String} password seller reset password
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
  const resetPassHash = req.params.hash;
  const password = req.body.password;
  cryptoUtils.hashPassword(password, (err, combined) => {
    if (err) {
      res.status(500).json({ status: constants.fail });
      return;
    }

    Seller.update({ resetPassHash }, { passwordCombined: combined },
      (error) => {
        if (error) {
          res.status(500).json({ status: constants.fail });
          return;
        }

        res.json({ status: constants.success });
      });
  });
};
