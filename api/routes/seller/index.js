const seller = require('express').Router({ mergeParams: true });
const register = require('./register');
const activate = require('./activate');
const login = require('./login');
const readByEmail = require('./read_by_email');
const update = require('./update');
const resetPassEmail = require('./reset_pass_email');
const resetPass = require('./reset_pass');


seller.post('/', register);
seller.post('/activate/:hash', activate);
seller.post('/login/', login);
seller.get('/', readByEmail);
seller.put('/', update);
seller.post('/resetpass/', resetPassEmail);
seller.post('/resetpass/:hash', resetPass);

module.exports = seller;
