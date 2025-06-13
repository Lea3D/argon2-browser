/* generator.js */
// Verwende globales argon2 aus UMD-Bundler
const { hash, ArgonType } = window.argon2;

document.addEventListener('DOMContentLoaded', () => {
  const go = document.getElementById('go');
  const copyBtn = document.getElementById('copy');

  go.addEventListener('click', async () => {
    const pass = document.getElementById('pass').value;
    let salt = document.getElementById('salt').value.trim();
    if (!salt) {
      const rand = new Uint8Array(16);
      crypto.getRandomValues(rand);
      salt = Array.from(rand).map(b => b.toString(16).padStart(2, '0')).join('');
    }
    const typeMap = {
      Argon2d: ArgonType.Argon2d,
      Argon2i: ArgonType.Argon2i,
      Argon2id: ArgonType.Argon2id
    };
    const options = { pass, salt,
      time: +document.getElementById('time').value,
      mem: +document.getElementById('mem').value,
      parallelism: +document.getElementById('parallelism').value,
      type: typeMap[document.getElementById('type').value]
    };
    try {
      const res = await hash(options);
      document.getElementById('out').value = res.encoded;
    } catch (err) {
      document.getElementById('out').value = 'Error: ' + err.message;
    }
  });

  copyBtn.addEventListener('click', () => {
    const o = document.getElementById('out'); o.select(); document.execCommand('copy');
  });
});