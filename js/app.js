(function () {
  "use strict";

  var QUESTIONS = window.QUESTIONS || [];
  var HISTORY_KEY = "itsmStudyHistory_v1";
  var CHOICE_KEYS = ["ア", "イ", "ウ", "エ"];

  var app = document.getElementById("app");
  var session = null; // current quiz session state

  // ---------- History (localStorage) ----------
  function loadHistory() {
    try {
      var raw = localStorage.getItem(HISTORY_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function saveHistory(history) {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch (e) {
      // ignore quota / privacy-mode errors
    }
  }

  function recordAnswer(questionId, isCorrect) {
    var history = loadHistory();
    var entry = history[questionId] || { shown: 0, correct: 0, lastResult: null, lastAt: null };
    entry.shown += 1;
    if (isCorrect) entry.correct += 1;
    entry.lastResult = isCorrect;
    entry.lastAt = new Date().toISOString();
    history[questionId] = entry;
    saveHistory(history);
  }

  function resetHistory() {
    localStorage.removeItem(HISTORY_KEY);
  }

  // ---------- Helpers ----------
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  function getCategories() {
    var set = {};
    QUESTIONS.forEach(function (q) { set[q.category] = true; });
    return Object.keys(set);
  }

  function el(tag, attrs, children) {
    var e = document.createElement(tag);
    attrs = attrs || {};
    Object.keys(attrs).forEach(function (k) {
      if (attrs[k] === null || attrs[k] === undefined || attrs[k] === false) return;
      if (k === "class") e.className = attrs[k];
      else if (k === "text") e.textContent = attrs[k];
      else if (k.indexOf("on") === 0 && typeof attrs[k] === "function") {
        e.addEventListener(k.slice(2), attrs[k]);
      } else {
        e.setAttribute(k, attrs[k]);
      }
    });
    (children || []).forEach(function (c) {
      if (c) e.appendChild(c);
    });
    return e;
  }

  function clear(node) {
    while (node.firstChild) node.removeChild(node.firstChild);
  }

  // ---------- Views ----------
  function renderHome() {
    session = null;
    clear(app);

    var history = loadHistory();
    var total = QUESTIONS.length;
    var answeredIds = Object.keys(history);
    var answeredCount = answeredIds.length;
    var totalShown = 0, totalCorrect = 0;
    answeredIds.forEach(function (id) {
      totalShown += history[id].shown;
      totalCorrect += history[id].correct;
    });
    var overallRate = totalShown > 0 ? Math.round((totalCorrect / totalShown) * 1000) / 10 : 0;
    var wrongCount = answeredIds.filter(function (id) { return history[id].lastResult === false; }).length;

    var summaryCard = el("div", { class: "card" }, [
      el("h2", { text: "学習状況サマリ" }),
      el("div", { class: "summary-grid" }, [
        summaryStat(total, "全問題数"),
        summaryStat(answeredCount, "学習済み問題数"),
        summaryStat(overallRate + "%", "累積正答率"),
        summaryStat(wrongCount, "現在の苦手問題数")
      ])
    ]);

    var modeCard = el("div", { class: "card" }, [
      el("h2", { text: "演習を始める" }),
      buildModeList()
    ]);

    app.appendChild(summaryCard);
    app.appendChild(modeCard);
  }

  function summaryStat(num, label) {
    return el("div", { class: "summary-stat" }, [
      el("div", { class: "num", text: String(num) }),
      el("div", { class: "label", text: label })
    ]);
  }

  function buildModeList() {
    var list = el("div", { class: "mode-list" });

    // Mode 1: random practice
    var randomCountSelect = el("select", { class: "count-select" });
    [5, 10, 20, 30, QUESTIONS.length].forEach(function (n, idx) {
      var label = (idx === 4) ? "全問(" + n + "問)" : n + "問";
      randomCountSelect.appendChild(el("option", { value: String(n), text: label }));
    });
    randomCountSelect.value = "10";
    list.appendChild(el("div", { class: "mode-item" }, [
      el("h3", { text: "① ランダム演習" }),
      el("p", { text: "全カテゴリからランダムに出題します。" }),
      el("div", { class: "mode-controls" }, [
        randomCountSelect,
        el("button", { class: "btn", onclick: function () {
          startQuiz(shuffle(QUESTIONS).slice(0, parseInt(randomCountSelect.value, 10)), "ランダム演習");
        } }, [document.createTextNode("開始")])
      ])
    ]));

    // Mode 2: category practice
    var catSelect = el("select", {});
    getCategories().forEach(function (c) {
      catSelect.appendChild(el("option", { value: c, text: c }));
    });
    list.appendChild(el("div", { class: "mode-item" }, [
      el("h3", { text: "② 分野別演習" }),
      el("p", { text: "指定した分野の問題のみを出題します。" }),
      el("div", { class: "mode-controls" }, [
        catSelect,
        el("button", { class: "btn", onclick: function () {
          var cat = catSelect.value;
          var qs = shuffle(QUESTIONS.filter(function (q) { return q.category === cat; }));
          startQuiz(qs, cat);
        } }, [document.createTextNode("開始")])
      ])
    ]));

    // Mode 3: weak questions
    var history = loadHistory();
    var wrongQs = QUESTIONS.filter(function (q) {
      return history[q.id] && history[q.id].lastResult === false;
    });
    var weakItem = el("div", { class: "mode-item" }, [
      el("h3", { text: "③ 苦手問題の復習" }),
      el("p", { text: "直近の解答で不正解だった問題（現在 " + wrongQs.length + " 問）のみを出題します。" }),
      el("div", { class: "mode-controls" }, [
        el("button", {
          class: "btn" + (wrongQs.length === 0 ? " disabled" : ""),
          disabled: wrongQs.length === 0 ? "disabled" : null,
          onclick: function () {
            if (wrongQs.length === 0) return;
            startQuiz(shuffle(wrongQs), "苦手問題の復習");
          }
        }, [document.createTextNode("開始")])
      ])
    ]);
    list.appendChild(weakItem);

    // Mode 4: all sequential
    list.appendChild(el("div", { class: "mode-item" }, [
      el("h3", { text: "④ 全問通し演習" }),
      el("p", { text: "全" + QUESTIONS.length + "問を順番に出題します（本番形式の通し演習）。" }),
      el("div", { class: "mode-controls" }, [
        el("button", { class: "btn secondary", onclick: function () {
          startQuiz(QUESTIONS.slice(), "全問通し演習");
        } }, [document.createTextNode("開始")])
      ])
    ]));

    return list;
  }

  function startQuiz(questions, title) {
    if (!questions || questions.length === 0) {
      alert("対象の問題がありません。");
      return;
    }
    session = {
      title: title,
      questions: questions,
      index: 0,
      answers: [], // {id, selected, correct}
      answered: false,
      selectedChoice: null
    };
    renderQuiz();
  }

  function renderQuiz() {
    clear(app);
    var q = session.questions[session.index];
    var total = session.questions.length;
    var progressPct = Math.round((session.index / total) * 100);

    var card = el("div", { class: "card" });

    card.appendChild(el("div", { class: "quiz-progress" }, [
      el("span", { text: session.title }),
      el("span", { text: "問 " + (session.index + 1) + " / " + total })
    ]));
    var track = el("div", { class: "progress-bar-track" });
    track.appendChild(el("div", { class: "progress-bar-fill", style: "width:" + progressPct + "%" }));
    card.appendChild(track);

    card.appendChild(el("div", { class: "category-badge", text: q.category }));
    card.appendChild(el("div", { class: "question-text", text: q.question }));

    var choiceList = el("div", { class: "choice-list" });
    CHOICE_KEYS.forEach(function (key) {
      if (!(key in q.choices)) return;
      var btn = el("button", { class: "choice-btn" }, [
        el("span", { class: "choice-label", text: key }),
        el("span", { class: "choice-text", text: q.choices[key] })
      ]);
      btn.addEventListener("click", function () {
        if (session.answered) return;
        submitAnswer(key);
      });
      if (session.answered) {
        btn.disabled = true;
        if (key === q.answer) btn.classList.add("correct");
        else if (key === session.selectedChoice) btn.classList.add("wrong");
      }
      choiceList.appendChild(btn);
    });
    card.appendChild(choiceList);

    if (session.answered) {
      var isCorrect = session.selectedChoice === q.answer;
      var feedback = el("div", { class: "answer-feedback " + (isCorrect ? "correct" : "wrong") }, [
        el("div", { class: "result-label", text: isCorrect ? "正解！" : "不正解（正解: " + q.answer + "）" }),
        el("div", { class: "explanation", text: q.explanation })
      ]);
      card.appendChild(feedback);

      var actions = el("div", { class: "quiz-actions" });
      var isLast = session.index === total - 1;
      actions.appendChild(el("button", {
        class: "btn",
        onclick: function () {
          if (isLast) {
            renderResult();
          } else {
            session.index += 1;
            session.answered = false;
            session.selectedChoice = null;
            renderQuiz();
          }
        }
      }, [document.createTextNode(isLast ? "結果を見る" : "次の問題へ")]));
      card.appendChild(actions);
    }

    app.appendChild(card);
  }

  function submitAnswer(choiceKey) {
    var q = session.questions[session.index];
    var isCorrect = choiceKey === q.answer;
    session.answered = true;
    session.selectedChoice = choiceKey;
    session.answers.push({ id: q.id, category: q.category, selected: choiceKey, correct: isCorrect });
    recordAnswer(q.id, isCorrect);
    renderQuiz();
  }

  function renderResult() {
    clear(app);
    var answers = session.answers;
    var total = answers.length;
    var correctCount = answers.filter(function (a) { return a.correct; }).length;
    var pct = total > 0 ? Math.round((correctCount / total) * 1000) / 10 : 0;

    var card = el("div", { class: "card" });
    card.appendChild(el("h2", { text: session.title + " - 結果" }));
    card.appendChild(el("div", { class: "score-hero" }, [
      el("div", { class: "score-num", text: correctCount + " / " + total }),
      el("div", { class: "score-sub", text: "正答率 " + pct + "%" })
    ]));

    // category breakdown
    var byCat = {};
    answers.forEach(function (a) {
      if (!byCat[a.category]) byCat[a.category] = { total: 0, correct: 0 };
      byCat[a.category].total += 1;
      if (a.correct) byCat[a.category].correct += 1;
    });
    var table = el("table", { class: "breakdown" });
    var thead = el("tr", {}, [
      el("th", { text: "分野" }),
      el("th", { text: "正答数" }),
      el("th", { text: "正答率" })
    ]);
    table.appendChild(thead);
    Object.keys(byCat).forEach(function (cat) {
      var c = byCat[cat];
      var rate = Math.round((c.correct / c.total) * 1000) / 10;
      table.appendChild(el("tr", {}, [
        el("td", { text: cat }),
        el("td", { text: c.correct + " / " + c.total }),
        el("td", { text: rate + "%" })
      ]));
    });
    card.appendChild(table);

    var actions = el("div", { class: "quiz-actions" });
    actions.appendChild(el("button", { class: "btn secondary", onclick: renderHome }, [document.createTextNode("ホームに戻る")]));
    actions.appendChild(el("button", { class: "btn", onclick: function () {
      startQuiz(shuffle(session.questions.slice()), session.title);
    } }, [document.createTextNode("同条件でもう一度")]));
    card.appendChild(actions);

    app.appendChild(card);

    // wrong review
    var wrongAnswers = answers.filter(function (a) { return !a.correct; });
    if (wrongAnswers.length > 0) {
      var reviewCard = el("div", { class: "card" });
      reviewCard.appendChild(el("h2", { text: "間違えた問題の復習（" + wrongAnswers.length + "問）" }));
      wrongAnswers.forEach(function (a) {
        var q = QUESTIONS.filter(function (qq) { return qq.id === a.id; })[0];
        if (!q) return;
        var item = el("div", { class: "review-item" }, [
          el("div", { class: "category-badge", text: q.category }),
          el("div", { class: "q-text", text: q.question }),
          el("div", { class: "your-answer wrong", text: "あなたの解答: " + a.selected + "（" + (q.choices[a.selected] || "") + "）" }),
          el("div", { class: "correct-answer", text: "正解: " + q.answer + "（" + q.choices[q.answer] + "）" }),
          el("div", { class: "explanation", text: q.explanation })
        ]);
        reviewCard.appendChild(item);
      });
      app.appendChild(reviewCard);
    }
  }

  function renderStats() {
    session = null;
    clear(app);
    var history = loadHistory();
    var answeredIds = Object.keys(history);

    var card = el("div", { class: "card" });
    card.appendChild(el("h2", { text: "成績・学習履歴" }));

    if (answeredIds.length === 0) {
      card.appendChild(el("div", { class: "empty-state", text: "まだ演習履歴がありません。ホームから演習を始めましょう。" }));
      app.appendChild(card);
      return;
    }

    var totalShown = 0, totalCorrect = 0;
    answeredIds.forEach(function (id) {
      totalShown += history[id].shown;
      totalCorrect += history[id].correct;
    });
    var overallRate = totalShown > 0 ? Math.round((totalCorrect / totalShown) * 1000) / 10 : 0;

    card.appendChild(el("div", { class: "summary-grid" }, [
      summaryStat(answeredIds.length, "学習済み問題数"),
      summaryStat(totalShown, "延べ回答数"),
      summaryStat(overallRate + "%", "累積正答率")
    ]));
    app.appendChild(card);

    // category breakdown across all history
    var byCat = {};
    QUESTIONS.forEach(function (q) {
      var h = history[q.id];
      if (!h) return;
      if (!byCat[q.category]) byCat[q.category] = { shown: 0, correct: 0 };
      byCat[q.category].shown += h.shown;
      byCat[q.category].correct += h.correct;
    });
    var catCard = el("div", { class: "card" });
    catCard.appendChild(el("h2", { text: "分野別正答率" }));
    var table = el("table", { class: "breakdown" });
    table.appendChild(el("tr", {}, [
      el("th", { text: "分野" }),
      el("th", { text: "正答/回答" }),
      el("th", { text: "正答率" })
    ]));
    Object.keys(byCat).forEach(function (cat) {
      var c = byCat[cat];
      var rate = c.shown > 0 ? Math.round((c.correct / c.shown) * 1000) / 10 : 0;
      table.appendChild(el("tr", {}, [
        el("td", { text: cat }),
        el("td", { text: c.correct + " / " + c.shown }),
        el("td", { text: rate + "%" })
      ]));
    });
    catCard.appendChild(table);
    app.appendChild(catCard);

    // reset
    var resetCard = el("div", { class: "card" });
    resetCard.appendChild(el("h2", { text: "学習履歴のリセット" }));
    resetCard.appendChild(el("p", { text: "これまでの解答履歴・正答率の記録をすべて削除します。この操作は取り消せません。" }));
    resetCard.appendChild(el("button", { class: "btn secondary", onclick: function () {
      if (confirm("学習履歴をすべてリセットしますか？")) {
        resetHistory();
        renderStats();
      }
    } }, [document.createTextNode("履歴をリセット")]));
    app.appendChild(resetCard);
  }

  // ---------- Nav wiring ----------
  document.getElementById("navHome").addEventListener("click", renderHome);
  document.getElementById("navStats").addEventListener("click", renderStats);
  document.getElementById("homeLink").addEventListener("click", renderHome);

  // ---------- Init ----------
  renderHome();
})();
