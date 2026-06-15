// Bidirectional pin↔card pairing for "Inside the Dashboard" annotated section.
// Hovering / focusing a pin highlights its matching card; hovering / focusing
// a card highlights its matching pin. Works for mouse, keyboard, and touch.
(function () {
  var pairs = {};
  document.querySelectorAll('[data-pair]').forEach(function (el) {
    var key = el.getAttribute('data-pair');
    if (!pairs[key]) pairs[key] = [];
    pairs[key].push(el);
  });

  function activate(key, on) {
    if (!pairs[key]) return;
    pairs[key].forEach(function (el) {
      el.classList.toggle('is-active', on);
    });
  }

  Object.keys(pairs).forEach(function (key) {
    pairs[key].forEach(function (el) {
      el.addEventListener('mouseenter', function () { activate(key, true); });
      el.addEventListener('mouseleave', function () { activate(key, false); });
      el.addEventListener('focus', function () { activate(key, true); });
      el.addEventListener('blur', function () { activate(key, false); });
      // Touch: highlight on touchstart, then auto-clear shortly after touchend
      el.addEventListener('touchstart', function () { activate(key, true); }, { passive: true });
      el.addEventListener('touchend', function () {
        setTimeout(function () { activate(key, false); }, 1200);
      }, { passive: true });
    });
  });
})();
