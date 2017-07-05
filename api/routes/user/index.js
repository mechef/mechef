const user = require('express').Router({ mergeParams: true });
const register = require('./register');
const activate = require('./activate');
const login = require('./login');
const read_by_email = require('./read_by_email');
const update = require('./update');


user.post('/', register);
user.post('/activate/:hash', activate);
user.post('/login/', login);
user.get('/', read_by_email);
user.put('/', update);

module.exports = user;
