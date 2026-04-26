document.getElementById('contact-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form   = e.target;
  const btn    = form.querySelector('button[type="submit"]');
  const lang   = typeof i18n !== 'undefined' ? i18n.current() : 'en';
  const ok     = translations[lang]?.['contact.success'] || 'Message sent!';
  const err    = translations[lang]?.['contact.error']   || 'Something went wrong.';

  btn.disabled = true;
  btn.textContent = '...';

  try {
    const res = await fetch('https://formspree.io/f/REPLACE_ME', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form),
    });

    if (res.ok) {
      form.reset();
      showFeedback(ok, true);
    } else {
      showFeedback(err, false);
    }
  } catch {
    showFeedback(err, false);
  } finally {
    btn.disabled = false;
    btn.textContent = translations[lang]?.['contact.send'] || 'Send Message';
  }
});

function showFeedback(msg, success) {
  let el = document.getElementById('form-feedback');
  if (!el) {
    el = document.createElement('p');
    el.id = 'form-feedback';
    el.style.cssText = 'margin-top:.75rem;font-size:.9rem;font-weight:500;';
    document.getElementById('contact-form')?.after(el);
  }
  el.textContent = msg;
  el.style.color = success ? 'var(--success)' : '#e05252';
  setTimeout(() => { el.textContent = ''; }, 5000);
}
