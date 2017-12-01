const seller = require('express').Router({ mergeParams: true });
const activate = require('./activate');
const login = require('./login');
const readByEmail = require('./read_by_email');
const register = require('./register');
const resetPassEmail = require('./reset_pass_email');
const resetPass = require('./reset_pass');
const update = require('./update');

seller.get('/activate/:hash', activate);
seller.post('/login/', login);
seller.get('/', readByEmail);
seller.post('/', register);
seller.post('/resetpass/', resetPassEmail);
seller.post('/resetpass/:hash', resetPass);
seller.patch('/', update);

module.exports = seller;
