const routes = require('express').Router();
const delivery = require('./delivery');
const memo = require('./memo');
const menu = require('./menu');
const order = require('./order');
const seller = require('./seller');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const create = require('./create');
const readImageByName = require('./read_image_by_name');

routes.use('/delivery', delivery);
routes.use('/memo', memo);
routes.use('/menu', menu);
routes.use('/order', order);
routes.use('/seller', seller);

routes.post('/image', upload.single('image'), create);
routes.get('/image/:name', readImageByName);

module.exports = routes;
