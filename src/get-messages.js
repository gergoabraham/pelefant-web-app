'use strict';

let datastore;
let kind;

function getMessagesHandler(ds, dsKind) {
  datastore = ds;
  kind = dsKind;
  return getHandler;
}

async function getHandler(req, res) {
  const messages = await getMessagesFromDB();
  res.status(200).json(messages);
}

async function getMessagesFromDB() {
  const query = datastore.createQuery(kind).order('timestamp', {descending: true});
  const queryResult = await datastore.runQuery(query);
  const messages = queryResult[0];
  return messages;
}

module.exports = {getMessagesHandler};
