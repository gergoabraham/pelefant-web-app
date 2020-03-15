'use strict';

const express = require('express');
const {Datastore} = require('@google-cloud/datastore');
const {getMessagesHandler} = require('./get-messages');
const {postMethodHandler} = require('./post-message');

const datastore = new Datastore();
const kind = process.env.KIND || 'message';

const app = express();
app.use(express.json());
app.get('/messages', getMessagesHandler(datastore, kind));
app.post('/send', postMethodHandler(datastore, kind));
app.use(express.static('public'));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
