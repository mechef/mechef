const Seller = require('../../models/seller');
const constants = require('../../utils/constants');

/**
 * @api {post} /seller/activate/:hash Activate seller account
 * @apiName ActivateSeller
 *
 * @apiParam {String} hash random hash to activate seller account
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
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "status": "fail"
 *     }
 *
 */
module.exports = (req, res) => {
  Seller.update(
    { activateHash: req.params.hash },
    { isActivate: true },
    err => {
      if (err) {
        res.status(500).json({ status: constants.fail });
        return;
      }
      res.json({ status: constants.success });
    },
  );
};
