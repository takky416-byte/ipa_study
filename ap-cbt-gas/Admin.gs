/* Admin.gs — スプレッドシートのメニュー、初期設定、解答例の取り込み、採点用ドキュメント出力 */

function onOpen() {
  SpreadsheetApp.getUi().createMenu('CBT模試')
    .addItem('初期設定（シート・列の追加）', 'setupSheets')
    .addItem('解答例を小問マスタに反映（解答例取込シートから）', 'importAnswers')
    .addSeparator()
    .addItem('ログイン情報を発行（ユーザーID・パスワードが空欄の学生）', 'issueLoginInfo')
    .addItem('ログイン情報シートを作成（配布用ドキュメント）', 'createLoginSheetsDoc')
    .addSeparator()
    .addItem('教員画面のURLを表示', 'showTeacherUrl')
    .addItem('採点用ドキュメントを出力（受験記録から）', 'generateScoringDocFromSessions')
    .addToUi();
}

/** 新版で使うシート・列を追加する。既存の内容は消さない */
function setupSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  let st = ss.getSheetByName('設定');
  if (!st) {
    st = ss.insertSheet('設定');
    st.getRange(1, 1, 9, 3).setValues([
      ['画像URL', 'https://cdn.jsdelivr.net/gh/takky416-byte/ipa_study@ap-cbt-b/ap-cbt/img/', '問題ページ画像の置き場所（末尾は /）'],
      ['教員メール', Session.getActiveUser().getEmail(), '教員画面を使えるアカウント（カンマ区切り）'],
      ['解答控えメール', '1', '提出時に学生へ解答の控えをメールで送る（1/0）'],
      ['回答ログにも記録', '1', '以前の「回答ログ」形式でも記録する（1/0）。output.gs がそのまま使える'],
      ['自動保存間隔(秒)', '30', '受験中の解答を保存する間隔'],
      ['ログイン画面', '1', '本番と同じログイン画面（ユーザーID・パスワード）を使う（1/0）。0 なら Google アカウントで本人を特定'],
      ['試験画面タイトル', '応用情報技術者試験 科目B試験', '試験画面の上部中央に表示する名称'],
      ['チュートリアル時間(分)', '5', '受験者向けチュートリアルの時間'],
      ['', '', '']
    ]);
    st.setColumnWidth(1, 160); st.setColumnWidth(2, 520); st.setColumnWidth(3, 420);
  }

  let roster = ss.getSheetByName('学生名簿');
  if (!roster) {
    roster = ss.insertSheet('学生名簿');
    roster.appendRow(['メールアドレス', 'クラス', '番号', '氏名', 'フリガナ', 'ユーザーID', 'パスワード']);
    roster.setFrozenRows(1);
  }
  addColumns_('学生名簿', ['フリガナ', 'ユーザーID', 'パスワード']);

  sessionSheet_();

  addColumns_('試験マスタ', ['区分', '対象クラス', '公開開始', '公開終了', '解答例表示']);
  addColumns_('小問マスタ', ['解答例', '配点', '備考']);

  let imp = ss.getSheetByName('解答例取込');
  if (!imp) {
    imp = ss.insertSheet('解答例取込');
    imp.appendRow(['大問ID', '設問', '空欄・項目', '解答例', '備考']);
    imp.setFrozenRows(1);
  }
  SpreadsheetApp.getUi().alert('初期設定が完了しました。\n\n・設定シートの「教員メール」を確認してください。\n・学生名簿シートに、学生のメールアドレス・クラス・番号・氏名・フリガナを貼り付け、メニューの「ログイン情報を発行」を実行してください。\n・試験マスタに「区分（考査/練習）」「対象クラス」「公開開始」「公開終了」「解答例表示」の列を追加しました（空欄なら制限なし）。');
}

function addColumns_(sheetName, cols) {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  if (!sh) return;
  const headers = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0].map(String);
  cols.forEach(function (c) {
    if (headers.indexOf(c) < 0) {
      sh.getRange(1, sh.getLastColumn() + 1).setValue(c);
      headers.push(c);
    }
  });
}

/** 小問番号「設問3(1) a」→ { label: '設問3(1)', key: 'a' } */
function splitSubLabel_(s) {
  s = toHalf_(String(s)).trim();
  const m = s.match(/^(設問\s*\d+\s*(?:\(\d+\))?)\s*(.*)$/);
  if (!m) return { label: s.replace(/\s+/g, ''), key: '' };
  return { label: m[1].replace(/\s+/g, ''), key: m[2].replace(/\s+/g, '') };
}

function toHalf_(s) {
  return s.replace(/[０-９Ａ-Ｚａ-ｚ（）]/g, function (c) { return String.fromCharCode(c.charCodeAt(0) - 0xFEE0); });
}

