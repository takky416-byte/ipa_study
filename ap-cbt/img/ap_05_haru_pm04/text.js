/* 令和5年度 春期 応用情報技術者試験 午後 問4（IPA 公表の問題冊子を文字データに起こしたもの） */
window.CBT_TEXT = window.CBT_TEXT || {};
(function () {
  var V = '<td style="vertical-align:top">', N = '<td style="vertical-align:top;white-space:nowrap">', R = function (v) { return '<td style="text-align:right;vertical-align:top;white-space:nowrap">' + v + '</td>'; };
  var C = function (v) { return '<td class="c" style="vertical-align:top">' + v + '</td>'; };
    window.CBT_TEXT["ap_05_haru_pm04"] = [
'<p class="qh"><span>問4</span>IT ニュース配信サービスの再構築に関する次の記述を読んで，設問に答えよ。</p>' +
'<p class="ind sp">H 社は，IT 関連のニュースを配信するサービスを提供している。このたび，OS や開発フレームワークの保守期間終了を機に，システムを再構築することにした。</p>' +
'<p class="sec sp">〔現状のシステム構成と課題〕</p>' +
'<p class="ind">IT ニュース配信サービスでは，多くの利用者にサービスを提供するために，複数台のサーバでシステムを構成している。配信される記事には，それぞれ固有の記事番号が割り振られている。現状のシステム構成を図 1 に，ニュースを表示する画面一覧を表 1 に示す。</p>' +
'<div class="fig sp"><img src="{BASE}ap_05_haru_pm04/fig1.png" style="width:90%" alt=""><div class="cap">図 1　現状の IT ニュース配信サービスのシステム構成</div></div>' +
'<div class="tcap sp">表 1　画面一覧</div>' +
'<table class="tbl"><tr><th style="width:9em">画面名</th><th>概要</th></tr>' +
'<tr>' + N + 'IT ニュース一覧</td>' + V + '記事に関連する画像，見出し，投稿日時を新しいものから順に一覧形式で表示する。一覧は一定の記事数ごとにページを切り替えることで，古い記事の一覧を閲覧することができる。</td></tr>' +
'<tr>' + N + 'IT ニュース記事</td>' + V + 'IT ニュース一覧画面で記事を選択すると，この画面に遷移し，選択された記事の見出し，投稿日時，本文及び本文内の画像を表示する。さらに，選択された記事と関連する一定数の記事の画像と見出しを一覧形式で表示する。</td></tr></table>' +
'<p class="ind sp">現状のシステム構成では，PC，タブレット，スマートフォン，それぞれに最適化した Web サイトを用意している。AP では，RDB とのデータ入出力と HTML ファイルの生成を行っている。また，関連する記事を見つけるために，夜間に Web サーバのアクセスログを RDB に取り込み，URL 中の記事番号を用いたアクセス解析を RDB 上のストア</p>',

'<p style="text-indent:0">ドプロシージャによって行っている。</p>' +
'<p class="ind">最近，利用者の増加に伴い，通勤時間帯などにアクセスが集中すると，応答速度が遅くなったり，タイムアウトが発生したりしている。</p>' +
'<p class="sec sp">〔新システムの方針〕</p>' +
'<p class="ind">この課題を解消するために，次の方針に沿った新システムの構成とする。</p>' +
'<p class="li">・<span class="bk">a</span>の機能を用いて，一つの Web サイトで全ての種類の端末に最適な画面を表示できるようにする。</p>' +
'<p class="li">・AP での動的な HTML の生成処理を行わない，SPA（Single Page Application）の構成にする。HTML，スクリプトなどのファイルは Web サーバに配置する。動的なデータは AP から Web API を通して提供し，データ形式は各端末の Web ブラウザ上で実行されるスクリプトが扱いやすい<span class="bk">b</span>とする。</p>' +
'<p class="li">・RDB への負荷を減らし，応答速度を短縮するために，キャッシュサーバを配置する。</p>' +
'<p class="li">・IT ニュース一覧画面に表示する記事の一覧のデータと，IT ニュース記事画面に表示する関連する記事に関するデータは，キャッシュサーバに格納する。キャッシュサーバには，これらのデータを全て格納できるだけの容量をもたせる。その上で，記事のデータは，閲覧されたデータをキャッシュサーバに設定したメモリの上限値まで格納する。</p>' +
'<p class="li">・RDB のデータベース構造と，関連する記事を見つける処理は現状の仕組みを利用する。</p>' +
'<p class="ind sp">AP で提供する Web API を表 2 に示す。</p>' +
'<div class="tcap sp">表 2　AP で提供する Web API</div>' +
'<table class="tbl"><tr><th style="width:8.8em">Web API 名</th><th>概要</th></tr>' +
'<tr>' + N + 'ITNewsList</td>' + V + '表示させたい IT ニュース一覧画面のページ番号を受け取り，そのページに含まれる記事の記事番号，関連する画像の URL，見出し，投稿日時のリストを返す。データは，キャッシュサーバから取得する。</td></tr>' +
'<tr>' + N + 'ITNewsDetail</td>' + V + 'IT ニュース記事画面に必要な見出し，投稿日時，本文，本文内に表示する画像の URL，関連する記事の記事番号のリストを返す。1 件の記事に対して関連する記事は 6 件である。データは，キャッシュサーバに格納されている場合はそのデータを，格納されていない場合は，RDB から取得してキャッシュサーバに格納して利用する。キャッシュするデータは<u>①LFU 方式</u>で管理する。</td></tr>' +
'<tr>' + N + 'ITNewsHeadline</td>' + V + 'IT ニュース記事画面に表示する，関連する記事 1 件分の記事に関する画像の URL と見出しを返す。データは，キャッシュサーバから取得する。</td></tr></table>',

'<p class="ind">次に，Web ブラウザ上で実行されるスクリプトの概要を表 3 に示す。</p>' +
'<div class="tcap sp">表 3　Web ブラウザ上で実行されるスクリプトの概要</div>' +
'<table class="tbl"><tr><th style="width:9em">画面名</th><th>概要</th></tr>' +
'<tr>' + N + 'IT ニュース一覧</td>' + V + '表示させたい IT ニュース一覧画面のページ番号を指定して Web API “ITNewsList”を呼び出し，取得したデータを一覧表として整形する。</td></tr>' +
'<tr>' + N + 'IT ニュース記事</td>' + V + '表示させたい記事の記事番号を指定して Web API “ITNewsDetail”を呼び出し，対象記事のデータを取得する。次に，表示させたい記事に関連する記事の記事番号を一つずつ指定して Web API “ITNewsHeadline”を呼び出し，関連する記事の表示に必要なデータを取得する。最後に，取得したデータを文書フォーマットとして整形する。</td></tr></table>' +
'<p class="sec sp">〔キャッシュサーバの実装方式の検討〕</p>' +
'<p class="ind">キャッシュサーバの実装方式として，次に示す二つの方式を検討する。</p>' +
'<div class="r p"><b>(1)</b><div>各 AP の内部にインメモリデータベースとして実装する方式</div></div>' +
'<div class="r p"><b>(2)</b><div>1 台の NoSQL データベースとして実装する方式</div></div>' +
'<p class="ind">AP の OS のスケジューラーが 5 分間隔で，IT ニュース一覧画面に表示する記事の一覧と，各記事に関連する記事の一覧のデータを更新する処理を起動する。(1)の場合，各 AP 上のプロセスが内部のキャッシュデータを更新する。(2)の場合，特定の AP 上のプロセスがキャッシュデータを更新する。</p>' +
'<p class="ind">なお，AP の CPU 使用率が高い場合，Web API の応答速度を優先するために，更新処理は行わない。</p>' +
'<p class="sec sp">〔応答速度の試算〕</p>' +
'<p class="ind">新システムにおける応答速度を試算するために，キャッシュサーバの二つの方式をそれぞれテスト環境に構築して，本番相当のテストデータを用いて処理時間を測定した。その結果を表 4 に示す。</p>',

'<div class="tcap">表 4　テストデータを用いて処理時間を測定した結果</div>' +
'<table class="tbl" style="font-size:.92em;letter-spacing:0"><tr><th rowspan="2" style="width:2.6em">No.</th><th rowspan="2">測定内容</th><th colspan="2">測定結果</th></tr>' +
'<tr><th style="white-space:nowrap">方式(1)</th><th style="white-space:nowrap">方式(2)</th></tr>' +
'<tr>' + C(1) + V + 'Web サーバが IT ニュース一覧画面又は IT ニュース記事画面のリクエストを受けてから，HTML やスクリプトなどのファイルを全て転送するまでの時間</td>' + R('80ms') + R('80ms') + '</tr>' +
'<tr>' + C(2) + V + 'AP が Web API “ITNewsList”のリクエストを受けてから，応答データを全て転送するまでの時間</td>' + R('100ms') + R('200ms') + '</tr>' +
'<tr>' + C(3) + V + 'AP が Web API “ITNewsDetail”でリクエストされた対象記事のデータがキャッシュサーバに格納されている割合</td>' + R('60%') + R('90%') + '</tr>' +
'<tr>' + C(4) + V + 'AP が Web API “ITNewsDetail”のリクエストを受けてから，キャッシュサーバにある対象記事のデータを全て転送するまでの時間</td>' + R('60ms') + R('120ms') + '</tr>' +
'<tr>' + C(5) + V + 'AP が Web API “ITNewsDetail”のリクエストを受けてから，RDB にある対象記事のデータを全て転送するまでの時間</td>' + R('300ms') + R('300ms') + '</tr>' +
'<tr>' + C(6) + V + 'AP が Web API “ITNewsHeadline”のリクエストを受けてから，応答データを全て転送するまでの時間</td>' + R('15ms') + R('20ms') + '</tr></table>' +
'<p class="note" style="margin-left:0">注記　ms：ミリ秒</p>' +
'<p class="ind sp">インターネットを介した転送時間や Web ブラウザ上の処理時間は掛からないと仮定して応答時間を考える。その場合，IT ニュース一覧画面を初めて表示する場合の応答時間は，方式(1)では 180ms，方式(2)では<span class="bk">c</span>ms である。IT ニュース一覧画面のページを切り替える場合の応答時間は，方式(1)では 100ms，方式(2)では<span class="bk">d</span>ms である。次に，記事をリクエストした際の平均応答時間を考える。Web API “ITNewsDetail”の平均応答時間は，方式(1)では 156ms，方式(2)では<span class="bk">e</span>ms である。したがって，Web API “ITNewsHeadline”の呼び出しも含めた IT ニュース記事画面を表示するための平均応答時間は，方式(1)では<span class="bk">f</span>ms，方式(2)では 258ms となる。</p>' +
'<p class="ind">以上の試算から，方式(1)を採用することにした。</p>' +
'<p class="sec sp">〔不具合の指摘と改修〕</p>' +
'<p class="ind">新システムの方式(1)を採用した構成についてレビューを実施したところ，次の指摘があった。</p>' +
'<div class="r p"><b>(1)</b><div>IT ニュース記事画面の応答速度の不具合<p class="ind">IT ニュース記事画面を生成するスクリプトが実際にインターネットを介して実行された場合，試算した応答速度より大幅に遅くなってしまうことが懸念される。</p></div></div>',

'<div class="r p"><b style="visibility:hidden">(1)</b><div><p style="text-indent:0">Web API “<span class="bk">g</span>”内から，Web API “<span class="bk">h</span>”を呼び出すように処理を改修する必要がある。</p></div></div>' +
'<div class="r p"><b>(2)</b><div>AP の CPU 使用率が高い状態が続いた場合の不具合' +
'<p class="ind">AP に処理が偏って CPU 使用率が高い状態が続いた場合，<u>②ある画面の表示内容に不具合が出てしまう</u>。</p>' +
'<p class="ind">この不具合を回避するためには，各 AP の CPU 使用率を監視して，しきい値を超えた状態が一定時間以上続いた場合，AP をスケールアウトして負荷を分散させる仕組みをあらかじめ用意する。</p></div></div>' +
'<div class="r p"><b>(3)</b><div>関連する記事が取得できない不具合' +
'<p class="ind">関連する記事を見つける処理について，<u>③現状の仕組みのままでは関連する記事が見つけられない</u>。Web サーバのアクセスログを解析する処理を，AP のアクセスログを解析する処理に改修する必要がある。</p></div></div>' +
'<p class="ind sp">以上の指摘を受けて，必要な改修を行った結果，新システムをリリースできた。</p>' +
'<div class="r q sp"><b>設問 1</b><div>〔新システムの方針〕について答えよ。' +
'<div class="r p"><b>(1)</b><div>本文中の<span class="bk">a</span>に入れる適切な字句を解答群の中から選び，記号で答えよ。' +
'<div class="ag">解答群</div><div class="opts c4"><span>ア　CSS</span><span>イ　DOM</span><span>ウ　HREF</span><span>エ　Python</span></div></div></div>' +
'<div class="r p"><b>(2)</b><div>本文中の<span class="bk">b</span>に入れる適切な字句を答えよ。</div></div>' +
'<div class="r p"><b>(3)</b><div>表 2 中の下線①の方式にすることで，どのような記事がキャッシュサーバに格納されやすくなるか。15 字以内で答えよ。</div></div></div></div>' +
'<div class="r q"><b>設問 2</b><div>本文中の<span class="bk">c</span>～<span class="bk">f</span>に入れる適切な数値を答えよ。</div></div>' +
'<div class="r q"><b>設問 3</b><div>〔不具合の指摘と改修〕について答えよ。' +
'<div class="r p"><b>(1)</b><div>本文中の<span class="bk">g</span>，<span class="bk">h</span>に入れる適切な字句を，表 2 中の Web API 名の中から答えよ。</div></div>' +
'<div class="r p"><b>(2)</b><div>本文中の下線②にある不具合とは何か。35 字以内で答えよ。</div></div>' +
'<div class="r p"><b>(3)</b><div>本文中の下線③の理由を，40 字以内で答えよ。</div></div></div></div>'
  ];
})();
