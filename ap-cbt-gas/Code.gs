/* Code.gs — 応用情報 科目B CBT模擬試験システム（新版）
 *
 * 以前のシステム（main.gs）のマスタ構成（試験／大問／小問／試験大問リンク）をそのまま使い、
 * 次を追加している。
 *   - 学生名簿によるログイン者の特定（学校の Google アカウント）
 *   - 受験中の解答の自動保存と、別の端末・再読み込みからの再開
 *   - 終了時刻のサーバー側管理と、教員による時間延長
 *   - 教員モード（実施状況・採点・成績出力）
 *   - 提出時に「回答ログ」へ以前と同じ形式でも記録（output.gs をそのまま使える）
 */

// ---------------------------------------------------------------------------
// シート定義（日本語ヘッダー → プログラム上のキー）
// ---------------------------------------------------------------------------
const SCHEMA_MAP = {
  '試験マスタ': {
    '試験ID': 'exam_id', '試験名称': 'exam_name', '試験時間': 'duration', '選択必須数': 'selection_limit',
    '表示順': 'sort_order', '有効フラグ': 'is_active',
    // ↓ 新版で追加した列（なくても動く）
    '区分': 'kind', '対象クラス': 'target_classes', '公開開始': 'open_from', '公開終了': 'open_until', '解答例表示': 'show_answers'
  },
  '大問マスタ': {
    '大問ID': 'question_id', '問題番号': 'q_number', '出題分野': 'category', 'テーマ': 'theme',
    'PDFファイルID': 'pdf_id', '出典': 'source', '有効フラグ': 'is_active'
  },
  '小問マスタ': {
    '大問ID': 'question_id', '小問ID': 'sub_q_id', '小問番号': 'sub_q_number', '解答形式': 'type',
    '制限/選択肢': 'limit', '表示順': 'sort_order', '有効フラグ': 'is_active',
    '解答例': 'answer', '配点': 'points', '備考': 'note'
  },
  '試験大問リンクマスタ': {
    '試験ID': 'exam_id', '大問ID': 'question_id', '表示順': 'sort_order', '選択区分': 'selection_type', '有効フラグ': 'is_active'
  }
};

const SHEET_SESSIONS = '受験記録';
const SESSION_HEADERS = ['受験ID', '試験ID', '試験名称', 'メールアドレス', 'クラス', '番号', '氏名', '状態',
  '開始時刻', '終了予定時刻', '延長(分)', '最終保存', '提出時刻', '選択問題', '解答データ', '画面離脱回数', '採点データ', '名簿照合'];
const COL = {}; SESSION_HEADERS.forEach(function (h, i) { COL[h] = i + 1; });

const GRACE_MS = 2 * 60 * 1000;   // 終了時刻を過ぎてからも保存・提出を受け付ける猶予

