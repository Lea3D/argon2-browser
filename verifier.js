if (window.argon2 && window.argon2.wasmURL === undefined) {
  window.argon2.wasmURL = '/docs/dist/argon2.wasm';
}

document.addEventListener('DOMContentLoaded', () => {
  const verifyBtn = document.getElementById('verify');
  const resultEl = document.getElementById('verify-result');

  verifyBtn.addEventListener('click', async () => {
    const plain = document.getElementById('verify-pass').value;
    const encoded = document.getElementById('verify-hash').value;
    try {
      // verify gibt Promise<undefined> bei Erfolg, wir behandeln nur Fehlerfall
      await window.argon2.verify({ pass: plain, encoded });
      resultEl.textContent = '✅ Hash stimmt überein.';
      resultEl.style.color = 'var(--success)';
    } catch (err) {
      resultEl.textContent = '❌ Hash stimmt nicht überein.';
      resultEl.style.color = 'var(--error)';
    }
  });
});
