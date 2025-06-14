document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  if (window.argon2 && window.argon2.wasmURL === undefined) {
    window.argon2.wasmURL = 'docs/dist/argon2.wasm';
  }

  const init = () => {
    if (!window.argon2) {
      console.error('argon2 library still not loaded');
      return;
    }

    const { hash } = window.argon2;
    const ArgonTypeEnum = window.argon2.ArgonType || {
      Argon2d: 0,
      Argon2i: 1,
      Argon2id: 2
    };
    const goBtn = document.getElementById('go');
    const copyBtn = document.getElementById('copy');
    const outField = document.getElementById('out');

  goBtn.addEventListener('click', async () => {
    const pass = document.getElementById('pass').value;
    let salt = document.getElementById('salt').value.trim();
    if (!salt) {
      const rand = new Uint8Array(16);
      crypto.getRandomValues(rand);
      salt = Array.from(rand)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
    }

    const options = {
      pass,
      salt,
      time: Number(document.getElementById('time').value) || 1,
      mem: Number(document.getElementById('mem').value) || 8,
      parallelism: Number(document.getElementById('parallelism').value) || 1,
      type: ArgonTypeEnum[document.getElementById('type').value]
    };

    try {
      const res = await hash(options);
      outField.value = res.encoded;
    } catch (err) {
      outField.value = 'Error: ' + err.message;
    }
  });

    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(outField.value)
        .then(() => console.log('Copied to clipboard'))
        .catch(err => console.error('Copy failed', err));
    });
  };

  if (window.argon2) {
    init();
  } else {
    const script = document.createElement('script');
    script.src = '/docs/dist/argon2.js';
    script.onload = init;
    script.onerror = () => console.error('Failed to load argon2 library');
    document.head.appendChild(script);
  }
});
