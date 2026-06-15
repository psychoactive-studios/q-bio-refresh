/* Shared drawer / hamburger menu controller.
   Uses event delegation on document so it works regardless of when the script
   runs vs. the per-page inline script that may also wire the same buttons. */
(function () {
  function getDrawer() { return document.querySelector('[data-drawer]'); }
  function focusableIn(el) {
    return [].slice.call(el.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )).filter(function (n) {
      var r = n.getBoundingClientRect();
      return r.width > 0 && r.height > 0;
    });
  }

  var lastFocused = null;

  function open() {
    var drawer = getDrawer();
    if (!drawer) return;
    lastFocused = document.activeElement;
    drawer.setAttribute('data-open', 'true');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // Move focus to the first focusable inside the drawer (usually close btn)
    var nodes = focusableIn(drawer);
    var closeBtn = drawer.querySelector('[data-menu-close]');
    var target = closeBtn || nodes[0];
    if (target) { try { target.focus({ preventScroll: true }); } catch (_) { target.focus(); } }
  }

  function shut() {
    var drawer = getDrawer();
    if (!drawer) return;
    drawer.removeAttribute('data-open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // Restore focus to whatever opened it
    if (lastFocused && lastFocused.focus) {
      try { lastFocused.focus({ preventScroll: true }); } catch (_) { lastFocused.focus(); }
    }
    lastFocused = null;
  }

  // Delegated handlers — catch clicks/taps anywhere
  document.addEventListener('click', function (e) {
    var target = e.target;
    if (!target || !target.closest) return;
    if (target.closest('[data-menu-open]')) { e.preventDefault(); open(); return; }
    if (target.closest('[data-menu-close]')) { e.preventDefault(); shut(); return; }
    // Click on the scrim (the drawer itself, not its panel) closes it
    var drawer = getDrawer();
    if (drawer && target === drawer) { shut(); }
    // Any link inside the drawer closes after navigating
    if (target.closest('[data-drawer] a')) { shut(); }
  });

  document.addEventListener('keydown', function (e) {
    var drawer = getDrawer();
    if (!drawer || drawer.getAttribute('data-open') !== 'true') return;
    if (e.key === 'Escape') { e.preventDefault(); shut(); return; }
    if (e.key !== 'Tab') return;
    // Focus trap inside open drawer
    var nodes = focusableIn(drawer);
    if (!nodes.length) { e.preventDefault(); return; }
    var first = nodes[0], last = nodes[nodes.length - 1];
    var active = document.activeElement;
    if (e.shiftKey && active === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && active === last) { e.preventDefault(); first.focus(); }
    else if (!drawer.contains(active)) { e.preventDefault(); first.focus(); }
  });
})();
