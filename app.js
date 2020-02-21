'use strict';

const express = require('express');

const app = express();
app.get('/', myApp);

function myApp(req, res) {
  res.status(200).send(
      `Ez itt a <b>Pelefánt</b>! <3`,
  );
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

module.exports = app;
