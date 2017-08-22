const routes = require('express').Router();
const seller = require('./seller');

routes.use('/seller', seller);

// routes.get('/', (req, res) => {
//   res.status(200).json({ message: 'Connected!' });
// });

module.exports = routes;
