/* Theme picker: light, dark, or follow the system setting (default).
   The preference lives in localStorage ("theme"); html[data-theme] holds the
   resolved value that custom.css keys off. The same resolve step runs inline in
   <head> (see EXTRA_HEAD_DATA in conf.py) to avoid a flash of the wrong theme. */
(function () {
    var KEY = "theme";
    var root = document.documentElement;
    var mq = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

    function stored() {
        try {
            var v = localStorage.getItem(KEY);
            return v === "light" || v === "dark" ? v : "system";
        } catch (e) { return "system"; }
    }

    function apply(pref) {
        var dark = pref === "dark" || (pref === "system" && mq && mq.matches);
        root.setAttribute("data-theme", dark ? "dark" : "light");
        root.setAttribute("data-theme-pref", pref);
        var items = document.querySelectorAll(".theme-picker [data-theme-choice]");
        for (var i = 0; i < items.length; i++) {
            items[i].setAttribute("aria-checked",
                items[i].getAttribute("data-theme-choice") === pref ? "true" : "false");
        }
        var meta = document.querySelector('meta[name="theme-color"]');
        if (meta) { meta.setAttribute("content", dark ? "#1e2126" : "#5670d4"); }
    }

    document.addEventListener("click", function (e) {
        var el = e.target.closest ? e.target.closest("[data-theme-choice]") : null;
        if (!el) { return; }
        e.preventDefault();
        var pref = el.getAttribute("data-theme-choice");
        try { localStorage.setItem(KEY, pref); } catch (err) { /* private mode */ }
        apply(pref);
    });

    if (mq) {
        var onChange = function () { if (stored() === "system") { apply("system"); } };
        if (mq.addEventListener) { mq.addEventListener("change", onChange); }
        else if (mq.addListener) { mq.addListener(onChange); }
    }

    function init() { apply(stored()); }
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else { init(); }
})();
