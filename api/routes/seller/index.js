const seller = require('express').Router({ mergeParams: true });
const register = require('./register');
const activate = require('./activate');
const login = require('./login');
const read_by_email = require('./read_by_email');
const update = require('./update');


seller.post('/', register);
seller.post('/activate/:hash', activate);
seller.post('/login/', login);
seller.get('/', read_by_email);
seller.put('/', update);

module.exports = seller;
