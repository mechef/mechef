const routes = require('express').Router();
const delivery = require('./delivery');
const ingredient = require('./ingredient');
const menu = require('./menu');
const order = require('./order');
const seller = require('./seller');

routes.use('/delivery', delivery);
routes.use('/ingredient', ingredient);
routes.use('/menu', menu);
routes.use('/order', order);
routes.use('/seller', seller);

module.exports = routes;
