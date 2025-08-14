// ===== Loader / Stars / Rocket / Orbit / Scroll =====
const loader = document.getElementById('loader');
const topBg = document.getElementById('initial-bg-top');
const bottomBg = document.getElementById('initial-bg-bottom');
const starsContainer = document.getElementById('stars');
const loadingText = document.getElementById('loading-text');
const loadingCounter = document.getElementById('loading-counter');
const rocket = document.getElementById('rocket-cursor');

// Stars
const starCount = 150;
const stars = [];
function createStar() {
  const s = document.createElement('div');
  s.style.position = 'absolute';
  s.style.background = 'white';
  s.style.borderRadius = '50%';
  s.style.opacity = (Math.random() * 0.8 + 0.2).toFixed(2);
  const size = Math.random() * 2 + 1;
  s.style.width = size + 'px';
  s.style.height = size + 'px';
  s.style.top = Math.random() * 100 + '%';
  s.style.left = Math.random() * 100 + '%';
  s.style.filter = 'drop-shadow(0 0 4px white)';
  starsContainer.appendChild(s);
  return s;
}
for (let i = 0; i < starCount; i++) stars.push(createStar());
setInterval(() => {
  stars.forEach(star => { star.style.opacity = (0.2 + Math.random() * 0.8).toFixed(2); });
}, 1000);

// Loader
setTimeout(() => loader?.classList.add('expanded'), 500);
let count = 0;
const duration = 2000, intervalTime = 20, step = 100 / (duration / intervalTime);
const counterInterval = setInterval(() => {
  count += step;
  if (count >= 100) { count = 100; clearInterval(counterInterval); }
  if (loadingCounter) loadingCounter.textContent = Math.floor(count) + '%';
}, intervalTime);
setTimeout(() => {
  if (topBg && bottomBg) {
    topBg.style.clipPath = 'inset(0 0 100% 0)';
    bottomBg.style.clipPath = 'inset(100% 0 0 0)';
  }
  if (loader) loader.style.display = 'none';
  if (loadingText) loadingText.style.display = 'none';
  if (loadingCounter) loadingCounter.style.display = 'none';
  setTimeout(() => {
    if (topBg) topBg.style.display = 'none';
    if (bottomBg) bottomBg.style.display = 'none';
    document.body.style.overflow = 'auto';
    // 👇 MOSTRA O BOTÃO SÓ AGORA
    const btn = document.getElementById('toggle-game-btn');
    if (btn) btn.style.display = 'block';
  }, 1600);
}, 2000);

// texto máquina de escrever
document.addEventListener("DOMContentLoaded", function () {
  const text = "Bem-vindo ao meu universo!";
  const element = document.getElementById("typewriter");
  let index = 0;

  function type() {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
      setTimeout(type, 140); // velocidade da digitação
    } else {
      element.style.borderRight = "none"; // remove cursor no final
    }
  }

  type();
});

document.addEventListener('DOMContentLoaded', () => {
  const btnProjetos = document.querySelector('#btn-projetos') || document.querySelector('a[href="#projetos"]');
  const overlayProjetos = document.getElementById('overlay');
  const popupProjetos = document.getElementById('popup');
  const fecharProjetos = document.getElementById('fechar');

  if (!btnProjetos || !overlayProjetos || !popupProjetos || !fecharProjetos) {
    console.warn('[popup-dev] Elementos não encontrados:', { btnProjetos, overlayProjetos, popupProjetos, fecharProjetos });
    return;
  }

  const abrirPopup = (e) => {
    if (e) e.preventDefault();
    overlayProjetos.hidden = false;
    document.body.classList.add('no-scroll');
    popupProjetos.focus();
  };

  const fecharPopup = () => {
    overlayProjetos.hidden = true;
    document.body.classList.remove('no-scroll');
    btnProjetos.focus();
  };

  btnProjetos.addEventListener('click', abrirPopup);
  fecharProjetos.addEventListener('click', fecharPopup);

  overlayProjetos.addEventListener('click', (e) => {
    if (e.target === overlayProjetos) fecharPopup();
  });

  document.addEventListener('keydown', (e) => {
    if (!overlayProjetos.hidden && (e.key === 'Escape' || e.key === 'Esc')) {
      fecharPopup();
    }
  });
});


