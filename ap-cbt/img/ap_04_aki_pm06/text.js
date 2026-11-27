/* 令和4年度 秋期 応用情報技術者試験 午後 問6（IPA 公表の問題冊子を文字データに起こしたもの） */
window.CBT_TEXT = window.CBT_TEXT || {};
(function () {
  var B = function (k, w) { return '<span class="bk" style="min-width:' + (w || 4.6) + 'em">' + k + '</span>'; };
  var V = '<td style="vertical-align:top">', N = '<td style="vertical-align:top;white-space:nowrap">';
  var C = function (v) { return '<td class="c" style="vertical-align:top">' + v + '</td>'; };
  var W = function (s) { s = s.replace(/<[^>]+>/g, ''); var n = 0; for (var i = 0; i < s.length; i++) n += s.charCodeAt(i) > 0xff ? 2 : 1; return n; };
  var T1 = function (rows) {
    return '<table class="tbl" style="font-size:.9em;letter-spacing:0"><tr><th style="width:11em">項目名</th><th>説明</th><th style="width:12em">記入例</th></tr>' +
      rows.map(function (r) { return '<tr>' + N + r[0] + '</td>' + V + r[1] + '</td>' + V + r[2] + '</td></tr>'; }).join('') + '</table>';
  };
  var DEF = function (rows) {
    return '<table class="tbl" style="font-size:.74em;letter-spacing:0"><tr><th style="white-space:nowrap">項番</th><th style="width:7.6em">列名</th><th style="white-space:nowrap">データ型</th><th>PK</th><th>UK</th><th style="white-space:nowrap">非 NULL</th><th style="white-space:nowrap">初期値</th><th style="width:9em">アクセス制御</th><th>その他の指定内容</th></tr>' +
      rows.map(function (r) { return '<tr>' + C(r[0]) + V + r[1] + '</td>' + N + r[2] + '</td>' + C(r[3]) + C(r[4]) + C(r[5]) + C(r[6]) + V + r[7] + '</td>' + V + r[8] + '</td></tr>'; }).join('') + '</table>';
  };
  var bk3 = function (k) { return B(k, 2.4); };
  window.CBT_TEXT["ap_04_aki_pm06"] = [
'<p class="qh"><span>問6</span>スマートデバイス管理システムのデータベース設計に関する次の記述を読んで，設問に答えよ。</p>' +
'<p class="ind sp">J 社は，グループ連結で従業員約 3 万人を抱える自動車メーカーである。従来は事業継続性・災害時対応施策の一環として，本社の部長職以上にスマートフォン及びタブレットなどのスマートデバイス（以下，情報端末という）を貸与していた。昨今の働き方改革の一環として，従業員全員がいつでもどこでも作業できるようにするために，情報端末の配布対象をグループ企業も含む全従業員に拡大することになった。</p>' +
'<p class="ind">現在は情報端末の貸与先が少人数なので，表計算ソフトでスマートデバイス管理台帳（以下，管理台帳という）を作成して貸与状況などを管理している。今後は貸与先が 3 万人を超えるので，スマートデバイス管理システム（以下，新システムという）を新たに構築することになった。情報システム部門の K さんは，新システムのデータ管理者として，新システム構築プロジェクトに参画した。</p>' +
'<p class="sec sp">〔現在の管理台帳〕</p>' +
'<p class="ind">現在の管理台帳の項目を表 1 に示す。管理台帳は，一つのワークシートで管理されている。</p>' +
'<div class="tcap sp">表 1　管理台帳の項目</div>' +
T1([['情報端末 ID', '情報端末ごとに一意に付与される固有の識別子', 'G6TF809G0D4Q'], ['機種名', '情報端末の機種の型名', 'IP12PM'], ['回線番号', '契約に割り当てられた外線電話番号', '080-0000-0000'], ['内線電話番号', '内線電話を情報端末で発着信できるように回線番号と紐づけられている内線電話の番号', '1234-567890'], ['通信事業者名', '契約先の通信事業者の名称', 'L 社'], ['料金プラン名', '契約している料金プランの名称', 'プラン M'], ['暗証番号', '契約の変更手続を行う際に必要となる番号', '0000'], ['利用者所属部署名', '利用者が所属する部署の名称', 'N 部'], ['利用者氏名', '利用者の氏名', '試験 太郎'], ['利用者メールアドレス', '利用者への業務連絡が可能なメールアドレス', 'shiken.taro@example.co.jp'], ['利用開始日', 'J 社の情報端末の運用管理担当者（以下，運用管理担当者という）から利用者に対して情報端末を払い出した日', '2020-09-10']]),

'<div class="tcap">表 1　管理台帳の項目（続き）</div>' +
T1([['利用終了日', '利用者から運用管理担当者に対して情報端末を返却した日', '2022-09-10'], ['交換予定日', 'J 社では情報セキュリティ対策の観点から同一の回線番号のままで 2 年ごとに旧情報端末から新情報端末への交換を行っており，新情報端末に交換する予定の日', '2022-09-10'], ['廃棄日', '情報端末を廃棄事業者に引き渡した日', '2022-10-20']]) +
'<p class="sec sp">〔現在の管理方法における課題と新システムに対する要件〕</p>' +
'<p class="ind">K さんは，新システムの設計に際して，まず，現在の情報端末の運用について，運用管理担当者に対して課題と新システムに対する要件をヒアリングした。ヒアリング結果を表 2 に示す。</p>' +
'<div class="tcap sp">表 2　ヒアリング結果</div>' +
'<table class="tbl" style="font-size:.9em;letter-spacing:0"><tr><th style="width:3em;white-space:nowrap">項番</th><th>課題</th><th style="width:44%">要件</th></tr>' +
'<tr>' + C(1) + V + '利用者が情報端末ごとに通信事業者や料金プランを選択できるので，結果として高い料金プランを契約して利用しているケースがある。</td>' + V + '通信事業者を原則として L 社に統一し，かつ，より低価格の料金プランで契約できるようにする。</td></tr>' +
'<tr>' + C(2) + V + '情報端末に関する費用は本社の総務部で一括して負担しており，利用者のコスト意識が低く，利用状況次第で高額な請求が発生するケースがある。</td>' + V + '従業員の異動情報に基づいて請求を年月ごと，部署ごとに管理できるようにする。</td></tr>' +
'<tr>' + C(3) + V + '情報端末に対しては利用可能な機能やアプリケーションプログラム（以下，アプリという）に制限を設けており，利用者から機能制限解除の依頼やアプリ追加の依頼があっても，管理が煩雑となるので認められない状況である。</td>' + V + '業務上必要な機能やアプリについては，利用者に使用目的を確認し，従業員と情報端末の組合せごとに個別に許可できる仕組みにする。</td></tr>' +
'<tr>' + C(4) + V + '契約ごとに異なる暗証番号を設定することで利用者による不正な契約変更の防止を図っているが，運用管理担当者は全ての契約の暗証番号を自由に参照できてしまうので，運用管理担当者による不正な契約変更が発生するリスクが残っている。</td>' + V + '暗証番号は運用管理担当者の上長（以下，上長という）しか参照できないようにアクセスを制御する。運用管理担当者は契約変更が必要な都度，上長に申請し，上長が契約変更を行う仕組みにする。</td></tr></table>' +
'<p class="sec sp">〔新システムの E-R 図〕</p>' +
'<p class="ind">K さんは，表 1 の管理台帳の項目と表 2 のヒアリング結果を基に，新システムの E-R 図を作成した。E-R 図（抜粋）を図 1 に示す。なお，J 社内の部署の階層構造は，自己参照の関連を用いて表現する。</p>',

'<div class="fig"><img src="{BASE}ap_04_aki_pm06/fig1.png" style="width:90%" alt=""><div class="cap">図 1　新システムの E-R 図（抜粋）</div></div>' +
'<p class="sec sp">〔表定義〕</p>' +
'<p class="ind">このデータベースでは，E-R 図のエンティティ名を表名にし，属性名を列名にして，適切なデータ型で表定義した関係データベースによって，データを管理する。K さんは，図 1 の E-R 図を実装するために，詳細設計として表定義の内容を検討した。契約表の表定義を表 3 に，料金プラン表の表定義を表 4 に示す。</p>',

'<p class="ind">表 3 及び表 4 のデータ型欄には，適切なデータ型，適切な長さ，精度，位取りを記入する。PK 欄は主キー制約，UK 欄は UNIQUE 制約，非 NULL 欄は非 NULL 制約の指定をするかどうかを記入する。指定する場合には Y を，指定しない場合には N を記入する。ただし，主キーに対しては UNIQUE 制約を指定せず，非 NULL 制約は指定するものとする。</p>' +
'<div class="tcap sp">表 3　契約表の表定義</div>' +
DEF([[1, '契約 ID', 'CHAR(8)', bk3('g'), bk3('h'), bk3('i'), '', '上長（ユーザーアカウント名：ADMIN）による参照が必要', '（省略）'],
     [2, '料金プランコード', 'CHAR(8)', 'N', 'N', 'Y', '', '', '料金プラン表への外部キー'],
     [3, '回線番号', 'CHAR(13)', 'N', 'N', 'Y', '', '', '（省略）'],
     [4, '内線電話番号', 'CHAR(11)', 'N', 'N', 'N', 'NULL', '', '（省略）'],
     [5, '暗証番号', 'CHAR(4)', 'N', 'N', 'Y', '', '上長（ユーザーアカウント名：ADMIN）による参照が必要', '（省略）']]) +
'<div class="tcap sp">表 4　料金プラン表の表定義</div>' +
DEF([[1, '料金プランコード', 'CHAR(8)', bk3('g'), bk3('h'), bk3('i'), '', '', '（省略）'],
     [2, '通信事業者コード', 'CHAR(4)', 'N', 'N', 'Y', '1234', '', '通信事業者表への外部キー。行挿入時に，初期値として L 社の通信事業者コード\'1234\'を設定する。'],
     [3, '料金プラン名', 'VARCHAR(30)', 'N', 'N', 'Y', '', '', '（省略）'],
     [4, '基本料金', 'DECIMAL(5,0)', 'N', 'N', 'Y', '', '', '（省略）'],
     [5, '通話単価', 'DECIMAL(5,2)', 'N', 'N', 'Y', '', '', '（省略）'],
     [6, '通信単価', 'DECIMAL(5,4)', 'N', 'N', 'Y', '', '', '（省略）']]) +
'<p class="sec sp">〔表の作成とアクセス制御〕</p>' +
'<p class="ind">K さんは，実装に必要な各種 SQL 文を表定義に基づいて作成した。表 3 のアクセス</p>',

'<p style="text-indent:0">制御を設定するための SQL 文を図 2 に，表 4 の料金プラン表を作成するための SQL 文を図 3 に示す。なお，運用管理担当者のユーザーアカウントに対しては適切なアクセス制御が設定されているものとする。</p>' +
'<pre class="code sp" style="font-size:.86em;letter-spacing:0">GRANT ' + B('j', 12) + ' ON 契約 TO ADMIN</pre>' +
'<div class="fig" style="margin-top:.2em"><div class="cap">図 2　表 3 のアクセス制御を設定するための SQL 文</div></div>' +
'<pre class="code sp" style="font-size:.86em;letter-spacing:0">' + [
'CREATE TABLE 料金プラン',
'(料金プランコード CHAR(8) NOT NULL,',
' 通信事業者コード ' + B('k', 14) + ',',
' 料金プラン名 VARCHAR(30) NOT NULL,',
' 基本料金 DECIMAL(5,0) NOT NULL,',
' 通話単価 DECIMAL(5,2) NOT NULL,',
' 通信単価 DECIMAL(5,4) NOT NULL,',
' ' + B('l', 5.6) + '(料金プランコード),',
' ' + B('m', 5.6) + '(通信事業者コード) REFERENCES 通信事業者(通信事業者コード))'].join('\n') + '</pre>' +
'<div class="fig" style="margin-top:.2em"><div class="cap">図 3　表 4 の料金プラン表を作成するための SQL 文</div></div>' +
'<div class="r q sp"><b>設問 1</b><div>図 1 中の<span class="bk">a</span>～<span class="bk">f</span>に入れる適切なエンティティ間の関連及び属性名を答え，E-R 図を完成させよ。なお，エンティティ間の関連及び属性名の表記は，図 1 の凡例に倣うこと。</div></div>' +
'<div class="r q"><b>設問 2</b><div>表 3，表 4 中の<span class="bk">g</span>～<span class="bk">i</span>に入れる適切な字句の組合せを解答群の中から選び，記号で答えよ。' +
'<div class="ag">解答群</div>' +
'<table class="tbl" style="width:56%;margin-left:1.6em"><tr><th>記号</th><th>g</th><th>h</th><th>i</th></tr>' +
[['ア', 'N', 'N', 'N'], ['イ', 'N', 'N', 'Y'], ['ウ', 'N', 'Y', 'N'], ['エ', 'N', 'Y', 'Y'], ['オ', 'Y', 'N', 'Y'], ['カ', 'Y', 'Y', 'Y']].map(function (r) { return '<tr>' + r.map(function (v) { return '<td class="c">' + v + '</td>'; }).join('') + '</tr>'; }).join('') + '</table></div></div>' +
'<div class="r q sp"><b>設問 3</b><div>図 2，図 3 中の<span class="bk">j</span>～<span class="bk">m</span>に入れる適切な字句又は式を答えよ。</div></div>'
  ];
})();
