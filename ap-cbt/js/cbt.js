/*
 * 応用情報技術者試験 科目B CBT 模擬試験（非公式）
 * CBT-Solutions 公開の操作説明（科目B群）に合わせた試験画面を再現する。
 *
 * 出題設定は URL パラメータで変えられる（教員モード実装までの暫定）:
 *   ?exam=2025a        出題データ
 *   &time=150          制限時間（分）
 *   &problems=1,3,5    出題する大問（省略時は全問）
 *   &required=1        必須問題（省略時は exam データの required）
 *   &select=5          解答する問題数（必須を含む）
 *   &review=0          終了後の解答例表示を無効にする
 */
(function () {
  "use strict";

  // ======================================================================
  // ユーティリティ
  // ======================================================================
  function $(sel, root) { return (root || document).querySelector(sel); }
  function el(tag, attrs, children) {
    var e = document.createElement(tag);
    if (attrs) for (var k in attrs) {
      var v = attrs[k];
      if (v == null || v === false) continue;
      if (k === "class") e.className = v;
      else if (k === "text") e.textContent = v;
      else if (k === "html") e.innerHTML = v;
      else if (k.slice(0, 2) === "on") e.addEventListener(k.slice(2), v);
      else if (k === "style") e.style.cssText = v;
      else e.setAttribute(k, v === true ? "" : v);
    }
    (children || []).forEach(function (c) {
      if (c == null || c === false) return;
      e.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return e;
  }
  function store(key, val) {
    try {
      if (val === undefined) { var s = localStorage.getItem(key); return s ? JSON.parse(s) : null; }
      if (val === null) localStorage.removeItem(key); else localStorage.setItem(key, JSON.stringify(val));
    } catch (e) { return null; }
  }
  function chars(s) { return Array.from(s || "").length; }
  function cut(s, n) { return Array.from(s || "").slice(0, n).join(""); }
  function pad2(n) { return (n < 10 ? "0" : "") + n; }

  // ======================================================================
  // 設定
  // ======================================================================
  var params = new URLSearchParams(location.search);
  var EXAM_ID = params.get("exam") || "2025a";
  var EXAM = (window.CBT_EXAMS || {})[EXAM_ID];
  var root = document.getElementById("root");
  if (!EXAM) { root.textContent = "出題データが見つかりません: " + EXAM_ID; return; }

  function intList(s) { return (s || "").split(",").map(function (x) { return parseInt(x, 10); }).filter(function (x) { return x > 0; }); }
  var allNos = EXAM.problems.map(function (p) { return p.no; });
  var CFG = {
    problems: (intList(params.get("problems")).filter(function (n) { return allNos.indexOf(n) >= 0; })),
    required: intList(params.get("required")),
    select: parseInt(params.get("select"), 10),
    timeMin: parseInt(params.get("time"), 10) || EXAM.timeLimitMin,
    review: params.get("review") !== "0"
  };
  if (!CFG.problems.length) CFG.problems = allNos.slice();
  if (!params.get("required")) CFG.required = EXAM.problems.filter(function (p) { return p.required; }).map(function (p) { return p.no; });
  CFG.required = CFG.required.filter(function (n) { return CFG.problems.indexOf(n) >= 0; });
  if (!(CFG.select > 0)) CFG.select = Math.min(EXAM.selectCount, CFG.problems.length);
  CFG.select = Math.max(CFG.required.length, Math.min(CFG.select, CFG.problems.length));
  var PROBS = CFG.problems.map(function (n) { return EXAM.problems.filter(function (p) { return p.no === n; })[0]; });
  var KEY = "apcbt:" + EXAM_ID + ":" + CFG.problems.join(".") + ":" + CFG.required.join(".") + ":" + CFG.select + ":" + CFG.timeMin;

  // ======================================================================
  // 受験状態
  // ======================================================================
  var S = store(KEY) || null;
  function newState() {
    return { selected: CFG.required.slice(), answers: {}, flags: {}, cur: 0, endAt: 0, memo: "", ime: "romaji", phase: "top", marks: {} };
  }
  if (!S) S = newState();
  function save() { store(KEY, S); }

  function fid(pi, ii, fi) { return PROBS[pi].no + "-" + ii + "-" + fi; }
  function iid(pi, ii) { return PROBS[pi].no + "-" + ii; }
  function isFilled(v) { return Array.isArray(v) ? v.length > 0 : (v != null && String(v).trim() !== ""); }
  function itemAnswered(pi, ii) {
    var it = PROBS[pi].items[ii];
    return it.fields.every(function (f, fi) { return isFilled(S.answers[fid(pi, ii, fi)]); });
  }

  // ======================================================================
  // キー操作によるコピー・貼り付けの禁止（本番仕様）
  // ======================================================================
  var clip = "";
  function blockEvt(e) { if (document.body.classList.contains("in-exam")) e.preventDefault(); }
  ["copy", "cut", "paste", "drop", "dragstart", "contextmenu"].forEach(function (t) { document.addEventListener(t, blockEvt, true); });
  document.addEventListener("keydown", function (e) {
    if (!document.body.classList.contains("in-exam")) return;
    var k = (e.key || "").toLowerCase();
    if ((e.ctrlKey || e.metaKey) && ["c", "x", "v", "p", "s", "f", "u"].indexOf(k) >= 0) e.preventDefault();
    if (k === "f5" || ((e.ctrlKey || e.metaKey) && k === "r")) e.preventDefault();
  }, true);
  window.addEventListener("beforeunload", function (e) {
    if (S.phase === "exam") { e.preventDefault(); e.returnValue = ""; }
  });

  // ======================================================================
  // 画面: 試験一覧
  // ======================================================================
  function renderTop() {
    document.body.classList.remove("in-exam");
    document.documentElement.classList.remove("inverted");
    root.innerHTML = "";
    var resumable = S.phase === "exam" && S.endAt > Date.now();
    var imeRomaji = el("input", { type: "radio", name: "ime", value: "romaji", checked: S.ime === "romaji" });
    var imeKana = el("input", { type: "radio", name: "ime", value: "kana", checked: S.ime === "kana" });
    [imeRomaji, imeKana].forEach(function (r) { r.addEventListener("change", function () { S.ime = r.value; save(); }); });

    var cfgLines = [
      "出題する問題：" + PROBS.map(function (p) { return "問" + p.no; }).join("，"),
      "必須問題：" + (CFG.required.length ? CFG.required.map(function (n) { return "問" + n; }).join("，") : "なし"),
      "解答する問題数：" + CFG.select + "問",
      "試験時間：" + CFG.timeMin + "分"
    ];

    root.appendChild(el("div", { class: "top-wrap" }, [
      el("div", { class: "top-head" }, [
        el("div", null, [el("h1", { text: "試験一覧" }), el("div", { class: "sub", text: "応用情報技術者試験 科目B CBT模擬試験（非公式・練習用）" })]),
        el("div", { class: "sub", text: "受験者：練習用" })
      ]),
      el("div", { class: "top-main" }, [
        el("div", { class: "notice" }, [
          el("h2", { text: "注意事項" }),
          el("ul", null, [
            el("li", { text: "このアプリは、CBT方式の試験画面の操作に慣れるための非公式の練習用アプリです。IPA・CBT-Solutions とは関係ありません。" }),
            el("li", { text: "問題は IPA が公表している過去問題（" + EXAM.source + "）を使用しています。" }),
            el("li", { text: "「受験する」ボタンを押すと試験が始まり、残り時間のカウントが始まります。" }),
            el("li", { text: "試験中は、キー操作によるコピー・貼り付けはできません（解答欄・メモのボタンを使います）。" }),
            el("li", { text: "残り時間が0になると、試験は自動的に終了します。" })
          ])
        ]),
        el("table", { class: "exam-table" }, [
          el("tr", null, [el("th", { text: "試験名" }), el("th", { text: "試験時間" }), el("th", { text: "出題" }), el("th", { class: "take", text: "" })]),
          el("tr", null, [
            el("td", null, [EXAM.exam + " " + EXAM.subject, el("br"), el("span", { style: "font-size:12px;color:#666", text: "（" + EXAM.source + "）" })]),
            el("td", { text: CFG.timeMin + "分" }),
            el("td", null, [el("ul", { class: "cfg-list" }, cfgLines.slice(0, 3).map(function (t) { return el("li", { text: t }); }))]),
            el("td", { class: "take" }, [
              el("button", { class: "btn navy", text: resumable ? "受験を再開" : "受験する", onclick: function () { startExam(resumable); } })
            ])
          ])
        ]),
        el("div", { class: "ime-box" }, [
          el("div", { text: "文字入力方式の選択（試験中はメモ画面から変更できます）" }),
          el("div", { style: "margin-top:6px" }, [
            el("label", null, [imeRomaji, " ローマ字入力"]), el("label", null, [imeKana, " かな入力"])
          ]),
          el("div", null, [el("input", { type: "text", placeholder: "ここで日本語が入力できるか確認してください（入力内容は問いません）" })])
        ]),
        resumable ? el("p", { class: "top-foot", text: "前回の受験が途中です。「受験を再開」で続きから受験できます（残り時間は進んでいます）。" }) : null,
        S.phase === "done" ? el("p", { class: "top-foot" }, [
          "前回の受験は終了しています。",
          CFG.review ? el("a", { href: "#", onclick: function (e) { e.preventDefault(); renderReview(); }, text: "解答例を確認する" }) : null,
          "　／　",
          el("a", { href: "#", onclick: function (e) { e.preventDefault(); S = newState(); save(); renderTop(); }, text: "最初から受験し直す" })
        ]) : null,
        el("div", { class: "top-foot" }, [
          "画面の構成・操作は、CBT-Solutions が公開している「科目B群 試験当日の試験アプリ 操作方法のご案内」に合わせています。実際の試験画面とは異なる場合があります。"
        ])
      ])
    ]));
  }

  function startExam(resume) {
    if (!resume) {
      var ime = S.ime;
      S = newState();
      S.ime = ime;
      S.endAt = Date.now() + CFG.timeMin * 60000;
      S.phase = "exam";
      save();
    }
    renderExam(!resume);
  }

  // ======================================================================
  // 画面: 試験
  // ======================================================================
  var timerId = 0, focusedItem = null;
  var leftView, rightView, statusOpen = false;
  var tool = "pointer", markSize = 1.0, zoom = 100;
  var popupState = null;

  function renderExam(openSelect) {
    document.body.classList.add("in-exam");
    root.innerHTML = "";
    statusOpen = false;

    var remainEl = el("span", { class: "remain" });
    var pageInfo = el("div", { class: "t2" });
    var invSw = el("div", { class: "switch", onclick: function () {
      invSw.classList.toggle("on");
      document.documentElement.classList.toggle("inverted", invSw.classList.contains("on"));
    } });
    var head = el("div", { class: "exam-head" }, [
      el("div", { class: "logo", text: "CBT" }),
      el("div", { class: "head-title" }, [el("div", { class: "t1", text: EXAM.exam + " " + EXAM.subject }), pageInfo]),
      el("div", { class: "head-right" }, [
        remainEl,
        el("div", { class: "head-btns" }, [
          el("div", { class: "invert-sw" }, [el("span", { text: "白黒反転" }), invSw]),
          el("button", { class: "btn navy", text: "問題選択", onclick: openSelectDialog }),
          el("button", { class: "btn navy", id: "memoBtn", text: "メモ", onclick: toggleMemo }),
          el("button", { class: "btn blue", text: EXAM.reference ? "参考資料" : "注意事項", onclick: openReference }),
          el("button", { class: "btn navy", text: "試験終了", onclick: confirmEnd })
        ])
      ])
    ]);

    // 左：問題文
    leftView = buildProblemViewer({ main: true });
    var left = el("div", { class: "pane pane-left" }, [leftView.toolbar, leftView.scroll]);
    var splitter = el("div", { class: "splitter" });
    rightView = el("div", { class: "answer" });
    var right = el("div", { class: "pane pane-right" }, [rightView]);
    var body = el("div", { class: "exam-body" }, [left, splitter, right]);

    var prevBtn = el("button", { class: "btn navy", text: "前の問題", onclick: function () { go(S.cur - 1); } });
    var nextBtn = el("button", { class: "btn navy", text: "次の問題", onclick: function () { go(S.cur + 1); } });
    var foot = el("div", { class: "exam-foot" }, [
      el("button", { class: "btn navy", text: "解答状況", onclick: toggleStatus }),
      el("button", { class: "btn", id: "calcBtn", text: "電卓", onclick: toggleCalc }),
      el("button", { class: "btn green", text: "問題（別画面）", onclick: togglePopup }),
      el("div", { class: "sp" }),
      el("button", { class: "btn", text: "後で見直す", onclick: flagAll }),
      prevBtn, nextBtn
    ]);
    var exam = el("div", { class: "exam" }, [head, body, foot]);
    root.appendChild(exam);

    // 左右の枠の境目をドラッグして表示割合を変える
    splitter.addEventListener("pointerdown", function (e) {
      e.preventDefault();
      splitter.setPointerCapture(e.pointerId);
      var rect = body.getBoundingClientRect();
      function mv(ev) {
        var r = (ev.clientX - rect.left) / rect.width;
        r = Math.max(0.25, Math.min(0.8, r));
        left.style.flexBasis = (r * 100) + "%";
        leftView.relayout();
      }
      function up() { splitter.removeEventListener("pointermove", mv); splitter.removeEventListener("pointerup", up); }
      splitter.addEventListener("pointermove", mv);
      splitter.addEventListener("pointerup", up);
    });
    window.addEventListener("resize", function () { if (leftView) leftView.relayout(); });

    function updateNav() {
      prevBtn.disabled = S.cur <= 0;
      nextBtn.disabled = S.cur >= PROBS.length - 1;
      pageInfo.textContent = PROBS.length + "ページ中" + (S.cur + 1) + "ページ目";
    }
    function go(i) {
      if (i < 0 || i >= PROBS.length) return;
      S.cur = i; save();
      if (statusOpen) toggleStatus();
      showProblem();
    }
    function showProblem() {
      updateNav();
      leftView.show(S.cur);
      renderAnswers();
      if (popupState) popupState.viewer.show(S.cur);
    }
    renderExam.go = go;
    renderExam.showProblem = showProblem;

    function tick() {
      var ms = S.endAt - Date.now();
      if (ms <= 0) { remainEl.textContent = "残り時間 0:00"; finishExam(true); return; }
      var sec = Math.ceil(ms / 1000);
      remainEl.textContent = "残り時間 " + Math.floor(sec / 60) + ":" + pad2(sec % 60);
      remainEl.classList.toggle("warn", sec <= 300);
    }
    clearInterval(timerId);
    timerId = setInterval(tick, 500);
    tick();

    showProblem();
    if (openSelect) openSelectDialog();
  }

  // ---------------------------------------------------------------------
  // 問題文ビューア（拡大縮小・マーカー）。本体と「問題（別画面）」で別々に持つ
  // ---------------------------------------------------------------------
  function buildProblemViewer(opt) {
    var v = { zoom: 100, tool: "pointer", size: 1.0, cache: {}, cur: -1 };
    var pct = el("span", { class: "pct", text: "100 %" });
    var zr = el("input", { type: "range", min: 50, max: 200, step: 10, value: 100 });
    zr.addEventListener("input", function () { v.zoom = +zr.value; pct.textContent = v.zoom + " %"; v.relayout(); });
    var sizeTxt = el("span", { text: "1.0x" });
    var sr = el("input", { type: "range", min: 5, max: 30, step: 1, value: 10, style: "width:60px" });
    sr.addEventListener("input", function () { v.size = sr.value / 10; sizeTxt.textContent = v.size.toFixed(1) + "x"; });

    var tools = {};
    function toolBtn(name, inner, title) {
      var b = el("button", { class: "tool" + (name === "pointer" ? " sel" : ""), title: title, onclick: function () {
        v.tool = name;
        Object.keys(tools).forEach(function (k) { tools[k].classList.toggle("sel", k === name); });
        scroll.classList.toggle("marking", name !== "pointer");
        scroll.classList.toggle("erasing", name === "eraser");
      } }, [inner]);
      tools[name] = b;
      return b;
    }
    var ptrSvg = '<svg viewBox="0 0 12 12"><path d="M2 1 L2 10 L4.5 7.6 L6.3 11 L7.6 10.4 L5.9 7 L9.2 7 Z" fill="#222"/></svg>';
    var ersSvg = '<svg viewBox="0 0 12 12"><path d="M7.5 1.5 L10.5 4.5 L5 10 L2 10 L1 9 L1 8 Z" fill="#fff" stroke="#333"/><path d="M4 5 L7 8" stroke="#333"/></svg>';
    var toolbar = el("div", { class: "toolbar" }, [
      el("span", { text: "拡大・縮小" }), zr, pct,
      toolBtn("pointer", el("span", { html: ptrSvg }), "マーカーモードのオフ"),
      toolBtn("red", el("i", { style: "background:#e21b1b" }), "赤"),
      toolBtn("blue", el("i", { style: "background:#1336d6" }), "青"),
      toolBtn("yellow", el("i", { style: "background:#ffe600" }), "黄"),
      toolBtn("eraser", el("span", { html: ersSvg }), "消しゴム"),
      el("span", { text: "サイズ" }), sr, sizeTxt,
      el("button", { class: "btn navy tb-clear", text: "クリア", onclick: function () {
        var c = v.cache[v.cur]; if (!c) return;
        c.canvases.forEach(function (cv) { cv.getContext("2d").clearRect(0, 0, cv.width, cv.height); });
      } })
    ]);
    var scroll = el("div", { class: "scroll" });
    v.toolbar = toolbar; v.scroll = scroll;

    var COLORS = { red: "rgba(226,27,27,0.38)", blue: "rgba(19,54,214,0.32)", yellow: "rgba(255,230,0,0.45)" };
    function attachDraw(cv) {
      var drawing = false, last = null, base = null, pts = [];
      function pos(e) {
        var r = cv.getBoundingClientRect();
        return { x: (e.clientX - r.left) * cv.width / r.width, y: (e.clientY - r.top) * cv.height / r.height };
      }
      function redraw(ctx) {
        // 1本のストロークを半透明で重ね塗りしないよう、開始時の画像に毎回描き直す
        ctx.putImageData(base, 0, 0);
        ctx.save();
        ctx.lineCap = "round"; ctx.lineJoin = "round";
        ctx.strokeStyle = COLORS[v.tool]; ctx.lineWidth = 16 * v.size;
        ctx.beginPath();
        pts.forEach(function (p, i) { if (i) ctx.lineTo(p.x, p.y); else ctx.moveTo(p.x, p.y); });
        if (pts.length === 1) ctx.lineTo(pts[0].x + 0.1, pts[0].y);
        ctx.stroke();
        ctx.restore();
      }
      cv.addEventListener("pointerdown", function (e) {
        if (v.tool === "pointer") return;
        e.preventDefault();
        cv.setPointerCapture(e.pointerId);
        drawing = true; last = pos(e);
        var ctx = cv.getContext("2d");
        if (v.tool !== "eraser") { base = ctx.getImageData(0, 0, cv.width, cv.height); pts = [last]; redraw(ctx); }
        else erase(ctx, last, last);
      });
      cv.addEventListener("pointermove", function (e) {
        if (!drawing) return;
        var p = pos(e), ctx = cv.getContext("2d");
        if (v.tool === "eraser") erase(ctx, last, p); else { pts.push(p); redraw(ctx); }
        last = p;
      });
      function end() { drawing = false; base = null; pts = []; }
      cv.addEventListener("pointerup", end);
      cv.addEventListener("pointercancel", end);
      function erase(ctx, a, b) {
        ctx.save();
        ctx.globalCompositeOperation = "destination-out";
        ctx.lineCap = "round"; ctx.lineWidth = 26 * v.size;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x + 0.1, b.y); ctx.stroke();
        ctx.restore();
      }
    }

    v.show = function (pi) {
      if (v.cur === pi) return;
      Object.keys(v.cache).forEach(function (k) { v.cache[k].wrap.style.display = "none"; });
      v.cur = pi;
      if (!v.cache[pi]) {
        var wrap = el("div", { class: "pages" });
        var canvases = [];
        PROBS[pi].pages.forEach(function (src) {
          var cv = el("canvas", { width: 1074, height: 1520 });
          var im = el("img", { src: src, alt: "", draggable: "false" });
          im.addEventListener("load", function () {
            if (im.naturalWidth && (cv.width !== im.naturalWidth || cv.height !== im.naturalHeight)) {
              cv.width = im.naturalWidth; cv.height = im.naturalHeight;
            }
          });
          attachDraw(cv);
          canvases.push(cv);
          wrap.appendChild(el("div", { class: "page" }, [im, cv]));
        });
        scroll.appendChild(wrap);
        v.cache[pi] = { wrap: wrap, canvases: canvases };
      }
      v.cache[pi].wrap.style.display = "";
      v.relayout();
      scroll.scrollTop = 0;
    };
    v.relayout = function () {
      var c = v.cache[v.cur]; if (!c) return;
      var w = Math.max(200, scroll.clientWidth - 24);
      c.wrap.style.width = Math.round(w * v.zoom / 100) + "px";
    };
    return v;
  }

  // ---------------------------------------------------------------------
  // 解答欄
  // ---------------------------------------------------------------------
  function renderAnswers() {
    var pi = S.cur, P = PROBS[pi];
    rightView.innerHTML = "";
    if (S.selected.indexOf(P.no) < 0) {
      rightView.appendChild(el("p", { class: "not-selected", text: "画面右上の「問題選択」から問題番号を選択したか確認してください。" }));
    }
    rightView.appendChild(el("div", { style: "font-size:13px;margin:2px 0 6px;font-weight:bold", text: "問" + P.no + (CFG.required.indexOf(P.no) >= 0 ? "（必須）" : "") }));
    P.items.forEach(function (it, ii) {
      var key = iid(pi, ii);
      var flag = el("button", { class: "flag" + (S.flags[key] ? " on" : ""), title: "後で見直す", onclick: function () {
        S.flags[key] = !S.flags[key]; if (!S.flags[key]) delete S.flags[key];
        flag.classList.toggle("on", !!S.flags[key]); save();
      } });
      var box = el("div", { class: "item", "data-item": key }, [flag, el("div", { class: "item-label", text: it.label })]);
      it.fields.forEach(function (f, fi) { box.appendChild(renderField(pi, ii, fi, f)); });
      box.addEventListener("focusin", function () { focusedItem = key; });
      box.addEventListener("pointerdown", function () { focusedItem = key; });
      rightView.appendChild(box);
    });
    rightView.scrollTop = 0;
  }

  function renderField(pi, ii, fi, f) {
    var id = fid(pi, ii, fi);
    var val = S.answers[id];
    function setVal(v) {
      if (isFilled(v)) S.answers[id] = v; else delete S.answers[id];
      save();
    }
    var wrap = el("div", { class: "field" });
    if (f.key) wrap.appendChild(el("div", { class: "field-key", text: f.key }));

    if (f.type === "choice") {
      var list = el("div", { class: "choice-list" });
      f.options.forEach(function (o) {
        var b = el("button", { class: "choice-btn" + (val === o ? " sel" : ""), text: o, onclick: function () {
          var now = S.answers[id] === o ? "" : o;
          setVal(now);
          Array.prototype.forEach.call(list.children, function (c) { c.classList.toggle("sel", c.textContent === now); });
        } });
        list.appendChild(b);
      });
      wrap.appendChild(list);
    } else if (f.type === "multi") {
      var ml = el("div", { class: "multi-list" });
      f.options.forEach(function (o) {
        var cb = el("input", { type: "checkbox", checked: Array.isArray(val) && val.indexOf(o) >= 0 });
        cb.addEventListener("change", function () {
          var cur = Array.isArray(S.answers[id]) ? S.answers[id].slice() : [];
          if (cb.checked) { if (cur.indexOf(o) < 0) cur.push(o); } else cur = cur.filter(function (x) { return x !== o; });
          cur.sort(function (a, b) { return f.options.indexOf(a) - f.options.indexOf(b); });
          setVal(cur);
        });
        ml.appendChild(el("label", null, [cb, o]));
      });
      wrap.appendChild(ml);
    } else if (f.type === "pulldown") {
      var sel = el("select", { class: "pull" }, [el("option", { value: "", text: "" })].concat(f.options.map(function (o) {
        return el("option", { value: o, text: o, selected: val === o });
      })));
      sel.addEventListener("change", function () { setVal(sel.value); });
      wrap.appendChild(sel);
    } else if (f.type === "line") {
      var inp = el("input", { class: "line", type: "text", value: val || "", autocomplete: "off", spellcheck: "false" });
      if (f.chars) inp.setAttribute("inputmode", f.chars === "num" ? "decimal" : "latin");
      bindLimit(inp, f, function (v) { setVal(v); });
      wrap.appendChild(el("div", { class: "line-wrap" }, [inp, f.suffix ? el("span", { class: "suffix", text: f.suffix }) : null]));
    } else if (f.type === "text") {
      wrap.appendChild(buildMultiBox(f, val, setVal));
    }
    return wrap;
  }

  // 1行解答欄の入力制限（字数・英数字）。IME 変換中は確定時に判定する
  function bindLimit(inp, f, onChange) {
    var composing = false;
    function filter() {
      var v = inp.value;
      if (f.chars === "num") v = v.replace(/[０-９．，－]/g, function (c) { return String.fromCharCode(c.charCodeAt(0) - 0xFEE0); }).replace(/[^0-9.,\-]/g, "");
      if (f.chars === "alnum") v = v.replace(/[^\x20-\x7e]/g, "");
      if (f.max) v = cut(v, f.max);
      if (v !== inp.value) inp.value = v;
      onChange(v);
    }
    inp.addEventListener("compositionstart", function () { composing = true; });
    inp.addEventListener("compositionend", function () { composing = false; filter(); });
    inp.addEventListener("input", function () { if (!composing) filter(); });
  }

  // 複数行解答欄（検索・カット・コピー・ペースト、文字数表示）
  function buildMultiBox(f, val, onChange) {
    var ta = el("textarea", { class: "multi", spellcheck: "false" });
    ta.value = val || "";
    var count = el("div", { class: "mbox-foot" });
    var composing = false;
    function upd(fromInput) {
      if (f.max && chars(ta.value) > f.max) {
        var pos = ta.selectionStart;
        ta.value = cut(ta.value, f.max);
        ta.selectionStart = ta.selectionEnd = Math.min(pos, ta.value.length);
      }
      count.textContent = chars(ta.value) + " / " + (f.max || "-") + " 文字";
      if (fromInput) onChange(ta.value);
    }
    ta.addEventListener("compositionstart", function () { composing = true; });
    ta.addEventListener("compositionend", function () { composing = false; upd(true); });
    ta.addEventListener("input", function () { if (!composing) upd(true); });
    upd(false);
    var sb = buildSearchBar(function () { return ta; });
    var tools = buildClipTools(ta, function () { upd(true); }, sb);
    return el("div", { class: "mbox" }, [tools, sb.bar, ta, count]);
  }

  var ICON = {
    search: '<svg width="11" height="11" viewBox="0 0 12 12"><circle cx="5" cy="5" r="3.6" fill="none" stroke="#222" stroke-width="1.6"/><path d="M7.7 7.7 L11 11" stroke="#222" stroke-width="1.8"/></svg>',
    cut: '<svg width="11" height="11" viewBox="0 0 12 12"><circle cx="3" cy="9" r="2" fill="none" stroke="#222"/><circle cx="9" cy="9" r="2" fill="none" stroke="#222"/><path d="M4.3 7.6 L10 1 M7.7 7.6 L2 1" stroke="#222"/></svg>',
    copy: '<svg width="11" height="11" viewBox="0 0 12 12"><rect x="1" y="3" width="7" height="8" fill="#fff" stroke="#222"/><rect x="4" y="1" width="7" height="8" fill="#fff" stroke="#222"/></svg>',
    paste: '<svg width="11" height="11" viewBox="0 0 12 12"><rect x="1.5" y="2" width="8" height="9.5" fill="#222"/><rect x="3" y="1" width="5" height="2" fill="#fff" stroke="#222"/><rect x="5" y="5" width="6" height="6.5" fill="#fff" stroke="#222"/></svg>'
  };

  // カット・コピー・ペーストはアプリ内のクリップボードで行う（OS のクリップボードは使わない）
  function buildClipTools(ta, after, sb) {
    function sel() { return ta.value.substring(ta.selectionStart, ta.selectionEnd); }
    function insert(text) {
      var s = ta.selectionStart, e = ta.selectionEnd;
      ta.value = ta.value.slice(0, s) + text + ta.value.slice(e);
      ta.selectionStart = ta.selectionEnd = s + text.length;
      ta.focus();
      after();
    }
    return el("div", { class: "mbox-tools" }, [
      sb ? el("button", { html: ICON.search + " 検索", onmousedown: function (e) { e.preventDefault(); }, onclick: function () { sb.toggle(); } }) : null,
      el("button", { html: ICON.cut + " カット", onmousedown: function (e) { e.preventDefault(); }, onclick: function () { var t = sel(); if (t) { clip = t; insert(""); } } }),
      el("button", { html: ICON.copy + " コピー", onmousedown: function (e) { e.preventDefault(); }, onclick: function () { var t = sel(); if (t) clip = t; } }),
      el("button", { html: ICON.paste + " ペースト", onmousedown: function (e) { e.preventDefault(); }, onclick: function () { if (clip) insert(clip); } })
    ]);
  }

  // textarea 内の検索（一致箇所を選択して前後へ移動）
  function buildSearchBar(getTa) {
    var q = el("input", { type: "text", placeholder: "検索する文字" });
    var info = el("span", { text: "" });
    var idx = -1;
    function find(dir) {
      var ta = getTa(), s = q.value;
      if (!s) { info.textContent = ""; return; }
      var hits = [], i = -1;
      while ((i = ta.value.indexOf(s, i + 1)) >= 0) hits.push(i);
      if (!hits.length) { info.textContent = "0件"; return; }
      idx = (idx + dir + hits.length) % hits.length;
      ta.focus();
      ta.setSelectionRange(hits[idx], hits[idx] + s.length);
      info.textContent = (idx + 1) + "/" + hits.length;
    }
    q.addEventListener("input", function () { idx = -1; find(1); });
    q.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); find(e.shiftKey ? -1 : 1); } });
    var bar = el("div", { class: "searchbar" }, [q, info,
      el("button", { text: "▲", onclick: function () { find(-1); } }),
      el("button", { text: "▼", onclick: function () { find(1); } })]);
    return { bar: bar, toggle: function () { bar.classList.toggle("show"); if (bar.classList.contains("show")) q.focus(); } };
  }

  // 「後で見直す」ボタン：表示中の大問の解答欄すべてにチェック
  function flagAll() {
    var pi = S.cur;
    PROBS[pi].items.forEach(function (it, ii) { S.flags[iid(pi, ii)] = true; });
    save();
    renderAnswers();
  }

  // ---------------------------------------------------------------------
  // 解答状況
  // ---------------------------------------------------------------------
  var statusEl = null;
  function toggleStatus() {
    if (statusOpen) { statusEl.remove(); statusOpen = false; return; }
    statusOpen = true;
    var rows = el("div", { class: "status-rows" });
    PROBS.forEach(function (P, pi) {
      var row = el("div", { class: "status-row" + (S.selected.indexOf(P.no) < 0 ? " unsel" : "") });
      P.items.forEach(function (it, ii) {
        var key = iid(pi, ii);
        var cls = "tile" + (itemAnswered(pi, ii) ? " answered" : "") + (S.flags[key] ? " flagged" : "") + (focusedItem === key ? " doing" : "");
        row.appendChild(el("div", { class: cls, onclick: function () {
          toggleStatus();
          renderExam.go(pi);
          var t = rightView.querySelector('[data-item="' + key + '"]');
          if (t) { t.scrollIntoView({ block: "start" }); focusedItem = key; var f = t.querySelector("input,select,textarea,.choice-btn"); if (f) f.focus(); }
        } }, [ii === 0 ? el("span", { class: "pno", text: "問" + P.no }) : null, it.label]));
      });
      rows.appendChild(row);
    });
    statusEl = el("div", { class: "status-view" }, [rows, el("div", { class: "legend" }, [
      el("div", null, [el("span"), "未解答"]),
      el("div", null, [el("span", { class: "a" }), "解答済み"]),
      el("div", null, [el("span", { class: "f" }), "後で見直すもの"]),
      el("div", null, [el("span", { class: "d" }), "解答中"])
    ])]);
    $(".exam").appendChild(statusEl);
  }

  // ---------------------------------------------------------------------
  // フローティングウィンドウ（ドラッグで移動）
  // ---------------------------------------------------------------------
  function makeWin(opts) {
    var title = el("div", { class: "win-title" }, opts.titleChildren);
    var w = el("div", { class: "win" + (opts.resizable ? " resizable" : ""), style: opts.style || "" }, [title, opts.body].concat(opts.foot ? [opts.foot] : []));
    title.addEventListener("pointerdown", function (e) {
      if (e.target.closest("button,input,label")) return;
      e.preventDefault();
      var r = w.getBoundingClientRect(), dx = e.clientX - r.left, dy = e.clientY - r.top;
      title.setPointerCapture(e.pointerId);
      function mv(ev) {
        w.style.left = Math.max(0, Math.min(window.innerWidth - 60, ev.clientX - dx)) + "px";
        w.style.top = Math.max(0, Math.min(window.innerHeight - 30, ev.clientY - dy)) + "px";
      }
      function up() { title.removeEventListener("pointermove", mv); title.removeEventListener("pointerup", up); }
      title.addEventListener("pointermove", mv);
      title.addEventListener("pointerup", up);
    });
    document.body.appendChild(w);
    return w;
  }
  function transToggle(getWin) {
    var cb = el("input", { type: "checkbox" });
    cb.addEventListener("change", function () { getWin().classList.toggle("trans", cb.checked); });
    return el("label", null, [cb, "半透明"]);
  }

  // ---------------------------------------------------------------------
  // 問題選択
  // ---------------------------------------------------------------------
  var selWin = null;
  function openSelectDialog() {
    if (selWin) return;
    var pending = S.selected.slice();
    var countEl = el("div", { class: "sel-count" });
    var msg = el("div", { class: "sel-msg" });
    function upd() { countEl.textContent = "選択中：" + pending.length + " / " + CFG.select + " 問"; }
    var list = PROBS.map(function (P) {
      var req = CFG.required.indexOf(P.no) >= 0;
      var cb = el("input", { type: "checkbox", checked: pending.indexOf(P.no) >= 0, disabled: req });
      cb.addEventListener("change", function () {
        if (cb.checked) { if (pending.indexOf(P.no) < 0) pending.push(P.no); }
        else pending = pending.filter(function (n) { return n !== P.no; });
        msg.textContent = ""; upd();
      });
      return el("label", null, [cb, "問題" + P.no + "　" + P.title + (req ? "（必須）" : "")]);
    });
    upd();
    var body = el("div", { class: "sel-body" }, [
      el("div", { text: "問題を選択して「選択」ボタンを押すことで選択した問題が決定されます。" }),
      el("div", { text: "試験時間内は，選択する問題を何度でも変更できます。" }),
      el("div", { class: "red", text: "「選択」が押されるまでは選択問題は反映されません。" }),
      countEl
    ].concat(list).concat([msg]));
    var foot = el("div", { class: "win-foot" }, [el("button", { class: "btn navy", text: "選択", onclick: function () {
      if (pending.length > CFG.select) { msg.textContent = "選択できる問題数は " + CFG.select + " 問です。選択を見直してください。"; return; }
      pending.sort(function (a, b) { return a - b; });
      S.selected = pending; save();
      selWin.remove(); selWin = null;
      renderAnswers();
    } })]);
    selWin = makeWin({
      titleChildren: [transToggle(function () { return selWin; }), el("span", { class: "grow" })],
      body: body, foot: foot,
      style: "left:calc(50% - 230px);top:120px;width:460px;height:" + Math.min(window.innerHeight - 140, 200 + PROBS.length * 27) + "px"
    });
  }

  // ---------------------------------------------------------------------
  // メモ
  // ---------------------------------------------------------------------
  var memoWin = null;
  var MEMO_MAX = 10000;
  function toggleMemo() {
    if (memoWin) { closeMemo(); return; }
    var area = el("div", { class: "memo-area", contenteditable: "true", spellcheck: "false" });
    area.innerHTML = S.memo || "";
    var count = el("div", { class: "memo-count" });
    var lastGood = area.innerHTML, composing = false;
    function upd() {
      var n = chars(area.innerText.replace(/\n$/, ""));
      if (n > MEMO_MAX) { area.innerHTML = lastGood; n = chars(area.innerText.replace(/\n$/, "")); placeCaretEnd(area); }
      lastGood = area.innerHTML;
      count.textContent = n + " / " + MEMO_MAX.toLocaleString() + " 文字";
      S.memo = area.innerHTML; save();
    }
    area.addEventListener("compositionstart", function () { composing = true; });
    area.addEventListener("compositionend", function () { composing = false; upd(); });
    area.addEventListener("input", function () { if (!composing) upd(); });
    upd();

    function mark(color) {
      area.focus();
      try { document.execCommand("styleWithCSS", false, true); } catch (e) { /* noop */ }
      document.execCommand("hiliteColor", false, color);
      upd();
    }
    function selText() { var s = window.getSelection(); return s && area.contains(s.anchorNode) ? s.toString() : ""; }
    function insertText(t) { area.focus(); document.execCommand("insertText", false, t); upd(); }

    var q = el("input", { type: "text", placeholder: "検索", style: "width:110px;height:18px;font-size:11px" });
    var hitInfo = el("span");
    var hitIdx = -1;
    function find(dir) {
      var s = q.value; if (!s) { hitInfo.textContent = ""; return; }
      var walker = document.createTreeWalker(area, NodeFilter.SHOW_TEXT), nodes = [], text = "", n;
      while ((n = walker.nextNode())) { nodes.push({ n: n, start: text.length }); text += n.nodeValue; }
      var hits = [], i = -1;
      while ((i = text.indexOf(s, i + 1)) >= 0) hits.push(i);
      if (!hits.length) { hitInfo.textContent = "0件"; return; }
      hitIdx = (hitIdx + dir + hits.length) % hits.length;
      function locate(off) {
        for (var k = nodes.length - 1; k >= 0; k--) if (off >= nodes[k].start) return { node: nodes[k].n, off: off - nodes[k].start };
      }
      var a = locate(hits[hitIdx]), b = locate(hits[hitIdx] + s.length);
      var r = document.createRange(); r.setStart(a.node, a.off); r.setEnd(b.node, b.off);
      var sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(r);
      var rect = r.getBoundingClientRect(), ar = area.getBoundingClientRect();
      if (rect.top < ar.top || rect.bottom > ar.bottom) area.scrollTop += rect.top - ar.top - 30;
      hitInfo.textContent = (hitIdx + 1) + "/" + hits.length;
    }
    q.addEventListener("input", function () { hitIdx = -1; find(1); });
    q.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); find(e.shiftKey ? -1 : 1); } });

    function nd(e) { e.preventDefault(); }
    var tools = el("div", { class: "memo-tools" }, [
      el("span", { html: ICON.search }), q, hitInfo,
      el("button", { class: "txt", text: "▲", onclick: function () { find(-1); } }),
      el("button", { class: "txt", text: "▼", onclick: function () { find(1); } }),
      el("span", { class: "sep" }),
      el("button", { class: "clr", title: "赤", style: "background:#ff3b3b", onmousedown: nd, onclick: function () { mark("#ffb3b3"); } }),
      el("button", { class: "clr", title: "青", style: "background:#2a52ff", onmousedown: nd, onclick: function () { mark("#b9c8ff"); } }),
      el("button", { class: "clr", title: "黄", style: "background:#ffb300", onmousedown: nd, onclick: function () { mark("#fff176"); } }),
      el("button", { class: "clr", title: "マーカーを消す", style: "background:#fff", onmousedown: nd, onclick: function () { mark("transparent"); } }),
      el("span", { class: "sep" }),
      el("button", { class: "txt", html: ICON.cut + " カット", onmousedown: nd, onclick: function () { var t = selText(); if (t) { clip = t; area.focus(); document.execCommand("delete"); upd(); } } }),
      el("button", { class: "txt", html: ICON.copy + " コピー", onmousedown: nd, onclick: function () { var t = selText(); if (t) clip = t; } }),
      el("button", { class: "txt", html: ICON.paste + " ペースト", onmousedown: nd, onclick: function () { if (clip) insertText(clip); } })
    ]);
    var romaji = el("button", { class: "ime" + (S.ime === "romaji" ? " on" : ""), text: "ローマ字" });
    var kana = el("button", { class: "ime" + (S.ime === "kana" ? " on" : ""), text: "かな" });
    [romaji, kana].forEach(function (b) {
      b.addEventListener("click", function () {
        S.ime = b === romaji ? "romaji" : "kana"; save();
        romaji.classList.toggle("on", S.ime === "romaji"); kana.classList.toggle("on", S.ime === "kana");
      });
    });
    var body = el("div", { class: "win-body" }, [tools, area, count]);
    var foot = el("div", { class: "win-foot" }, [el("button", { class: "btn navy", text: "閉じる", onclick: closeMemo })]);
    memoWin = makeWin({
      titleChildren: [transToggle(function () { return memoWin; }), el("span", { class: "grow" }), romaji, kana, el("button", { class: "x", text: "×", onclick: closeMemo })],
      body: body, foot: foot, resizable: true,
      style: "left:calc(50% - 330px);top:110px;width:660px;height:470px"
    });
    area.focus();
  }
  function closeMemo() { if (memoWin) { memoWin.remove(); memoWin = null; } }
  function placeCaretEnd(node) {
    var r = document.createRange(); r.selectNodeContents(node); r.collapse(false);
    var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
  }

  // ---------------------------------------------------------------------
  // 電卓（四則演算）
  // ---------------------------------------------------------------------
  var calcWin = null;
  function toggleCalc() {
    if (calcWin) { calcWin.remove(); calcWin = null; $("#calcBtn").classList.remove("on"); return; }
    $("#calcBtn").classList.add("on");
    var disp = el("div", { class: "calc-disp", text: "0" });
    var cur = "0", acc = null, op = null, fresh = true;
    function show(s) { disp.textContent = s.length > 14 ? Number(s).toPrecision(10).replace(/\.?0+(e|$)/, "$1") : s; }
    function calc(a, b, o) {
      var r = o === "+" ? a + b : o === "−" ? a - b : o === "×" ? a * b : (b === 0 ? NaN : a / b);
      return Math.round(r * 1e10) / 1e10;
    }
    function press(k) {
      if (/^[0-9]$/.test(k)) { cur = fresh || cur === "0" ? k : (cur.replace(/[-.]/g, "").length >= 12 ? cur : cur + k); fresh = false; }
      else if (k === ".") { if (fresh) { cur = "0."; fresh = false; } else if (cur.indexOf(".") < 0) cur += "."; }
      else if (k === "C") { cur = "0"; acc = null; op = null; fresh = true; }
      else if (k === "CE") { cur = "0"; fresh = true; }
      else if (k === "←") { if (!fresh) cur = cur.length > 1 ? cur.slice(0, -1) : "0"; }
      else if (k === "±") { if (cur !== "0") cur = cur[0] === "-" ? cur.slice(1) : "-" + cur; }
      else if (k === "=") { if (op != null && acc != null) { cur = String(calc(acc, parseFloat(cur), op)); acc = null; op = null; fresh = true; } }
      else { // 演算子
        if (op != null && acc != null && !fresh) cur = String(calc(acc, parseFloat(cur), op));
        acc = parseFloat(cur); op = k; fresh = true;
      }
      show(cur === "NaN" ? "エラー" : cur);
    }
    var keys = ["C", "CE", "←", "÷", "7", "8", "9", "×", "4", "5", "6", "−", "1", "2", "3", "+", "±", "0", ".", "="];
    var grid = el("div", { class: "calc-keys" }, keys.map(function (k) {
      return el("button", { class: "÷×−+".indexOf(k) >= 0 ? "op" : k === "=" ? "eq" : "", text: k, onclick: function () { press(k); } });
    }));
    var SIZES = { 小: [220, 260, 12], 中: [280, 330, 14], 大: [360, 420, 17] };
    var szBtns = {};
    function setSize(s) {
      calcWin.style.width = SIZES[s][0] + "px"; calcWin.style.height = SIZES[s][1] + "px";
      calcWin.querySelector(".calc").style.fontSize = SIZES[s][2] + "px";
      Object.keys(szBtns).forEach(function (k) { szBtns[k].classList.toggle("on", k === s); });
    }
    ["小", "中", "大"].forEach(function (s) { szBtns[s] = el("button", { class: "sz", text: s, onclick: function () { setSize(s); } }); });
    calcWin = makeWin({
      titleChildren: [el("span", { text: "電卓" }), el("span", { class: "grow" }), szBtns["小"], szBtns["中"], szBtns["大"],
        el("button", { class: "x", text: "×", onclick: toggleCalc })],
      body: el("div", { class: "calc" }, [disp, grid]),
      style: "left:" + (window.innerWidth - 330) + "px;top:120px"
    });
    setSize("中");
  }

  // ---------------------------------------------------------------------
  // 問題（別画面）
  // ---------------------------------------------------------------------
  function togglePopup() {
    if (popupState) { popupState.win.remove(); popupState = null; return; }
    var viewer = buildProblemViewer({ main: false });
    var big = el("button", { class: "sz", text: "大" }), std = el("button", { class: "sz on", text: "標準" });
    var win;
    function setSize(isBig) {
      big.classList.toggle("on", isBig); std.classList.toggle("on", !isBig);
      if (isBig) { win.style.width = Math.round(window.innerWidth * 0.9) + "px"; win.style.height = Math.round(window.innerHeight * 0.86) + "px"; win.style.left = "5%"; win.style.top = "6%"; }
      else { win.style.width = Math.round(window.innerWidth * 0.55) + "px"; win.style.height = Math.round(window.innerHeight * 0.7) + "px"; }
      viewer.relayout();
    }
    big.addEventListener("click", function () { setSize(true); });
    std.addEventListener("click", function () { setSize(false); });
    var close = function () { togglePopup(); };
    win = makeWin({
      titleChildren: [el("span", { text: "問題（別画面）" }), el("span", { class: "grow" }), big, std, el("button", { class: "x", text: "×", onclick: close })],
      body: el("div", { class: "win-body" }, [viewer.toolbar, viewer.scroll]),
      foot: el("div", { class: "win-foot" }, [el("button", { class: "btn navy", text: "閉じる", onclick: close })]),
      resizable: true,
      style: "left:8%;top:12%"
    });
    popupState = { win: win, viewer: viewer };
    setSize(false);
    viewer.show(S.cur);
    new ResizeObserver(function () { viewer.relayout(); }).observe(win);
  }

  // ---------------------------------------------------------------------
  // 参考資料・注意事項
  // ---------------------------------------------------------------------
  var refWin = null;
  function openReference() {
    if (refWin) return;
    var content = el("div", { class: "ref-content" });
    var refZoom = 100;
    var tabsDef = [
      ["注意事項", function () {
        return [el("h3", { text: "試験中の注意事項" }), el("ul", null, [
          el("li", { text: "試験時間は " + CFG.timeMin + " 分です。残り時間は画面右上に表示されます。" }),
          el("li", { text: "解答する問題は「問題選択」で選び、必ず「選択」ボタンを押してください。必須問題は最初から選択されています。" }),
          el("li", { text: "採点は選択された問題だけが対象です（この模擬試験では、終了後の解答例表示も選択した問題だけです）。" }),
          el("li", { text: "問題文のコピー・貼り付けはできません。解答欄とメモの間では、カット・コピー・ペーストボタンを使ってください。" }),
          el("li", { text: "残り時間が0になると、試験は自動的に終了します。" })
        ])];
      }]
    ];
    if (EXAM.reference) tabsDef.push(["参考資料", function () {
      var zr = el("input", { type: "range", min: 50, max: 200, step: 10, value: refZoom });
      var imgs = EXAM.reference.pages.map(function (src) { return el("img", { src: src, alt: "", draggable: "false" }); });
      function apply() { imgs.forEach(function (im) { im.style.maxWidth = (9 * refZoom) + "px"; }); }
      zr.addEventListener("input", function () { refZoom = +zr.value; apply(); });
      apply();
      return [el("div", { style: "font-size:11px;margin-bottom:8px" }, ["拡大・縮小 ", zr])].concat(imgs);
    }]);
    tabsDef.push(["問題選択", function () {
      return [el("p", { text: "画面上部の「問題選択」ボタンで、解答する問題（大問）を選びます。「選択中：○ / ○ 問」は、選んだ問題数と選択が必要な問題数です。何度でも選び直せますが、「選択」ボタンを押すまでは反映されません。" })];
    }]);
    tabsDef.push(["問題（別画面）", function () {
      return [el("p", { text: "画面下部の「問題（別画面）」ボタンで、表示中の問題文を別ウィンドウに表示します。「大」「標準」でサイズを変えられ、外枠をドラッグしても変えられます。別画面のマーカーは元の画面とは別に保持されます。" })];
    }]);
    tabsDef.push(["マーカー", function () {
      return [el("p", { text: "問題文の上のツールバーで、マーカーモードのオフ（通常のポインター）、赤・青・黄色のマーカー、消しゴムを切り替えます。「サイズ」で太さを変え、「クリア」で表示中の問題のマーカーを一括して消します。" })];
    }]);
    tabsDef.push(["解答欄", function () {
      return [el("p", { text: "選択ボタンは、もう一度押すと未解答に戻ります。1行解答欄には文字数や英数字の入力制限がある場合があります。複数行解答欄は右下に入力文字数と上限文字数が表示され、上限を超えた分は削除されます。設問番号の上のチェックボックスで「後で見直すもの」にできます。" })];
    }]);
    var tabBtns = [];
    function showTab(i) {
      tabBtns.forEach(function (b, j) { b.classList.toggle("on", i === j); });
      content.innerHTML = "";
      tabsDef[i][1]().forEach(function (n) { content.appendChild(n); });
      content.scrollTop = 0;
    }
    var tabs = el("div", { class: "tabs" }, tabsDef.map(function (t, i) {
      var b = el("button", { text: t[0], onclick: function () { showTab(i); } }); tabBtns.push(b); return b;
    }));
    function close() { refWin.remove(); refWin = null; }
    refWin = makeWin({
      titleChildren: [el("span", { text: EXAM.reference ? "参考資料" : "注意事項" }), el("span", { class: "grow" }), el("button", { class: "x", text: "×", onclick: close })],
      body: el("div", { class: "win-body" }, [tabs, content]),
      foot: el("div", { class: "win-foot" }, [el("button", { class: "btn navy", text: "閉じる", onclick: close })]),
      resizable: true,
      style: "left:calc(50% - 380px);top:90px;width:760px;height:" + Math.round(window.innerHeight * 0.78) + "px"
    });
    showTab(EXAM.reference ? 1 : 0);
  }

  // ---------------------------------------------------------------------
  // 確認ダイアログ・試験終了
  // ---------------------------------------------------------------------
  function dialog(title, message, onYes) {
    var bg = el("div", { class: "modal-bg" }, [el("div", { class: "dialog" }, [
      el("h4", { text: title }), el("p", { text: message }),
      el("div", { class: "row" }, [
        el("button", { class: "btn navy", text: "はい", onclick: function () { bg.remove(); onYes(); } }),
        el("button", { class: "btn navy", text: "いいえ", onclick: function () { bg.remove(); } })
      ])
    ])]);
    document.body.appendChild(bg);
  }
  function confirmEnd() {
    if (S.selected.length < CFG.select) {
      dialog("確認", "選択が必要な問題数（" + CFG.select + "問）に対して、選択中の問題は " + S.selected.length + " 問です。採点は選択された問題のみとなります。このまま試験を終了しますか？", function () { finishExam(false); });
    } else {
      dialog("確認", EXAM.subject + "を終了します。", function () { finishExam(false); });
    }
  }
  function cleanupWindows() {
    [selWin, memoWin, calcWin, refWin].forEach(function (w) { if (w) w.remove(); });
    selWin = memoWin = calcWin = refWin = null;
    if (popupState) { popupState.win.remove(); popupState = null; }
    Array.prototype.forEach.call(document.querySelectorAll(".modal-bg"), function (n) { n.remove(); });
  }
  function finishExam(timeUp) {
    clearInterval(timerId);
    cleanupWindows();
    S.phase = "done";
    S.finishedAt = Date.now();
    S.timeUp = !!timeUp;
    save();
    document.body.classList.remove("in-exam");
    document.documentElement.classList.remove("inverted");
    root.innerHTML = "";
    root.appendChild(el("div", { class: "end-wrap" }, [el("div", { class: "end-card" }, [
      el("h2", { text: (timeUp ? "残り時間が0になったため、" : "") + EXAM.subject + "は終了しました。" }),
      el("p", { text: "選択した問題：" + (S.selected.length ? S.selected.map(function (n) { return "問" + n; }).join("，") : "なし") }),
      el("p", { text: "本番の試験では、試験画面に得点は表示されません。" }),
      el("div", { class: "btns" }, [
        el("button", { class: "btn", text: "試験一覧へ", onclick: renderTop }),
        CFG.review ? el("button", { class: "btn navy", text: "解答例と見比べる", onclick: renderReview }) : null
      ])
    ])]));
  }

  // ======================================================================
  // 画面: 解答例との見比べ（練習用・自己採点）
  // ======================================================================
  function loadAnswers(cb) {
    if (window.CBT_ANSWERS && window.CBT_ANSWERS[EXAM_ID]) { cb(); return; }
    var s = document.createElement("script");
    s.src = "data/" + EXAM_ID + "/answers.js";
    s.onload = cb;
    s.onerror = function () { alert("解答例データを読み込めませんでした。"); };
    document.head.appendChild(s);
  }
  function norm(s) {
    return String(s || "").replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (c) { return String.fromCharCode(c.charCodeAt(0) - 0xFEE0); })
      .replace(/[\s,，、。．.]/g, "").toLowerCase();
  }
  function renderReview() {
    loadAnswers(function () {
      var ANS = window.CBT_ANSWERS[EXAM_ID], NOTES = (window.CBT_ANSWER_NOTES || {})[EXAM_ID] || {};
      S.self = S.self || {};
      root.innerHTML = "";
      var summary = el("div", { class: "review-summary" });
      function updSummary() {
        var o = 0, t = 0, x = 0, n = 0;
        PROBS.forEach(function (P, pi) {
          if (S.selected.indexOf(P.no) < 0) return;
          P.items.forEach(function (it, ii) {
            n++;
            var m = S.self[iid(pi, ii)];
            if (m === "o") o++; else if (m === "t") t++; else if (m === "x") x++;
          });
        });
        summary.textContent = "自己採点：○ " + o + "　△ " + t + "　× " + x + "　未採点 " + (n - o - t - x) + "（全 " + n + " 設問）。記号・数値の設問は解答例と一致したものに自動で○を付けています（表記の揺れは各自で判断してください）。";
      }
      var wrap = el("div", { class: "review" }, [
        el("h2", { text: "解答例と見比べる（" + EXAM.source + "）" }),
        summary
      ]);
      PROBS.forEach(function (P, pi) {
        if (S.selected.indexOf(P.no) < 0) return;
        var tbl = el("table", null, [el("tr", null, [el("th", { text: "設問", style: "width:90px" }), el("th", { text: "あなたの解答" }), el("th", { text: "解答例" }), el("th", { text: "自己採点", style: "width:110px" })])]);
        P.items.forEach(function (it, ii) {
          var key = iid(pi, ii);
          var model = (ANS[P.no] || [])[ii] || [];
          var mine = it.fields.map(function (f, fi) {
            var v = S.answers[fid(pi, ii, fi)];
            v = Array.isArray(v) ? v.join("，") : (v || "（未解答）");
            return (f.key ? f.key + "： " : "") + v;
          }).join("\n");
          var modelTxt = it.fields.map(function (f, fi) { return (f.key ? f.key + "： " : "") + (model[fi] || ""); }).join("\n");
          var objective = it.fields.every(function (f) { return f.type === "choice" || f.type === "pulldown" || f.type === "multi" || f.chars === "num"; });
          if (S.self[key] == null && objective) {
            var ok = it.fields.every(function (f, fi) {
              var v = S.answers[fid(pi, ii, fi)];
              return norm(Array.isArray(v) ? v.join("") : v) === norm(model[fi]);
            });
            S.self[key] = ok ? "o" : "x";
          }
          var markBox = el("div", { class: "mark" });
          [["o", "○"], ["t", "△"], ["x", "×"]].forEach(function (m) {
            var b = el("button", { class: m[0] + (S.self[key] === m[0] ? " on" : ""), text: m[1], onclick: function () {
              S.self[key] = S.self[key] === m[0] ? null : m[0];
              Array.prototype.forEach.call(markBox.children, function (c) { c.classList.remove("on"); });
              if (S.self[key]) b.classList.add("on");
              save(); updSummary();
            } });
            markBox.appendChild(b);
          });
          var note = NOTES[P.no + "-" + ii];
          tbl.appendChild(el("tr", null, [
            el("td", { text: it.label }),
            el("td", { class: "mine", text: mine }),
            el("td", null, [el("div", { class: "model", text: modelTxt }), note ? el("div", { class: "note", text: "※" + note }) : null]),
            el("td", null, [markBox])
          ]));
        });
        wrap.appendChild(el("div", { class: "review-prob" }, [el("h3", { text: "問" + P.no + "　" + P.title }), tbl]));
      });
      if (!S.selected.length) wrap.appendChild(el("p", { text: "選択された問題がありません。" }));
      wrap.appendChild(el("p", { style: "font-size:12px;color:#666", text: "解答例は IPA 公表の「解答例」によります。記述式の設問は、採点講評もあわせて確認してください。" }));
      wrap.appendChild(el("button", { class: "btn", text: "試験一覧へ", onclick: renderTop, style: "height:30px" }));
      root.appendChild(el("div", { class: "top-wrap" }, [wrap]));
      save(); updSummary();
      window.scrollTo(0, 0);
    });
  }

  // ======================================================================
  // 起動
  // ======================================================================
  if (S.phase === "exam" && S.endAt <= Date.now()) { finishExam(true); }
  else renderTop();
})();
