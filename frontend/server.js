const express = require('express');
const next = require('next');
const cookieParser = require('cookie-parser');

const i18nextMiddleware = require('i18next-express-middleware');
const Backend = require('i18next-node-fs-backend');
const i18n = require('./i18n');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: './frontend', dev });
const handle = app.getRequestHandler();

// init i18next with serverside settings
// using i18next-express-middleware
i18n
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    preload: ['en', 'zh'], // preload all langages
    ns: ['common'], // need to preload all the namespaces
    backend: {
      loadPath: __dirname + '/locales/{{lng}}/{{ns}}.json',
      addPath: __dirname + '/locales/{{lng}}/{{ns}}.missing.json'
    }
  }, () => {

  app.prepare()
    .then(() => {
      const server = express();

      // enable middleware for i18next
      server.use(i18nextMiddleware.handle(i18n));

      // serve locales for client
      server.use('/locales', express.static(__dirname + '/locales'))

      // missing keys
      server.post('/locales/add/:lng/:ns', i18nextMiddleware.missingKeyHandler(i18n));

      server.use(cookieParser());
      // XXX: Create custom rules
      server.get('/dashboard/:page', (req, res) => {
        const actualPage = '/dashboard';
        app.render(req, res, actualPage);
      });

      server.get('/kitchen/:kitchen', (req, res) => {
        const actualPage = '/kitchen';
        const queryParams = {kitchen: req.params.kitchen};
        app.render(req, res, actualPage, queryParams);
      });

      server.get('/kitchen/:kitchen/:dish', (req, res) => {
        const actualPage = '/kitchen';
        const queryParams = {kitchen: req.params.kitchen, dish: req.params.dish};
        app.render(req, res, actualPage, queryParams);
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

});