/** 「解答例取込」シート（大問ID, 設問, 空欄・項目, 解答例, 備考）を小問マスタの「解答例」「備考」列に反映する */
function importAnswers() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const imp = ss.getSheetByName('解答例取込');
  const sub = ss.getSheetByName('小問マスタ');
  if (!imp || !sub) { SpreadsheetApp.getUi().alert('「解答例取込」または「小問マスタ」シートがありません。先に初期設定を実行してください。'); return; }
  addColumns_('小問マスタ', ['解答例', '配点', '備考']);

  const src = imp.getDataRange().getValues().slice(1).filter(function (r) { return r[0]; });
  const idx = {};   // 大問ID|設問|空欄 → 行
  const byLabel = {}; // 大問ID|設問 → 行の配列
  src.forEach(function (r) {
    const label = toHalf_(String(r[1])).replace(/\s+/g, '');
    const key = toHalf_(String(r[2])).replace(/\s+/g, '');
    idx[r[0] + '|' + label + '|' + key] = r;
    (byLabel[r[0] + '|' + label] = byLabel[r[0] + '|' + label] || []).push(r);
  });

  const values = sub.getDataRange().getValues();
  const h = values[0].map(String);
  const cQ = h.indexOf('大問ID'), cN = h.indexOf('小問番号'), cA = h.indexOf('解答例'), cNote = h.indexOf('備考');
  const qids = {};
  src.forEach(function (r) { qids[r[0]] = true; });
  const unmatched = [];
  let hit = 0;
  for (let i = 1; i < values.length; i++) {
    const qid = values[i][cQ];
    if (!qids[qid]) continue;                 // 取込データに含まれない大問は触らない
    const p = splitSubLabel_(values[i][cN]);
    let r = idx[qid + '|' + p.label + '|' + p.key];
    if (!r && !p.key && byLabel[qid + '|' + p.label] && byLabel[qid + '|' + p.label].length === 1) r = byLabel[qid + '|' + p.label][0];
    if (!r && p.key) r = idx[qid + '|' + p.label + '|' + p.key.replace(/^\((.*)\)$/, '$1')] || idx[qid + '|' + p.label + '|(' + p.key + ')'];
    if (!r && !p.key && byLabel[qid + '|' + p.label]) {   // 小問マスタは1行、解答例は複数項目（例：出品表／カテゴリ表）
      const rs = byLabel[qid + '|' + p.label];
      r = [qid, p.label, '', rs.map(function (x) { return (x[2] ? x[2] + '：' : '') + x[3]; }).join('／'), rs.map(function (x) { return x[4]; }).filter(String).join(' ')];
    }
    if (r) {
      sub.getRange(i + 1, cA + 1).setValue(r[3]);
      if (r[4]) sub.getRange(i + 1, cNote + 1).setValue(r[4]);
      hit++;
    } else {
      unmatched.push([qid, values[i][cN], '（小問マスタ側。解答例取込に対応する行がありません）']);
    }
  }
  let rep = ss.getSheetByName('解答例_未対応');
  if (rep) rep.clear(); else rep = ss.insertSheet('解答例_未対応');
  rep.getRange(1, 1, 1, 3).setValues([['大問ID', '小問番号', '状況']]);
  if (unmatched.length) rep.getRange(2, 1, unmatched.length, 3).setValues(unmatched);
  SpreadsheetApp.getUi().alert('解答例を ' + hit + ' 件反映しました。対応が取れなかった小問は ' + unmatched.length + ' 件です（「解答例_未対応」シートを確認し、小問マスタの「解答例」列に直接入力してください）。');
}

function showTeacherUrl() {
  const url = ScriptApp.getService().getUrl();
  const html = HtmlService.createHtmlOutput(url
    ? '<p>学生用：<br><a href="' + url + '" target="_blank">' + url + '</a></p><p>教員用：<br><a href="' + url + '?mode=teacher" target="_blank">' + url + '?mode=teacher</a></p>'
    : '<p>まだウェブアプリとしてデプロイされていません。</p>').setWidth(520).setHeight(200);
  SpreadsheetApp.getUi().showModalDialog(html, 'ウェブアプリのURL');
}

/**
 * 採点用ドキュメント出力（以前の output.gs を「受験記録」シート向けに変えたもの）。
 * 試験IDを入力すると、提出済みの受験者ごとに改ページしたドキュメントを作る。
 */
