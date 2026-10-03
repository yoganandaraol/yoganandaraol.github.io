(function () {
  var root = document.documentElement;

  // theme (persisted; falls back silently if storage is blocked)
  try {
    var saved = localStorage.getItem('theme');
    if (saved) root.setAttribute('data-theme', saved);
  } catch (e) {}
  document.getElementById('theme').addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  // mobile menu
  var links = document.getElementById('links');
  document.getElementById('menu').addEventListener('click', function () { links.classList.toggle('open'); });
  links.addEventListener('click', function (e) { if (e.target.closest('a')) links.classList.remove('open'); });

  // typed roles
  var roles = ['Senior Full Stack Developer', 'AI Agent Engineer', '.NET Core & React Architect', 'Mentor & Release Owner'];
  var el = document.getElementById('typed');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) {
    el.textContent = roles[0];
  } else {
    var r = 0, c = 0, del = false;
    (function tick() {
      var word = roles[r];
      el.textContent = word.slice(0, c);
      if (!del && c === word.length) { del = true; return setTimeout(tick, 1600); }
      if (del && c === 0) { del = false; r = (r + 1) % roles.length; }
      c += del ? -1 : 1;
      setTimeout(tick, del ? 35 : 70);
    })();
  }

  // reveal on scroll + active nav link
  var io = 'IntersectionObserver' in window;
  var reveals = document.querySelectorAll('.reveal');
  if (io) {
    var ro = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); } });
    }, { threshold: .12 });
    reveals.forEach(function (n) { ro.observe(n); });

    var map = {};
    document.querySelectorAll('.links a[href^="#"]').forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var so = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting && map[e.target.id]) {
          Object.keys(map).forEach(function (k) { map[k].classList.remove('active'); });
          map[e.target.id].classList.add('active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(map).forEach(function (id) { var s = document.getElementById(id); if (s) so.observe(s); });
  } else {
    reveals.forEach(function (n) { n.classList.add('in'); });
  }

  document.getElementById('year').textContent = new Date().getFullYear();
})();
