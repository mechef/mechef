const Seller = require('../../models/seller');
const constants = require('../../utils/constants');
const jwt = require('jsonwebtoken');
/**
 * @api {put} /seller update seller account information
 * @apiName UpdateSeller
 *
 * @apiParam {String} name (optional) seller name
 * @apiParam {String} email (optional) seller email
 * @apiParam {String} password (optional) seller password
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
  const token = req.body.token;
  if (!token) {
    res.json({ status: constants.fail, reason: constants.no_token });
    return;
  }

  const updateFields = {};
  if (req.body.name) updateFields.name = req.body.name;
  if (req.body.email) updateFields.email = req.body.email;
  // TODO

  jwt.verify(token, constants.secret, (err, decoded) => {
    if (err) {
      res.json({ status: constants.fail });
    } else {
      Seller.update({ email: decoded.email }, {$set: updateFields }, (error) => {
        if (error) {
          console.log(error);
          res.json({ status: constants.fail });
          return;
        }

        res.json({ status: constants.success });
      });
    }
  });
};
