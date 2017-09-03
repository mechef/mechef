const ingredient = require('express').Router({ mergeParams: true });
const create = require('./create');
// const readOneById = require('./read_one_by_id');
// const updateOneById = require('./update_one_by_id');

ingredient.post('/', create);
// order.get('/:id', readOneById);
// order.put('/:id', updateOneById);
module.exports = ingredient;
