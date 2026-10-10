// 依網址的 #en、#zh-Hant 或瀏覽器語言只顯示一種語言；上方的分段控制可以切換。
// 沒有 JavaScript 時不加 lang-* class，兩種語言都會顯示。
(function () {
  var root = document.documentElement;
  var buttons = document.querySelectorAll(".segmented button");
  root.classList.add("js");

  function show(lang) {
    var isEn = lang === "en";
    root.classList.toggle("lang-en", isEn);
    root.classList.toggle("lang-zh", !isEn);
    root.lang = isEn ? "en" : "zh-Hant-TW";
    document.title = root.getAttribute(isEn ? "data-title-en" : "data-title-zh");
    buttons.forEach(function (button) {
      button.setAttribute("aria-pressed", String(button.dataset.lang === lang));
    });
  }

  function showFromLocation() {
    var fromHash = location.hash.slice(1);
    if (fromHash === "en" || fromHash === "zh-Hant") {
      show(fromHash);
    } else {
      show(navigator.language.toLowerCase().indexOf("zh") === 0 ? "zh-Hant" : "en");
    }
  }

  showFromLocation();
  window.addEventListener("hashchange", function () {
    showFromLocation();
    window.scrollTo(0, 0);
  });
  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      show(button.dataset.lang);
      history.replaceState(null, "", "#" + button.dataset.lang);
    });
  });
})();
