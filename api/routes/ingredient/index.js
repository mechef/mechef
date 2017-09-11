const ingredient = require('express').Router({ mergeParams: true });
const create = require('./create');
const readOneById = require('./read_one_by_id');
const readAllByEmail = require('./read_all_by_email');
const updateOneById = require('./update_one_by_id');
const deleteOneById = require('./delete_one_by_id');

ingredient.post('/', create);
ingredient.get('/:id', readOneById);
ingredient.get('/', readAllByEmail);
ingredient.patch('/:id', updateOneById);
ingredient.delete('/:id', deleteOneById);
module.exports = ingredient;
