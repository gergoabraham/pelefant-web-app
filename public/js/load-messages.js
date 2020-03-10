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

  removeExistingMessages(messagesDiv);
  const fetchedMessages = await fetchNewMessages();
  insertNewMessages(fetchedMessages, messagesDiv);

  updateMessageCount(fetchedMessages);
}

function removeExistingMessages(messagesDiv) {
  while (messagesDiv.children[1]) {
    messagesDiv.children[1].remove();
  }
}

async function fetchNewMessages() {
  const res = await fetch('messages');
  const fetchedMessages = await res.json();

  return fetchedMessages;
}

function insertNewMessages(fetchedMessages, messagesDiv) {
  const parser = new DOMParser();

  fetchedMessages.forEach((fetchedMessage) => {
    const messageElement = createMessageElement(fetchedMessage, parser);
    messagesDiv.appendChild(messageElement);
  });
}

function createMessageElement(fetchedMessage, parser) {
  const {sender, timestamp, text} = fetchedMessage;

  const innerHTML =
        `<div class="message card inflatable pressable">
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
  const messageCountElement = document.getElementById('message-count');
  messageCountElement.innerHTML = `${fetchedMessages.length} db`;
}

document.body.onload = loadMessages;


