const menu = require('express').Router({ mergeParams: true });
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const create = require('./create');
const readAllByEmail = require('./read_all_by_email');
const readImageByName = require('./read_image_by_name');

menu.post('/', upload.array('images'), create);
menu.get('/', readAllByEmail);
menu.get('/image/:name', readImageByName);

module.exports = menu;
