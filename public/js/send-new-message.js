'use strict';

/* global loadMessages */

async function sendNewMessage(param) {
  const form = param.target.form;
  const body = {
    sender: form['sender'].value,
    text: form['text-input'].value,
  };

  const response = await fetch('/send', {
    method: 'POST',
    headers: {'Content-Type': 'application/json;charset=utf-8'},
    body: JSON.stringify(body),
  });

  if (response.ok) {
    loadMessages();
  }
}
