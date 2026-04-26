/* ===== THEME TOGGLE ===== */
const themeToggle = document.getElementById('theme-toggle');
const saved = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', saved);
updateThemeIcon(saved);

themeToggle?.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  if (themeToggle) themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

/* ===== TYPED TEXT ===== */
const phrases = {
  en: ['CS Graduate', 'IT Specialist', 'Cybersecurity Enthusiast', 'Problem Solver'],
  sv: ['Dataingenjör', 'IT-specialist', 'Cybersäkerhetsintresserad', 'Problemlösare'],
};

let typedIndex = 0, charIndex = 0, deleting = false;
const typedEl = document.getElementById('typed-text');

function getPhrase() {
  const lang = typeof i18n !== 'undefined' ? i18n.current() : 'en';
  return phrases[lang]?.[typedIndex % phrases[lang].length] || '';
}

function type() {
  if (!typedEl) return;
  const phrase = getPhrase();

  if (!deleting) {
    typedEl.textContent = phrase.slice(0, ++charIndex);
    if (charIndex === phrase.length) { deleting = true; setTimeout(type, 1800); return; }
  } else {
    typedEl.textContent = phrase.slice(0, --charIndex);
    if (charIndex === 0) { deleting = false; typedIndex++; }
  }
  setTimeout(type, deleting ? 55 : 100);
}

document.addEventListener('DOMContentLoaded', () => setTimeout(type, 600));
document.addEventListener('langchange', () => { charIndex = 0; deleting = false; });

/* ===== DRAWER ===== */
const drawer  = document.getElementById('side-drawer');
const overlay = document.getElementById('drawer-overlay');

function openDrawer()  { drawer?.classList.add('open');  overlay?.classList.add('active'); }
function closeDrawer() { drawer?.classList.remove('open'); overlay?.classList.remove('active'); }

document.getElementById('open-drawer')?.addEventListener('click', openDrawer);
document.getElementById('close-drawer')?.addEventListener('click', closeDrawer);
overlay?.addEventListener('click', closeDrawer);

/* ===== SCROLL REVEAL ===== */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.project-card, #contact .section-container, #projects .section-container').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
});
