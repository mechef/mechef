const delivery = require('express').Router({ mergeParams: true });
const create = require('./create');
const readOneById = require('./read_one_by_id');
const readAllByEmail = require('./read_all_by_email');
const updateOneById = require('./update_one_by_id');
const deleteOneById = require('./delete_one_by_id');

delivery.post('/', create);
delivery.get('/:id', readOneById);
delivery.get('/', readAllByEmail);
delivery.patch('/:id', updateOneById);
delivery.delete('/:id', deleteOneById);
module.exports = delivery;
