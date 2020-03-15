'use strict';

let datastore;
let kind;

async function postHandler(req, res) {
  const key = datastore.key(kind);

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

function postMethodHandler(ds, dsKind) {
  datastore = ds;
  kind = dsKind;
  return postHandler;
}

module.exports = {postMethodHandler};
