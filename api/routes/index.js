const routes = require('express').Router();
const delivery = require('./delivery');
const memo = require('./memo');
const menu = require('./menu');
const order = require('./order');
const seller = require('./seller');
const mongoose = require('mongoose');
const Gridfs = require('gridfs-stream');

const readImageByName = require('./read_image_by_name');

routes.use('/delivery', delivery);
routes.use('/memo', memo);
routes.use('/menu', menu);
routes.use('/order', order);
routes.use('/seller', seller);

routes.get('/image/:name', readImageByName);

module.exports = routes;
