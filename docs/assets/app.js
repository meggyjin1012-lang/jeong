/* 수원 의정 아카이브 — 컬렉션 검색·필터·상세보기 (공통)
   사용법:
   Archive.mount({
     list:   목록을 그릴 요소,
     count:  결과 수를 표시할 요소 (선택),
     input:  검색어 input (선택, ?q= 값으로 채워짐),
     card:   item => HTML 문자열,
     detail: item => HTML 문자열 (선택, <dialog id="item-dialog">에 표시)
   });
   필터 버튼: <button data-filter="era|type" data-value="...">  (data-value="" 는 전체) */
(function () {
  var IMG = document.currentScript.src.replace(/app\.js.*$/, "img/");
  var items = window.ARCHIVE_ITEMS.map(function (it) {
    return Object.assign({}, it, { src: IMG + it.image });
  });

  function norm(s) { return String(s).toLowerCase().replace(/\s+/g, ""); }

  function match(it, q, f) {
    if (f.era && it.era !== f.era) return false;
    if (f.type && it.type !== f.type) return false;
    if (!q) return true;
    var hay = norm([it.title, it.desc, it.source, it.date, it.era, it.type, it.tags.join(" ")].join(" "));
    return hay.indexOf(norm(q)) > -1;
  }

  function mount(o) {
    var params = new URLSearchParams(location.search);
    var state = { q: params.get("q") || "", era: params.get("era") || "", type: params.get("type") || "" };
    var dialog = document.getElementById("item-dialog");

    function render() {
      var res = items.filter(function (it) { return match(it, state.q, state); });
      o.list.innerHTML = res.length
        ? res.map(o.card).join("")
        : '<p class="empty">' + (state.q ? '“' + escapeHtml(state.q) + '”에 해당하는 ' : '조건에 맞는 ') + '자료가 없습니다.</p>';
      if (o.count) o.count.textContent = res.length;
      document.querySelectorAll("[data-filter]").forEach(function (b) {
        b.classList.toggle("is-active", (state[b.dataset.filter] || "") === b.dataset.value);
      });
      var url = new URL(location.href);
      ["q", "era", "type"].forEach(function (k) { state[k] ? url.searchParams.set(k, state[k]) : url.searchParams.delete(k); });
      history.replaceState(null, "", url);
    }

    if (o.input) {
      o.input.value = state.q;
      o.input.addEventListener("input", function () { state.q = o.input.value.trim(); render(); });
      if (o.input.form) o.input.form.addEventListener("submit", function (e) { e.preventDefault(); });
    }
    document.querySelectorAll("[data-filter]").forEach(function (b) {
      b.addEventListener("click", function () { state[b.dataset.filter] = b.dataset.value; render(); });
    });
    o.list.addEventListener("click", function (e) {
      var el = e.target.closest("[data-id]");
      if (!el || !dialog || !o.detail) return;
      e.preventDefault();
      var it = items.find(function (x) { return x.id === el.dataset.id; });
      dialog.innerHTML = o.detail(it);
      dialog.showModal();
    });
    if (dialog) dialog.addEventListener("click", function (e) {
      if (e.target === dialog || e.target.closest("[data-close]")) dialog.close();
    });
    render();
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
  }

  window.Archive = { items: items, mount: mount, escapeHtml: escapeHtml };
})();
