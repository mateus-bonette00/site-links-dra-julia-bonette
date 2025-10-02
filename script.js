// Ano no rodapé (se quiser usar no futuro)
const yEl = document.getElementById("y");
if (yEl) yEl.textContent = new Date().getFullYear();
// Interação dos cards: glow segue o cursor/toque e ativa no touch
document.querySelectorAll('.link-card').forEach(card => {
  card.addEventListener('pointermove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mx', `${x}px`);
    card.style.setProperty('--my', `${y}px`);
  });

  card.addEventListener('pointerdown', () => card.classList.add('is-touch'));
  card.addEventListener('pointerup',   () => card.classList.remove('is-touch'));
  card.addEventListener('pointercancel', () => card.classList.remove('is-touch'));
  card.addEventListener('pointerleave',  () => card.classList.remove('is-touch'));
});
