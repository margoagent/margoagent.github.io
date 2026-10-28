(function () {
  "use strict";

  function moveToSection(hash) {
    if (!hash || hash === "#") return false;
    var id;
    try { id = decodeURIComponent(hash.slice(1)); } catch (_) { return false; }
    var target = document.getElementById(id);
    if (!target) return false;

    // Remove the fragment before scrolling so the browser does not keep
    // restoring the anchor position while the visitor reads the page.
    if (window.location.hash) {
      history.replaceState(history.state, "", window.location.pathname + window.location.search);
    }
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY, behavior: "auto" });
    return true;
  }

  document.addEventListener("click", function (event) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    var source = event.target;
    if (!(source instanceof Element)) return;
    var link = source.closest('a[href^="#"]');
    if (!link || link.hasAttribute("download") || (link.target && link.target !== "_self")) return;
    if (moveToSection(link.getAttribute("href"))) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);

  function openDirectSection() {
    if (window.location.hash) moveToSection(window.location.hash);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", openDirectSection, { once: true });
  else openDirectSection();
  window.addEventListener("hashchange", openDirectSection);
})();
