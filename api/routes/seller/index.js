const seller = require('express').Router({ mergeParams: true });
const multer = require('multer');
const activate = require('./activate');
const login = require('./login');
const readByEmail = require('./read_by_email');
const register = require('./register');
const resetPassEmail = require('./reset_pass_email');
const resetPass = require('./reset_pass');
const update = require('./update');

const upload = multer({ dest: 'uploads/' });

seller.get('/activate/:hash', activate);
seller.post('/login/', login);
seller.get('/', readByEmail);
seller.post('/', register);
seller.post('/resetpass/', resetPassEmail);
seller.post('/resetpass/:hash', resetPass);
seller.patch('/', upload.fields([{ name: 'coverPhoto', maxCount: 1 }, { name: 'profileImage', maxCount: 1 }]), update);

module.exports = seller;