function generateScoringDocFromSessions() {
  const ui = SpreadsheetApp.getUi();
  const res = ui.prompt('採点用ドキュメント', '試験IDを入力してください（試験マスタの「試験ID」）', ui.ButtonSet.OK_CANCEL);
  if (res.getSelectedButton() !== ui.Button.OK) return;
  const examId = res.getResponseText().trim();
  const exam = buildExams_(true).filter(function (e) { return e.examId === examId; })[0];
  if (!exam) { ui.alert('試験IDが見つかりません: ' + examId); return; }
  const sessions = readSessions_(function (s) { return s.examId === examId && s.status === '提出済み'; });
  sessions.sort(function (a, b) { return (a.studentClass + a.studentNum).localeCompare(b.studentClass + b.studentNum, 'ja', { numeric: true }); });
  const doc = DocumentApp.create('採点用データ_' + exam.examName);
  const body = doc.getBody();
  sessions.forEach(function (s, i) {
    if (i) body.appendPageBreak();
    body.appendParagraph('==================================================');
    body.appendParagraph('試験名 : ' + exam.examName);
    body.appendParagraph('クラス : ' + s.studentClass + ' / 番号 : ' + s.studentNum);
    body.appendParagraph('氏  名 : ' + s.studentName);
    body.appendParagraph('==================================================\n');
    const answers = (s.data && s.data.answers) || {};
    exam.questions.forEach(function (q) {
      if (!(q.required || s.selected.indexOf(q.questionId) >= 0)) return;
      body.appendParagraph('■ ' + q.qNumber + '（出典: ' + (q.source || '') + '）');
      body.appendParagraph('--------------------------------------------------');
      q.subQuestions.forEach(function (sq) {
        const v = answers[sq.sub_q_id];
        body.appendParagraph('【' + sq.sub_q_number + '】：' + (Array.isArray(v) ? v.join(',') : (v || '（未回答）')) + (sq.answer ? '　　（解答例：' + sq.answer + '）' : ''));
      });
      body.appendParagraph('--------------------------------------------------\n');
    });
  });
  doc.saveAndClose();
  const html = HtmlService.createHtmlOutput('<p>' + sessions.length + ' 名分のドキュメントを作成しました。</p><p><a href="' + doc.getUrl() + '" target="_blank">ドキュメントを開く</a></p>').setWidth(420).setHeight(150);
  ui.showModalDialog(html, '出力完了');
}

/** 学生名簿のユーザーID・パスワードが空欄の行に、本番のログイン情報シートと同じ形式（数字のID・英数字のパスワード）を発行する */
function issueLoginInfo() {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('学生名簿');
  if (!sh) { SpreadsheetApp.getUi().alert('学生名簿シートがありません。先に初期設定を実行してください。'); return; }
  addColumns_('学生名簿', ['フリガナ', 'ユーザーID', 'パスワード']);
  const v = sh.getDataRange().getValues();
  const h = v[0].map(String), cId = h.indexOf('ユーザーID'), cPw = h.indexOf('パスワード'), cName = h.indexOf('氏名');
  const used = {};
  v.slice(1).forEach(function (r) { if (r[cId]) used[String(r[cId])] = true; });
  const pwChars = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let n = 0;
  for (let i = 1; i < v.length; i++) {
    if (!v[i][cName]) continue;
    if (!v[i][cId]) {
      let id;
      do { id = String(Math.floor(1e9 + Math.random() * 9e9)); } while (used[id]);
      used[id] = true;
      sh.getRange(i + 1, cId + 1).setNumberFormat('@').setValue(id);
      n++;
    }
    if (!v[i][cPw]) {
      let pw = '';
      for (let k = 0; k < 8; k++) pw += pwChars.charAt(Math.floor(Math.random() * pwChars.length));
      sh.getRange(i + 1, cPw + 1).setNumberFormat('@').setValue(pw);
    }
  }
  SpreadsheetApp.getUi().alert(n + ' 名にユーザーIDを発行しました。「ログイン情報シートを作成」で配布用の用紙を作れます。');
}

/** 受験者ごとに切り離して配れる「ログイン情報シート」をドキュメントで作る */
function createLoginSheetsDoc() {
  const roster = readRoster_().filter(function (s) { return s.userId; });
  roster.sort(function (a, b) { return (a.studentClass + a.studentNum).localeCompare(b.studentClass + b.studentNum, 'ja', { numeric: true }); });
  if (!roster.length) { SpreadsheetApp.getUi().alert('ユーザーIDが発行された学生がいません。'); return; }
  const doc = DocumentApp.create('ログイン情報シート_' + Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyyMMdd'));
  const body = doc.getBody();
  roster.forEach(function (s, i) {
    if (i && i % 4 === 0) body.appendPageBreak();
    body.appendParagraph('ログイン情報シート').setHeading(DocumentApp.ParagraphHeading.HEADING3);
    body.appendParagraph(s.studentClass + '-' + s.studentNum + '　' + s.studentName + ' 様');
    const t = body.appendTable([['ユーザーID', s.userId], ['パスワード', s.password]]);
    t.setColumnWidth(0, 110);
    body.appendParagraph('署名：＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿　　※試験終了後は回収します。');
    body.appendParagraph('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -');
  });
  doc.saveAndClose();
  const html = HtmlService.createHtmlOutput('<p>' + roster.length + ' 名分のログイン情報シートを作成しました。</p><p><a href="' + doc.getUrl() + '" target="_blank">ドキュメントを開く</a></p>').setWidth(420).setHeight(150);
  SpreadsheetApp.getUi().showModalDialog(html, '作成完了');
}
