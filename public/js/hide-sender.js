'use strict';

let previousPageYOffset = 0;
let isHidden = false;

function hideSenderOnDownScroll() {
  const sender = document.getElementById('sender');

  if (!isHidden && previousPageYOffset < window.pageYOffset) {
    isHidden = true;
    sender.setAttribute('style', 'opacity:0');
    setTimeout(() => {
      if (isHidden) {
        sender.setAttribute('style', 'opacity:0; visibility:hidden');
      }
    }, 300);
  }

  if (isHidden && previousPageYOffset > window.pageYOffset) {
    isHidden = false;
    sender.setAttribute('style', 'opacity:1');
  }

  previousPageYOffset = window.pageYOffset;
}

window.addEventListener('scroll', hideSenderOnDownScroll);
