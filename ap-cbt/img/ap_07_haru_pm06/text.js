/* 令和7年度 春期 応用情報技術者試験 午後 問6（IPA 公表の問題冊子を文字データに起こしたもの） */
window.CBT_TEXT = window.CBT_TEXT || {};
window.CBT_TEXT["ap_07_haru_pm06"] = [
'<p class="qh"><span>問6</span>販売管理システムの構築に関する次の記述を読んで，設問に答えよ。</p>' +
'<p class="ind sp">H 社は，全国の店舗及びインターネットで釣り具の販売を行っている。これまで販売促進のためにキャンペーンを定期的に実施してきたが，売上に全く結びつかないものもあった。そこで，キャンペーンの機能を強化し，さらにその効率を上げるために，既存の販売管理システムを改修した新しい販売管理システム（以下，新システムという）を構築することになった。</p>' +
'<p class="sec sp">〔キャンペーンの概要〕</p>' +
'<p class="ind">キャンペーンとは，2 週間～3 か月間の定められた期間，幾つかの商品に安い売価を設定することで，新規会員の獲得や，他の商品も一緒に購入してもらうことによる売上の向上を目指す活動である。</p>' +
'<p class="ind">新システムで提供するキャンペーンを広報する手段は 4 種類あり，種別と呼ばれる英字 1 字で分類される。新システムで提供するキャンペーン種別について，表 1 に示す。</p>' +
'<div class="tcap sp">表 1　新システムで提供するキャンペーン種別</div>' +
'<table class="tbl" style="vertical-align:top"><tr><th style="width:4em">種別</th><th style="width:10em">種別名</th><th>概要</th></tr>' +
'<tr><td class="c" style="vertical-align:top">H</td><td>葉書</td><td>キャンペーンについて，特定の会員に葉書で案内する。<br>全国の店舗及びインターネットでの販売が対象の場合，直近 1 年以内に購入した実績がある会員に案内する。<br>特定地域の店舗が対象の場合，店舗ごとに決められた範囲（以下，店舗エリアという）に住む会員に案内する。店舗エリアは，その店舗に来客が見込まれる会員の居住範囲を複数の郵便番号で定めた範囲として定義する。店舗エリアの範囲は，最初に対象店舗の半径 5 km 以内の地域に該当する郵便番号を登録し，定期的に見直す。</td></tr>' +
'<tr><td class="c" style="vertical-align:top">E</td><td>電子メール</td><td>キャンペーンについて，全ての会員に電子メールで案内する。案内の内容は，会員の住所や購入実績に応じてカスタマイズする。</td></tr>' +
'<tr><td class="c" style="vertical-align:top">B</td><td>バナー広告</td><td>釣り情報の Web サイトやソーシャルメディアにバナー広告を表示して，キャンペーンをアピールする。</td></tr>' +
'<tr><td class="c" style="vertical-align:top">L</td><td>リスティング広告<br>（検索連動型広告）</td><td>Web サイトの検索エンジンにおいて，釣り関連のキーワードを入力した際，検索結果に URL リンク付きのテキストを表示して，キャンペーンをアピールする。</td></tr></table>',

'<p class="ind">各キャンペーンには，目標となる複数の指標と予算を設定し，その実施を複数回に分けて行うことがある。その予算を各種別に配賦する割合を変えることによって目標達成率を上げる工夫が求められる。</p>' +
'<p class="ind">バナー広告とリスティング広告のキャンペーン（以下，Web キャンペーンという）は，キャンペーン単位で広告内容と予算金額を設定してから，Web マーケティングを運営する T 社に実施の詳細を委託する。T 社からは，広告内容として設定した広告表示位置やキーワードごとに，その広告費用や表示回数，クリック数などの実績を週次で集計したレポートが送付される。</p>' +
'<p class="ind">新システムの E-R 図（抜粋）を図 1 に示す。なお，新システムでは，E-R 図のエンティティ名を表名にし，属性名を列名にして，適切なデータ型で表定義した関係データベースによって，データを管理する。</p>' +
'<div class="fig sp"><img src="{BASE}ap_07_haru_pm06/fig1.png" style="width:100%" alt=""><div class="cap">図 1　新システムの E-R 図（抜粋）</div></div>',

'<p class="sec">〔キャンペーン種別ごとの実績の集計〕</p>' +
'<p class="ind">新しいキャンペーンを計画するために，指定したキャンペーンについて，キャンペーン種別ごとの実績として，売上，原価，粗利，実施金額を集計する SQL 文を図 2 に示す。ここで，“:キャンペーン番号”は指定したキャンペーン番号を表す埋込み変数である。なお，関数 COALESCE(A,B)は，A が NULL でないときは A を，A が NULL のときは B を返す。</p>' +
'<pre class="code sp" style="font-size:.92em">SELECT CK.キャンペーン種別, COALESCE(UK.売上計,0) AS 売上計,\n' +
'  COALESCE(UK.原価計,0) AS 原価計,\n' +
'  COALESCE(UK.売上計,0) - COALESCE(UK.原価計,0) AS 粗利計,\n' +
'  CK.キャンペーン実施金額計\n' +
'<span class="bk" style="min-width:20em">c</span>\n' +
'(SELECT キャンペーン種別, SUM(キャンペーン実施金額) AS キャンペーン実施金額計\n' +
' FROM キャンペーン実施\n' +
' WHERE キャンペーン番号 = :キャンペーン番号\n' +
' GROUP BY キャンペーン種別) CK\n' +
'<span class="bk" style="min-width:20em">d</span>\n' +
'(SELECT U.キャンペーン種別, SUM(M.商品個数 * M.商品単価) AS 売上計,\n' +
'  <span class="bk" style="min-width:20em">e</span> AS 原価計\n' +
' FROM 売上 U\n' +
'  INNER JOIN 売上明細 M ON U.売上番号 = M.売上番号\n' +
'  INNER JOIN 商品 S ON M.商品番号 = S.商品番号\n' +
' WHERE U.キャンペーン番号 = :キャンペーン番号\n' +
' GROUP BY U.キャンペーン種別) UK\n' +
'ON CK.キャンペーン種別 = UK.キャンペーン種別</pre>' +
'<div class="fig" style="margin-top:.2em"><div class="cap">図 2　キャンペーン種別ごとの実績を集計する SQL 文</div></div>' +
'<p class="sec sp">〔葉書を送る店舗エリアの見直し〕</p>' +
'<p class="ind">葉書を送る対象となる店舗エリアを，葉書キャンペーンによる会員の購入実績を基に見直すことを考える。対象の店舗における過去 1 年間に葉書キャンペーンで購入した会員の郵便番号ごとの売上実績数を，売上実績数の降順に出力する SQL 文を図 3 に示す。ここで，“:店舗番号”は指定した店舗番号を，“:一年前年月日”は現在から 1 年前の年月日を表す埋込み変数である。</p>',

'<pre class="code">SELECT K.会員郵便番号, COUNT(*) AS 売上実績数\n' +
'FROM 売上 U INNER JOIN 会員 K ON U.会員番号 = K.会員番号\n' +
'WHERE U.店舗番号 = :店舗番号\n' +
'  AND U.売上年月日 &gt;= :一年前年月日\n' +
'  <span class="bk" style="min-width:20em">f</span>\n' +
'GROUP BY K.会員郵便番号\n' +
'<span class="bk" style="min-width:20em">g</span></pre>' +
'<div class="fig" style="margin-top:.2em"><div class="cap">図 3　売上実績数を降順に出力する SQL 文</div></div>' +
'<p class="sec sp">〔Web キャンペーン内容の定期的な見直しの検討〕</p>' +
'<p class="ind">Web キャンペーンの効果をより高めるために，T 社から送付されるレポートを基に，キャンペーン期間中に広告内容を適宜変更する依頼を T 社に出すことを考える。Web キャンペーンの実績を記録するために追加した表の構造を図 4 に示す。</p>' +
'<div class="box sp" style="width:84%;margin-left:3%;padding-left:2.2em;text-indent:-1.2em">Web キャンペーン実績（<u>キャンペーン番号</u>，<u>キャンペーン実施番号</u>，キャンペーン種別，<u>広告番号</u>，<u>実績年月日</u>，<u>広告表示位置</u>，<u>キーワード</u>，広告費用，表示回数，クリック数，会員登録数）</div>' +
'<p class="note" style="margin-left:3%">注記　下線は主キーを示す。</p>' +
'<div class="fig" style="margin-top:.2em"><div class="cap">図 4　Web キャンペーンの実績を記録するために追加した表の構造</div></div>' +
'<p class="ind sp">レビューを実施したところ，Web キャンペーン実績表は日次で実績を集計する想定になってしまっているので見直す必要がある，との指摘を受けた。</p>' +
'<p class="ind">その後，<u>①受けた指摘に対応すること</u>で，目的の機能を実装することができた。</p>' +
'<div class="r q sp"><b>設問 1</b><div>図 1 中の<span class="bk">a</span>，<span class="bk">b</span>に入れる適切な属性名及びエンティティ間の関連を答え，E-R 図を完成させよ。なお，属性名及びエンティティ間の関連の表記は，図 1 の凡例に倣うこと。</div></div>' +
'<div class="r q"><b>設問 2</b><div>図 2 中の<span class="bk">c</span>～<span class="bk">e</span>に入れる適切な字句を答えよ。</div></div>' +
'<div class="r q"><b>設問 3</b><div>図 3 中の<span class="bk">f</span>，<span class="bk">g</span>に入れる適切な字句を答えよ。</div></div>' +
'<div class="r q"><b>設問 4</b><div>本文中の下線①について，対応した内容を 35 字以内で答えよ。</div></div>'
];
