'use strict';

let datastore;

async function postHandler(req, res) {
  const key = datastore.key('message');

  if (!req.body.sender || !req.body.text) {
    res.status(400).send();
    return;
  }

  const entity = {
    key: key,
    data: {
      sender: req.body.sender,
      text: req.body.text,
      timestamp: new Date(),
    },
  };

  await datastore.save(entity);

  res.status(200).send();
}

function postMethodHandler(ds) {
  datastore = ds;
  return postHandler;
}

module.exports = {postMethodHandler};
