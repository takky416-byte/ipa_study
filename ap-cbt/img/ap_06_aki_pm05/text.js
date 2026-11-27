/* 令和6年度 秋期 応用情報技術者試験 午後 問5（IPA 公表の問題冊子を文字データに起こしたもの） */
window.CBT_TEXT = window.CBT_TEXT || {};
window.CBT_TEXT["ap_06_aki_pm05"] = [
'<p class="qh"><span>問5</span>セキュア Web ゲートウェイサービスの導入に関する次の記述を読んで，設問に答えよ。</p>' +
'<p class="ind sp">E 社は，インターネットを利用した人材紹介業を営む会社である。</p>' +
'<p class="ind">E 社のネットワークは，DMZ セグメント，内部セグメント及びサーバセグメントから構成されている。DMZ セグメントには，コンテンツフィルタリング機能や Web サイトのアクセス制御機能をもつプロキシサーバ及び DNS サーバが設置されている。プロキシサーバでは，内部セグメントからインターネット向けの HTTP 通信，HTTP Over TLS（以下，HTTPS という）通信を中継し，アクセスログを保管している。内部セグメントには E 社の従業員が利用する PC が，サーバセグメントには業務サーバが，それぞれ設置されている。</p>' +
'<p class="ind">E 社の従業員は，PC の Web ブラウザを用いて，HTTP 通信でサーバセグメントの業務サーバに直接アクセスして業務を実施したり，HTTPS 通信で Y 社が提供する SaaS（以下，Y 社 SaaS という）にアクセスして，電子メールサービス，ファイル共有サービス，チャットサービスなどを活用したりしている。</p>' +
'<p class="sec sp">〔E 社のネットワーク構成〕</p>' +
'<p class="ind">E 社のネットワーク構成を，図 1 に示す。</p>' +
'<div class="fig sp"><img src="{BASE}ap_06_aki_pm05/fig1.png" style="width:100%" alt=""></div>' +
'<p class="note" style="margin-left:12%">注記　ip1，ip2，…，ip7 はグローバル又はプライベート IP アドレスである。</p>' +
'<div class="fig" style="margin-top:0"><div class="cap">図 1　E 社のネットワーク構成</div></div>' +
'<p class="ind sp">E 社のルータでは，<span class="bk">a</span>機能を用いて，E 社内に割り当てられたプライベー</p>',

'<p style="text-indent:0">ト IP アドレスをグローバル IP アドレス及びポート番号に変換している。</p>' +
'<p class="ind">Y 社 SaaS では，E 社からのアクセスに対して<u>①送信元 IP アドレスでアクセス制限を行っている</u>。</p>' +
'<p class="sec sp">〔セキュア Web ゲートウェイサービスの導入検討〕</p>' +
'<p class="ind">E 社では，近年の業務拡大に伴い，インターネット利用の機会が急激に拡大してきた。情報システム部の F 部長は，悪意のある Web サイトへ意図せずにアクセスしたり，社内の機密情報や顧客情報が漏えいしたりするおそれがあると考え，インターネットアクセスに対するセキュリティ対策を強化することにした。そこで，部下の G 主任に，社内のプロキシサーバに代えて，Z 社が SaaS として提供するセキュア Web ゲートウェイサービス（以下，サービス Z という）の導入検討を指示した。</p>' +
'<p class="sec sp">〔サービス Z の概要〕</p>' +
'<p class="ind">G 主任は，サービス Z の概要を調査した。</p>' +
'<p class="ind">サービス Z は，PC からインターネット上の Web サイトへのアクセスを安全に行うためのサービスであり，主な機能は次の三つである。</p>' +
'<div class="r p"><b>(1)</b><div>アクセス先の<span class="bk">b</span>や IP アドレスから悪意のある Web サイトであるかどうかを評価し，安全でないと評価された場合はアクセスを遮断する機能</div></div>' +
'<div class="r p"><b>(2)</b><div>機密情報や顧客情報が E 社外に漏えいしないように，TLS で暗号化された通信内容をサービス Z 内で復号して通信内容を検査し，これらの情報が含まれていないことを確認する機能</div></div>' +
'<div class="r p"><b>(3)</b><div><u>②インターネット上の Web サイトから受け取ったプログラムをサービス Z 内の保護された領域で動作させ，E 社システムが不正に操作されるおそれがないことを確認する機能</u></div></div>' +
'<p class="ind sp">サービス Z を利用するためには，E 社の全ての PC に専用のクライアントソフトウェア（以下，ソフト C という）を導入し，PC の Web ブラウザからインターネット上の Web サイトへのアクセスを，ソフト C を介して行う必要がある。ソフト C からサービス Z には，HTTPS 通信を用いて接続する。サービス Z は，PC からインターネット上への全ての Web アクセスについて，どの PC からアクセスされたものかを識別して，ア</p>',

'<p style="text-indent:0">クセスの監視や各種制御を行う。</p>' +
'<p class="sec sp">〔ネットワーク構成の変更〕</p>' +
'<p class="ind">G 主任は，サービス Z の調査結果を基に，サービス Z 導入後の E 社のネットワーク構成案を図 2 のように考えた。</p>' +
'<div class="fig sp"><img src="{BASE}ap_06_aki_pm05/fig2.png" style="width:100%" alt=""></div>' +
'<p class="note" style="margin-left:6%">注記　ip1，ip2，ip4，ip5，…，ip8 はグローバル又はプライベート IP アドレスである。</p>' +
'<div class="fig" style="margin-top:0"><div class="cap">図 2　サービス Z 導入後の E 社のネットワーク構成案</div></div>' +
'<p class="ind sp">G 主任は，サービス Z 導入に当たって必要となる作業を検討し，次の四点に整理した。</p>' +
'<div class="r p"><b>(1)</b><div>現行の E 社のネットワーク構成からプロキシサーバを廃止し，社内の PC からインターネット上の Web サイトへのアクセスは，宛先 IP アドレスが<span class="bk">c</span>のものだけを許可するように，FW の許可ルールを変更する。</div></div>' +
'<div class="r p"><b>(2)</b><div>PC にソフト C を導入する。このソフト C は，各 PC 上でローカルプロキシとして動作する。各 PC のプロキシ設定を変更して，このソフト C をプロキシとして利用する。ソフト C から HTTPS 通信によってインターネット上の Web サイトへアクセスできるようにするために，<span class="bk">c</span>を宛先 IP アドレスとするようソフト C の通信設定を行う。</div></div>' +
'<div class="r p"><b>(3)</b><div>PC のプロキシ設定で，<span class="bk">d</span>については，これまでどおり直接 HTTP 通信ができるように設定する。</div></div>' +
'<div class="r p"><b>(4)</b><div>Y 社 SaaS の送信元 IP アドレスでのアクセス制限の設定を変更する。</div></div>',

'<p class="sec">〔FW の許可ルールの見直し〕</p>' +
'<p class="ind">サービス Z 導入前の E 社 FW の許可ルールでは，PC の Web ブラウザからインターネットへの HTTP 通信や HTTPS 通信について，E 社プロキシサーバを経由する通信だけを許可する設定になっていた。</p>' +
'<p class="ind">G 主任は，サービス Z 導入後に必要な FW の許可ルールを検討した。</p>' +
'<p class="ind">サービス Z 導入前の E 社 FW の許可ルールを表 1 に，サービス Z 導入後の E 社 FW の許可ルールを表 2 に示す。なお，ルールは項番の小さい順に参照され，最初に該当したルールが適用される。</p>' +
'<div class="tcap sp">表 1　サービス Z 導入前の E 社 FW の許可ルール（抜粋）</div>' +
'<table class="tbl" style="width:86%;margin:0 auto"><tr><th style="width:3.6em">項番</th><th>送信元</th><th>宛先</th><th>プロトコル名/ポート番号</th></tr>' +
'<tr><td class="c">1</td><td class="c">内部セグメント</td><td class="c"><span class="bk">e</span></td><td class="c">TCP/443</td></tr>' +
'<tr><td class="c">2</td><td class="c">内部セグメント</td><td class="c"><span class="bk">e</span></td><td class="c">TCP/80</td></tr>' +
'<tr><td class="c">3</td><td class="c"><span class="bk">e</span></td><td class="c">インターネット</td><td class="c">TCP/443</td></tr>' +
'<tr><td class="c">4</td><td class="c"><span class="bk">e</span></td><td class="c">インターネット</td><td class="c">TCP/80</td></tr></table>' +
'<p class="note" style="margin-left:7%;padding-left:3.2em;text-indent:-3.2em">注記　FW は，応答パケットを自動的に通過させる，ステートフルパケットインスペクション機能をもつ。</p>' +
'<div class="tcap sp">表 2　サービス Z 導入後の E 社 FW の許可ルール（抜粋）</div>' +
'<table class="tbl" style="width:86%;margin:0 auto"><tr><th style="width:3.6em">項番</th><th>送信元</th><th>宛先</th><th>プロトコル名/ポート番号</th></tr>' +
'<tr><td class="c">1</td><td class="c">内部セグメント</td><td class="c"><span class="bk">c</span></td><td class="c">TCP/<span class="bk">f</span></td></tr></table>' +
'<p class="note" style="margin-left:7%;padding-left:3.2em;text-indent:-3.2em">注記　FW は，応答パケットを自動的に通過させる，ステートフルパケットインスペクション機能をもつ。</p>' +
'<p class="ind sp">G 主任は，これまでの調査内容を F 部長に報告し，サービス Z の主な三つの機能を導入することになった。</p>',

'<div class="r q"><b>設問 1</b><div>〔E 社のネットワーク構成〕について答えよ。' +
'<div class="r p"><b>(1)</b><div>本文中の<span class="bk">a</span>に入れる適切な字句をアルファベット 4 字で答えよ。</div></div>' +
'<div class="r p"><b>(2)</b><div>本文中の下線①について，アクセスが許可される送信元 IP アドレスを，図 1 中の字句を用いて答えよ。</div></div></div></div>' +
'<div class="r q"><b>設問 2</b><div>〔サービス Z の概要〕について答えよ。' +
'<div class="r p"><b>(1)</b><div>本文中の<span class="bk">b</span>に入れる適切な字句をアルファベット 3 字で答えよ。</div></div>' +
'<div class="r p"><b>(2)</b><div>本文中の下線②の機能の名称を解答群の中から選び，記号で答えよ。' +
'<div class="ag">解答群</div><div class="opts c2"><span>ア　HTTPS デコード</span><span>イ　アンチウイルス</span><span>ウ　サンドボックス</span><span>エ　セキュアブラウジング</span><span>オ　トラフィック検査</span></div></div></div></div></div>' +
'<div class="r q"><b>設問 3</b><div>〔ネットワーク構成の変更〕について答えよ。' +
'<div class="r p"><b>(1)</b><div>本文及び表 2 中の<span class="bk">c</span>に入れる適切な字句を，図 2 中の IP アドレスを用いて答えよ。</div></div>' +
'<div class="r p"><b>(2)</b><div>本文中の<span class="bk">d</span>に入れる適切な字句を，図 2 中の機器の名称を用いて答えよ。</div></div></div></div>' +
'<div class="r q"><b>設問 4</b><div>表 1 中の<span class="bk">e</span>，表 2 中の<span class="bk">f</span>に入れる適切な字句を，図 1，図 2 又は表 1 中の字句を用いて答えよ。</div></div>'
];
