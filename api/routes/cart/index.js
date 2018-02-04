const cart = require('express').Router({ mergeParams: true });
const create = require('./create');
const readOneById = require('./read_one_by_id');
const updateOneById = require('./update_one_by_id');

cart.post('/', create);
cart.get('/:id', readOneById);
cart.patch('/:id', updateOneById);

module.exports = cart;
