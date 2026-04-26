const i18n = (() => {
  let lang = localStorage.getItem('lang') || 'en';

  function t(key) {
    return translations[lang]?.[key] || translations.en[key] || key;
  }

  function apply() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      el.textContent = t(key);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      el.placeholder = t(el.dataset.i18nPlaceholder);
    });
    const btn = document.getElementById('lang-toggle');
    if (btn) btn.textContent = t('nav.lang');
  }

  function toggle() {
    lang = lang === 'en' ? 'sv' : 'en';
    localStorage.setItem('lang', lang);
    apply();
    document.dispatchEvent(new CustomEvent('langchange', { detail: lang }));
  }

  function current() { return lang; }

  document.getElementById('lang-toggle')?.addEventListener('click', toggle);
  document.addEventListener('DOMContentLoaded', apply);

  return { t, apply, toggle, current };
})();
