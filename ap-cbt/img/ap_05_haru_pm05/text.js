/* 令和5年度 春期 応用情報技術者試験 午後 問5（IPA 公表の問題冊子を文字データに起こしたもの） */
window.CBT_TEXT = window.CBT_TEXT || {};
(function () {
  var C = function (v) { return '<td class="c">' + v + '</td>'; };
  window.CBT_TEXT["ap_05_haru_pm05"] = [
'<p class="qh"><span>問5</span>Web サイトの増設に関する次の記述を読んで，設問に答えよ。</p>' +
'<p class="ind sp">F 社は，契約した顧客（以下，顧客という）にインターネット経由でマーケット情報を提供する情報サービス会社である。F 社では，マーケット情報システム（以下，M システムという）で顧客向けに情報を提供している。M システムは，Web アプリケーションサーバ（以下，WebAP サーバという），DNS サーバ，ファイアウォール（以下，FW という）などから構成される Web サイトと F 社の運用 PC から構成される。現在，Web サイトは，B 社のデータセンター（以下，b-DC という）に構築されている。</p>' +
'<p class="ind">現在の M システムのネットワーク構成（抜粋）を図 1 に，DNS サーバ b に登録されている A レコードの情報を表 1 に示す。</p>' +
'<div class="fig sp"><img src="{BASE}ap_05_haru_pm05/fig1.png" style="width:92%" alt=""><div class="cap">図 1　現在の M システムのネットワーク構成（抜粋）</div></div>' +
'<div class="tcap sp">表 1　DNS サーバ b に登録されている A レコードの情報</div>' +
'<table class="tbl" style="width:84%;margin:0 auto;white-space:nowrap"><tr><th style="width:3em">項番</th><th>機器名称</th><th>サーバの FQDN</th><th>IP アドレス</th></tr>' +
'<tr>' + C(1) + '<td>DNS サーバ b</td><td>nsb.example.jp</td><td>200.a.b.1/28</td></tr>' +
'<tr>' + C(2) + '<td>WebAP サーバ b</td><td>miap.example.jp</td><td>200.a.b.2/28</td></tr>' +
'<tr>' + C(3) + '<td>DNS サーバ b</td><td>nsb.f-sha.example.lan</td><td>192.168.0.1/24</td></tr>' +
'<tr>' + C(4) + '<td>WebAP サーバ b</td><td>apb.f-sha.example.lan</td><td>192.168.0.2/24</td></tr></table>' +
'<p class="note" style="margin-left:8%;padding-left:3.2em;text-indent:-3.2em">注記 1　200.x.y.z（x，y，z は，0～255 の整数）の IP アドレスは，グローバルアドレスである。</p>' +
'<p class="note" style="margin-left:8%;padding-left:3.2em;text-indent:-3.2em">注記 2　各リソースレコードの TTL（Time To Live）は，604800 が設定されている。</p>' +
'<p class="sec sp">〔M システムの構成と運用〕</p>' +
'<p class="li">・M システムを利用するにはログインが必要である。</p>',

'<p class="li">・FWb には，DMZ に設定されたプライベートアドレスとインターネット向けのグローバルアドレスを 1 対 1 で静的に変換する NAT が設定されており，表 1 に示した内容で，WebAP サーバ b 及び DNS サーバ b の IP アドレスの変換を行う。</p>' +
'<p class="li">・DNS サーバ b は，インターネットに公開するドメイン example.jp と F 社の社内向けのドメイン f-sha.example.lan の二つのドメインのゾーン情報を管理する。</p>' +
'<p class="li">・F 社の L3SW の経路表には，b-DC の Web サイト b への経路と<u>①デフォルトルート</u>が登録されている。</p>' +
'<p class="li">・運用 PC には，<u>②優先 DNS サーバとして，FQDN が nsb.f-sha.example.lan の DNS サーバ b が登録されている</u>。</p>' +
'<p class="li">・F 社の運用担当者は，運用 PC を使用して M システムの運用作業を行う。</p>' +
'<p class="sec sp">〔M システムの応答速度の低下〕</p>' +
'<p class="ind">最近，顧客から，M システムの応答が遅くなることがあるという苦情が，M システムのサポート窓口に入ることが多くなった。そこで，F 社の情報システム部（以下，システム部という）の運用担当者の D 主任は，運用 PC を使用して次の手順で原因究明を行った。</p>' +
'<div class="r p"><b style="min-width:3.2em">（ⅰ）</b><div>顧客と同じ URL である https://<span class="bk">a</span>/ で WebAP サーバ b にアクセスし，顧客からの申告と同様の事象が発生することを確認した。</div></div>' +
'<div class="r p"><b style="min-width:3.2em">（ⅱ）</b><div>FWb のログを検査し，異常な通信は記録されていないことを確認した。</div></div>' +
'<div class="r p"><b style="min-width:3.2em">（ⅲ）</b><div>SSH を使用し，<u>③広域イーサ網経由で WebAP サーバ b にログインして CPU 使用率を調べた</u>ところ，設計値を超えた値が継続する時間帯のあることを確認した。</div></div>' +
'<p class="ind sp">この結果から，D 主任は，WebAP サーバ b の処理能力不足が応答速度低下の原因であると判断した。</p>' +
'<p class="sec sp">〔Web サイトの増設〕</p>' +
'<p class="ind">D 主任の判断を基に，システム部では，これまでのシステムの構築と運用の経験を生かすことができる，現在と同一構成の Web サイトの増設を決めた。システム部の E 課長は，C 社のデータセンター（以下，c-DC という）に Web サイト c を構築して M システムを増強する方式の設計を，D 主任に指示した。</p>',

'<p class="ind">D 主任は，c-DC に b-DC と同一構成の Web サイトを構築し，DNS ラウンドロビンを利用して二つの Web サイトの負荷を分散する方式を設計した。</p>' +
'<p class="ind">D 主任が設計した，M システムを増強する構成を図 2 に示す。</p>' +
'<div class="fig sp"><img src="{BASE}ap_05_haru_pm05/fig2.png" style="width:100%" alt=""><div class="cap">図 2　M システムを増強する構成</div></div>' +
'<p class="ind sp">図 2 の構成では，DNS サーバ b をプライマリ DNS サーバ，DNS サーバ c をセカンダリ DNS サーバに設定する。また，運用 PC には，新たに<span class="bk">b</span>を代替 DNS サーバに登録して，<span class="bk">b</span>も利用できるようにする。</p>' +
'<p class="ind">そのほかに，L3SW の経路表に Web サイト c の DMZ への経路を追加する。</p>' +
'<p class="ind">DNS サーバ b に追加登録する A レコードの情報を表 2 に示す。</p>' +
'<div class="tcap sp">表 2　DNS サーバ b に追加登録する A レコードの情報</div>' +
'<table class="tbl" style="width:84%;margin:0 auto;white-space:nowrap"><tr><th style="width:3em">項番</th><th>機器名称</th><th>サーバの FQDN</th><th>IP アドレス</th></tr>' +
'<tr>' + C(1) + '<td>DNS サーバ c</td><td>nsc.example.jp</td><td>200.c.d.81/28</td></tr>' +
'<tr>' + C(2) + '<td>WebAP サーバ c</td><td>miap.example.jp</td><td>200.c.d.82/28</td></tr>' +
'<tr>' + C(3) + '<td>DNS サーバ c</td><td>nsc.f-sha.example.lan</td><td>192.168.1.1/24</td></tr>' +
'<tr>' + C(4) + '<td>WebAP サーバ c</td><td>apc.f-sha.example.lan</td><td>192.168.1.2/24</td></tr></table>' +
'<p class="note" style="margin-left:8%">注記　各リソースレコードの TTL は，表 1 と同じ 604800 を設定する。</p>' +
'<p class="ind sp">表 2 の情報を追加登録することによって，WebAP サーバ b，c が同じ割合で利用されるようになる。DNS サーバ b，c には<span class="bk">c</span>転送の設定を行い，DNS サーバ b の</p>',

'<p style="text-indent:0">情報を更新すると，その内容が DNS サーバ c にコピーされるようにする。</p>' +
'<p class="ind">WebAP サーバのメンテナンス時は，作業を行う Web サイトは停止する必要があるので，次の手順で作業を行う。<u>④メンテナンス中は，一つの Web サイトでサービスを提供することになるので，M システムを利用する顧客への影響は避けられない</u>。</p>' +
'<div class="r p"><b style="min-width:3.2em">（ⅰ）</b><div>事前に DNS サーバ b のリソースレコードの<span class="bk">d</span>を小さい値にする。</div></div>' +
'<div class="r p"><b style="min-width:3.2em">（ⅱ）</b><div>メンテナンス作業を開始する前に，メンテナンスを行う Web サイトの，インターネットに公開するドメインの WebAP サーバの FQDN に対応する A レコードを，DNS サーバ b 上で無効化する。</div></div>' +
'<div class="r p"><b style="min-width:3.2em">（ⅲ）</b><div>この後，一定時間経てばメンテナンス作業が可能になるが，作業開始が早過ぎると顧客に迷惑を掛けるおそれがある。そこで，<u>⑤手順(ⅱ)で A レコードを無効化した WebAP サーバの状態を確認</u>し，問題がなければ作業を開始する。</div></div>' +
'<p class="ind sp">D 主任は，検討結果を基に作成した Web サイトの増設案を，E 課長に提出した。増設案が承認され実施に移されることになった。</p>' +
'<div class="r q sp"><b>設問 1</b><div>〔M システムの構成と運用〕について答えよ。' +
'<div class="r p"><b>(1)</b><div>本文中の下線①について，デフォルトルートのネクストホップとなる機器を，図 1 中の名称で答えよ。</div></div>' +
'<div class="r p"><b>(2)</b><div>本文中の下線②の設定の下で，運用 PC から DNS サーバ b にアクセスしたとき，パケットが DNS サーバ b に到達するまでに経由する機器を，図 1 中の名称で<u>全て</u>答えよ。</div></div></div></div>' +
'<div class="r q"><b>設問 2</b><div>〔M システムの応答速度の低下〕について答えよ。' +
'<div class="r p"><b>(1)</b><div>本文中の<span class="bk">a</span>に入れる適切な FQDN を答えよ。</div></div>' +
'<div class="r p"><b>(2)</b><div>本文中の下線③について，アクセス先サーバの FQDN を答えよ。</div></div></div></div>' +
'<div class="r q"><b>設問 3</b><div>〔Web サイトの増設〕について答えよ。' +
'<div class="r p"><b>(1)</b><div>本文中の<span class="bk">b</span>～<span class="bk">d</span>に入れる適切な字句を答えよ。</div></div>' +
'<div class="r p"><b>(2)</b><div>本文中の下線④について，顧客に与える影響を 25 字以内で答えよ。</div></div>' +
'<div class="r p"><b>(3)</b><div>本文中の下線⑤について，確認する内容を 20 字以内で答えよ。</div></div></div></div>'
  ];
})();