// ---------------------------------------------------------------------------
// 入口
// ---------------------------------------------------------------------------
function doGet(e) {
  const mode = (e && e.parameter && e.parameter.mode) || '';
  if (mode === 'teacher') {
    if (!isTeacher_()) {
      return HtmlService.createHtmlOutput('<p style="font-family:sans-serif;padding:24px">教員として登録されていないアカウントです（設定シートの「教員メール」を確認してください）。</p>');
    }
    return HtmlService.createTemplateFromFile('teacher').evaluate()
      .setTitle('CBT模擬試験 教員画面').addMetaTag('viewport', 'width=device-width, initial-scale=1');
  }
  return HtmlService.createTemplateFromFile('index').evaluate()
    .setTitle('応用情報CBT模擬試験システム').addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// ---------------------------------------------------------------------------
// 設定・名簿
// ---------------------------------------------------------------------------
function getSettings_() {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('設定');
  const s = { '画像URL': '', '教員メール': '', '解答控えメール': '1', '回答ログにも記録': '1', '自動保存間隔(秒)': '30',
    'ログイン画面': '1', '試験画面タイトル': '応用情報技術者試験 科目B試験', 'チュートリアル時間(分)': '5' };
  if (!sh) return s;
  sh.getDataRange().getValues().forEach(function (r) { if (r[0]) s[String(r[0]).trim()] = String(r[1] == null ? '' : r[1]).trim(); });
  return s;
}

function currentEmail_() {
  return (Session.getActiveUser().getEmail() || '').toLowerCase();
}

function isTeacher_() {
  const email = currentEmail_();
  if (!email) return false;
  const list = getSettings_()['教員メール'].toLowerCase().split(/[\s,，、]+/).filter(String);
  return list.indexOf(email) >= 0;
}

/** 学生名簿（列：メールアドレス, クラス, 番号, 氏名, フリガナ, ユーザーID, パスワード）を読む */
function readRoster_() {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('学生名簿');
  if (!sh) return [];
  const v = sh.getDataRange().getValues();
  const h = v.shift().map(function (x) { return String(x).trim(); });
  const c = function (name) { return h.indexOf(name); };
  return v.map(function (r, i) {
    const g = function (name) { const k = c(name); return k < 0 ? '' : String(r[k] == null ? '' : r[k]).trim(); };
    return { row: i + 2, email: g('メールアドレス').toLowerCase(), studentClass: g('クラス'), studentNum: g('番号'),
      studentName: g('氏名'), kana: g('フリガナ'), userId: g('ユーザーID'), password: g('パスワード') };
  }).filter(function (s) { return s.email || s.userId; });
}

function findStudent_(email) {
  if (!email) return null;
  return readRoster_().filter(function (s) { return s.email === email; })[0] || null;
}

function loginEnabled_() { return getSettings_()['ログイン画面'] !== '0'; }

/** ログイン画面の ID・パスワードを確かめる。名簿にメールアドレスがある行は、そのアカウントでしか使えない */
function verifyLogin_(creds) {
  if (!creds || !creds.userId) return null;
  const email = currentEmail_();
  const s = readRoster_().filter(function (r) { return r.userId && r.userId === String(creds.userId).trim(); })[0];
  if (!s || s.password !== String(creds.password || '')) throw new Error('ユーザーIDまたはパスワードが正しくありません。');
  if (s.email && email && s.email !== email) throw new Error('このユーザーIDは、現在ログインしている Google アカウントでは使用できません。');
  return { email: email || s.email, studentClass: s.studentClass, studentNum: s.studentNum, studentName: s.studentName, kana: s.kana };
}

/** 受験者を特定する。ログイン画面を使う設定なら ID・パスワード、使わない設定なら Google アカウント（名簿になければ手入力） */
function resolveStudent_(p) {
  if (loginEnabled_()) return { student: verifyLogin_(p), roster: '名簿' };
  const st = findStudent_(currentEmail_());
  if (st) return { student: st, roster: '名簿' };
  if (p && p.studentClass && p.studentNum && p.studentName) {
    return { student: { email: currentEmail_(), studentClass: p.studentClass, studentNum: p.studentNum, studentName: p.studentName }, roster: '手入力' };
  }
  return { student: null, roster: '' };
}

/** ログイン画面の「Log in」 */
function login(userId, password) {
  const st = verifyLogin_({ userId: userId, password: password });
  return { studentName: st.studentName, kana: st.kana };
}

// ---------------------------------------------------------------------------
// マスタ読み込み（main.gs の getExamData を拡張）
// ---------------------------------------------------------------------------
function getActiveRows_(ss, sheetName) {
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) return [];
  const values = sheet.getDataRange().getValues();
  const headers = values.shift();
  const keyMap = SCHEMA_MAP[sheetName];
  const activeIdx = headers.indexOf('有効フラグ');
  return values
    .filter(function (row) { return activeIdx < 0 || row[activeIdx] === 1 || row[activeIdx] === '1'; })
    .map(function (row) {
      return headers.reduce(function (obj, header, index) {
        const k = keyMap[String(header).trim()];
        if (k) obj[k] = row[index];
        return obj;
      }, {});
    });
}

