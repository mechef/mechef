var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test_collection');

module.exports = mongoose;
