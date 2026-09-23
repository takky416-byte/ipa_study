(function () {
  "use strict";

  var QUESTIONS = (window.QUESTIONS_SAMPLE || []).concat(window.QUESTIONS_PAST || []);
  var HISTORY_KEY = "itsmStudyHistory_v1";
  var SESSION_LOG_KEY = "itsmSessionLog_v1";
  var MAX_SESSION_LOG = 300;
  var HEATMAP_DAYS = 84;
  var CHOICE_KEYS = ["ア", "イ", "ウ", "エ"];

  var MASTERY_LABELS = { unseen: "未学習", weak: "要復習", learning: "学習中", mastered: "習得済み" };

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

  function getMastery(entry) {
    if (!entry || entry.shown === 0) return "unseen";
    if (entry.lastResult === true) return "mastered";
    if (entry.correct === 0) return "weak";
    return "learning";
  }

  // ---------- Session log (localStorage) ----------
  function loadSessionLog() {
    try {
      var raw = localStorage.getItem(SESSION_LOG_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveSessionLog(log) {
    try {
      localStorage.setItem(SESSION_LOG_KEY, JSON.stringify(log));
    } catch (e) {
      // ignore quota / privacy-mode errors
    }
  }

  function appendSessionLog(entry) {
    var log = loadSessionLog();
    log.push(entry);
    if (log.length > MAX_SESSION_LOG) log = log.slice(log.length - MAX_SESSION_LOG);
    saveSessionLog(log);
  }

  function resetSessionLog() {
    localStorage.removeItem(SESSION_LOG_KEY);
  }

  function computeStudyStats(log) {
    var dayCounts = {};
    log.forEach(function (e) {
      var day = e.date.slice(0, 10);
      dayCounts[day] = (dayCounts[day] || 0) + 1;
    });
    var days = Object.keys(dayCounts).sort();

    function toDate(s) { return new Date(s + "T00:00:00"); }

    // current streak: walk back from today (or yesterday if today has no session yet)
    var current = 0;
    var cursor = new Date();
    var todayStr = cursor.toISOString().slice(0, 10);
    if (!dayCounts[todayStr]) cursor.setDate(cursor.getDate() - 1);
    while (dayCounts[cursor.toISOString().slice(0, 10)]) {
      current += 1;
      cursor.setDate(cursor.getDate() - 1);
    }

    // longest streak
    var longest = 0, run = 0, prev = null;
    days.forEach(function (d) {
      if (prev) {
        var diff = Math.round((toDate(d) - toDate(prev)) / 86400000);
        run = diff === 1 ? run + 1 : 1;
      } else {
        run = 1;
      }
      longest = Math.max(longest, run);
      prev = d;
    });

    return { dayCounts: dayCounts, studiedDays: days.length, current: current, longest: longest };
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

  function getPastExamSets() {
    var map = {};
    QUESTIONS.forEach(function (q) {
      if (!q.year) return;
      var key = q.year + "_" + q.session;
      if (!map[key]) map[key] = { year: q.year, session: q.session, questions: [] };
      map[key].questions.push(q);
    });
    var list = Object.keys(map).map(function (k) { return map[k]; });
    list.sort(function (a, b) { return b.year - a.year; });
    list.forEach(function (s) {
      s.questions.sort(function (a, b) { return (a.qnum || 0) - (b.qnum || 0); });
    });
    return list;
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

    // Mode 2: past-exam by year (real IPA questions, exam-order)
    var pastSets = getPastExamSets();
    if (pastSets.length > 0) {
      var yearSelect = el("select", {});
      pastSets.forEach(function (s, idx) {
        yearSelect.appendChild(el("option", {
          value: String(idx),
          text: s.year + "年" + s.session + "（" + s.questions.length + "問）"
        }));
      });
      list.appendChild(el("div", { class: "mode-item" }, [
        el("h3", { text: "② 年度別本番形式演習（実際の過去問）" }),
        el("p", { text: "IPA公表の実際の過去問を、出題順のまま通しで演習します。" }),
        el("div", { class: "mode-controls" }, [
          yearSelect,
          el("button", { class: "btn", onclick: function () {
            var s = pastSets[parseInt(yearSelect.value, 10)];
            startQuiz(s.questions.slice(), s.year + "年" + s.session + " 午前II");
          } }, [document.createTextNode("開始")])
        ])
      ]));
    }

    // Mode 3: category practice
    var catSelect = el("select", {});
    getCategories().forEach(function (c) {
      catSelect.appendChild(el("option", { value: c, text: c }));
    });
    list.appendChild(el("div", { class: "mode-item" }, [
      el("h3", { text: "③ 分野別演習" }),
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
      el("h3", { text: "④ 苦手問題の復習" }),
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
      el("h3", { text: "⑤ 全問通し演習" }),
      el("p", { text: "全" + QUESTIONS.length + "問を順番に出題します（本番形式の通し演習）。" }),
      el("div", { class: "mode-controls" }, [
        el("button", { class: "btn secondary", onclick: function () {
          startQuiz(QUESTIONS.slice(), "全問通し演習");
        } }, [document.createTextNode("開始")])
      ])
    ]));

    return list;
  }

  function startQuiz(questions, title, opts) {
    if (!questions || questions.length === 0) {
      alert("対象の問題がありません。");
      return;
    }
    opts = opts || {};
    var round = opts.round || 1;
    var baseTitle = opts.baseTitle || title;
    session = {
      title: round > 1 ? baseTitle + "（" + round + "周目・不正解のみ再挑戦）" : title,
      baseTitle: baseTitle,
      round: round,
      allQuestions: opts.allQuestions || questions,
      roundHistory: opts.roundHistory || [],
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

    if (!session.answered) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }

    var card = el("div", { class: "card" });

    card.appendChild(el("div", { class: "quiz-progress" }, [
      el("span", { text: session.title }),
      el("span", { text: "問 " + (session.index + 1) + " / " + total })
    ]));
    var track = el("div", { class: "progress-bar-track" });
    track.appendChild(el("div", { class: "progress-bar-fill", style: "width:" + progressPct + "%" }));
    card.appendChild(track);

    var badgeText = q.category + (q.year ? "　|　" + q.year + "年" + q.session + " 問" + q.qnum : "");
    card.appendChild(el("div", { class: "category-badge", text: badgeText }));
    card.appendChild(el("div", { class: "question-text", text: q.question }));
    if (q.image) {
      card.appendChild(el("img", { class: "question-image", src: q.image, alt: "問題図" }));
    }

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

    if (total > 0) {
      appendSessionLog({ date: new Date().toISOString(), title: session.title, total: total, correct: correctCount });
    }

    var wrongAnswers = answers.filter(function (a) { return !a.correct; });
    var roundHistory = session.roundHistory.concat([{ round: session.round, total: total, correct: correctCount }]);
    var isAllClear = session.round > 1 && wrongAnswers.length === 0;

    var card = el("div", { class: "card" });
    card.appendChild(el("h2", { text: session.title + " - 結果" }));
    card.appendChild(el("div", { class: "score-hero" }, [
      el("div", { class: "score-num", text: correctCount + " / " + total }),
      el("div", { class: "score-sub", text: "正答率 " + pct + "%" })
    ]));

    if (isAllClear) {
      var clearBox = el("div", { class: "answer-feedback correct all-clear" }, [
        el("div", { class: "result-label", text: "全問正解しました！お疲れさまでした。" }),
        el("div", { class: "explanation", text: session.round + "周目で、不正解だった問題をすべて解き直して正解できました。" })
      ]);
      card.appendChild(clearBox);

      var historyTable = el("table", { class: "breakdown" });
      historyTable.appendChild(el("tr", {}, [
        el("th", { text: "周" }),
        el("th", { text: "出題数" }),
        el("th", { text: "正答数" })
      ]));
      roundHistory.forEach(function (r) {
        historyTable.appendChild(el("tr", {}, [
          el("td", { text: r.round + "周目" }),
          el("td", { text: r.total + "問" }),
          el("td", { text: r.correct + "問" })
        ]));
      });
      card.appendChild(historyTable);
    }

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
    if (wrongAnswers.length > 0) {
      actions.appendChild(el("button", {
        class: "btn",
        onclick: function () {
          var wrongQuestions = wrongAnswers
            .map(function (a) { return QUESTIONS.filter(function (qq) { return qq.id === a.id; })[0]; })
            .filter(Boolean);
          startQuiz(shuffle(wrongQuestions), session.baseTitle, {
            round: session.round + 1,
            baseTitle: session.baseTitle,
            allQuestions: session.allQuestions,
            roundHistory: roundHistory
          });
        }
      }, [document.createTextNode("間違えた問題だけを再挑戦（" + wrongAnswers.length + "問）")]));
    }
    actions.appendChild(el("button", { class: "btn" + (wrongAnswers.length > 0 ? " secondary" : "") , onclick: function () {
      startQuiz(shuffle(session.allQuestions.slice()), session.baseTitle);
    } }, [document.createTextNode("最初からもう一度（全" + session.allQuestions.length + "問）")]));
    card.appendChild(actions);

    app.appendChild(card);

    // wrong review
    if (wrongAnswers.length > 0) {
      var reviewCard = el("div", { class: "card" });
      reviewCard.appendChild(el("h2", { text: "間違えた問題の復習（" + wrongAnswers.length + "問）" }));
      wrongAnswers.forEach(function (a) {
        var q = QUESTIONS.filter(function (qq) { return qq.id === a.id; })[0];
        if (!q) return;
        var item = el("div", { class: "review-item" }, [
          el("div", { class: "category-badge", text: q.category }),
          el("div", { class: "q-text", text: q.question })
        ]);
        if (q.image) {
          item.appendChild(el("img", { class: "question-image", src: q.image, alt: "問題図" }));
        }
        item.appendChild(el("div", { class: "your-answer wrong", text: "あなたの解答: " + a.selected + "（" + (q.choices[a.selected] || "") + "）" }));
        item.appendChild(el("div", { class: "correct-answer", text: "正解: " + q.answer + "（" + q.choices[q.answer] + "）" }));
        item.appendChild(el("div", { class: "explanation", text: q.explanation }));
        reviewCard.appendChild(item);
      });
      app.appendChild(reviewCard);
    }
  }

  function progressRow(label, done, total, rightText) {
    var pct = total > 0 ? Math.round((done / total) * 1000) / 10 : 0;
    var row = el("div", { class: "progress-row" });
    row.appendChild(el("div", { class: "progress-row-label" }, [
      el("span", { text: label }),
      el("span", { text: rightText !== undefined ? rightText : (done + " / " + total + "（" + pct + "%）") })
    ]));
    var track = el("div", { class: "progress-bar-track" });
    track.appendChild(el("div", { class: "progress-bar-fill", style: "width:" + pct + "%" }));
    row.appendChild(track);
    return row;
  }

  function renderAchievement() {
    session = null;
    clear(app);
    var history = loadHistory();

    var counts = { unseen: 0, weak: 0, learning: 0, mastered: 0 };
    QUESTIONS.forEach(function (q) {
      counts[getMastery(history[q.id])] += 1;
    });
    var totalQ = QUESTIONS.length;
    var masteredPct = totalQ > 0 ? Math.round((counts.mastered / totalQ) * 1000) / 10 : 0;

    var headCard = el("div", { class: "card" });
    headCard.appendChild(el("h2", { text: "達成度" }));
    headCard.appendChild(el("p", { text: "「習得済み」は、直近の解答が正解だった問題の数です（初めて解いてすぐ正解した問題も含みます）。" }));
    var bigRow = el("div", { class: "big-progress" });
    bigRow.appendChild(progressRow("全体の習得率", counts.mastered, totalQ, counts.mastered + " / " + totalQ + "問（" + masteredPct + "%）"));
    headCard.appendChild(bigRow);
    headCard.appendChild(el("div", { class: "summary-grid" }, [
      summaryStat(counts.mastered, "習得済み"),
      summaryStat(counts.learning, "学習中"),
      summaryStat(counts.weak, "要復習"),
      summaryStat(counts.unseen, "未学習")
    ]));
    app.appendChild(headCard);

    if (counts.mastered + counts.learning + counts.weak === 0) {
      var emptyCard = el("div", { class: "card" });
      emptyCard.appendChild(el("div", { class: "empty-state", text: "まだ演習履歴がありません。ホームから演習を始めましょう。" }));
      app.appendChild(emptyCard);
      return;
    }

    // category achievement
    var catCard = el("div", { class: "card" });
    catCard.appendChild(el("h2", { text: "分野別の達成度" }));
    var byCat = {};
    QUESTIONS.forEach(function (q) {
      if (!byCat[q.category]) byCat[q.category] = { total: 0, mastered: 0 };
      byCat[q.category].total += 1;
      if (getMastery(history[q.id]) === "mastered") byCat[q.category].mastered += 1;
    });
    Object.keys(byCat).forEach(function (cat) {
      var c = byCat[cat];
      catCard.appendChild(progressRow(cat, c.mastered, c.total));
    });
    app.appendChild(catCard);

    // year achievement (past exams)
    var pastSets = getPastExamSets();
    if (pastSets.length > 0) {
      var yearCard = el("div", { class: "card" });
      yearCard.appendChild(el("h2", { text: "年度別の達成度（実際の過去問）" }));
      pastSets.forEach(function (s) {
        var mastered = s.questions.filter(function (q) { return getMastery(history[q.id]) === "mastered"; }).length;
        yearCard.appendChild(progressRow(s.year + "年" + s.session, mastered, s.questions.length));
      });
      app.appendChild(yearCard);
    }

    // reset
    var resetCard = el("div", { class: "card" });
    resetCard.appendChild(el("h2", { text: "学習記録のリセット" }));
    resetCard.appendChild(el("p", { text: "達成度（解答履歴・正答率）と学習履歴（演習ログ）をすべて削除します。この操作は取り消せません。" }));
    resetCard.appendChild(el("button", { class: "btn secondary", onclick: function () {
      if (confirm("達成度・学習履歴をすべてリセットしますか？")) {
        resetHistory();
        resetSessionLog();
        renderAchievement();
      }
    } }, [document.createTextNode("記録をリセット")]));
    app.appendChild(resetCard);
  }

  function renderHistory() {
    session = null;
    clear(app);
    var log = loadSessionLog();

    if (log.length === 0) {
      var emptyCard = el("div", { class: "card" });
      emptyCard.appendChild(el("h2", { text: "学習履歴" }));
      emptyCard.appendChild(el("div", { class: "empty-state", text: "まだ演習履歴がありません。ホームから演習を始めましょう。" }));
      app.appendChild(emptyCard);
      return;
    }

    var stats = computeStudyStats(log);
    var totalAnswered = log.reduce(function (sum, e) { return sum + e.total; }, 0);

    var summaryCard = el("div", { class: "card" });
    summaryCard.appendChild(el("h2", { text: "学習履歴" }));
    summaryCard.appendChild(el("div", { class: "summary-grid" }, [
      summaryStat(stats.studiedDays, "学習した日数"),
      summaryStat(log.length, "演習回数"),
      summaryStat(stats.current, "連続学習日数"),
      summaryStat(stats.longest, "最長連続記録")
    ]));
    summaryCard.appendChild(el("p", { text: "延べ解答数: " + totalAnswered + "問" }));
    summaryCard.appendChild(buildHeatmap(stats.dayCounts));
    app.appendChild(summaryCard);

    var listCard = el("div", { class: "card" });
    listCard.appendChild(el("h2", { text: "直近の演習ログ" }));
    var list = el("div", { class: "history-list" });
    log.slice().reverse().slice(0, 30).forEach(function (e) {
      var pct = e.total > 0 ? Math.round((e.correct / e.total) * 1000) / 10 : 0;
      var d = new Date(e.date);
      var dateText = isNaN(d.getTime()) ? e.date : (d.getMonth() + 1) + "/" + d.getDate() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
      list.appendChild(el("div", { class: "history-item" }, [
        el("span", { class: "hi-date", text: dateText }),
        el("span", { class: "hi-title", text: e.title }),
        el("span", { class: "hi-score", text: e.correct + "/" + e.total + "（" + pct + "%）" })
      ]));
    });
    listCard.appendChild(list);
    app.appendChild(listCard);
  }

  function buildHeatmap(dayCounts) {
    var wrap = el("div", { class: "heatmap-wrap" });
    var grid = el("div", { class: "heatmap-grid" });
    var d = new Date();
    d.setDate(d.getDate() - (HEATMAP_DAYS - 1));
    for (var i = 0; i < HEATMAP_DAYS; i++) {
      var s = d.toISOString().slice(0, 10);
      var count = dayCounts[s] || 0;
      var level = count === 0 ? 0 : count === 1 ? 1 : count <= 3 ? 2 : 3;
      grid.appendChild(el("div", { class: "heatmap-cell level-" + level, title: s + "：" + count + "回" }));
      d.setDate(d.getDate() + 1);
    }
    wrap.appendChild(grid);
    wrap.appendChild(el("div", { class: "heatmap-legend" }, [
      el("span", { text: "少ない" }),
      el("span", { class: "heatmap-cell level-0" }),
      el("span", { class: "heatmap-cell level-1" }),
      el("span", { class: "heatmap-cell level-2" }),
      el("span", { class: "heatmap-cell level-3" }),
      el("span", { text: "多い" })
    ]));
    return wrap;
  }

  // ---------- Nav wiring ----------
  document.getElementById("navHome").addEventListener("click", renderHome);
  document.getElementById("navAchievement").addEventListener("click", renderAchievement);
  document.getElementById("navHistory").addEventListener("click", renderHistory);
  document.getElementById("homeLink").addEventListener("click", renderHome);

  // ---------- Init ----------
  renderHome();
})();