/** 試験ID → 試験データ（解答例を含めるかどうかを選べる） */
function buildExams_(withAnswers) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const examsRaw = getActiveRows_(ss, '試験マスタ');
  const linksRaw = getActiveRows_(ss, '試験大問リンクマスタ');
  const qById = {};
  getActiveRows_(ss, '大問マスタ').forEach(function (q) { qById[q.question_id] = q; });
  const subsByQ = {};
  getActiveRows_(ss, '小問マスタ').forEach(function (sq) {
    (subsByQ[sq.question_id] = subsByQ[sq.question_id] || []).push(sq);
  });
  examsRaw.sort(function (a, b) { return a.sort_order - b.sort_order; });

  return examsRaw.map(function (e) {
    const questions = linksRaw
      .filter(function (l) { return l.exam_id === e.exam_id; })
      .sort(function (a, b) { return a.sort_order - b.sort_order; })
      .map(function (link) {
        const q = qById[link.question_id];
        if (!q) return null;
        const subs = (subsByQ[q.question_id] || []).slice().sort(function (a, b) { return a.sort_order - b.sort_order; });
        return {
          questionId: q.question_id,
          pdfId: q.pdf_id,
          qNumber: String(q.q_number),
          category: q.category,
          theme: q.theme,
          source: q.source,
          required: String(link.selection_type) === '1',
          subQuestions: subs.map(function (sq) {
            const o = { sub_q_id: sq.sub_q_id, sub_q_number: String(sq.sub_q_number), type: sq.type, limit: String(sq.limit == null ? '' : sq.limit) };
            if (withAnswers) { o.answer = String(sq.answer == null ? '' : sq.answer); o.note = String(sq.note == null ? '' : sq.note); o.points = sq.points; }
            return o;
          })
        };
      })
      .filter(function (q) { return q; });
    return {
      examId: e.exam_id,
      examName: e.exam_name,
      duration: Number(e.duration) || 150,
      selectionLimit: Number(e.selection_limit) || 5,
      kind: String(e.kind || '練習'),
      targetClasses: String(e.target_classes || '').split(/[\s,，、]+/).filter(String),
      openFrom: e.open_from instanceof Date ? e.open_from.getTime() : null,
      openUntil: e.open_until instanceof Date ? e.open_until.getTime() : null,
      showAnswers: String(e.show_answers) === '1',
      questions: questions
    };
  });
}

function examVisibleTo_(exam, student, now) {
  if (exam.openFrom && now < exam.openFrom) return false;
  if (exam.openUntil && now > exam.openUntil) return false;
  if (exam.targetClasses.length && (!student || exam.targetClasses.indexOf(student.studentClass) < 0)) return false;
  return true;
}

// ---------------------------------------------------------------------------
// 学生向け API
// ---------------------------------------------------------------------------
/** ポータル表示用：ログイン者・受験できる試験・それぞれの受験状況 */
function getPortalData(creds) {
  const settings = getSettings_();
  const base = { loginRequired: loginEnabled_(), title: settings['試験画面タイトル'], tutorialMin: Number(settings['チュートリアル時間(分)']) || 5,
    imageBase: settings['画像URL'], autosaveSec: Number(settings['自動保存間隔(秒)']) || 30 };
  if (base.loginRequired && !(creds && creds.userId)) return base;
  const email = currentEmail_();
  const student = resolveStudent_(creds).student;
  const now = Date.now();
  const sessions = readSessions_(function (r) { return r.email === email; });
  const exams = buildExams_(false)
    .filter(function (e) { return examVisibleTo_(e, student, now); })
    .map(function (e) {
      const s = sessions.filter(function (x) { return x.examId === e.examId; }).pop();
      return {
        examId: e.examId, examName: e.examName, duration: e.duration, kind: e.kind,
        status: s ? s.status : '未受験',
        canReview: !!(s && s.status === '提出済み' && e.showAnswers && e.kind !== '考査')
      };
    });
  base.email = email; base.student = student; base.exams = exams;
  return base;
}

/** 受験開始（または再開）。試験データ（解答例なし）と保存済みの状態を返す */
function startExam(examId, creds) {
  const email = currentEmail_();
  if (!email) throw new Error('Google アカウントのメールアドレスを取得できませんでした。学校のアカウントでログインしてください。');
  const who = resolveStudent_(creds);
  const student = who.student;
  if (!student) return { needProfile: true };
  const rosterMatched = who.roster === '名簿';
  const exam = buildExams_(false).filter(function (e) { return e.examId === examId; })[0];
  if (!exam) throw new Error('試験が見つかりません。');
  if (!examVisibleTo_(exam, student, Date.now())) throw new Error('この試験は現在受験できません。');

  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const sh = sessionSheet_();
    let s = readSessions_(function (r) { return r.email === email && r.examId === examId; }).pop();
    if (s && s.status === '提出済み') {
      return { alreadySubmitted: true, examName: exam.examName };
    }
    if (!s) {
      const now = new Date();
      const id = Utilities.getUuid();
      sh.appendRow([id, examId, exam.examName, email, student.studentClass, student.studentNum, student.studentName, '受験中',
        now, new Date(now.getTime() + exam.duration * 60000), 0, now, '', '', '{}', 0, '', rosterMatched ? '名簿' : '手入力']);
      s = readSessions_(function (r) { return r.id === id; })[0];
    }
    return { exam: exam, session: publicSession_(s), student: student, serverNow: Date.now() };
  } finally {
    lock.releaseLock();
  }
}

