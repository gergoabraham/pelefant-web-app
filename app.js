'use strict';

const express = require('express');

const app = express();
app.get('/', myApp);

const messages = [
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

function myApp(req, res) {
  const textMessages = messages.map((message) => `<p><b>${message.sender} at ${message.time}:</b></p><p>${message.text}</p>`);

  res.status(200).send(
      `<h1>Ez itt a <b>Pelefánt</b>! <3 : )</h1>
      <p> Üzenj valamit :3</p>
      <p>Küldi:</p>
      <input type="radio" id="elefant" name="sender" value="elefant">
      <label for="elefant">Elefánt</label><br>
      <input type="radio" id="pele" name="sender" value="pele">
      <label for="pele">Pele</label><br>
      <input type="text"><button type="button">Küldés</button>
      ${textMessages}`,
  );
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
