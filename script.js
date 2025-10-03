// Ano no rodapé (se existir)
const yEl = document.getElementById("y");
if (yEl) yEl.textContent = new Date().getFullYear();

// Interação dos cards: glow segue o cursor/toque e ativa no touch
document.querySelectorAll('.link-card').forEach(card => {
  // Glow segue o cursor
  card.addEventListener('pointermove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mx', `${x}px`);
    card.style.setProperty('--my', `${y}px`);
  });

  // Estado de toque (mobile)
  card.addEventListener('pointerdown', () => card.classList.add('is-touch'));
  ['pointerup','pointercancel','pointerleave'].forEach(ev =>
    card.addEventListener(ev, () => card.classList.remove('is-touch'))
  );

  // Clique no card inteiro abre o WhatsApp (sem duplicar quando clica no botão)
  card.addEventListener('click', (e) => {
    if (e.target.closest('a')) return; // deixa o <a> fazer o trabalho dele
    const url = card.dataset.link;
    if (url) window.open(url, '_blank', 'noopener');
  });

  // Acessibilidade: Enter/Espaço abrem o link
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const url = card.dataset.link;
      if (url) window.open(url, '_blank', 'noopener');
    }
  });
});
