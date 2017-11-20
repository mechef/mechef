const menu = require('express').Router({ mergeParams: true });
const create = require('./create');
const readAllById = require('./read_all_by_id');
const readOneById = require('./read_one_by_id');
const deleteOneById = require('./delete_one_by_id');
const updateOneById = require('./update_one_by_id');

menu.post('/', create);
menu.get('/', readAllById);
menu.get('/:id', readOneById);
menu.delete('/:id', deleteOneById);
menu.patch('/:id', updateOneById);

module.exports = menu;
