/* 令和6年度 春期 応用情報技術者試験 午後 問4（IPA 公表の問題冊子を文字データに起こしたもの） */
window.CBT_TEXT = window.CBT_TEXT || {};
(function () {
  var C = '<td class="c">', R = function (v) { return '<td style="text-align:right">' + v + '</td>'; };
  var P = '<span style="display:inline-block;width:1.25em;height:1.25em;line-height:1.15em;border:1px solid #000;border-radius:50%;text-align:center;font-size:.85em;text-indent:0;letter-spacing:0">P</span>';
  window.CBT_TEXT["ap_06_haru_pm04"] = [
'<p class="qh"><span>問4</span>CRM（Customer Relationship Management）システムの改修に関する次の記述を読んで，設問に答えよ。</p>' +
'<p class="ind sp">C 社は，住宅やビルなどのアルミサッシを製造，販売する中堅企業である。取引先の設計・施工会社のニーズにきめ細かく対応するために，自社で開発した CRM システム（以下，CRM システムという）を使用している。CRM システムは，データベースと Web アプリケーションプログラム（以下，Web アプリという）から成り，C 社の LAN 上にある PC から利用される。このたび，営業担当者が外出先からスマートフォンやノート PC を用いて CRM システムを利用できるようにするために，データベースは変更せずに Web アプリを改修することになった。</p>' +
'<p class="sec sp">〔Web アプリの改修方針〕</p>' +
'<p class="ind">Web アプリの改修方針を次に示す。</p>' +
'<p class="li">・必要以上の開発コストを掛けない。</p>' +
'<p class="li">・営業担当者が外出先で効率的に CRM システムを利用できるように，スマートフォンに最適化した画面を追加する。</p>' +
'<p class="li">・将来的に，CRM システム以外の社内システムとも連携できるように拡張性をもたせる。</p>' +
'<p class="sec sp">〔Web アプリの実装方式の検討〕</p>' +
'<p class="ind">これらの改修方針を受けて，図 1 の Web アプリを実装するシステムの構成案を検討した。</p>' +
'<div class="fig sp"><img src="{BASE}ap_06_haru_pm04/fig1.png" style="width:100%" alt=""><div class="cap">図 1　Web アプリを実装するシステムの構成案</div></div>',

'<p class="ind">検討した Web アプリの実装方式を次に示す。</p>' +
'<p class="li">・ユーザーインタフェースとデータ処理を分ける。ユーザーインタフェースは，Web サーバに HTML，Cascading Style Sheets（CSS），画像，スクリプトなどを静的なファイルとして配置する。データ処理は，AP が DB から取得したデータを JSON 形式のデータで返す Web API として実装する。</p>' +
'<p class="li">・ユーザーインタフェースとなる静的ファイルは，PC とスマートフォンそれぞれの Web ブラウザ用に個別に作成し，データ処理用の Web API は共用する。</p>' +
'<p class="li">・ユーザーインタフェースの表示速度を向上させるために，<u>①静的ファイルを最適化する</u>。</p>' +
'<p class="sec sp">〔実現可能性の評価〕</p>' +
'<p class="ind">〔Web アプリの実装方式の検討〕で示した方式の実現可能性を評価するために，プロトタイプを用いて多くのデータを扱う機能について検証した。その結果，スマートフォンの特定の画面において次の問題が発生した。</p>' +
'<p class="li">・扱うデータ量が増えるに連れて，レスポンスが著しく低下する。</p>' +
'<p class="li">・<u>②スマートフォンの CPU 負荷が大きく</u>，頻繁に使用するとバッテリの消耗が激しい。</p>' +
'<p class="ind">そこで，これらの問題の原因を調べるために，Web アプリの処理を分析した。レスポンスの悪かった日誌一覧の表示画面を図 2 に，Web API からの応答データを図 3 に示す。</p>' +
'<div class="sp" style="display:flex;justify-content:space-between;align-items:flex-end">' +
'<div class="fig" style="width:56%;margin:0"><img src="{BASE}ap_06_haru_pm04/fig2.png" style="width:100%" alt=""><div class="cap">図 2　日誌一覧の表示画面</div></div>' +
'<div class="fig" style="width:40%;margin:0"><img src="{BASE}ap_06_haru_pm04/fig3.png" style="width:100%" alt=""><div class="cap">図 3　Web API からの応答データ</div></div></div>',

'<p class="ind">スマートフォンの Web ブラウザから図 2 の画面をリクエストしてから描画されるまでの一連の処理について，処理ごとに所要時間を測定した結果を表 1 に示す。</p>' +
'<div class="tcap sp">表 1　処理ごとに所要時間を測定した結果</div>' +
'<table class="tbl" style="font-size:.92em;letter-spacing:0"><tr><th style="width:2.6em">No.</th><th>処理概要</th><th style="white-space:nowrap">所要時間<br>（ミリ秒）</th></tr>' +
'<tr>' + C + '1</td><td>Web ブラウザが画面に必要となる静的なファイルを全て受信する。</td>' + R(300) + '</tr>' +
'<tr>' + C + '2</td><td>Web ブラウザが Web API にリクエストして，図 3 の応答データを全て受信する。</td>' + R(800) + '</tr>' +
'<tr>' + C + '3</td><td>Web ブラウザ内で日誌のデータを日付の降順にソートして，画面に表示する最大件数である 4 件目までを抽出する。</td>' + R('1,200') + '</tr>' +
'<tr>' + C + '4</td><td>日誌本文が 42 文字を超える場合，先頭から 41 文字に文字“…”を結合した 42 文字の文字列にする。</td>' + R(300) + '</tr>' +
'<tr>' + C + '5</td><td>日誌一覧の表示を実行したユーザーが作成した日誌か否かを判断して，本人が作成した日誌には“編集”ボタンを表示する。</td>' + R(200) + '</tr>' +
'<tr>' + C + '6</td><td>データを Web ブラウザに描画する。</td>' + R(500) + '</tr></table>' +
'<p class="ind sp">表 1 から，図 3 の応答データのスマートフォンへの転送処理と，Web ブラウザ内でその応答データを加工する処理に多くの時間を要していることが判明した。</p>' +
'<p class="sec sp">〔Web アプリの見直し〕</p>' +
'<p class="ind">Web ブラウザが画面をリクエストしてから描画されるまでの所要時間の目標値を 3 秒以内に設定して，それを達成するために，次の三つの方式を検討した。</p>' +
'<div class="r"><b style="min-width:2em">①</b><div>スマートフォンのユーザーインタフェースをアプリケーションプログラム（以下，スマホアプリという）として開発して，そのスマホアプリ内で Web API からの応答データを加工・描画する方式</div></div>' +
'<div class="r"><b style="min-width:2em">②</b><div>リクエストのあった応答データのうち，Web ブラウザに描画するデータだけを返す Web API を開発して，スマートフォンの Web ブラウザからその Web API を利用する方式</div></div>' +
'<div class="r"><b style="min-width:2em">③</b><div>②で開発した Web API を①で開発したスマホアプリから利用する方式</div></div>' +
'<p class="ind">各方式について，応答データを加工・描画するソフトウェア又はサーバと，その実現可能性を評価するために，設けた評価項目について整理した結果を表 2 に示す。各評価項目の評価点に対する重み付けは均一とし，また，将来的な拡張性については各</p>',

'<p style="text-indent:0">実装方法を設計するタイミングで検討することにした。</p>' +
'<p class="ind">なお，〔実現可能性の評価〕においてプロトタイプを用いて検証した方式を方式' + P + 'とする。</p>' +
'<div class="tcap sp">表 2　整理した結果</div>' +
'<table class="tbl" style="width:94%;margin:0 auto;white-space:nowrap"><tr><th rowspan="2">方式</th><th colspan="2">ソフトウェア／サーバ</th><th colspan="3">評価項目</th><th rowspan="2">評価点<br>合計</th></tr>' +
'<tr><th>データ描画</th><th>データ加工</th><th>レスポンス</th><th>開発コスト</th><th>CPU 負荷</th></tr>' +
'<tr>' + C + P + '</td>' + C + 'Web ブラウザ</td>' + C + 'Web ブラウザ</td>' + C + '×</td>' + C + '◎</td>' + C + '×</td>' + C + '3 点</td></tr>' +
'<tr>' + C + '①</td>' + C + 'スマホアプリ</td>' + C + 'スマホアプリ</td>' + C + '○</td>' + C + '△</td>' + C + '△</td>' + C + '4 点</td></tr>' +
'<tr>' + C + '②</td>' + C + 'Web ブラウザ</td>' + C + 'AP</td>' + C + '○</td>' + C + '○</td>' + C + '○</td>' + C + '6 点</td></tr>' +
'<tr>' + C + '③</td>' + C + 'スマホアプリ</td>' + C + 'AP</td>' + C + '◎</td>' + C + '×</td>' + C + '○</td>' + C + '5 点</td></tr></table>' +
'<p class="note" style="margin-left:3%">凡例　◎：とても優れている，　3 点　○：優れている，　2 点</p>' +
'<p class="note" style="margin-left:3%;padding-left:3em">△：あまり優れていない，1 点　×：優れていない，0 点</p>' +
'<p class="sec sp">〔レスポンス時間の試算〕</p>' +
'<p class="ind">表 2 の結果から，方式②について更に検討を進めることになり，そのレスポンスが実用上問題ないか，表 1 を基に所要時間を試算した。</p>' +
'<p class="ind">表 1 中の No.2 の所要時間について考える。方式②の Web API からの応答データのサイズは，図 3 のデータのサイズの 4 分の 1 になり，サーバ側でのデータ転送には時間を要しないものと仮定すると，No.2 の所要時間は<span class="bk">a</span>ミリ秒となる。</p>' +
'<p class="ind">次に，No.3～No.5 の処理時間について考える。No.3 の処理は DB で，No.4 と No.5 の処理は AP で行われる。処理時間は各機器の CPU 処理能力だけに依存すると仮定する。各機器の CPU 処理能力は，スマートフォンが 10,000MIPS 相当，DB が 40,000MIPS 相当，AP が 20,000MIPS 相当の場合，No.3～No.5 の処理時間の合計は<span class="bk">b</span>ミリ秒となる。</p>' +
'<p class="ind">以上の試算の結果，方式②で十分なレスポンスが期待できることから，方式②を採用することにした。</p>' +
'<p class="sec sp">〔システム構成の検討〕</p>' +
'<p class="ind">方式②で開発した Web API の配置について検討した。図 1 の AP 上に配置する案も検討したが，<u>③将来的な拡張性</u>を考慮した結果，図 1 の AP とは別に，スマートフォンやノート PC から呼び出される Web API のための AP を，新たに追加する構成にした。</p>',

'<p class="ind">このシステム構成を採用した結果，問題を解消し，さらに将来的な拡張性をもたせることができた。</p>' +
'<div class="r q sp"><b>設問 1</b><div>本文中の下線①に該当するものを解答群の中から<u>全て</u>選び，記号で答えよ。' +
'<div class="ag">解答群</div><div class="opts c1">' +
'<div class="r o"><b>ア</b><div>HTML，CSS，スクリプトなどのコードに，パイプライン処理を有効にする設定を行う。</div></div>' +
'<div class="r o"><b>イ</b><div>HTML，CSS，スクリプトなどのコードに含まれる，余分な改行やコメントを削除する。</div></div>' +
'<div class="r o"><b>ウ</b><div>画像を，BMP や TIFF などの画像フォーマットにする。</div></div>' +
'<div class="r o"><b>エ</b><div>画像を，PNG や SVG などの画像フォーマットにする。</div></div>' +
'<div class="r o"><b>オ</b><div>全てのファイルをバイトコードに変換して圧縮する。</div></div></div></div></div>' +
'<div class="r q"><b>設問 2</b><div>〔実現可能性の評価〕について答えよ。' +
'<div class="r p"><b>(1)</b><div>本文中の下線②の要因として，最も適切なものを解答群の中から選び，記号で答えよ。' +
'<div class="ag">解答群</div><div class="opts c1">' +
'<div class="r o"><b>ア</b><div>JSON 形式の応答データを送受信する処理</div></div>' +
'<div class="r o"><b>イ</b><div>Web ブラウザに HTML，CSS，画像ファイルをレンダリングする処理</div></div>' +
'<div class="r o"><b>ウ</b><div>スマートフォンのメモリ上で日誌のデータを加工する処理</div></div>' +
'<div class="r o"><b>エ</b><div>日誌一覧の各担当がログインユーザーか否かを判別する処理</div></div></div></div></div>' +
'<div class="r p"><b>(2)</b><div>図 3 中の <i>α</i> と <i>β</i> の箇所にある“[”及び“]”で囲まれたデータはどのようなデータを表現するものか。データ形式に着目し，“日誌”という単語を用いて，15 字以内で答えよ。</div></div></div></div>' +
'<div class="r q"><b>設問 3</b><div>表 2 中の方式②のレスポンスが，方式' + P + 'に比べて優れていると評価した理由を二つ挙げ，それぞれ 30 字以内で答えよ。</div></div>' +
'<div class="r q"><b>設問 4</b><div>本文中の<span class="bk">a</span>，<span class="bk">b</span>に入れる適切な数値を答えよ。</div></div>' +
'<div class="r q"><b>設問 5</b><div>本文中の下線③の拡張性とは何か。40 字以内で答えよ。</div></div>'
  ];
})();
