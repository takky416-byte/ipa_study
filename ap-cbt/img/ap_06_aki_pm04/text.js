/* 令和6年度 秋期 応用情報技術者試験 午後 問4（IPA 公表の問題冊子を文字データに起こしたもの） */
window.CBT_TEXT = window.CBT_TEXT || {};
(function () {
  var R = function (v) { return '<td style="text-align:right">' + v + '</td>'; };
  window.CBT_TEXT["ap_06_aki_pm04"] = [
'<p class="qh"><span>問4</span>データ処理機能の配置に関する次の記述を読んで，設問に答えよ。</p>' +
'<p class="ind sp">C 社は，動画配信サービスを提供する会社であり，サービス内容が充実していることが人気を呼び，動画配信者数や動画視聴者数が増えている。動画配信者は，Web ブラウザを用いて，ビデオカメラやスマートフォンで撮影した動画ファイルを C 社の Web サイトにアップロードすると，Web サイト上で動画の編集・配信，広報，アクセス分析などの機能が利用できる。</p>' +
'<p class="ind">C 社の動画配信サービスは，C 社配信システム部が企画から運用までを担当している。配信システム部では，サービス内容の向上を目的に，動画編集機能を強化した動画配信者向けの新しいサービスを提供するシステム（以下，新システムという）を構築することにした。新システムの構築は，配信システム部の D 君が担当することになった。</p>' +
'<p class="sec sp">〔新システムに必要な機能〕</p>' +
'<p class="ind">D 君は，現在の動画配信サービスの機能を基に，新システムに必要な動画配信者向け機能の機能要件を定義した。新システムに必要な機能一覧（抜粋）を表 1 に示す。</p>' +
'<div class="tcap sp">表 1　新システムに必要な機能一覧（抜粋）</div>' +
'<table class="tbl"><tr><th style="width:8em">機能名</th><th>機能概要</th></tr>' +
'<tr><td>アップロード</td><td>動画配信者がビデオカメラやスマートフォンで撮影した動画を C 社の Web サイトにアップロードして登録する機能</td></tr>' +
'<tr><td>動画編集</td><td>C 社の Web サイトに登録された動画を，Web ブラウザを用いて編集する（カットする，結合する，BGM・テロップを挿入するなど）機能</td></tr>' +
'<tr><td>配信準備</td><td>動画視聴者のネットワーク・環境に合わせた複数のビットレートの動画ファイルを作成する機能</td></tr>' +
'<tr><td>アクセス分析</td><td>動画が動画視聴者に何回アクセスされているかを，複数の分析軸（地域，日時，年齢層，端末種別，アクセス動線など）から分析する機能</td></tr></table>' +
'<p class="sec sp">〔新システムのサーバ構成〕</p>' +
'<p class="ind">D 君は，新システムのサーバ構成を設計した。D 君が設計した新システムのサーバ構成（抜粋）を図 1 に示す。また，SSD と HDD のアクセス速度を表 2 に，LAN とインターネットの通信速度を表 3 に，各サーバの CPU と GPU の搭載数を表 4 に示す。なお，新システム内の負荷分散装置，サーバ，NAS は LAN で接続されている。</p>',

'<div class="fig"><img src="{BASE}ap_06_aki_pm04/fig1.png" style="width:94%" alt=""></div>' +
'<p class="note" style="margin-left:0">注記　図 1 中の AP サーバはアプリケーションサーバを示す。また，DB サーバはデータベースサーバを示す。</p>' +
'<div class="fig" style="margin-top:0"><div class="cap">図 1　新システムのサーバ構成（抜粋）</div></div>' +
'<div class="sp" style="display:flex;justify-content:space-between;align-items:flex-start">' +
'<div style="width:46%"><div class="tcap" style="white-space:nowrap;letter-spacing:0">表 2　SSD と HDD のアクセス速度</div>' +
'<table class="tbl" style="width:100%;font-size:.86em;letter-spacing:0;white-space:nowrap"><tr><th>装置</th><th>読込速度<br>（M バイト／秒）</th><th>書込速度<br>（M バイト／秒）</th></tr>' +
'<tr><td>SSD</td>' + R(500) + R(400) + '</tr><tr><td>HDD</td>' + R(250) + R(150) + '</tr></table></div>' +
'<div style="width:46%"><div class="tcap" style="white-space:nowrap;letter-spacing:0">表 3　LAN とインターネットの通信速度</div>' +
'<table class="tbl" style="width:100%;font-size:.86em;letter-spacing:0;white-space:nowrap"><tr><th>回線</th><th>通信速度<br>（G bps）</th></tr>' +
'<tr><td>LAN</td>' + R(1) + '</tr><tr><td>インターネット</td>' + R(10) + '</tr></table>' +
'<p class="note" style="margin-left:0">注記　表 3 中の bps はビット／秒を指す。</p></div></div>' +
'<div class="tcap sp" style="width:49%;text-align:center">表 4　各サーバの CPU と GPU の搭載数</div>' +
'<table class="tbl" style="width:40%;margin-left:3%;white-space:nowrap"><tr><th>サーバ</th><th>CPU<br>（コア）</th><th>GPU<br>（個）</th></tr>' +
'<tr><td>AP サーバ</td>' + R(16) + R(0) + '</tr><tr><td>DB サーバ</td>' + R(32) + R(0) + '</tr><tr><td>GPU サーバ</td>' + R(4) + R(4) + '</tr></table>' +
'<p class="ind sp">各サーバで計算を行う CPU や GPU で実行される演算は，<u>①整数演算</u>と浮動小数点演算の二つに分類される。新システムで利用する CPU は，1 コア当たり整数演算が 10,000G Operations／秒（以下，OPS という），浮動小数点演算が 500G Floating-point Operations／秒（以下，FLOPS という）で実行できる。また，GPU は 1 個当たり浮動小数点演算が 10,000G FLOPS で実行できる。</p>' +
'<p class="ind">この新システムを用いて，AP サーバ 1 が AP サーバ 1 の SSD に格納された 800M バイトの動画ファイルをメモリに読み込む時間は<span class="bk">a</span>秒である。また，DB サーバの DBMS は RDB である。</p>' +
'<p class="sec sp">〔配置の検討〕</p>' +
'<p class="ind">D 君は，新システムの各機能の中でデータ量や計算量が多い処理を抽出した。デー</p>',

'<p style="text-indent:0">タ量や計算量が多い処理の一覧を表 5 に示す。なお，データ量には，各処理を実行するために CPU や GPU にインプットされるデータ量と，CPU や GPU で計算した後にアウトプットされるデータ量とがある。</p>' +
'<div class="tcap sp">表 5　データ量や計算量が多い処理の一覧</div>' +
'<table class="tbl" style="font-size:.84em;letter-spacing:0"><tr><th rowspan="2" style="width:3.6em;white-space:nowrap">機能名</th><th rowspan="2" style="width:5em">処理名</th><th rowspan="2">処理方法</th><th colspan="2">データ量</th><th colspan="2">計算量</th></tr>' +
'<tr><th style="white-space:nowrap">インプット<br>（M バイト）</th><th style="white-space:nowrap">アウトプット<br>（M バイト）</th><th style="white-space:nowrap">整数<br>演算数<br>（GO）</th><th style="white-space:nowrap">浮動小数<br>点演算数<br>（GFLO）</th></tr>' +
'<tr><td class="c" style="vertical-align:top">動画<br>編集</td><td style="vertical-align:top">素材送信</td><td>NAS に格納されている BGM 素材やテロップ素材を，NAS から AP サーバへ送信し，AP サーバから動画配信者の PC へ送信する。</td>' + R(50) + R(50) + R(10) + R(0) + '</tr>' +
'<tr><td class="c" style="vertical-align:top">配信<br>準備</td><td style="vertical-align:top">レンダリング</td><td>AP サーバのメモリに格納されている動画データを基に BGM，テロップなどを合成して一つの動画データを作成する。</td>' + R(500) + R(100) + R(0) + R('100,000') + '</tr>' +
'<tr><td rowspan="2" class="c" style="vertical-align:top">アクセス分析</td><td style="vertical-align:top">オンラインユーザ数取得</td><td>DB サーバに格納されている特定の動画を視聴しているオンラインユーザ数をリアルタイムに集計して表示する。</td>' + R(100) + R(0.1) + R(50) + R(0) + '</tr>' +
'<tr><td style="vertical-align:top">多次元分析</td><td>DB サーバに格納されている前日までの動画の視聴ログを複数の分析軸から分析する。</td>' + R('50,000') + R(1) + R(300) + R(0) + '</tr></table>' +
'<p class="note" style="margin-left:0">注記　GO は Giga Operations を示し，GFLO は Giga Floating-point Operations を示す。</p>' +
'<p class="ind sp">レンダリング処理は，AP サーバの CPU を 4 コア用いて処理する場合には<span class="bk">b</span>秒掛かり，GPU サーバの GPU だけを 1 個用いて処理する場合には<span class="bk">c</span>秒掛かる。ただし，GPU サーバを用いて処理する場合には，AP サーバから GPU サーバへデータを送信するのに<span class="bk">d</span>秒掛かり，AP サーバへレンダリング結果を返信するのに<span class="bk">e</span>秒掛かる。この検討結果から，AP サーバよりも GPU サーバで処理した方がよい。</p>' +
'<p class="ind">オンラインユーザ数取得処理について，D 君は<u>②DB サーバで処理した結果を AP サーバへ送信する方法が最適と考え</u>，DB サーバで処理することにした。</p>' +
'<p class="ind">素材送信処理は，同時に 100 名の動画配信者向けに素材データを送信しようとすると，LAN の通信速度と HDD の読込速度が遅く送信に時間が掛かる。しかし，図 1 のサーバ構成の変更には大きな費用が掛かることから，サーバ構成を変更せずに対応する方法を検討した。動画配信者の PC へ送信する素材データは特定の素材データに偏っており，各素材データの更新頻度も高くないことから，表 5 の<u>③素材送信処理の処理方法を変更</u>して対応することにした。</p>',

'<p class="sec">〔動画配信者数増大への対応方針〕</p>' +
'<p class="ind">D 君は，将来的に動画配信者数が増大することを考慮して，新システムの拡張性について検討した。まず，表 5 のレンダリング処理は，動画データごとに処理が独立しており，GPU サーバを手動で追加する<span class="bk">f</span>の対応を行う方針にした。一方で，オンラインユーザ数取得処理は，時間とともに断続的に追記される動画の視聴ログをリアルタイムに集計する処理であり，DB サーバの数を増やせないことから，DB サーバを<span class="bk">g</span>して対応を行う方針にした。また，多次元分析処理は，<u>④そこで扱うデータの特徴</u>から，多次元分析処理専用の DB サーバを追加する方針にした。これによって多次元分析処理の負荷が他の処理へ影響しないようになる。</p>' +
'<p class="ind sp">その後，D 君は新システムの構築を完了させ，C 社は新システムによる新しい動画配信者向けサービスの提供を開始した。</p>' +
'<div class="r q sp"><b>設問 1</b><div>〔新システムのサーバ構成〕について答えよ。' +
'<div class="r p"><b>(1)</b><div>本文中の下線①について，整数演算に該当する演算を解答群の中から<u>全て</u>選び，記号で答えよ。' +
'<div class="ag">解答群</div><div class="opts c2"><span>ア　300 ＋ 200 － 100</span><span>イ　300 × 200 ÷ 100</span><span>ウ　3.00 ＋ 2.00 － 0.10</span><span>エ　－300 ＋ (－200) － (－100)</span><span>オ　300 × 0</span><span>カ　3.00 × 0</span></div></div></div>' +
'<div class="r p"><b>(2)</b><div>本文中の<span class="bk">a</span>に入れる適切な数値を答えよ。ここで，本文に記載の読込速度，書込速度を実効速度とし，他のオーバヘッドは無視できるものとする。なお，計算結果に小数が発生する場合，答えは小数第 2 位を四捨五入して小数第 1 位まで求めよ。</div></div></div></div>' +
'<div class="r q"><b>設問 2</b><div>〔配置の検討〕について答えよ。ここで，図 1 のサーバ構成を一つの処理が占有でき，〔新システムのサーバ構成〕と表 5 に記載以外のオーバヘッドや並列処理に伴うオーバヘッドは無視できるものとする。' +
'<div class="r p"><b>(1)</b><div>本文中の<span class="bk">b</span>～<span class="bk">d</span>に入れる適切な数値を，整数で答えよ。</div></div>' +
'<div class="r p"><b>(2)</b><div>本文中の<span class="bk">e</span>に入れる適切な数値を答えよ。なお，計算結果に小数が発生する場合，答えは小数第 2 位を四捨五入して小数第 1 位まで求めよ。</div></div>' +
'<div class="r p"><b>(3)</b><div>本文中の下線②について，DB サーバで処理した結果を AP サーバへ送信する方法が最適と考えたのはなぜか。データ量の観点から 35 字以内で答えよ。</div></div>' +
'<div class="r p"><b>(4)</b><div>本文中の下線③について，素材送信処理の処理方法をどのように変更したか。変更点を 30 字以内で答えよ。</div></div></div></div>',

'<div class="r q"><b>設問 3</b><div>〔動画配信者数増大への対応方針〕について答えよ。' +
'<div class="r p"><b>(1)</b><div>本文中の<span class="bk">f</span>，<span class="bk">g</span>に入れる適切な字句を解答群の中から選び，記号で答えよ。' +
'<div class="ag">解答群</div><div class="opts c2"><span>ア　スケールアウト</span><span>イ　スケールアップ</span><span>ウ　スケールイン</span><span>エ　スケールダウン</span></div></div></div>' +
'<div class="r p"><b>(2)</b><div>本文中の下線④について，オンラインユーザ数取得処理と対比して，多次元分析処理で扱うデータの特徴を 20 字以内で答えよ。</div></div></div></div>'
  ];
})();