// Rocket cursor
let mouseX = innerWidth / 2, mouseY = innerHeight / 2, rocketX = mouseX, rocketY = mouseY;
addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });
(function animateRocket() {
  if (rocket) {
    rocketX += (mouseX - rocketX) * 0.15;
    rocketY += (mouseY - rocketY) * 0.15;
    rocket.style.left = (rocketX - 20) + 'px';
    rocket.style.top = (rocketY - 20) + 'px';
    const dx = mouseX - rocketX, dy = mouseY - rocketY;
    const angle = Math.atan2(dy, dx) * 180 / Math.PI + 90;
    rocket.style.transform = `rotate(${angle}deg)`;
  }
  requestAnimationFrame(animateRocket);
})();

// Orbit
const orbitContainer = document.querySelector('.orbit-container');
const orbitingMoon = document.querySelector('.orbiting-moon');
let start = null; const orbitDuration = 6000;
function orbit(ts) {
  if (!start) start = ts;
  const elapsed = (ts - start) % orbitDuration;
  const angle = (elapsed / orbitDuration) * 360;
  if (orbitContainer) {
    orbitContainer.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
  }
  if (orbitingMoon) {
    if (angle > 90 && angle < 270) {
      orbitingMoon.style.opacity = '0.3';
      orbitingMoon.style.transform = 'translate(90px, -50%) scale(0.7)';
      orbitingMoon.style.filter = 'blur(1px)';
      orbitingMoon.style.zIndex = '0';
    } else {
      orbitingMoon.style.opacity = '1';
      orbitingMoon.style.transform = 'translate(90px, -50%) scale(1)';
      orbitingMoon.style.filter = 'none';
      orbitingMoon.style.zIndex = '2';
    }
  }
  requestAnimationFrame(orbit);
}
requestAnimationFrame(orbit);

// Smooth scroll
document.querySelector('#hero a')?.addEventListener('click', e => {
  e.preventDefault();
  document.querySelector('#projetos')?.scrollIntoView({ behavior: 'smooth' });
});
document.getElementById('scroll-down')?.addEventListener('click', e => {
  e.preventDefault();
  const next = document.querySelector('#about');
  if (next) next.scrollIntoView({ behavior: 'smooth' });
});

// ===== Skills - Lightbox estilo TCG =====
const cards = Array.from(document.querySelectorAll('.skill-card'));

// Overlay
const overlay = document.createElement('div');
overlay.id = 'lightbox-overlay';
document.body.appendChild(overlay);

// Só o botão de fechar (X)
function makeButton(id, svg) {
  const b = document.createElement('button');
  b.id = id;
  b.className = 'lightbox-btn';
  b.innerHTML = svg;
  b.type = 'button';
  b.setAttribute('aria-label', id.replace('lightbox-', ''));
  b.style.display = 'none';
  document.body.appendChild(b);
  return b;
}
const iconClose = `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
const btnClose = makeButton('lightbox-close', iconClose);

// === Velocidade do movimento/rotação (lenta) ===
const TRANSITION_MS = 1000;

// === Tamanhos do card expandido (dinâmicos) ===
function getExpandedSize() {
  const w = Math.min(340, Math.floor(window.innerWidth * 0.9));
  const h = Math.min(420, Math.floor(window.innerHeight * 0.85));
  return { w, h };
}

let active = null; // { card, clone, index, prevOverflow }

// garante que o clone nunca venha oculto
const styleGuard = document.createElement('style');
styleGuard.textContent = `
  .skill-card-clone{ visibility: visible !important; }
