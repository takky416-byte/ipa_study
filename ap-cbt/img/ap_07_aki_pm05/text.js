/* 令和7年度 秋期 応用情報技術者試験 午後 問5（IPA 公表の問題冊子を文字データに起こしたもの） */
window.CBT_TEXT = window.CBT_TEXT || {};
window.CBT_TEXT["ap_07_aki_pm05"] = [
'<p class="qh"><span>問5</span>クラウドサービスへの移行に関する次の記述を読んで，設問に答えよ。</p>' +
'<p class="ind sp">A 社は，本社と一つの営業所をもつオフィス機器の販売会社である。本社で，Web サーバ，電子メール（以下，メールという）サーバ，業務サーバなどを運用している。</p>' +
'<p class="ind">このたび，A 社では，サーバの運用管理及びセキュリティ対策の負荷軽減を図るために，社内で運用するサーバを，B 社のクラウドサービスで A 社が占有して利用できる環境（以下，BCL-A という）に移行することを決定した。情報システム部の C 主任が，サーバ移行に伴うネットワーク構成の設計を担当することになった。</p>' +
'<p class="sec sp">〔現在のネットワーク構成と運用形態〕</p>' +
'<p class="ind">現在の A 社のネットワーク構成を図 1 に示す。</p>' +
'<div class="fig" style="margin-bottom:0"><img src="{BASE}ap_07_aki_pm05/fig1.png" style="width:100%" alt=""></div>' +
'<p class="note" style="padding-left:4em;text-indent:-4em">注記 1　200.α.β.γ はグローバル IP アドレスである。また，200.α.β.0/28 はネットワークアドレスを示し，/28 はサブネットマスク長を示す。</p>' +
'<p class="note" style="padding-left:4em;text-indent:-4em">注記 2　A 社.jp はインターネット向けドメイン，A 社.lan は A 社内向けドメインである。</p>' +
'<div class="fig" style="margin-top:.2em"><div class="cap">図 1　現在の A 社のネットワーク構成</div></div>',

'<p class="ind">現在の A 社のネットワークの構成及び運用形態を次に示す。</p>' +
'<p class="li">・本社及び営業所の PC（以下，社内 PC という）には，L3SW1 上で稼働する DHCP サーバから配付される IP アドレス，そのリース期間及びサブネットマスク，<u>①デフォルトゲートウェイの IP アドレス</u>並びに DNS サーバの IP アドレスを設定している。</p>' +
'<p class="li">・メールサーバは，本社及び営業所の従業員によるメール送受信に利用される。</p>' +
'<p class="li">・メール中継サーバは，メールサーバから送信された社外宛てのメールを社外のメールサーバに中継し，社外のメールサーバから A 社宛てに送信されたメールをメールサーバに中継する。</p>' +
'<p class="li">・<u>②メール中継サーバでは，スパムメールの踏み台になることを避けるために，オープンリレー防止策</u>を実施している。</p>' +
'<p class="li">・業務サーバは，社内 PC とだけ通信する。</p>' +
'<p class="li">・社内 PC は，内部 DNS サーバで名前解決を行う。</p>' +
'<p class="li">・内部 DNS サーバは，A 社.lan のゾーン情報を管理し，管理外のドメインのホストの名前解決要求を受信したときは，名前解決要求をキャッシュ DNS サーバに転送する。</p>' +
'<p class="li">・外部 DNS サーバは，A 社.jp のゾーン情報を管理する。</p>' +
'<p class="li">・業務サーバ及び DMZ の Web サーバは，HTTP Over TLS によるアクセスだけを受け付ける。</p>' +
'<p class="li">・社内 PC は，インターネット上の Web サイト及び DMZ の Web サーバに，DMZ のプロキシサーバ経由でアクセスする。</p>' +
'<p class="ind sp">FW に設定されている，インターネットと DMZ との間の通信を許可するルールを表 1 に示す。</p>' +
'<div class="tcap sp">表 1　FW に設定されている，インターネットと DMZ との間の通信を許可するルール</div>' +
'<table class="tbl"><tr><th>アクセス経路</th><th>送信元</th><th>宛先</th><th>プロトコル／宛先ポート番号</th></tr>' +
'<tr><td rowspan="3">インターネット→DMZ</td><td>any</td><td><span class="bk">a</span></td><td>TCP/443</td></tr>' +
'<tr><td>any</td><td><span class="bk">b</span></td><td>TCP/53，UDP/53</td></tr>' +
'<tr><td>any</td><td>メール中継サーバ</td><td>TCP/25</td></tr>' +
'<tr><td rowspan="3">DMZ→インターネット</td><td><span class="bk">c</span></td><td>any</td><td>TCP/80，TCP/443</td></tr>' +
'<tr><td>キャッシュ DNS サーバ</td><td>any</td><td>TCP/53，UDP/53</td></tr>' +
'<tr><td>メール中継サーバ</td><td>any</td><td>TCP/25</td></tr></table>' +
'<p class="note">注記　FW は，応答パケットの通過を自動的に許可する機能をもつ。</p>',

'<p class="sec">〔BCL-A に移行後の構成の設計〕</p>' +
'<p class="ind">C 主任は，サーバを BCL-A に移行した後の構成を，次の 3 点を前提として設計した。</p>' +
'<p class="li">・社内 PC を使用した業務の運用方法及び PC の操作は変更しない。</p>' +
'<p class="li">・移行作業時の障害によって業務が全面停止するのを避けるために，今回の移行では業務サーバを本社に残す。</p>' +
'<p class="li">・BCL-A に移行後の各サーバのインターネット向けの IP アドレスには，移行前の DMZ の各サーバと同じグローバル IP アドレスを設定する。</p>' +
'<p class="ind sp">サーバを BCL-A に移行した後のネットワーク構成を図 2 に示す。</p>' +
'<div class="fig" style="margin-bottom:0"><img src="{BASE}ap_07_aki_pm05/fig2.png" style="width:100%" alt=""></div>' +
'<p class="note">注記　図 1 中の外部 DNS サーバの機能は，B 社が提供するインターネット向け DNS サービスを利用して実現する。</p>' +
'<div class="fig" style="margin-top:.2em"><div class="cap">図 2　サーバを BCL-A に移行した後のネットワーク構成</div></div>',

'<p class="ind">サーバを BCL-A に移行した後の各種設定，動作及び構成を次に示す。</p>' +
'<p class="li">・BCL-A には，公開セグメントと内部セグメントを設定する。</p>' +
'<p class="li">・公開セグメント及び内部セグメントには，それぞれ経路表を設定する。経路表には，サーバ同士の間及びサーバとインターネットとの間で移行前と同様な通信を行うことができる経路情報を登録する。</p>' +
'<p class="li">・BCL-A のドメイン名は，A 社内向けドメインの A 社.lan とし，ネットワークアドレスは 172.20.0.0/20 を設定する。この 172.20.0.0/20 をサブネットに分割して，公開セグメントに 172.20.1.0/24 を，内部セグメントに 172.20.2.0/24 を設定する。</p>' +
'<p class="li">・A 社.lan のゾーン情報は内部 DNS サーバで管理する。</p>' +
'<p class="li">・公開セグメントのサーバは，IGW 経由でインターネットと通信する。IGW は，NAT によって，公開セグメントの各サーバに設定された 172.20.1.11～172.20.1.14 をインターネットに公開する各サーバの対応する IP アドレスである 200.α.β.1～200.α.β.3，200.α.β.5 に変換する。</p>' +
'<p class="li">・公開セグメントのインターネット向けドメイン名は，図 1 中の DMZ と同様の A 社.jp とし，A 社.jp の各サーバには，図 1 と同じ IP アドレスを設定する。</p>' +
'<p class="li">・A 社.jp のゾーン情報はインターネット向け DNS サービスで管理する。</p>' +
'<p class="li">・<u>③インターネットから公開セグメントのサーバ宛てに送信されたパケットは，IGW が公開セグメントのサーバに中継する</u>。</p>' +
'<p class="li">・本社は，IPsec ルータ 2 及び IPsec ルータ 1 を経由して BCL-A と接続する。</p>' +
'<p class="li">・<u>④IPsec ルータ 2 は，BCL-A 宛てのパケットを，IPsec ルータ 1 に転送する</u>。</p>' +
'<p class="li">・<u>⑤L3SW0 と L3SW1 の経路表</u>及び DHCP サーバの配付情報を変更する。</p>' +
'<p class="ind sp">C 主任は，設計内容を上司の D 課長に説明し，移行方法が承認された。</p>' +
'<div class="r q sp"><b>設問 1</b><div>〔現在のネットワーク構成と運用形態〕について答えよ。' +
'<div class="r p"><b>(1)</b><div>本文中の下線①について，営業所の PC に設定するデフォルトゲートウェイの IP アドレスをもつ機器を，図 1 中の名称で答えよ。</div></div>' +
'<div class="r p"><b>(2)</b><div>本文中の下線②について，メール中継サーバで防止すべき処理を，40 字以内で答えよ。</div></div>' +
'<div class="r p"><b>(3)</b><div>表 1 中の<span class="bk">a</span>～<span class="bk">c</span>に入れる適切な機器名を，図 1 中の名',

'<div class="r q"><b style="visibility:hidden">設問 1</b><div><div class="r p"><b style="visibility:hidden">(3)</b><div>称で答えよ。</div></div></div></div>' +
'<div class="r q"><b>設問 2</b><div>〔BCL-A に移行後の構成の設計〕について答えよ。' +
'<div class="r p"><b>(1)</b><div>本文中の下線③について，A 社宛ての SMTP パケットが IGW を通過するとき，IGW 通過前と通過後の宛先 IP アドレスを，それぞれ答えよ。</div></div>' +
'<div class="r p"><b>(2)</b><div>本文中の下線④について，IPsec ルータ 1 が BCL-A のサーバに転送するパケットの送信元のネットワークアドレスを，図 2 中の表記で<u>全て</u>答えよ。</div></div>' +
'<div class="r p"><b>(3)</b><div>本文中の下線⑤について，L3SW0 及び L3SW1 の経路表中の，社内 PC を送信元とする経路の変更は，どのサーバが BCL-A に移行することによって発生するか。図 2 中の名称で<u>全て</u>答えよ。</div></div></div></div>'
];
