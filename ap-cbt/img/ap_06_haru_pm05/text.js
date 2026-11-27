/* 令和6年度 春期 応用情報技術者試験 午後 問5（IPA 公表の問題冊子を文字データに起こしたもの） */
window.CBT_TEXT = window.CBT_TEXT || {};
(function () {
  var C = '<td class="c">', T = '<td style="vertical-align:top">';
  var B = function (k) { return '<span class="bk" style="min-width:4.6em">' + k + '</span>'; };
  window.CBT_TEXT["ap_06_haru_pm05"] = [
'<p class="qh"><span>問5</span>クラウドサービスを活用した情報提供システムの構築に関する次の記述を読んで，設問に答えよ。</p>' +
'<p class="ind sp">L 社は，国内の気象情報を様々な業種の顧客に提供する企業である。現在は，社外から購入した気象データを分析し，気象情報として提供している。今回，全国に設置する IoT 機器から気象データを収集し，S 社のクラウドサービス（以下，S 社クラウドという）で分析した結果を気象情報として提供する新しい気象情報システム（以下，新システムという）を構築することになった。新システムの設計を，L 社の情報システム部の M さんが担当することになった。</p>' +
'<p class="ind">M さんは，新システムの構成と，新システムが備えるべき主な機能を検討した。新システムの構成案を図 1 に，新システムが備えるべき主な機能を表 1 に示す。情報提供先の PC，IoT 機器や L 社の保守用 PC から，S 社クラウド上に構築された新システムの各機能に対応するサーバにアクセスして，必要な機能を利用する。</p>' +
'<div class="fig sp"><img src="{BASE}ap_06_haru_pm05/fig1.png" style="width:100%" alt=""></div>' +
'<p class="note" style="margin-left:0">注記　図中の 200.x.x.x はグローバル IP アドレスである。</p>' +
'<div class="fig" style="margin-top:0"><div class="cap">図 1　新システムの構成案</div></div>' +
'<div class="tcap sp">表 1　新システムが備えるべき主な機能</div>' +
'<table class="tbl" style="font-size:.92em;letter-spacing:0"><tr><th style="white-space:nowrap">機能</th><th>機能の概要</th></tr>' +
'<tr><td style="vertical-align:top;white-space:nowrap">データ収集機能</td><td>全国に設置した IoT 機器から気象データを受信し，データ収集用サーバのデータベースに蓄積する。データ収集用サーバにはデータ収集用の Web API（以下，データ収集 API という）があり，IoT 機器はデータ収集 API を利用して気象データを送信する。</td></tr>' +
'<tr><td style="vertical-align:top;white-space:nowrap">データ分析機能</td><td>データ収集用サーバのデータベースに蓄積した気象データを定期的に処理して気象情報を作成し，情報提供用サーバに保存する。</td></tr>' +
'<tr>' + T + '情報提供機能</td><td>情報提供先からの要求に対して必要な気象情報を送信する。情報提供用サーバには情報提供用の Web API（以下，情報提供 API という）があり，情報提供先の PC 上のアプリケーションプログラム（以下，情報提供先アプリという）の情報提供 API を利用した要求に対して気象情報を送信する。</td></tr></table>' +
'<p class="ind sp">M さんが検討した新システムの構成について，情報システム部の N 部長は次の検討</p>',

'<p style="text-indent:0">を行うように M さんに指示した。</p>' +
'<p class="li">・IoT 機器から送信される気象データの特徴を踏まえて，データ収集 API に用いる通信プロトコルを選定すること。</p>' +
'<p class="li">・新システムにインターネットからアクセス可能な機器の数を最小限にするように，S 社クラウド上の FW に設定する通信を許可するルール（以下，FW の許可ルールという）の設計を行うこと。</p>' +
'<p class="li">・将来，IoT 機器の数や情報提供先の数が増加した場合に備えて，各機能の処理遅延対策を行うこと。</p>' +
'<p class="sec sp">〔データ収集 API に用いる通信プロトコルの検討〕</p>' +
'<p class="ind">IoT 機器は全国に 10,000 台設置する計画であり，通信事業者の LPWA（Low Power Wide Area）サービスを用いて各 IoT 機器から 1 件当たり最大 500 バイトの気象データを，1 分ごとに<u>①データ収集用サーバに送信する</u>設計とした。気象データは，1 件当たりのデータ量は少ないが，IoT 機器からデータ収集用サーバへの通信回数が多く，データ収集用サーバへアクセスが集中するおそれがある。そこで，データ収集 API には，通信の都度 TCP コネクションを確立して通信を行う HTTP ではなく，<u>②TCP 上で HTTP よりプロトコルヘッダサイズが小さく，多対 1 通信に対応するプロトコル</u>を用いることにした。</p>' +
'<p class="sec sp">〔FW の許可ルールの設計〕</p>' +
'<p class="ind">M さんは，S 社クラウド上の FW の許可ルールの設計方針を検討した。</p>' +
'<p class="li">・IoT 機器からデータ収集用サーバへのアクセスや情報提供先アプリから情報提供用サーバへのアクセスに対しては，通信プロトコルの制限を行うが，インターネットの接続元 IP アドレスによる制限は行わない。</p>' +
'<p class="li">・L 社の保守用 PC から各サーバへのアクセスに対しては，各サーバにログインして更新プログラムの適用などの保守作業を行うために，SSH だけを許可する。</p>' +
'<p class="li">・各サーバからインターネットへのアクセスに対しては，ソフトウェアベンダーの Web サイトから更新プログラムをダウンロードするために，任意の Web サイトへの HTTPS だけを許可する。</p>',

'<p class="ind">M さんが検討した，FW の許可ルールを表 2 に示す。</p>' +
'<div class="tcap sp">表 2　FW の許可ルール</div>' +
'<table class="tbl" style="white-space:nowrap"><tr><th>項番</th><th>アクセス経路</th><th>送信元</th><th>宛先</th><th>プロトコル/宛先ポート番号</th></tr>' +
'<tr>' + C + '1</td><td rowspan="2" class="c">インターネット<br>→S 社クラウド</td>' + C + 'any</td>' + C + '200.a.b.11</td>' + C + '省略</td></tr>' +
'<tr>' + C + '2</td>' + C + 'any</td>' + C + B('a') + '</td>' + C + 'TCP/443</td></tr>' +
'<tr>' + C + '3</td><td rowspan="3" class="c">L 社<br>→S 社クラウド</td>' + C + B('b') + '</td>' + C + '200.a.b.11</td>' + C + 'TCP/22</td></tr>' +
'<tr>' + C + '4</td>' + C + B('b') + '</td>' + C + '200.a.b.12</td>' + C + 'TCP/22</td></tr>' +
'<tr>' + C + '5</td>' + C + B('b') + '</td>' + C + '200.a.b.13</td>' + C + 'TCP/22</td></tr>' +
'<tr>' + C + '6</td><td rowspan="3" class="c">S 社クラウド<br>→インターネット</td>' + C + '200.a.b.11</td>' + C + 'any</td>' + C + B('c') + '</td></tr>' +
'<tr>' + C + '7</td>' + C + '200.a.b.12</td>' + C + 'any</td>' + C + B('c') + '</td></tr>' +
'<tr>' + C + '8</td>' + C + '200.a.b.13</td>' + C + 'any</td>' + C + B('c') + '</td></tr></table>' +
'<p class="note" style="margin-left:0;padding-left:4em;text-indent:-4em">注記 1　FW は，応答パケットを自動的に通過させる，ステートフルパケットインスペクション機能をもつ。</p>' +
'<p class="note" style="margin-left:0">注記 2　ルールは項番の小さい順に参照され，最初に該当したルールが適用される。</p>' +
'<p class="sec sp">〔処理遅延対策の検討〕</p>' +
'<p class="ind">M さんは，IoT 機器の数や情報提供先の数が現在の計画よりも増加した場合に，表 1 の各機能の処理にどのような処理遅延が発生するか確認した。</p>' +
'<p class="ind">IoT 機器の数が増加した場合，全国に設置した IoT 機器から S 社クラウドの FW を経由してデータ収集用サーバにアクセスする通信が増加する。また，情報提供先の数が増加した場合，情報提供先アプリから S 社クラウドの FW を経由して情報提供用サーバにアクセスする通信が増加する。</p>' +
'<p class="ind">特に<span class="bk">d</span>については，データ収集機能の通信と情報提供機能の通信の両方が経由することから，単位時間内に処理できる通信の量を表す<span class="bk">e</span>と，同時に処理できる接続元の数を表す<span class="bk">f</span>が，必要な性能を満たすよう管理することにした。</p>' +
'<p class="ind">また，データ収集用サーバと情報提供用サーバの性能を超えた要求が発生して，データ収集 API と情報提供 API の両方に処理遅延が発生した場合の対策として，<u>③スケールアウトによってシステムの処理性能を高めるために必要な機能</u>を新システムで利用することにした。</p>',

'<p class="ind">M さんは指示された内容の検討結果を N 部長に説明し，了承されたので，新システムの設計及び構築を進めることになった。</p>' +
'<div class="r q sp"><b>設問 1</b><div>〔データ収集 API に用いる通信プロトコルの検討〕について答えよ。' +
'<div class="r p"><b>(1)</b><div>本文中の下線①について，全国の IoT 機器からデータ収集用サーバに送信される 1 時間当たりの最大になる気象データ量を答えよ。答えは M バイト単位とし，小数第 1 位を四捨五入して整数で求めよ。ここで，1M バイトは 1,000k バイト，1k バイトは 1,000 バイトとする。</div></div>' +
'<div class="r p"><b>(2)</b><div>本文中の下線②について，適切な通信プロトコル名の略称を 5 字以内で答えよ。</div></div></div></div>' +
'<div class="r q"><b>設問 2</b><div>〔FW の許可ルールの設計〕について答えよ。' +
'<div class="r p"><b>(1)</b><div>表 2 中の<span class="bk">a</span>～<span class="bk">c</span>に入れる適切な字句を答えよ。</div></div>' +
'<div class="r p"><b>(2)</b><div>L 社の保守用 PC を用いてデータ分析用サーバの OS やミドルウェアなどの更新ファイルをインターネットから取得して適用する場合，表 2 のどのルールによって許可されるか。表 2 の項番を<u>全て</u>答えよ。</div></div></div></div>' +
'<div class="r q"><b>設問 3</b><div>〔処理遅延対策の検討〕について答えよ。' +
'<div class="r p"><b>(1)</b><div>本文中の<span class="bk">d</span>に入れる適切な字句を，図 1 の構成要素名で答えよ。</div></div>' +
'<div class="r p"><b>(2)</b><div>本文中の<span class="bk">e</span>，<span class="bk">f</span>に入れる適切な字句を解答群の中から選び，記号で答えよ。' +
'<div class="ag">解答群</div><div class="opts c2"><span>ア　コネクション数</span><span>イ　スケーラビリティ</span><span>ウ　スループット</span><span>エ　フィルタリングルール数</span><span>オ　プロビジョニング</span><span>カ　ポート数</span></div></div></div>' +
'<div class="r p"><b>(3)</b><div>本文中の下線③について，新システムに追加する機能の名称を解答群の中から選び，記号で答えよ。' +
'<div class="ag">解答群</div><div class="opts c2"><span>ア　IDS</span><span>イ　NAS</span><span>ウ　WAF</span><span>エ　ロードバランサー</span></div></div></div></div></div>'
  ];
})();
