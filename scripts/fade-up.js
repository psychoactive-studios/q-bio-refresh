// Reveal-on-scroll for any element with class .fade-up
// Matches behavior on index.html (rootMargin -60px / threshold 0.05).
(function () {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.fade-up').forEach(function (n) { n.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -60px 0px', threshold: 0.05 });
  document.querySelectorAll('.fade-up').forEach(function (n) { io.observe(n); });
})();
