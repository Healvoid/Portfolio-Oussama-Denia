(function () {
    var nav = document.getElementById('navbar');
    var mi = document.getElementById('menu-icon');
    if (mi && nav) {
        mi.onclick = function () { nav.classList.toggle('open'); };
        nav.querySelectorAll('a').forEach(function (a) { a.onclick = function () { nav.classList.remove('open'); }; });
    }
    var root = document.documentElement, tbtn = document.getElementById('theme-toggle');
    function isDark() { return root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches; }
    function setIcon() { if (tbtn) tbtn.innerHTML = "<i class='bx " + (isDark() ? "bx-sun" : "bx-moon") + "'></i>"; }
    try { var t = localStorage.getItem('theme'); if (t) root.dataset.theme = t; } catch (e) {}
    setIcon();
    if (tbtn) tbtn.onclick = function () {
        root.dataset.theme = isDark() ? 'light' : 'dark';
        try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
        setIcon();
    };
    // Lightbox pour les captures
    var lb = document.createElement('div');
    lb.className = 'lb'; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-label', 'Capture agrandie');
    lb.innerHTML = '<img alt="">';
    document.body.appendChild(lb);
    var lbi = lb.querySelector('img');
    function close() { lb.classList.remove('open'); }
    lb.onclick = close;
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    document.querySelectorAll('figure.shot button').forEach(function (b) {
        b.onclick = function () { var im = b.querySelector('img'); lbi.src = im.src; lbi.alt = im.alt; lb.classList.add('open'); };
    });
})();
