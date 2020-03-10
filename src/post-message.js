'use strict';

let datastore;

async function postHandler(req, res, next) {
  const key = datastore.key('message');

  const entity = {
    key: key,
    data: {
      sender: req.body.sender || 'Unnamed',
      text: req.body.text || 'Empty message.',
      timestamp: new Date(),
    },
  };

  await datastore.save(entity);
  res.redirect('/');
}

function postMethodHandler(ds) {
  datastore = ds;
  return postHandler;
}

module.exports = {postMethodHandler};
