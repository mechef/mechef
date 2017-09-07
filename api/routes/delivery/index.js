const delivery = require('express').Router({ mergeParams: true });
const create = require('./create');
const readOneById = require('./read_one_by_id');
const updateOneById = require('./update_one_by_id');

delivery.post('/', create);
delivery.get('/:id', readOneById);
delivery.put('/:id', updateOneById);
module.exports = delivery;
