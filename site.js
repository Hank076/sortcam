// 依網址的 #<語言>、瀏覽器語言只顯示一種語言；上方的語言選單可以切換。
// 沒有 JavaScript 時不隱藏任何內容，所有語言都會顯示。
(function () {
  var LANGS = ["en", "ja", "es", "es-419", "zh-Hans", "zh-Hant"];
  var root = document.documentElement;
  var select = document.querySelector(".lang-picker select");
  root.classList.add("js");

  // 把瀏覽器的語言標籤對應到網站的語言。
  function match(tag) {
    var t = tag.toLowerCase();
    if (t.indexOf("zh") === 0) {
      return /hant|-tw|-hk|-mo/.test(t) ? "zh-Hant" : "zh-Hans";
    }
    if (t.indexOf("es") === 0) {
      return t === "es" || t.indexOf("es-es") === 0 ? "es" : "es-419";
    }
    if (t.indexOf("ja") === 0) return "ja";
    if (t.indexOf("en") === 0) return "en";
    return null;
  }

  function preferred() {
    var tags = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || "en"];
    for (var i = 0; i < tags.length; i++) {
      var lang = match(tags[i]);
      if (lang) return lang;
    }
    return "en";
  }

  function show(lang) {
    var article = null;
    document.querySelectorAll("[data-only]").forEach(function (el) {
      var on = el.getAttribute("data-only") === lang;
      el.hidden = !on;
      if (on && el.tagName === "ARTICLE") article = el;
    });
    root.lang = article ? article.lang : lang;
    document.title = root.getAttribute("data-title-" + lang) || root.getAttribute("data-title-en");
    if (select) select.value = lang;
  }

  function showFromLocation() {
    var fromHash = location.hash.slice(1);
    show(LANGS.indexOf(fromHash) >= 0 ? fromHash : preferred());
  }

  showFromLocation();
  window.addEventListener("hashchange", function () {
    showFromLocation();
    window.scrollTo(0, 0);
  });
  if (select) {
    select.addEventListener("change", function () {
      show(select.value);
      history.replaceState(null, "", "#" + select.value);
    });
  }
})();
