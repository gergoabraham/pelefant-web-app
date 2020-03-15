'use strict';

const localeOptions = {
  year: 'numeric',
  month: 'long',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
};

async function loadMessages() {
  const messagesDiv = document.getElementById('messages');

  const fetchedMessages = await fetchNewMessages();
  insertNewMessages(fetchedMessages, messagesDiv);

  updateMessageCount(fetchedMessages);
}

async function fetchNewMessages() {
  const res = await fetch('messages');
  const fetchedMessages = await res.json();

  return fetchedMessages;
}

function insertNewMessages(fetchedMessages, messagesDiv) {
  const parser = new DOMParser();
  const latestMessage = messagesDiv.children[1];

  if (latestMessage) {
    addNewMessages(latestMessage, fetchedMessages, parser);
  } else {
    fillWithMessages(fetchedMessages, parser, messagesDiv);
  }
}

function addNewMessages(latestMessage, fetchedMessages, parser) {
  const latestMessageTime = new Date(latestMessage.getAttribute('time'));
  let i = 0;
  let newMessageTime = new Date(fetchedMessages[i].timestamp);

  while (newMessageTime > latestMessageTime) {
    const messageElement = createMessageElement(fetchedMessages[i], parser);
    latestMessage.before(messageElement);

    i++;
    newMessageTime = new Date(fetchedMessages[i].timestamp);
  }
}

function fillWithMessages(fetchedMessages, parser, messagesDiv) {
  fetchedMessages.forEach((fetchedMessage) => {
    const messageElement = createMessageElement(fetchedMessage, parser);
    messagesDiv.appendChild(messageElement);
  });
}

function createMessageElement(fetchedMessage, parser) {
  const {sender, timestamp, text} = fetchedMessage;

  const innerHTML =
        `<div class="message card inflatable pressable" time=${timestamp}>
            <img class="message-sender" src="images/${sender.toLowerCase().replace(/á/g, 'a')}.svg">
            <div class="message-body">
                <div class="message-timestamp visible-on-hover">${new Date(timestamp).toLocaleString('hu-HU', localeOptions)}</div>
                <div class="message-text">${text}</div>
            </div>
        </div>`;

  const messageElement = parser.parseFromString(innerHTML, 'text/html');
  return messageElement.body.children[0];
}

function updateMessageCount(fetchedMessages) {
  const messageCountElement = document.getElementById('message-count-value');
  messageCountElement.innerHTML = `${fetchedMessages.length}`;
}

document.body.onload = loadMessages;


