// generator.js
// Nutzt globales window.argon2 aus dem UMD-Bundle

(function() {
  'use strict';

  const initGenerator = () => {
    if (!window.argon2) {
      console.error('argon2 library not loaded');
      return;
    }
    const { hash, ArgonType } = window.argon2;

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
        type: ArgonType[document.getElementById('type').value]
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

  const loadArgon2 = () => {
    if (window.argon2) {
      initGenerator();
    } else {
      const script = document.createElement('script');
      script.src = 'docs/dist/argon2.js';
      script.onload = initGenerator;
      document.head.appendChild(script);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadArgon2);
  } else {
    loadArgon2();
  }
})();
