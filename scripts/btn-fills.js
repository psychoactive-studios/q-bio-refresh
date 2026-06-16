// Button fill hover — oval wipe rising from bottom (Motion One).
// Skips touch devices, reduced-motion, icon-only buttons, and nav buttons.
(function () {
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!window.Motion) return;

  var animate = window.Motion.animate;

  var FILL_EASE = [0.4, 0, 0.6, 1];
  var DUR_IN  = 0.35;
  var DUR_OUT = 0.65;

  var FILLS = {
    primary : 'rgba(5,35,80,0.88)',
    blue    : 'rgba(5,35,80,0.88)',
    outline : 'rgba(7,32,63,0.90)',
    ghost   : 'rgba(7,32,63,0.06)',
  };

  function variant(btn) {
    var v = ['primary','blue','outline','ghost'];
    for (var i = 0; i < v.length; i++) {
      if (btn.classList.contains(v[i])) return v[i];
    }
    return null;
  }

  document.querySelectorAll('.q-btn:not(.icon-btn)').forEach(function (btn) {
    // Skip nav buttons — they have their own state-driven hover styles
    if (btn.closest('.q-top')) return;

    var v = variant(btn);
    if (!v) return;

    // Wrap existing content so it stays above the fill
    var content = document.createElement('span');
    content.className = 'q-btn__content';
    while (btn.firstChild) content.appendChild(btn.firstChild);
    btn.appendChild(content);

    // Insert fill oval
    var fill = document.createElement('span');
    fill.className = 'q-btn__fill';
    fill.setAttribute('aria-hidden', 'true');
    fill.style.background = FILLS[v];
    btn.insertBefore(fill, content);

    btn.classList.add('has-fill');

    btn.addEventListener('mouseenter', function () {
      animate(fill,
        { transform: ['translate(-50%, 15%)', 'translate(-50%, -50%)'] },
        { duration: DUR_IN, easing: FILL_EASE }
      );
    });
    btn.addEventListener('mouseleave', function () {
      animate(fill,
        { transform: 'translate(-50%, -200%)' },
        { duration: DUR_OUT, easing: FILL_EASE }
      );
    });
  });
})();
