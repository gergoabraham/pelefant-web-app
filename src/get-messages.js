'use strict';

let datastore;

async function getHandler(req, res, next) {
  const query = datastore.createQuery('message').order('timestamp', {descending: true});
  const queryResult = await datastore.runQuery(query);
  const messages = queryResult[0];

  res.status(200).render('index', {messages: messages});
}

function getMethodHandler(ds) {
  datastore = ds;
  return getHandler;
}

module.exports = {getMethodHandler};
