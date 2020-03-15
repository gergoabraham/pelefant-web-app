'use strict';

/* global loadMessages */

async function sendNewMessage(param) {
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
  if (!isOkay) {
    return;
  }

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

function stopWarning(event) {
  event.target.classList.remove('shake');
}
