'use strict';

const logo = document.querySelector('.logo');

const promise1 = new Promise((resolve, reject) => {
  logo.addEventListener('click', (e) => {
    if (e.button === 0) {
      clearTimeout();
      resolve(e);
    }
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const promise2 = new Promise((resolve) => {
  logo.addEventListener('click', (c) => {
    resolve(c);
  });

  logo.addEventListener('contextmenu', (c) => {
    c.preventDefault();
    resolve(c);
  });
});

const promise3 = new Promise((resolve, reject) => {
  logo.addEventListener('click', () => {
    logo.addEventListener('contextmenu', (b) => {
      b.preventDefault();
      resolve(b);
    });
  });

  logo.addEventListener('contextmenu', () => {
    logo.addEventListener('click', (d) => {
      d.preventDefault();
      resolve(d);
    });
  });
});

promise1
  .then(() => notification('First promise was resolved'))

  .catch(() => notification('First promise was rejected'), 'error');

promise2.then(() => notification('Second promise was resolved'));

promise3.then(() => notification('Third promise was resolved'));

function notification(message, type = 'success') {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add(type);
  div.textContent = message;
  document.body.appendChild(div);
}
