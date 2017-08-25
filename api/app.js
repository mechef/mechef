// Bring in our dependencies
const app = require('express')();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  return next();
});

// mongoose.connect('mongodb://localhost/test_collection');
mongoose.connect('mongodb://root:123456@ds111123.mlab.com:11123/mechef');

const routes = require('./routes');

const PORT = process.env.PORT || 3001;
//  Connect all our routes to our application
app.use('/', routes);

// Turn on that server!
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
