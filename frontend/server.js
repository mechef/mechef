const express = require('express');
const next = require('next');
const cookieParser = require('cookie-parser');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: './frontend', dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();
    server.use(cookieParser());
    // XXX: Create custom rules
    server.get('/dashboard/:page', (req, res) => {
      const actualPage = '/dashboard';
      app.render(req, res, actualPage);
    });

    server.get('/', (req, res) => {
      // TODO: Find a way to login automatically by jwt
      app.render(req, res, '/login');
      // For rendering index.js
      // handle(req, res);
    });

    server.get('*', (req, res) => handle(req, res));

    server.listen(3000, (err) => {
      if (err) throw err;
      // eslint-disable-next-line no-console
      console.log('> Ready on http://localhost:3000');
    });
  }).catch((ex) => {
    // eslint-disable-next-line no-console
    console.error(ex.stack);
    process.exit(1);
  });
