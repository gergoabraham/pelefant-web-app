'use strict';

let datastore;

function getMessagesHandler(ds) {
  datastore = ds;
  return getHandler;
}

async function getHandler(req, res, next) {
  const messages = await getMessagesFromDB();
  res.status(200).json(messages);
}

async function getMessagesFromDB() {
  const query = datastore.createQuery('message').order('timestamp', {descending: true});
  const queryResult = await datastore.runQuery(query);
  const messages = queryResult[0];
  return messages;
}

module.exports = {getMessagesHandler};
