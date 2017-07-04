const user = require('express').Router({ mergeParams: true });
const create = require('./create');
const read_all = require('./read_all');
const read_one = require('./read_one');
const update = require('./update');
const remove = require('./remove');


user.post('/', create);
user.get('/', read_all);
user.get('/:user_id', read_one);
user.put('/:user_id', update);
user.delete('/:user_id', remove);

module.exports = user;
