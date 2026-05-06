/* Portfolio Léo Mahé — JS partagé */

/* ─── ANALYTICS ────────────────────────────────────────────────────────────
   Remplace GA_MEASUREMENT_ID par ton vrai ID Google Analytics (ex: G-XXXXXXXXXX)
   Pour l'obtenir : analytics.google.com → Créer propriété → type Web
   ────────────────────────────────────────────────────────────────────────── */
(function () {
  var GA_ID = 'G-W6SW56KMFY';
  if (!GA_ID || GA_ID === 'GA_MEASUREMENT_ID') return;

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_ID, { anonymize_ip: true });
})();

/* ─── EVENT TRACKING ────────────────────────────────────────────────────── */
(function () {
  function track(name, params) {
    if (typeof window.gtag === 'function') window.gtag('event', name, params || {});
  }

  document.addEventListener('click', function (e) {
    var link = e.target.closest('a, button');
    if (!link) return;
    var href = (link.getAttribute('href') || '').toLowerCase();
    var tag  = link.tagName;

    if (href.includes('cv') && href.includes('.pdf')) {
      track('cv_download', { event_category: 'documents' });
    } else if (href.includes('tableau') && href.includes('.pdf')) {
      track('synthese_download', { event_category: 'documents' });
    } else if (href.includes('.docx')) {
      track('document_download', { event_category: 'documents', event_label: href.split('/').pop() });
    } else if (href.includes('.pdf')) {
      track('pdf_open', { event_category: 'documents', event_label: href.split('/').pop() });
    } else if (href.includes('linkedin.com')) {
      track('linkedin_click', { event_category: 'social' });
    } else if (href.includes('github.com')) {
      track('github_click', { event_category: 'projects', event_label: href });
    } else if (href.includes('tinkercad.com')) {
      track('tinkercad_click', { event_category: 'projects' });
    } else if (href === 'certifications.html') {
      track('certifications_view', { event_category: 'navigation' });
    } else if (href === 'cebureau.html') {
      track('screenshots_bureau_view', { event_category: 'navigation' });
    } else if (href === 'ceweb.html') {
      track('screenshots_web_view', { event_category: 'navigation' });
    } else if (href.includes('ecommerce') || href.includes('licornes')) {
      track('subproject_view', { event_category: 'projects', event_label: href });
    }
  });

  var form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function () {
      track('contact_form_submit', { event_category: 'engagement' });
    });
  }
})();

/* ─── NAV ACTIVE LINK ───────────────────────────────────────────────────── */
(function () {
  var page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
})();

/* ─── BURGER MENU ───────────────────────────────────────────────────────── */
function toggleMenu() {
  var nav = document.getElementById('navLinks');
  if (nav) nav.classList.toggle('show');
}

/* ─── FADE-IN AU SCROLL ─────────────────────────────────────────────────── */
(function () {
  var els = document.querySelectorAll('.fade-in');
  if (!els.length) return;
  if (!window.IntersectionObserver) {
    els.forEach(function (el) { el.classList.add('visible'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  els.forEach(function (el) { io.observe(el); });
})();

/* ─── TEXT-COLLAPSE (autresprojets) ─────────────────────────────────────── */
(function () {
  document.querySelectorAll('.text-collapse').forEach(function (container) {
    var preview = container.querySelector('.text-preview');
    var full    = container.querySelector('.text-full');
    var buttons = container.querySelectorAll('.read-more-btn');
    if (!preview || !full) return;
    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        var isExpanded = full.style.display === 'block';
        full.style.display    = isExpanded ? 'none'  : 'block';
        preview.style.display = isExpanded ? 'block' : 'none';
      });
    });
  });
})();

/* ─── TOGGLE-BTN (cebureau, ceweb) ─────────────────────────────────────── */
(function () {
  document.querySelectorAll('.toggle-btn').forEach(function (button) {
    button.addEventListener('click', function () {
      var moreText = button.previousElementSibling;
      moreText.classList.toggle('visible');
      button.textContent = moreText.classList.contains('visible') ? 'Réduire ↑' : 'Lire la suite →';
    });
  });
})();
