"use strict";

var watching = document.getElementById('watching'),
    date = new Date(),
    minViewers = 900,
    maxViewers = 1100,
    btnBuy = document.getElementById('btnBuy');

function setViewers() {
  var numViewers = Math.random() * maxViewers,
      today = date.toLocaleDateString('pt-br');

  while (numViewers < minViewers) {
    numViewers = Math.random() * maxViewers;

    if (numViewers >= maxViewers) {
      return;
    }
  }

  numViewers = numViewers.toFixed('0');
  watching.innerHTML = "<p>".concat(numViewers, " pessoa").concat(numViewers > 1 ? 's' : '', " est").concat(numViewers > 1 ? 'ão' : 'á', " vendo essa p\xE1gina em ").concat(today, "</p>");
}

function showButton() {
  if (video.currentTime >= video.duration - 60) {
    btnBuy.classList.add('active');
  }
}

setViewers();
setInterval(setViewers, 1000);