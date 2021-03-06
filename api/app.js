// Bring in our dependencies
const app = require('express')();

const bodyParser = require('body-parser');
const Promise = require('bluebird');
const mongoose = require('mongoose');
mongoose.Promise = Promise;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, DELETE, PATCH');
  return next();
});

// mongoose.connect('mongodb://localhost/test_collection');
mongoose.connect('mongodb://root:123456@ds111123.mlab.com:11123/mechef');

const routes = require('./routes');

const PORT = process.env.PORT || 3001;
//  Connect all our routes to our application
app.use('/', routes);

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Turn on that server!
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
