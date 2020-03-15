'use strict';

const express = require('express');
const {Datastore} = require('@google-cloud/datastore');
const {getMessagesHandler} = require('./src/get-messages');
const {postMethodHandler} = require('./src/post-message');

const datastore = new Datastore();

const app = express();
app.use(express.json());
app.get('/messages', getMessagesHandler(datastore));
app.post('/send', postMethodHandler(datastore));
app.use(express.static('public'));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
