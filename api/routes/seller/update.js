var Seller = require('../../models/seller');

module.exports = (req, res) => {
  var token = req.body.token
  if (!token) {
    res.json({ status: constants.fail, reason: constants.no_token });
    return;
  }

  var updateFields = {};
  if (req.body.name) updateFields.name = req.body.name;
  if (req.body.email) updateFields.email = req.body.email;
  // TODO

  jwt.verify(token, constants.secret, function (err, decoded) {
    if (err) {
      res.json({ status: constants.fail });
    } else {
      Seller.update( { email: decoded.email }, updateFields, function(err, seller, resp) {
        if (err) {
          console.log(err);
          res.json({ status: constants.fail });
          return;
        }

        res.json({ status: constants.success });

      });
    }
  })
};
