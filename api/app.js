// Bring in our dependencies
const app = require('express')();

const bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const routes = require('./routes');

const PORT = process.env.PORT || 3001;
//  Connect all our routes to our application
app.use('/', routes);

// Turn on that server!
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