`;
document.head.appendChild(styleGuard);

function makeCloneFrom(card) {
  const clone = card.cloneNode(true);
  clone.classList.remove('skill-card');
  clone.classList.add('skill-card-clone');

  Object.assign(clone.style, {
    visibility: 'visible',
    opacity: '1',
    background: 'transparent',
    boxShadow: 'none',
    position: 'absolute',
    zIndex: 100000,
    margin: 0,
    transitionProperty: 'left, top, width, height',
    transitionDuration: `${TRANSITION_MS}ms`,
    transitionTimingFunction: 'ease-in-out',
    perspective: '1200px'
  });

  const faces = clone.querySelectorAll('.skill-card-face, .skill-front, .skill-back');
  faces.forEach(f => { f.style.backfaceVisibility = 'hidden'; });

  const front = clone.querySelector('.skill-front');
  if (front) { front.style.background = '#0f0f17'; front.style.color = '#fff'; }

  const back = clone.querySelector('.skill-back');
  if (back) { back.style.background = 'linear-gradient(135deg, #B026FF, #8B1DBF, #D366FF)'; back.style.color = '#fff'; }

  const inner = clone.querySelector('.skill-card-inner');
  if (inner) {
    inner.style.transformStyle = 'preserve-3d';
    inner.style.transition = `transform ${TRANSITION_MS}ms ease-in-out`;
    inner.style.transform = 'rotateY(0deg)';
  }
  return clone;
}

function getCenterCoords(width, height) {
  const sx = window.scrollX || document.documentElement.scrollLeft;
  const sy = window.scrollY || document.documentElement.scrollTop;
  const w = width ?? Math.min(340, Math.floor(window.innerWidth * 0.9));
  const h = height ?? Math.min(420, Math.floor(window.innerHeight * 0.85));
  const left = Math.round((window.innerWidth - w) / 2 + sx);
  const top = Math.round((window.innerHeight - h) / 2 + sy);
  return { left, top, w, h };
}

function openCard(card) {
  if (active) closeCard(true);

  const rect = card.getBoundingClientRect();
  const sx = window.scrollX || document.documentElement.scrollLeft;
  const sy = window.scrollY || document.documentElement.scrollTop;

  card.style.visibility = 'hidden';
  card.setAttribute('aria-pressed', 'true');

  const clone = makeCloneFrom(card);
  Object.assign(clone.style, {
    left: (rect.left + sx) + 'px',
    top: (rect.top + sy) + 'px',
    width: rect.width + 'px',
    height: rect.height + 'px'
  });
  document.body.appendChild(clone);

  overlay.classList.add('active');
  btnClose.style.display = 'flex';

  const prevOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';

  const { w, h } = getExpandedSize();
  const { left, top } = getCenterCoords(w, h);
  const inner = clone.querySelector('.skill-card-inner');

  requestAnimationFrame(() => {
    Object.assign(clone.style, {
      left: left + 'px',
      top: top + 'px',
      width: w + 'px',
      height: h + 'px'
    });
    if (inner) inner.style.transform = 'rotateY(540deg)';
  });

  clone.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!inner) return;
    const flipped = inner.style.transform.includes('180deg');
    inner.style.transform = flipped ? 'rotateY(0deg)' : 'rotateY(180deg)';
  });

  active = { card, clone, index: Number(card.dataset.index || cards.indexOf(card)), prevOverflow };
}

function closeCard(immediate = false) {
  if (!active) return;
  const { card, clone, prevOverflow } = active;

  overlay.classList.remove('active');
  btnClose.style.display = 'none';

  const rect = card.getBoundingClientRect();
  const sx = window.scrollX || document.documentElement.scrollLeft;
  const sy = window.scrollY || document.documentElement.scrollTop;

  const inner = clone.querySelector('.skill-card-inner');
  if (inner) inner.style.transform = 'rotateY(0deg)';

  Object.assign(clone.style, {
    left: (rect.left + sx) + 'px',
    top: (rect.top + sy) + 'px',
    width: rect.width + 'px',
    height: rect.height + 'px'
  });

  const cleanup = () => {
    clone.remove();
    card.style.visibility = '';
    card.setAttribute('aria-pressed', 'false');
    document.body.style.overflow = prevOverflow || 'auto';
    active = null;
  };

  if (immediate) {
    cleanup();
  } else {
    const onEnd = (e) => {
      if (['left', 'top', 'width', 'height', 'transform'].includes(e.propertyName)) {
        clone.removeEventListener('transitionend', onEnd);
        cleanup();
      }
    };
    clone.addEventListener('transitionend', onEnd);
  }
}

// Reposiciona no centro quando redimensionar
addEventListener('resize', () => {
  if (!active) return;
  const { w, h } = getExpandedSize();
  const { left, top } = getCenterCoords(w, h);
  Object.assign(active.clone.style, {
    left: left + 'px',
    top: top + 'px',
    width: w + 'px',
    height: h + 'px'
  });
});

// Overlay / X / teclado
overlay.addEventListener('click', () => closeCard());
btnClose.addEventListener('click', () => closeCard());
document.addEventListener('keydown', (e) => { if (active && e.key === 'Escape') closeCard(); });

// Click/Enter nos cards
cards.forEach((card, idx) => {
  card.dataset.index = idx;
  const open = () => openCard(card);
  card.addEventListener('click', open);
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
  });
});

/* === (Opcional) Loop perfeito do marquee ===
   Se você decidir NÃO duplicar manualmente a sequência no HTML,
   descomente o bloco abaixo */
(() => {
  const track = document.querySelector('.logo-track');
  if (!track) return;
  const items = Array.from(track.children);
  items.forEach(el => track.appendChild(el.cloneNode(true)));
})();


// Mostrar/esconder botão conforme a rolagem
window.addEventListener("scroll", () => {
  const btn = document.getElementById("back-to-top");
  if (window.scrollY > 300) {
    btn.style.display = "flex";
  } else {
    btn.style.display = "none";
  }
});

// Rolagem suave até o topo
document.getElementById("back-to-top").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// (substitui o seu DOMContentLoaded atual)
document.addEventListener("DOMContentLoaded", () => {
  // Renderiza os ícones Lucide
  if (window.lucide && lucide.createIcons) {
    lucide.createIcons();
  }

  // Liga os botões de copiar (idempotente)
  document.querySelectorAll('.copy-btn').forEach(btn => {
    if (btn.dataset.copyWired === '1') return; // evita listeners duplicados
    btn.dataset.copyWired = '1';

    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-copy');
      if (!text) return;

      // Clipboard API (requer https ou localhost)
      navigator.clipboard.writeText(text).then(() => {
        // feedback visual: troca para check e volta para copy
        btn.innerHTML = '<i data-lucide="check"></i>';
        if (window.lucide && lucide.createIcons) lucide.createIcons();

        setTimeout(() => {
          btn.innerHTML = '<i data-lucide="copy"></i>';
          if (window.lucide && lucide.createIcons) lucide.createIcons();
        }, 1400);
      }).catch(() => {
        // fallback bem simples
        alert('Não foi possível copiar automaticamente. Copie manualmente, por favor.');
      });
    });
  });
});



// API Formspree
const FORMSPREE_URL = "https://formspree.io/f/mdkdbaya";

const form = document.getElementById("email-form");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const souLegal = document.getElementById("sou-legal");
const feedback = document.getElementById("form-feedback");

// ===== Validações personalizadas =====
function validateNome() {
  let msg = "";
  if (nome.validity.valueMissing) msg = "O nome é obrigatório.";
  nome.setCustomValidity(msg);
  return nome.checkValidity();
}

function validateEmail() {
  let msg = "";
  if (email.validity.valueMissing) {
    msg = "O e-mail é obrigatório.";
  } else if (email.validity.typeMismatch) {
    msg = "Digite um e-mail válido (ex.: seuemail@dominio.com).";
  }
  email.setCustomValidity(msg);
  return email.checkValidity();
}

// Limpa mensagens enquanto digita
[nome, email].forEach((field) => {
  field.addEventListener("input", () => {
    field.setCustomValidity("");
    feedback.textContent = "";
  });
});

// ===== Envio com validação custom + Formspree =====
form.addEventListener("submit", async function (e) {
  e.preventDefault();

  // Honeypot anti-bot
  const honeypot = form.querySelector('input[name="_gotcha"]');
  if (honeypot && honeypot.value) return;

  // Validação
  const nomeOk = validateNome();
  const emailOk = validateEmail();

  if (!nomeOk || !emailOk || !form.checkValidity()) {
    feedback.textContent = nome.validationMessage || email.validationMessage || "Preencha os campos obrigatórios.";
    feedback.style.color = "#ff1744";
    (!nomeOk ? nome : email).reportValidity();
    (!nomeOk ? nome : email).focus();
    return;
  }

  // Monta os dados e garante o envio do checkbox como "sim"/"nao"
  const formData = new FormData(form);
  formData.set("sou_legal", souLegal && souLegal.checked ? "sim" : "nao");

  try {
    const response = await fetch(FORMSPREE_URL, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" }
    });

    if (response.ok) {
      feedback.textContent = "Mensagem enviada com sucesso!";
      feedback.style.color = "#00c853";
      form.reset(); // limpa tudo, inclusive o checkbox
    } else {
      feedback.textContent = "Erro ao enviar a mensagem.";
      feedback.style.color = "#ff1744";
    }
  } catch (error) {
    feedback.textContent = "Erro de conexão.";
    feedback.style.color = "#ff1744";
  }
});


// ======= CONFIG =======
const ENEMY_COUNT = 25;
const HIT_RADIUS = 28;
const SAFE_RADIUS = 120;
const RESPAWN_DELAY = 300;
const EDGE_PAD = 32;

// ======= STATE/UI =======
const enemies = new Set();
const timers = new Set(); // guarda setTimeouts pra limpar no stop
let destroyedCount = 0;
let isRunning = false;
let rafId = null;

let enemyCounter = document.getElementById('enemy-counter');
if (!enemyCounter) {
  enemyCounter = document.createElement('div');
  enemyCounter.id = 'enemy-counter';
  enemyCounter.style.display = 'none'; // começa oculto
  document.body.appendChild(enemyCounter);
}
function showCounter(show) { enemyCounter.style.display = show ? '' : 'none'; }

const toggleBtn = document.getElementById('toggle-game-btn');

// ======= DIMENSÕES =======
// largura = viewport; altura = página toda
function getPageSize() {
  const w = document.documentElement.clientWidth;
  const h = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight, innerHeight);
  return { w, h };
}
let { w: PAGE_W, h: PAGE_H } = getPageSize();

function onResize() {
  ({ w: PAGE_W, h: PAGE_H } = getPageSize());
  // Reencaixa inimigos pra evitar overflow horizontal
  enemies.forEach(el => {
    const x = parseFloat(el.style.left) || 0;
    const y = parseFloat(el.style.top) || 0;
    const clampedX = Math.min(PAGE_W - EDGE_PAD, Math.max(EDGE_PAD, x));
    const clampedY = Math.min(PAGE_H - EDGE_PAD, Math.max(EDGE_PAD, y));
    if (clampedX !== x) el.style.left = clampedX + 'px';
    if (clampedY !== y) el.style.top = clampedY + 'px';
  });
}

// ======= HELPERS =======
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const dist = (ax, ay, bx, by) => Math.hypot(ax - bx, ay - by);

function randomSpawnPoint() {
  const x = clamp(EDGE_PAD + Math.random() * (PAGE_W - EDGE_PAD * 2), EDGE_PAD, PAGE_W - EDGE_PAD);
  const y = clamp(EDGE_PAD + Math.random() * (PAGE_H - EDGE_PAD * 2), EDGE_PAD, PAGE_H - EDGE_PAD);
  return { x, y };
}

function spawnFarFromRocket() {
  for (let i = 0; i < 12; i++) {
    const p = randomSpawnPoint();
    const d = dist(p.x - scrollX, p.y - scrollY, rocketX, rocketY); // usa teu rocketX/rocketY
    if (d >= SAFE_RADIUS) return p;
  }
  return randomSpawnPoint();
}

// ======= INIMIGOS =======
function makeEnemy() {
  if (!isRunning) return null; // não cria se o jogo estiver parado
  const el = document.createElement('div');
  el.className = 'enemy ' + (Math.random() < .5 ? 'float1' : 'float2');
  const { x, y } = spawnFarFromRocket();
  el.style.left = x + 'px';
  el.style.top = y + 'px';
  el.dataset.alive = '1';
  el.setAttribute('role', 'img');
  el.setAttribute('aria-label', 'Inimigo estourável');
  document.body.appendChild(el);
  enemies.add(el);
  return el;
}

function spawnUntil(count) {
  while (isRunning && enemies.size < count) makeEnemy();
}

function updateEnemyCounter() {
  enemyCounter.textContent = `Inimigos destruídos: ${destroyedCount}`;
}

function popEnemy(el) {
  if (!isRunning || !el || el.dataset.alive !== '1') return;
  el.dataset.alive = '0';
  el.classList.add('pop');

  destroyedCount++;
  updateEnemyCounter();

  const t1 = setTimeout(() => {
    if (el.parentNode) el.parentNode.removeChild(el);
    enemies.delete(el);
    // respawn só se ainda estiver rodando
    const t2 = setTimeout(() => { if (isRunning) makeEnemy(); }, RESPAWN_DELAY);
    timers.add(t2);
    // remove timeout da lista quando executa
  }, 180);
  timers.add(t1);
}

// ======= COLISÃO LOOP =======
function collisionLoop() {
  if (!isRunning) return; // para o loop
  enemies.forEach(el => {
    if (el.dataset.alive !== '1') return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    if (dist(rocketX, rocketY, cx, cy) <= HIT_RADIUS) {
      popEnemy(el);
    }
  });
  rafId = requestAnimationFrame(collisionLoop);
}

// ======= CONTROLES =======
function startGame() {
  if (isRunning) return;
  isRunning = true;
  destroyedCount = 0;
  updateEnemyCounter();
  showCounter(true);

  ({ w: PAGE_W, h: PAGE_H } = getPageSize());
  window.addEventListener('resize', onResize, { passive: true });

  spawnUntil(ENEMY_COUNT);
  // clampa logo após spawn inicial (garantia extra)
  onResize();

  rafId = requestAnimationFrame(collisionLoop);
  if (toggleBtn) toggleBtn.textContent = 'Parar jogo';
}

function clearAllTimers() {
  timers.forEach(id => clearTimeout(id));
  timers.clear();
}

function stopGame() {
  if (!isRunning) return;
  isRunning = false;

  // para loop
  if (rafId) cancelAnimationFrame(rafId);
  rafId = null;

  // remove listeners
  window.removeEventListener('resize', onResize);

  // remove inimigos do DOM
  enemies.forEach(el => el.remove());
  enemies.clear();

  // limpa timeouts pendentes
  clearAllTimers();

  // esconde contador (mantém valor salvo)
  showCounter(false);

  if (toggleBtn) toggleBtn.textContent = 'Iniciar jogo';
}

if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    isRunning ? stopGame() : startGame();
  });
}

// opcional: começa desligado
stopGame();
