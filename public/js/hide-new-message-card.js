'use strict';

let previousPageYOffset = 0;
let isHidden = false;

function hideNewMessageOnDownScroll() {
  const newMessageDiv = document.getElementById('new-message-container');

  if (!isHidden && previousPageYOffset < window.pageYOffset) {
    isHidden = true;
    newMessageDiv.setAttribute('style', 'opacity:0');
    setTimeout(() => {
      if (isHidden) {
        newMessageDiv.setAttribute('style', 'opacity:0; visibility:hidden');
      }
    }, 300);
  }

  if (isHidden && previousPageYOffset > window.pageYOffset) {
    isHidden = false;
    newMessageDiv.setAttribute('style', 'opacity:1');
  }

  previousPageYOffset = window.pageYOffset;
}

window.addEventListener('scroll', hideNewMessageOnDownScroll);
