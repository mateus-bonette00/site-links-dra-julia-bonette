// Mensagem padrão caso o card não tenha data-msg
const DEFAULT_MSG = "Olá! Vim pelo site.";

// Limpa qualquer coisa que não seja dígito (aceita +, (), espaços, hífens)
const onlyDigits = (s) => (s || "").toString().replace(/\D/g, "");

// Monta URL do WhatsApp
function buildWaUrl(number, msg){
  const phone = onlyDigits(number);
  const text  = encodeURIComponent(msg || DEFAULT_MSG);
  return `https://wa.me/${phone}?text=${text}`;
}

// Aplica número e mensagem por CARD
function applyWhatsToCards(){
  document.querySelectorAll(".link-card").forEach(card => {
    const num = card.dataset.wa;               // obrigatório por card
    const msg = card.dataset.msg || DEFAULT_MSG;
    if(!num) return; // se esquecer de colocar, não muda o href

    card.setAttribute("href", buildWaUrl(num, msg));
    card.setAttribute("target", "_blank");
    card.setAttribute("rel", "noopener");
  });
}

// Ripple no mobile (mantém igual)
function enableMobileRipple(){
  const isTouch = matchMedia("(hover: none)").matches;
  if(!isTouch) return;
  document.querySelectorAll('.link-card').forEach(card=>{
    card.addEventListener('touchstart', (e)=>{
      const touch = e.touches[0];
      const rect = card.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      const span = document.createElement('span');
      span.className = 'ripple';
      const size = Math.max(rect.width, rect.height) * 0.35;
      span.style.width = span.style.height = size + 'px';
      span.style.left = (x - size/2) + 'px';
      span.style.top  = (y - size/2) + 'px';
      card.appendChild(span);
      setTimeout(()=> span.remove(), 650);
    }, {passive:true});
  });
}

// Ano no rodapé
function setYear(){
  const y = document.getElementById('y');
  if (y) y.textContent = new Date().getFullYear();
}

window.addEventListener('load', ()=>{
  setYear();
  applyWhatsToCards();
  enableMobileRipple();
});
