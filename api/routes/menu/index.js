const menu = require('express').Router({ mergeParams: true });
const multer = require('multer');
const create = require('./create');
const readAllByEmail = require('./read_all_by_email');
const readOneById = require('./read_one_by_id');
const deleteOneById = require('./delete_one_by_id');
const updateOneById = require('./update_one_by_id');
const readImageByName = require('./read_image_by_name');

const upload = multer({ dest: 'uploads/' });

menu.post('/', upload.array('images'), create);
menu.get('/', readAllByEmail);
menu.get('/:id', readOneById);
menu.delete('/:id', deleteOneById);
menu.patch('/:id', upload.array('images'), updateOneById);
menu.get('/image/:name', readImageByName);

module.exports = menu;
