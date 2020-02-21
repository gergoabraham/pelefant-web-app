'use strict';

const http = require('http');
const express = require('express');
const myApp = require('./app');

const port = process.env.MY_APP_PORT || 3333;

const app = express();
app.use('/', myApp);

const server = http.createServer(app);
server.listen(port);
