/**
 * Created by pooya on 2/12/19.
 */

const config = require('config');
const express = require('express');
const bodyParser = require('body-parser');
const requireDir = require('require-all');

require('./lib/docker');

const PORT = config.get(`server.${config.get('server.forceHttps') ? 'https': 'http'}.port`);

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log('Address:', `${req.method.toUpperCase()} ${req.url}`);
  console.log('Body:', req.body);
  next();
});

const namespaces = {
  v2: requireDir({
    dirname: `${__dirname}/app/v2`,
    filter: /index\.js$/,
  }),
  api: requireDir({
    dirname: `${__dirname}/app/api`,
    filter: /index\.js$/,
  }),
};

const routes = Object.keys(namespaces);
for (let i = 0; i < routes.length; i++) {
  const routeSpaces = Object.keys(namespaces[routes[i]]);
  for (let j = 0; j < routeSpaces.length; j++)
    app.use(`/${routes[i]}`, namespaces[routes[i]][routeSpaces[j]]['index.js']);
}

app.listen(PORT, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`server is listening on ${PORT}`);
});
