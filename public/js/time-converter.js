'use strict';

const localeOptions = {
  year: 'numeric',
  month: 'long',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  weekday: 'long',
};
const timeElements = document.getElementsByClassName('time');

for (let i = 0; i < timeElements.length; i++) {
  const timeStamp = Number(timeElements[i].innerHTML);
  timeElements[i].innerHTML = new Date(timeStamp).toLocaleString('hu-HU', localeOptions);
}
