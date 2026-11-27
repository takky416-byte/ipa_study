/* 令和5年度 秋期 応用情報技術者試験 午後 問6（IPA 公表の問題冊子を文字データに起こしたもの） */
window.CBT_TEXT = window.CBT_TEXT || {};
(function () {
  var B = function (k, w) { return '<span class="bk" style="min-width:' + (w || 4.6) + 'em">' + k + '</span>'; };
  var V = '<td style="vertical-align:top">';
  window.CBT_TEXT["ap_05_aki_pm06"] = [
'<p class="qh"><span>問6</span>在庫管理システムに関する次の記述を読んで，設問に答えよ。</p>' +
'<p class="ind sp">M 社は，ネットショップで日用雑貨の販売を行う企業である。M 社では，在庫管理について次の課題を抱えている。</p>' +
'<p class="li">・在庫が足りない商品の注文を受けることができず，機会損失につながっている。</p>' +
'<p class="li">・商品の仕入れの間隔や個数を調整する管理サイクルが長く，余計な在庫を抱える傾向にある。</p>' +
'<p class="sec sp">〔現状の在庫管理〕</p>' +
'<p class="ind">現在，在庫管理を次のように行っている。</p>' +
'<p class="li">・商品の注文を受けた段階で，出荷先に最も近い倉庫を見つけて，その倉庫の在庫から注文個数を引き当てる。この引き当てられた注文個数を引当済数という。各倉庫において，引き当てられた各商品単位の個数の総計を引当済総数という。</p>' +
'<p class="li">・実在庫数から引当済総数を引いたものを在庫数といい，在庫数以下の注文個数の場合だけ注文を受け付ける。</p>' +
'<p class="li">・商品が倉庫に入荷すると，入荷した商品の個数を実在庫数に足し込む。</p>' +
'<p class="li">・倉庫から商品を出荷すると，出荷個数を実在庫数から引くとともに引当済総数からも引くことで，引き当ての消し込みを行う。</p>' +
'<p class="ind sp">M 社では，月末の月次バッチ処理で毎月の締めの在庫数と売上個数を記録した分析用の表を用いて，商品ごとの在庫数と売上個数の推移を評価している。</p>' +
'<p class="ind">また，期末に商品の在庫回転日数を集計して，来期の仕入れの間隔や個数を調整している。</p>' +
'<p class="ind sp">M 社では，商品の在庫回転日数を，簡易的に次の式で計算している。</p>' +
'<div class="box" style="text-align:center">在庫回転日数　＝　期間内の平均在庫数×期間内の日数÷期間内の売上個数</div>' +
'<p class="ind sp">在庫回転日数の計算において，現状では，期間内の平均在庫数として 12 か月分の締めの在庫数の平均値を使用している。</p>' +
'<p class="ind sp">現状の在庫管理システムの E-R 図（抜粋）を図 1 に示す。</p>',

'<p class="ind">在庫管理システムのデータベースでは，E-R 図のエンティティ名を表名にし，属性名を列名にして，適切なデータ型で表定義した関係データベースによって，データを管理している。</p>' +
'<div class="fig sp"><img src="{BASE}ap_05_aki_pm06/fig1.png" style="width:100%" alt=""><div class="cap">図 1　現状の在庫管理システムの E-R 図（抜粋）</div></div>' +
'<p class="sec sp">〔在庫管理システム改修内容〕</p>' +
'<p class="ind">課題を解決するために，在庫管理システムに次の改修を行うことにした。</p>' +
'<p class="li">・在庫数が足りない場合は，在庫からは引き当てず，予約注文として受け付ける。なお，予約注文ごとに商品を発注することで，注文を受けた商品の個数が入荷される。</p>' +
'<p class="li">・商品の仕入れの間隔や個数を調整する管理サイクルを短くするために，在庫の評価を月次から日次の処理に変更して，毎日の締めの在庫数と売上個数を在庫推移状況エンティティに記録する。</p>' +
'<p class="ind sp">現状では，在庫数が足りない商品の予約注文を受けようとしても，在庫引当を行うと実在庫数より引当済総数の方が多くなってしまい，注文に応えられない。そこで，予約注文の在庫引当を商品の入荷のタイミングにずらすために，E-R 図に予約注文用の二つのエンティティを追加することにした。追加するエンティティを表 1 に，改修</p>',

'<p style="text-indent:0">後の在庫管理システムの E-R 図（抜粋）を図 2 に示す。</p>' +
'<div class="tcap sp">表 1　追加するエンティティ</div>' +
'<table class="tbl"><tr><th style="width:10em">エンティティ名</th><th>内容</th></tr>' +
'<tr><td>引当情報</td><td>予約注文を受けた商品の個数と入荷済となった商品の個数を管理する。</td></tr>' +
'<tr><td>引当予定</td><td>予約注文を受けた商品の，未入荷の引当済数の総計を管理する。</td></tr></table>' +
'<div class="fig sp"><img src="{BASE}ap_05_aki_pm06/fig2.png" style="width:100%" alt=""></div>' +
'<p class="note" style="margin-left:0">注記　新規に追加したエンティティは太枠で表す。</p>' +
'<div class="fig" style="margin-top:0"><div class="cap">図 2　改修後の在庫管理システムの E-R 図（抜粋）</div></div>' +
'<p class="ind sp">在庫管理システムにおける予約注文を受けた商品の個数に関する処理内容を表 2 に示す。</p>' +
'<div class="tcap sp">表 2　在庫管理システムにおける予約注文を受けた商品の個数に関する処理内容</div>' +
'<table class="tbl"><tr><th style="width:8.4em">処理タイミング</th><th>処理内容</th></tr>' +
'<tr>' + V + '予約注文を受けたとき</td>' + V + '引当情報エンティティのインスタンスを生成して，引当済数には注文を受けた商品の個数を，入荷済数には 0 を設定する。<br>引当予定エンティティの未入荷引当済総数に注文を受けた商品の個数を足す。</td></tr>' +
'<tr>' + V + '予約注文された商品が入荷したとき</td>' + V + B('e') + 'エンティティの未入荷引当済総数から入荷した商品の個数を引く。<br>' + B('f') + 'エンティティの実在庫数と引当済総数に入荷した商品の個数を足す。<br>入荷した商品の個数を' + B('g') + 'エンティティの個数に設定し，引当情報エンティティの' + B('h') + 'に足す。</td></tr>' +
'<tr>' + V + '予約注文された商品を出荷したとき</td>' + V + '出荷した商品の個数を出荷明細エンティティの個数に設定し，在庫エンティティの商品の実在庫数及び引当済総数から引く。</td></tr></table>',

'<p class="sec">〔在庫の評価〕</p>' +
'<p class="ind">より正確かつ迅速に在庫回転日数を把握するために，在庫推移状況エンティティから，期間を 1 週間（7 日間）として，倉庫コード，商品コードごとに，各年月日の 6 日前から当日までの平均在庫数及び売上個数で在庫回転日数を集計することにする。</p>' +
'<p class="ind">可読性を良くするために，SQL 文にはウィンドウ関数を使用することにする。</p>' +
'<p class="ind">ウィンドウ関数を使うと，FROM 句で指定した表の各行ごとに集計が可能であり，各行ごとに集計期間が異なるような移動平均も簡単に求めることができる。ウィンドウ関数で使用する構文（抜粋）を図 3 に示す。</p>' +
'<pre class="code sp" style="font-size:.8em;letter-spacing:0">' + [
'&lt;ウィンドウ関数&gt;::=',
'  &lt;ウィンドウ関数名&gt;(&lt;列&gt;) OVER {&lt;ウィンドウ名&gt; | (&lt;ウィンドウ指定&gt;)}',
'',
'&lt;WINDOW 句&gt;::=',
'  WINDOW &lt;ウィンドウ名&gt; AS (&lt;ウィンドウ指定&gt;) [{, &lt;ウィンドウ名&gt; AS (&lt;ウィンドウ指定&gt;)}...]',
'',
'&lt;ウィンドウ指定&gt;::=',
'    [&lt;PARTITION BY 句&gt;] [&lt;ORDER BY 句&gt;] [&lt;ウィンドウ枠&gt;]',
'',
'&lt;PARTITION BY 句&gt;::=',
'    PARTITION BY &lt;列&gt; [{, &lt;列&gt;}...]'].join('\n') + '</pre>' +
'<p class="note" style="margin-left:0;padding-left:4em;text-indent:-4em;font-size:.86em">注記 1　OVER の後に(&lt;ウィンドウ指定&gt;)を記載する代わりに，WINDOW 句で名前を付けて，&lt;ウィンドウ名&gt;で参照することができる。</p>' +
'<p class="note" style="margin-left:0;padding-left:4em;text-indent:-4em;font-size:.86em">注記 2　PARTITION BY 句は指定した列の値ごとに同じ値をもつ行を部分集合としてパーティションにまとめるオプションである。</p>' +
'<p class="note" style="margin-left:0;padding-left:4em;text-indent:-4em;font-size:.86em">注記 3　ウィンドウ枠の例として，ROWS BETWEEN n PRECEDING AND CURRENT ROW と記載した場合は，n 行前(n PRECEDING)から現在行(CURRENT ROW)までの範囲を対象として集計することを意味する。</p>' +
'<p class="note" style="margin-left:0;padding-left:4em;text-indent:-4em;font-size:.86em">注記 4　...は，省略符号を表し，式中で使用される要素を任意の回数繰り返してもよいことを示す。</p>' +
'<div class="fig" style="margin-top:0"><div class="cap">図 3　ウィンドウ関数で使用する構文（抜粋）</div></div>' +
'<p class="ind sp">ウィンドウ関数を用いて，倉庫コード，商品コードごとに，各年月日の 6 日前から当日までの平均在庫数及び売上個数を集計する SQL 文を図 4 に示す。</p>',

'<pre class="code">' + [
'SELECT 年, 月, 日, 倉庫コード, 商品コード,',
'       AVG(在庫数) ' + B('i', 6.2) + ' 期間定義 AS 平均在庫数,',
'       SUM(売上個数) ' + B('i', 6.2) + ' 期間定義 AS 期間内売上個数',
'  FROM 在庫推移状況',
'  WINDOW 期間定義 AS (',
'                     PARTITION BY 倉庫コード, 商品コード',
'                     ' + B('j', 6.2) + ' 年, 月, 日 ASC',
'                     ROWS BETWEEN 6 PRECEDING AND CURRENT ROW',
'                   )'].join('\n') + '</pre>' +
'<div class="fig" style="margin-top:.2em"><div class="cap" style="padding-left:2.5em;text-indent:-2.5em;text-align:left">図 4　倉庫コード，商品コードごとに，各年月日の 6 日前から当日までの平均在庫数及び売上個数を集計する SQL 文</div></div>' +
'<div class="r q sp"><b>設問 1</b><div>図 1 及び図 2 中の<span class="bk">a</span>に入れる適切なエンティティ間の関連を答え，E-R 図を完成させよ。なお，エンティティ間の関連の表記は図 1 の凡例に倣うこと。</div></div>' +
'<div class="r q"><b>設問 2</b><div>〔在庫管理システム改修内容〕について答えよ。' +
'<div class="r p"><b>(1)</b><div>図 2 中の<span class="bk">b</span>，<span class="bk">c</span>に入れる適切なエンティティ名を表 1 中のエンティティ名を用いて答えよ。</div></div>' +
'<div class="r p"><b>(2)</b><div>図 2 中の<span class="bk">d</span>に入れる，在庫推移状況エンティティに追加すべき適切な属性名を答えよ。なお，属性名の表記は図 1 の凡例に倣うこと。</div></div>' +
'<div class="r p"><b>(3)</b><div>表 2 中の<span class="bk">e</span>～<span class="bk">h</span>に入れる適切な字句を答えよ。</div></div></div></div>' +
'<div class="r q"><b>設問 3</b><div>図 4 中の<span class="bk">i</span>，<span class="bk">j</span>に入れる適切な字句を答えよ。</div></div>'
  ];
})();
