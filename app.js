'use strict';

const express = require('express');
const {Datastore} = require('@google-cloud/datastore');

const datastore = new Datastore();

const app = express();
app.set('view engine', 'pug');
app.use(express.urlencoded({extended: true}));

app.get('/', getHandler);
app.post('/send', postHandler);

async function getHandler(req, res, next) {
  const query = datastore.createQuery('message').order('timestamp', {descending: true});
  const queryResult = await datastore.runQuery(query);
  const messages = queryResult[0];

  res.status(200).render('index', {messages: messages});
}

function postHandler(req, res, next) {
  res.redirect('/');
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
