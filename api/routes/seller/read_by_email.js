const Seller = require('../../models/seller');
const constants = require('../../utils/constants');
const jwt = require('jsonwebtoken');
/**
 * @api {get} /seller get seller account information
 * @apiName ReadSeller
 *
 * @apiParam {String} token seller login got token
 *
 * @apiSuccess {String} status status
 * @apiSuccess {Object} seller seller information
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": "success",
 *       "seller": seller information
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
  const token = req.headers.authorization;
  if (!token) {
    res.status(400).json({ status: constants.fail, reason: constants.no_token });
    return;
  }

  jwt.verify(token, constants.secret, (err, decoded) => {
    if (err) {
      res.status(500).json({ status: constants.fail });
    } else {
      Seller.findOne({ email: decoded.email },
        Seller.getHiddenFields(),
        (error, seller) => {
        if (error) {
          res.status(500).json({ status: constants.fail });
          return;
        }
        res.json({ status: constants.success, seller });
      });
    }
  });
};
