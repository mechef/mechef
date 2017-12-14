const order = require('express').Router({ mergeParams: true });
const create = require('./create');
const readAllByState = require('./read_all_by_state');
const readOneById = require('./read_one_by_id');
const updateOneById = require('./update_one_by_id');
const deleteOneById = require('./delete_one_by_id');

order.post('/', create);
order.get('/', readAllByState);
order.get('/:id', readOneById);
order.patch('/:id', updateOneById);
order.delete('/:id', deleteOneById);
module.exports = order;