/** 自動保存。終了予定時刻（延長を反映）を返す */
function saveProgress(sessionId, payloadJson) {
  const s = getOwnSession_(sessionId);
  if (s.status === '提出済み') return { status: s.status, endAt: s.endAt, serverNow: Date.now() };
  if (Date.now() > s.endAt + GRACE_MS) {
    return { status: '時間切れ', endAt: s.endAt, serverNow: Date.now() };
  }
  const p = JSON.parse(payloadJson);
  const sh = sessionSheet_();
  sh.getRange(s.row, COL['最終保存']).setValue(new Date());
  sh.getRange(s.row, COL['選択問題']).setValue((p.selected || []).join(','));
  sh.getRange(s.row, COL['解答データ']).setValue(JSON.stringify({ answers: p.answers || {}, flags: p.flags || {}, memo: p.memo || '' }));
  sh.getRange(s.row, COL['画面離脱回数']).setValue(Number(p.leaveCount) || 0);
  return { status: s.status, endAt: s.endAt, serverNow: Date.now() };
}

/** 解答に変更がないときの確認用（終了時刻の延長・短縮、教員による状態変更を受け取る） */
function pingSession(sessionId) {
  const s = getOwnSession_(sessionId);
  const status = s.status === '受験中' && Date.now() > s.endAt + GRACE_MS ? '時間切れ' : s.status;
  return { status: status, endAt: s.endAt, serverNow: Date.now() };
}

/** 提出。保存・回答ログへの記録・解答控えメール */
function submitExam(sessionId, payloadJson, isAuto) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  let s;
  try {
    s = getOwnSession_(sessionId);
    if (s.status === '提出済み') return { status: '提出済み', email: s.email };
    const p = JSON.parse(payloadJson);
    const late = Date.now() > s.endAt + GRACE_MS;
    const sh = sessionSheet_();
    const now = new Date();
    sh.getRange(s.row, COL['状態']).setValue('提出済み');
    sh.getRange(s.row, COL['提出時刻']).setValue(now);
    sh.getRange(s.row, COL['最終保存']).setValue(now);
    if (!late) {   // 時間切れ後に届いた内容は採用せず、最後に保存された解答を正とする
      sh.getRange(s.row, COL['選択問題']).setValue((p.selected || []).join(','));
      sh.getRange(s.row, COL['解答データ']).setValue(JSON.stringify({ answers: p.answers || {}, flags: p.flags || {}, memo: p.memo || '' }));
      sh.getRange(s.row, COL['画面離脱回数']).setValue(Number(p.leaveCount) || 0);
    }
  } finally {
    lock.releaseLock();
  }
  s = getOwnSession_(sessionId);
  const exam = buildExams_(false).filter(function (e) { return e.examId === s.examId; })[0];
  const legacy = toLegacyAnswers_(exam, s);
  const settings = getSettings_();
  if (settings['回答ログにも記録'] === '1') appendLegacyLog_(s, legacy);
  if (settings['解答控えメール'] === '1') {
    try { sendSelectedAnswersEmail(s.email, s.examName, { studentClass: s.studentClass, studentNum: s.studentNum, studentName: s.studentName, answers: legacy }); }
    catch (err) { console.warn('メール送信に失敗: ' + err); }
  }
  return { status: '提出済み', email: s.email, isAuto: !!isAuto };
}

/** 練習用：提出後の解答例（試験マスタの「解答例表示」が 1 で、区分が考査でない場合のみ） */
function getReviewData(examId) {
  const email = currentEmail_();
  const s = readSessions_(function (r) { return r.email === email && r.examId === examId; }).pop();
  if (!s || s.status !== '提出済み') throw new Error('提出後に確認できます。');
  const exam = buildExams_(true).filter(function (e) { return e.examId === examId; })[0];
  if (!exam || !exam.showAnswers || exam.kind === '考査') throw new Error('この試験の解答例は公開されていません。');
  return { exam: exam, session: publicSession_(s) };
}

// ---------------------------------------------------------------------------
// 受験記録シート
// ---------------------------------------------------------------------------
function sessionSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_SESSIONS);
  if (!sh) {
    sh = ss.insertSheet(SHEET_SESSIONS);
    sh.appendRow(SESSION_HEADERS);
    sh.setFrozenRows(1);
  }
  return sh;
}

