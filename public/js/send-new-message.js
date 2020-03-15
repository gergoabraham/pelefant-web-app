'use strict';

/* global loadMessages */

async function sendNewMessage(param) {
  const button = param.target.form['send-button'];
  button.classList.add('disabled-button');
  button.removeEventListener('onclick', sendNewMessage);

  const form = param.target.form;
  let isOkay = true;

  if (!form['sender'].value) {
    const radioButtons = document.getElementById('radio-group');
    radioButtons.classList.add('shake');
    radioButtons.addEventListener('animationend', stopWarning);
    isOkay = false;
  }
  if (!form['text-input'].value) {
    form['text-input'].classList.add('shake');
    form['text-input'].addEventListener('animationend', stopWarning);
    isOkay = false;
  }
  if (isOkay) {
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

    form['text-input'].value = '';
  }

  button.addEventListener('onclick', sendNewMessage);
  button.classList.remove('disabled-button');
}

function stopWarning(event) {
  event.target.classList.remove('shake');
}
