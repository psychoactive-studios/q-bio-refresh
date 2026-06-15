(function () {
  var top = document.querySelector('.q-top');
  if (!top) return;

  // ---- Scroll state ----
  // On the landing page (body.has-hero-overlay), wait until the user scrolls
  // past the hero before flipping to "sticky-state" styling. Elsewhere, any
  // scroll past a small threshold triggers it.
  var heroOverlay = document.body.classList.contains('has-hero-overlay');
  var heroEl = heroOverlay ? document.querySelector('.hb-hero, .h-hero') : null;

  function threshold() {
    if (heroEl) {
      // Trip a bit before the hero leaves view so the bar is opaque by the time
      // any content beneath the hero comes up against it.
      var rect = heroEl.getBoundingClientRect();
      var heroBottom = rect.top + window.scrollY + heroEl.offsetHeight;
      return Math.max(24, heroBottom - 80);
    }
    return 24;
  }

  var onScroll = function () {
    if (window.scrollY > threshold()) top.classList.add('scrolled');
    else top.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  // ---- Active nav link based on current page ----
  // Match by filename ("q-exam.html") so the test works regardless of host or
  // subpath. index.html / "" / "/" all map to "index.html".
  var path = window.location.pathname;
  var file = path.substring(path.lastIndexOf('/') + 1).toLowerCase();
  if (!file || file === '') file = 'index.html';

  // Map related/legacy pages to a canonical nav target so the right link lights
  // up even on pages that aren't directly in the primary nav.
  var aliases = {
    'exam.html': 'q-exam.html',
    'book.html': 'q-exam.html',
    'partners-contact.html': 'partners.html'
  };
  var canonical = aliases[file] || file;

  var navLinks = top.querySelectorAll('.q-nav a');
  navLinks.forEach(function (a) {
    var href = (a.getAttribute('href') || '').toLowerCase();
    var hrefFile = href.substring(href.lastIndexOf('/') + 1).split('#')[0].split('?')[0];
    if (!hrefFile) return;
    if (hrefFile === canonical || hrefFile === file) {
      a.classList.add('active');
      a.setAttribute('aria-current', 'page');
    } else {
      a.classList.remove('active');
      a.removeAttribute('aria-current');
    }
  });
})();
