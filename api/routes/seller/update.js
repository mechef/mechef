const Seller = require('../../models/seller');
const uuidv4 = require('uuid/v4');
const constants = require('../../utils/constants');
const fs = require('fs');
const Gridfs = require('gridfs-stream');
const mongoose = require('mongoose');
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
  const token = req.headers.authorization;
  if (!token) {
    res.status(400).json({ status: constants.fail, reason: constants.no_token });
    return;
  }

  jwt.verify(token, constants.secret, (err, decoded) => {
    if (err) {
      res.status(500).json({ status: constants.fail });
      return;
    }
    const updateFields = {};
    if (req.body.kitchenDescription) updateFields.kitchenDescription = req.body.kitchenDescription;
    if (req.body.firstName) updateFields.firstName = req.body.firstName;
    if (req.body.lastName) updateFields.lastName = req.body.lastName;
    if (req.body.phoneNumber) updateFields.phoneNumber = req.body.phoneNumber;
    const updateFieldsOfImage = [];
    if (req.files && req.files['coverPhoto']) {
      updateFields.coverPhoto = req.files['coverPhoto'][0].filename;
      updateFieldsOfImage.push('coverPhoto');
    }
    if (req.files && req.files['profileImage']) {
      updateFields.profileImage = req.files['profileImage'][0].filename;
      updateFieldsOfImage.push('profileImage');
    }

    Seller.findOneAndUpdate({ email: decoded.email }, { $set: updateFields },
      { projection: { __v: false, email: false, isActivate: false, activateHash: false, passwordCombined: false },
       new: true, upsert: true }, (error, seller) => {
      if (error) {
        res.status(500).json({ status: constants.fail });
        return;
      }

      if (updateFieldsOfImage.length > 0) {
        const db = mongoose.connection.db;
        const mongoDriver = mongoose.mongo;
        const gfs = new Gridfs(db, mongoDriver);

        for (let i = 0; i < updateFieldsOfImage.length; i++) {
          const writestream = gfs.createWriteStream({
            filename: req.files[updateFieldsOfImage[i]][0].filename,
            mode: 'w',
            content_type: req.files[updateFieldsOfImage[i]][0].mimetype,
            metadata: {
              email: decoded.email,
              type: updateFieldsOfImage[i],
              path: req.files[updateFieldsOfImage[i]][0].path,
            },
          });

          fs.createReadStream(req.files[updateFieldsOfImage[i]][0].path).pipe(writestream);
          writestream.on('close', (file) => {
            fs.unlink(file.metadata.path, (erro) => {
              if (erro) {
                console.log(err);
              }
            });
          });

          if (seller[updateFieldsOfImage[i]] && seller[updateFieldsOfImage[i]] !== '') {
            gfs.remove({ filename: seller[updateFieldsOfImage[i]] }, (erro) => {
              if (erro) {
                console.log(erro);
              }
            });
          }
        }
      }

      res.json({ status: constants.success, seller });
    });

  });
};
