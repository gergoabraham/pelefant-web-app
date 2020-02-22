'use strict';

const express = require('express');

const app = express();
app.set('view engine', 'pug');
app.use(express.urlencoded({extended: true}));

app.get('/', getHandler);
app.post('/send', postHandler);

const messages = [
  {
    sender: 'Elefánt',
    time: '22:56',
    text: 'én is téged',
  },
  {
    sender: 'Pele',
    time: '22:42',
    text: 'Hogy vagy?',
  },
  {
    sender: 'Pele',
    time: '22:33',
    text: 'Szia, Babám!',
  },
];

function getHandler(req, res, next) {
  res.status(200).render('index', {messages: messages});
}

function postHandler(req, res, next) {
  console.log(req.body);
  res.redirect('/');
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
