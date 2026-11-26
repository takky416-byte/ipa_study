/* 令和7年度 秋期 応用情報技術者試験 午後 問6（IPA 公表の問題冊子を文字データに起こしたもの） */
window.CBT_TEXT = window.CBT_TEXT || {};
window.CBT_TEXT["ap_07_aki_pm06"] = [
'<p class="qh"><span>問6</span>受講管理システムの改修に関する次の記述を読んで，設問に答えよ。</p>' +
'<p class="ind sp">D 社は，日本人を対象に英会話のオンライン教育サービスを提供する中堅企業である。従来は，ビジネス英会話の講座を提供していたが，それに加えて日常英会話の講座を追加することになった。</p>' +
'<p class="ind">従来のビジネス英会話講座と新規に追加する日常英会話講座との違いを表 1 に示す。</p>' +
'<div class="tcap sp">表 1　従来のビジネス英会話講座と新規に追加する日常英会話講座との違い</div>' +
'<table class="tbl"><tr><th colspan="2" style="border-top-color:transparent;border-left-color:transparent"></th><th>ビジネス英会話講座</th><th>日常英会話講座</th></tr>' +
'<tr><td rowspan="3" class="c" style="writing-mode:vertical-rl;width:1.6em;letter-spacing:.1em">講座の種類</td><td style="width:5.5em">レベル</td><td>初級，中級，上級の 3 段階</td><td>A1，A2，B1，B2，C1，C2 の 6 段階</td></tr>' +
'<tr><td>ジャンル</td><td>海外出張，会議，交渉などの 15 種類</td><td>社交，旅行，趣味などの 10 種類（変更の可能性あり）</td></tr>' +
'<tr><td>年齢層</td><td>なし</td><td>幼児・小学生，中学生・高校生，大学生・大人の 3 種類</td></tr>' +
'<tr><td colspan="2">受講形態</td><td>6 人までのグループに対して 1 人の講師がつく受講形態</td><td>2 人までの受講者に対して 1 人の講師がつく受講形態</td></tr>' +
'<tr><td colspan="2">受講予約方法</td><td>講座の開催スケジュールが決まっていて，それに受講者が先着順で応募する。</td><td>受講者が希望日時を指定して，その時間帯に空いている講師を選択して予約する。</td></tr></table>' +
'<p class="ind sp">日常英会話講座のジャンルは，サービスを開始してから 1 年程度は，申込み具合などを考慮して変更する可能性がある。</p>' +
'<p class="ind">講師は割り当てられた講座の開始時刻から終了時刻まで拘束されるが，それ以外の時間帯は自由である。現状は勤務日と講座担当の割当てだけで勤務を管理している。講座の受講管理には，受講管理システムを利用している。</p>' +
'<p class="ind">現状のビジネス英会話講座を管理する受講管理システムの E-R 図を図 1 に示す。</p>',

'<div class="fig"><img src="{BASE}ap_07_aki_pm06/fig1.png" style="width:100%" alt=""><div class="cap">図 1　現状のビジネス英会話講座を管理する受講管理システムの E-R 図</div></div>' +
'<p class="ind sp">開催スケジュールについては，同じ講座が複数回開催されるので，開催番号で区別している。</p>' +
'<p class="ind">受講管理システムのデータベースでは，E-R 図のエンティティ名を表名にし，属性名を列名にして，適切なデータ型で表定義した関係データベースによって，データを管理する。</p>' +
'<p class="sec sp">〔受講管理システムの関係スキーマの変更〕</p>' +
'<p class="ind">講座の種類には，表 1 に示す内容に沿った値以外のものを格納できないように定義域制約を適用する。</p>' +
'<p class="ind">日常英会話講座の追加に当たり，日常英会話講座のジャンルの変更の容易性と講師の勤務管理の厳密化を考慮して，受講管理システムの関係スキーマの変更内容を次のように検討した。</p>' +
'<p class="li">・講座エンティティをスーパータイプにして，ビジネス英会話講座エンティティ，日常英会話講座エンティティをサブタイプとして新規に追加する。講座エンティティにビジネス英会話講座か日常英会話講座かを区別する講座区分属性を追加し',

'<p class="li" style="text-indent:0">て，講座エンティティから<span class="bk">c</span>及び<span class="bk">d</span>の<u>①二つの属性をサブタイプに移す</u>。</p>' +
'<p class="li">・勤務日でも講師が講座を受けもつことができない時間帯は予約できないようにするため，勤務日の勤務可能時間帯を管理する勤務可能時間エンティティを追加する。</p>' +
'<p class="ind sp">追加及び変更するエンティティを図 2 に示す。</p>' +
'<div class="fig"><img src="{BASE}ap_07_aki_pm06/fig2.png" style="width:72%" alt=""><div class="cap">図 2　追加及び変更するエンティティ</div></div>' +
'<p class="sec sp">〔表の定義の追加，変更〕</p>' +
'<p class="ind">受講管理システムの関係スキーマの変更に伴い，新規表の定義，既存表の変更を行う。今回の変更では，スーパータイプ，サブタイプのエンティティごとに別の表にしている。講座表の変更に当たり，削除する列の情報は削除前に保存して，追加したサブタイプに反映する。</p>' +
'<p class="ind">講座表の変更を行う SQL 文を図 3 に示す。</p>',

'<pre class="code"><span class="bk">f</span> TABLE 講座 ADD COLUMN 講座区分 VARCHAR(10)\n' +
'<span class="bk">f</span> TABLE 講座 DROP COLUMN <span class="bk">c</span> CASCADE\n' +
'<span class="bk">f</span> TABLE 講座 DROP COLUMN <span class="bk">d</span> CASCADE</pre>' +
'<div class="fig" style="margin-top:.2em"><div class="cap">図 3　講座表の変更を行う SQL 文</div></div>' +
'<p class="ind sp">勤務可能時間表を作成する SQL 文を図 4 に示す。</p>' +
'<p class="ind">図 4 で，勤務日表の行が削除された場合は，参照元の勤務可能時間表の行も自動的に削除されるようにしている。</p>' +
'<pre class="code">CREATE TABLE 勤務可能時間(\n  勤務年月日 DATE,\n  講師コード CHAR(10),\n  開始時刻 TIME,\n  終了時刻 TIME,\n' +
'  PRIMARY KEY(勤務年月日, 講師コード, 開始時刻),\n  FOREIGN KEY(勤務年月日, 講師コード) REFERENCES 勤務日(<span class="bk">g</span>)\n' +
'           ON DELETE <span class="bk">h</span>)</pre>' +
'<div class="fig" style="margin-top:.2em"><div class="cap">図 4　勤務可能時間表を作成する SQL 文</div></div>' +
'<p class="sec sp">〔勤務日の削除〕</p>' +
'<p class="ind">勤務日が削除可能となるのは，指定した日の勤務年月日に開催する講座を講師が担当していない場合である。</p>' +
'<p class="ind">指定した日にある講師が担当している講座の講座コードの一覧を取得する SQL 文を図 5 に示す。ここで，“:講師コード”と“:勤務年月日”は，それぞれ対象となる講師の講師コードと指定した日の年月日を格納する埋込み変数である。</p>' +
'<p class="ind">なお，CAST 指定は，データ型を変換する際に使用される。</p>' +
'<pre class="code">SELECT DISTINCT t0.講座コード\nFROM 開催スケジュール t0\n  INNER JOIN 講座担当割当 t1 <span class="bk" style="min-width:20em">i</span>\n' +
'WHERE t1.講師コード = :講師コード AND t0.開催年月日 = CAST(:勤務年月日 AS DATE)</pre>' +
'<div class="fig" style="margin-top:.2em"><div class="cap">図 5　指定した日にある講師が担当している講座の講座コードの一覧を取得する SQL 文</div></div>',

'<div class="r q"><b>設問 1</b><div>図 1 中の<span class="bk">a</span>，<span class="bk">b</span>に入れる適切な属性名及びエンティティ間の関連を答え，E-R 図を完成させよ。なお，属性名の表記及びエンティティ間の関連は図 1 の凡例に倣うこと。</div></div>' +
'<div class="r q"><b>設問 2</b><div>〔受講管理システムの関係スキーマの変更〕について答えよ。' +
'<div class="r p"><b>(1)</b><div>本文，図 2 及び図 3 中の<span class="bk">c</span>，<span class="bk">d</span>に入れる適切な属性名を答えよ。</div></div>' +
'<div class="r p"><b>(2)</b><div>本文中の下線①について，二つの属性をサブタイプに移した理由を 20 字以内で答えよ。</div></div>' +
'<div class="r p"><b>(3)</b><div>図 2 中の<span class="bk">e</span>に入れる適切な属性名を答えよ。</div></div></div></div>' +
'<div class="r q"><b>設問 3</b><div>図 3 中の<span class="bk">f</span>に入れる適切な字句を答えよ。</div></div>' +
'<div class="r q"><b>設問 4</b><div>図 4 中の<span class="bk">g</span>，<span class="bk">h</span>に入れる適切な字句を答えよ。</div></div>' +
'<div class="r q"><b>設問 5</b><div>図 5 中の<span class="bk">i</span>に入れる適切な字句を答えよ。</div></div>'
];