function readSessions_(filter) {
  const sh = sessionSheet_();
  const values = sh.getDataRange().getValues();
  const out = [];
  for (let i = 1; i < values.length; i++) {
    const r = values[i];
    const o = {
      row: i + 1, id: r[0], examId: r[1], examName: r[2], email: String(r[3]).toLowerCase(),
      studentClass: String(r[4]), studentNum: String(r[5]), studentName: String(r[6]), status: r[7],
      startedAt: r[8] instanceof Date ? r[8].getTime() : null,
      endAt: (r[9] instanceof Date ? r[9].getTime() : 0) + (Number(r[10]) || 0) * 60000,
      extendMin: Number(r[10]) || 0,
      savedAt: r[11] instanceof Date ? r[11].getTime() : null,
      submittedAt: r[12] instanceof Date ? r[12].getTime() : null,
      selected: String(r[13] || '').split(',').filter(String),
      data: safeJson_(r[14], {}),
      leaveCount: Number(r[15]) || 0,
      grades: safeJson_(r[16], {}),
      roster: r[17]
    };
    if (!filter || filter(o)) out.push(o);
  }
  return out;
}

function safeJson_(s, dflt) {
  if (!s) return dflt;
  try { return JSON.parse(s); } catch (e) { return dflt; }
}

function getOwnSession_(sessionId) {
  const email = currentEmail_();
  const s = readSessions_(function (r) { return r.id === sessionId; })[0];
  if (!s || s.email !== email) throw new Error('受験記録が見つかりません。');
  return s;
}

function publicSession_(s) {
  return { id: s.id, status: s.status, endAt: s.endAt, savedAt: s.savedAt, selected: s.selected, data: s.data };
}

// ---------------------------------------------------------------------------
// 以前の「回答ログ」形式への変換（output.gs・解答控えメールをそのまま使うため）
// ---------------------------------------------------------------------------
function toLegacyAnswers_(exam, s) {
  const answers = (s.data && s.data.answers) || {};
  const out = {};
  exam.questions.forEach(function (q) {
    out[q.qNumber] = {
      isTarget: q.required || s.selected.indexOf(q.questionId) >= 0,
      source: q.source || '',
      data: q.subQuestions.map(function (sq) {
        const v = answers[sq.sub_q_id];
        return { sub_id: sq.sub_q_id, q_label: sq.sub_q_number, value: Array.isArray(v) ? v.join(',') : (v || ''), type: sq.type === '図表' ? '図表' : 'その他' };
      })
    };
  });
  return out;
}

function appendLegacyLog_(s, legacy) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('回答ログ');
  if (!sheet) {
    sheet = ss.insertSheet('回答ログ');
    sheet.appendRow(['タイムスタンプ', 'メールアドレス', 'クラス', '番号', '氏名', '試験ID/名称', '解答データ']);
  }
  sheet.appendRow([new Date(), s.email, s.studentClass, s.studentNum, s.studentName, s.examName, JSON.stringify(legacy)]);
}

/** 以前の main.gs と同じ解答控えメール */
function sendSelectedAnswersEmail(email, examName, data) {
  const subject = '【解答控え】' + examName;
  let body = data.studentClass + '-' + data.studentNum + ' ' + data.studentName + ' 様\n\n';
  body += '試験の解答を受け付けました。あなたが選択・回答した内容は以下の通りです。\n';
  body += '------------------------------------------\n\n';
  body += '■ 実施試験： ' + examName + '\n\n';
  Object.keys(data.answers).forEach(function (qNum) {
    const q = data.answers[qNum];
    if (q.isTarget !== true) return;
    body += '■ ' + qNum + (q.source ? ' (出典：' + q.source + ')' : '') + '\n';
    q.data.forEach(function (sub) {
      const v = sub.type === '図表' ? '（図表解答のため入力なし）' : (sub.value ? sub.value : '（未入力）');
      body += '   ' + sub.q_label + '： ' + v + '\n';
    });
    body += '\n';
  });
  body += '------------------------------------------\n';
  body += '提出時刻: ' + new Date().toLocaleString('ja-JP') + '\n';
  body += '※このメールは自動送信専用です。返信はできません。';
  if (email) GmailApp.sendEmail(email, subject, body, { name: 'CBT模擬試験システム' });
}

function getServiceUrl() {
  return ScriptApp.getService().getUrl();
}
