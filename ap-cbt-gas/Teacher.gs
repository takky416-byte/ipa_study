/* Teacher.gs — 教員モードの API（すべて教員メールに登録されたアカウントだけが呼べる） */

function assertTeacher_() {
  if (!isTeacher_()) throw new Error('教員として登録されていないアカウントです。');
}

/** 試験の一覧と受験状況の件数 */
function teacherListExams() {
  assertTeacher_();
  const sessions = readSessions_();
  return buildExams_(false).map(function (e) {
    const mine = sessions.filter(function (s) { return s.examId === e.examId; });
    return {
      examId: e.examId, examName: e.examName, kind: e.kind, duration: e.duration,
      targetClasses: e.targetClasses, openFrom: e.openFrom, openUntil: e.openUntil,
      inProgress: mine.filter(function (s) { return s.status === '受験中'; }).length,
      submitted: mine.filter(function (s) { return s.status === '提出済み'; }).length
    };
  });
}

/** 実施状況 */
function teacherStatus(examId) {
  assertTeacher_();
  const exam = buildExams_(false).filter(function (e) { return e.examId === examId; })[0];
  const qNo = {};
  if (exam) exam.questions.forEach(function (q) { qNo[q.questionId] = q.qNumber; });
  const rows = readSessions_(function (s) { return s.examId === examId; }).map(function (s) {
    const answered = Object.keys((s.data && s.data.answers) || {}).length;
    return {
      id: s.id, studentClass: s.studentClass, studentNum: s.studentNum, studentName: s.studentName, email: s.email,
      status: s.status, startedAt: s.startedAt, endAt: s.endAt, extendMin: s.extendMin, savedAt: s.savedAt,
      submittedAt: s.submittedAt, selected: s.selected.map(function (id) { return qNo[id] || id; }),
      answered: answered, leaveCount: s.leaveCount, roster: s.roster
    };
  });
  rows.sort(function (a, b) { return (a.studentClass + a.studentNum).localeCompare(b.studentClass + b.studentNum, 'ja', { numeric: true }); });
  return { exam: exam ? { examId: exam.examId, examName: exam.examName, duration: exam.duration } : null, rows: rows, serverNow: Date.now() };
}

/** 時間延長（受験中の受験者に分単位で加算。マイナスで短縮） */
function teacherExtend(sessionIds, minutes) {
  assertTeacher_();
  const sh = sessionSheet_();
  const add = Number(minutes) || 0;
  readSessions_(function (s) { return sessionIds.indexOf(s.id) >= 0; }).forEach(function (s) {
    sh.getRange(s.row, COL['延長(分)']).setValue(s.extendMin + add);
  });
  return true;
}

/** 受験を「受験中」に戻す（誤って提出した・通信障害など） */
function teacherReopen(sessionIds, minutes) {
  assertTeacher_();
  const sh = sessionSheet_();
  readSessions_(function (s) { return sessionIds.indexOf(s.id) >= 0; }).forEach(function (s) {
    sh.getRange(s.row, COL['状態']).setValue('受験中');
    sh.getRange(s.row, COL['提出時刻']).setValue('');
    const need = Math.ceil((Date.now() - s.endAt) / 60000) + (Number(minutes) || 0);
    if (need > 0) sh.getRange(s.row, COL['延長(分)']).setValue(s.extendMin + need);
  });
  return true;
}

/** 採点画面用：解答例付きの試験データと全受験者の解答・採点 */
function teacherGradingData(examId) {
  assertTeacher_();
  const exam = buildExams_(true).filter(function (e) { return e.examId === examId; })[0];
  if (!exam) throw new Error('試験が見つかりません。');
  const sessions = readSessions_(function (s) { return s.examId === examId; }).map(function (s) {
    return {
      id: s.id, studentClass: s.studentClass, studentNum: s.studentNum, studentName: s.studentName, status: s.status,
      selected: s.selected, answers: (s.data && s.data.answers) || {}, grades: s.grades || {}
    };
  });
  sessions.sort(function (a, b) { return (a.studentClass + a.studentNum).localeCompare(b.studentClass + b.studentNum, 'ja', { numeric: true }); });
  return { exam: exam, sessions: sessions };
}

/** 採点の保存。patch = { 受験ID: { 小問ID: 'o'|'t'|'x'|'' } } */
function teacherSaveGrades(patch) {
  assertTeacher_();
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const sh = sessionSheet_();
    readSessions_(function (s) { return patch[s.id]; }).forEach(function (s) {
      const g = s.grades || {};
      Object.keys(patch[s.id]).forEach(function (k) {
        if (patch[s.id][k]) g[k] = patch[s.id][k]; else delete g[k];
      });
      sh.getRange(s.row, COL['採点データ']).setValue(JSON.stringify(g));
    });
  } finally {
    lock.releaseLock();
  }
  return true;
}

/** 成績をシート「成績_試験ID」に出力する（○=1、△=0.5、×=0 として大問ごとの得点率） */
function teacherExportScores(examId) {
  assertTeacher_();
  const data = teacherGradingData(examId);
  const exam = data.exam;
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const name = ('成績_' + examId).slice(0, 90);
  let sh = ss.getSheetByName(name);
  if (sh) sh.clear(); else sh = ss.insertSheet(name);
  const header = ['クラス', '番号', '氏名', '状態', '選択問題'];
  exam.questions.forEach(function (q) { header.push(q.qNumber + ' 得点率'); });
  header.push('選択問題の平均得点率', '未採点の設問数');
  const out = [header];
  data.sessions.forEach(function (s) {
    const row = [s.studentClass, s.studentNum, s.studentName, s.status,
      exam.questions.filter(function (q) { return q.required || s.selected.indexOf(q.questionId) >= 0; }).map(function (q) { return q.qNumber; }).join(',')];
    let sum = 0, cnt = 0, ungraded = 0;
    exam.questions.forEach(function (q) {
      const target = q.required || s.selected.indexOf(q.questionId) >= 0;
      if (!target) { row.push(''); return; }
      let pts = 0, max = 0, graded = 0;
      q.subQuestions.forEach(function (sq) {
        if (sq.type === '図表') return;
        const w = Number(sq.points) || 1;
        max += w;
        const g = s.grades[sq.sub_q_id];
        if (g) graded++;
        if (g === 'o') pts += w; else if (g === 't') pts += w / 2; else if (!g) ungraded++;
      });
      const rate = max && graded ? Math.round(pts / max * 1000) / 10 : '';   // 1問も採点していない大問は空欄
      row.push(rate);
      if (rate !== '') { sum += rate; cnt++; }
    });
    row.push(cnt ? Math.round(sum / cnt * 10) / 10 : '', ungraded);
    out.push(row);
  });
  sh.getRange(1, 1, out.length, header.length).setValues(out);
  sh.setFrozenRows(1);
  return { sheetName: name, url: ss.getUrl() + '#gid=' + sh.getSheetId() };
}
