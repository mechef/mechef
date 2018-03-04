const kitchen = require('express').Router({ mergeParams: true });
const readOneByName = require('./read_one_by_name');

kitchen.get('/:name', readOneByName);

module.exports = kitchen;
