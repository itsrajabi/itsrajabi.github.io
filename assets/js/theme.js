(function () {
  var STORAGE_KEY = 'theme';
  var root = document.documentElement;

  // Apply the saved theme before first paint to avoid a flash of the wrong theme.
  var stored = null;
  try {
    stored = window.localStorage.getItem(STORAGE_KEY);
  } catch (e) {}

  if (stored === 'light' || stored === 'dark') {
    root.setAttribute('data-theme', stored);
  }

  function currentTheme() {
    return root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }

  function updateToggles() {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    var toggles = document.querySelectorAll('[data-theme-toggle]');

    for (var i = 0; i < toggles.length; i++) {
      toggles[i].setAttribute('aria-label', 'Switch to ' + next + ' theme');
      toggles[i].setAttribute('title', 'Switch to ' + next + ' theme');
    }
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);

    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {}

    updateToggles();
  }

  // One delegated listener handles every toggle on the page.
  document.addEventListener('click', function (event) {
    var el = event.target;
    if (!el || !el.closest) return;
    if (!el.closest('[data-theme-toggle]')) return;

    applyTheme(currentTheme() === 'dark' ? 'light' : 'dark');
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateToggles);
  } else {
    updateToggles();
  }
})();