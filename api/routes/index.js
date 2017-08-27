const routes = require('express').Router();
const seller = require('./seller');
const menu = require('./menu');

routes.use('/seller', seller);
routes.use('/menu', menu);

// routes.get('/', (req, res) => {
//   res.status(200).json({ message: 'Connected!' });
// });

module.exports = routes;
