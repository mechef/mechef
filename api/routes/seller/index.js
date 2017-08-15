const seller = require('express').Router({ mergeParams: true });
const register = require('./register');
const activate = require('./activate');
const login = require('./login');
const read_by_email = require('./read_by_email');
const update = require('./update');
const reset_pass_email = require('./reset_pass_email');
const reset_pass = require('./reset_pass');


seller.post('/', register);
seller.post('/activate/:hash', activate);
seller.post('/login/', login);
seller.get('/', read_by_email);
seller.put('/', update);
seller.post('/resetpass/', reset_pass_email);
seller.post('/resetpass/:hash', reset_pass);

module.exports = seller;
