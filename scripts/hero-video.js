// Hero video: 0.4× parallax + text fade-on-scroll-out.
// Respects prefers-reduced-motion (skips the parallax loop and pauses the video).
(function () {
  var hero = document.querySelector('.hb-hero');
  if (!hero) return;
  var videoWrap = hero.querySelector('[data-hero-video]');
  var overlay = hero.querySelector('.hb-hero-overlay');
  var video = hero.querySelector('video');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  function applyReducedMotion(on) {
    if (on && video) { try { video.pause(); } catch (e) {} }
    else if (!on && video) { try { video.play(); } catch (e) {} }
  }
  applyReducedMotion(reduce.matches);
  reduce.addEventListener && reduce.addEventListener('change', function (e) { applyReducedMotion(e.matches); });

  if (reduce.matches) return;

  var scrollInd = hero.querySelector('.hb-hero-scroll');
  var pending = false;
  function onScroll() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(function () {
      var rect = hero.getBoundingClientRect();
      var h = rect.height || 1;
      var t = -rect.top / h; // 0 = hero top in view, 1 = scrolled past
      if (overlay) overlay.style.opacity = String(Math.max(0, 1 - t * 1.4));
      if (scrollInd) scrollInd.style.opacity = String(Math.max(0, 1 - t * 5));
      pending = false;
    });
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
})();
