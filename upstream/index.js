/**
 * Created by pooya on 2/12/19.
 */

const config = require('config');
const express = require('express');
const Promise = require('bluebird');
const bodyParser = require('body-parser');

const PORT = 3000;

const app = express();
app.use(bodyParser.json());

app.use((request, response, next) => {
  console.log(request.url);
  console.log(request.method);
  console.log(request.body);
  next();
});

app.post('/v2/discovery:endpoints', (request, response) => {
  console.log(request.url);
  console.log(request.method);
  console.log(request.body);
  response.send('Hello from Express!');
});

app.listen(PORT, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`server is listening on ${PORT}`);
});


// app.use(bodyParser.json());

// const http = require('http');
// const port = 3000;
//
// const requestHandler = (request, response) => {
//   console.log(request.url);
//   console.log(request.method);
//   console.log(request.body);
//   response.end('Hello Node.js Server!');
// };
//
// const server = http.createServer(requestHandler);
//
// server.listen(port, (err) => {
//   if (err) {
//     return console.log('something bad happened', err);
//   }
//
//   console.log(`server is listening on ${port}`);
// });