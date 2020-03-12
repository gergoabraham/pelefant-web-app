'use strict';

let previousPageYOffset = 0;
let diff = 0;
let isHidden = false;

const limit = 50;

function hideNewMessageOnDownScroll() {
  const newMessageDiv = document.getElementById('new-message-container');

  diff += window.pageYOffset - previousPageYOffset;
  diff = Math.max(diff, -limit);
  diff = Math.min(diff, limit);

  if (!isHidden && previousPageYOffset < window.pageYOffset && diff == limit) {
    isHidden = true;
    diff = 0;
    newMessageDiv.setAttribute('style', 'opacity:0');
    setTimeout(() => {
      if (isHidden) {
        newMessageDiv.setAttribute('style', 'opacity:0; visibility:hidden');
      }
    }, 300);
  }

  if (isHidden && previousPageYOffset > window.pageYOffset && diff == -limit) {
    diff = 0;
    isHidden = false;
    newMessageDiv.setAttribute('style', 'opacity:1');
  }
  console.log(diff);

  previousPageYOffset = window.pageYOffset;
}

window.addEventListener('scroll', hideNewMessageOnDownScroll);
