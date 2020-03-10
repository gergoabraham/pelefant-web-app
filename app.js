'use strict';

const express = require('express');
const {Datastore} = require('@google-cloud/datastore');
const {getMethodHandler} = require('./src/get-messages');
const {postMethodHandler} = require('./src/post-message');

const datastore = new Datastore();

const app = express();
app.set('view engine', 'pug');
app.use(express.urlencoded({extended: true}));

app.get('/', getMethodHandler(datastore));
app.post('/send', postMethodHandler(datastore));
app.use(express.static('public'));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
