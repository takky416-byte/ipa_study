/* 令和7年度 春期 応用情報技術者試験 午後 問4（IPA 公表の問題冊子を文字データに起こしたもの） */
window.CBT_TEXT = window.CBT_TEXT || {};
window.CBT_TEXT["ap_07_haru_pm04"] = [
'<p class="qh"><span>問4</span>ビルエネルギーマネジメントシステムの非機能要件に関する次の記述を読んで，設問に答えよ。</p>' +
'<p class="ind sp">E 社は，オフィスビルのエネルギー使用量を一元管理するビルエネルギーマネジメントシステム（以下，BEMS という）を開発・運用している企業である。首都圏を中心に複数のオフィスビルを所有している R 社に対して，オンプレミス方式の BEMS（以下，オンプレ BEMS という）を運用してきた。最近，R 社から“複数のオフィスビルのオンプレ BEMS を統合管理したい”という要望があり，E 社はクラウド方式の BEMS（以下，クラウド BEMS という）を提案することになった。</p>' +
'<p class="ind">オンプレ BEMS は，BEMS サーバ，BEMS クライアント及び BEMS ゲートウェイで構成され，E 社はこれらの設置・運用を行っている。ビル管理員は BEMS クライアント上の Web ブラウザを用いて BEMS サーバにアクセスし，BEMS ゲートウェイを介して照明機器や空調機器などの制御対象機器の制御や監視を行う。オンプレ BEMS は複数の R 社オフィスビルに導入されている。</p>' +
'<p class="ind">オンプレ BEMS を用いた既存システム（以下，既存システムという）の構成の一部を図 1 に示す。なお，図 1 の各 R 社オフィスビルでは，制御対象機器を接続するビル制御 LAN と，BEMS サーバや BEMS クライアントを接続するビル管理 LAN とが既設されており，二つの LAN を BEMS ゲートウェイで接続している。</p>' +
'<div class="fig"><img src="{BASE}ap_07_haru_pm04/fig1.png" style="width:100%" alt=""><div class="cap">図 1　既存システムの構成（一部）</div></div>' +
'<p class="ind sp">E 社は，R 社の各オフィスビルに設置している既存システムから，複数のオフィスビルを統合管理できるクラウド BEMS を用いた新システム（以下，新システムという）',

'<p>へ移行する方法を検討した。新システムでは，ビル管理員は R 社運用拠点の BEMS クライアントから，E 社が別途サービスを提供している IaaS 型クラウドサービス（以下，E 社クラウド基盤サービスという）の仮想サーバ上に構築した BEMS サーバを操作し，ファイアウォール（以下，FW という）と BEMS ゲートウェイを介して制御対象機器の制御や監視を行う。E 社は BEMS サーバ，BEMS クライアント及び BEMS ゲートウェイを設置・運用する。FW 及びインターネット接続環境は R 社が設置・運用する。新システムの構成案の一部を図 2 に示す。</p>' +
'<div class="fig"><img src="{BASE}ap_07_haru_pm04/fig2.png" style="width:100%" alt=""><div class="cap">図 2　新システムの構成案（一部）</div></div>' +
'<p class="sec sp">〔品質要件の検討〕</p>' +
'<p class="ind">E 社は，図 2 の構成案を R 社に提案した。BEMS を新たなビルに導入する場合，既存システムでは，オフィスビルごとに BEMS サーバ，BEMS クライアント及び BEMS ゲートウェイをそれぞれ導入する必要があった。一方，新システムでは，FW 及びインターネット接続環境を R 社が設置・運用すれば，E 社が R 社オフィスビル側に<span class="bk">a</span>を設置することによって BEMS を導入できる。R 社が要望した統合管理が実現でき，さらに BEMS 導入が比較的容易になることから，R 社は新システムへの移行検討の具体化を E 社に依頼した。</p>' +
'<p class="ind">E 社の提案に対して，R 社から次の要望が出された。</p>' +
'<p class="li">・既存システムでは，BEMS サーバをメンテナンスする際に実施する計画停止の頻度が高く不便だったので，新システムでは計画停止の頻度を低くしてほしい。</p>' +
'<p class="li">・既存システムでは，BEMS サーバのハードウェア障害の発生頻度は低いものの，障',

'<p class="li" style="text-indent:0">害発生時のシステム停止時間が長く不便だったので，新システムではできるだけ短くしてほしい。</p>' +
'<p class="ind sp">E 社では，R 社からの要望を受けて，既存システム及び新システムの非機能要件を改めて確認し，新システムの構成案を一部見直すとともに，その優位な点を指標を用いて示すことにした。既存システム及び新システムの非機能要件の指標とその指標値の一部を表 1 に示す。</p>' +
'<div class="tcap sp">表 1　既存システム及び新システムの非機能要件の指標とその指標値（一部）</div>' +
'<table class="tbl"><tr><th rowspan="2" style="width:3em">項番</th><th rowspan="2" style="width:8em">非機能要件の分類</th><th rowspan="2">非機能要件の指標</th><th colspan="2">指標値</th></tr><tr><th style="width:6.5em">既存システム</th><th style="width:6.5em">新システム</th></tr>' +
'<tr><td class="c" style="vertical-align:top">1</td><td class="c"><span class="bk">b</span>，<br><span class="bk">c</span></td><td>BEMS サーバのメンテナンスに伴う計画停止の頻度</td><td class="c" style="vertical-align:top">年 4 回</td><td class="c" style="vertical-align:top">計画停止なし</td></tr>' +
'<tr><td class="c" style="vertical-align:top">2</td><td class="c"><span class="bk">c</span></td><td>BEMS サーバのハードウェア障害発生時の平均サービス回復時間</td><td class="c" style="vertical-align:top">48 時間</td><td class="c" style="vertical-align:top">15 分</td></tr></table>' +
'<p class="ind sp">表 1 の項番 1 について，既存システムでは BEMS サーバのメンテナンスのたびに計画停止が必要であった。新システムでは，E 社クラウド基盤サービス上で BEMS サーバを仮想サーバとして構築できることを生かして，2 台の BEMS サーバを<span class="bk">d</span>構成にすれば，計画停止をなくすことができる。そこで，図 2 の構成案に対して，E 社クラウド基盤サービス上で，BEMS サーバを 1 台追加する。</p>' +
'<p class="ind">表 1 の項番 2 について，既存システムの BEMS サーバのハードウェア障害発生時には，保守サービス会社への連絡，保守員の駆けつけ，障害箇所の確認，ハードウェア交換，バックアップからのデータ復旧，サービスの再開，という手順で回復していた。この手順のうち，BEMS サーバがオフィスビル内に設置されていることに起因して保守員の駆けつけに要する時間が長かったが，新システムでは BEMS サーバが配置される E 社クラウド基盤サービスの拠点に保守員が常駐するので，保守員の駆けつけに要する時間は大幅に短縮される。加えて，仮想サーバに障害が発生したときでも速やかにサービスを再開できるように，新システムでは E 社クラウド基盤サービスの<span class="bk">e</span>機能を活用して構成する。</p>',

'<p class="sec">〔クラウドサービス障害発生時の新システムへの影響〕</p>' +
'<p class="ind">新システムでは，仮想サーバで構築した BEMS サーバのハードウェア障害発生時の平均サービス回復時間について大幅に短縮できることが確認できたが，E 社クラウド基盤サービスに障害が発生した場合の，新システムに対する影響について，R 社から説明を求められた。E 社クラウド基盤サービスでは，仮想サーバを直接利用する顧客との契約時にサービスレベル合意書（以下，SLA という）を締結しているので，当該 SLA の内容を引用して，どの程度の影響が新システムに及ぶかを説明することにした。E 社クラウド基盤サービスの SLA の一部を図 3 に示す。</p>' +
'<div class="box sp" style="line-height:1.75">■月間の仮想サーバのサービス稼働率（以下，月間サービス稼働率という）：99.95％以上<br>　月間サービス稼働率は次の式で計算する。' +
'<table style="margin:.5em 0 .5em 1em;border-collapse:collapse"><tr><td rowspan="2" style="padding-right:.8em;vertical-align:middle">月間サービス稼働率　＝</td><td style="border-bottom:1px solid #000;text-align:center;padding:.1em .6em">月間総<span class="bk">f</span>予定時間 － 月間累積障害時間</td></tr><tr><td style="text-align:center;padding:.1em .6em">月間総<span class="bk">f</span>予定時間</td></tr></table>' +
'　ただし，仮想サーバは契約期間中，無停止で稼働することを前提とする。<br>■月間累積障害時間の考え方<br>　月間累積障害時間とは，次のいずれかの状態であったことを E 社がホームページで報告した時間又は利用者が証明することができた時間について，1 か月分累積した時間のことである。<br>　・仮想サーバに管理画面からアクセスできない状態<br>　・仮想サーバにインターネットから全くアクセスできない状態<br>　・仮想サーバに接続されているディスクに全くアクセスできない状態<br>■減額対応<br>　月間サービス稼働率が 99.95％に満たなかった場合，SLA で示す稼働率を達成するための稼働時間よりも少なかった稼働時間に相当する利用料金を減額する。</div>' +
'<div class="fig" style="margin-top:.2em"><div class="cap">図 3　E 社クラウド基盤サービスの SLA（一部）</div></div>' +
'<p class="ind sp">E 社は新システムで重要な機能を担う BEMS サーバを例として取り上げ，そこで障害が発生した場合の影響について説明する資料を，追加で作成することにした。当該資料には，図 3 の E 社クラウド基盤サービスの SLA の内容に加えて，月間サービス稼働率を満たした場合に月間累積障害時間が<span class="bk">g</span>分以内になることや，<u>①月間サービス稼働率が 99.5％になった場合に減額される金額</u>など，具体的な事例を記載することにした。また，当該資料には BEMS サーバのハードウェア，ソフトウェア及びネットワークに発生する可能性がある障害の要因を示し，<u>②図 3 の E 社クラウド基盤サービスの SLA で保証されない要因</u>について説明を加えることにした。</p>',

'<div class="r q"><b>設問 1</b><div>〔品質要件の検討〕について答えよ。' +
'<div class="r p"><b>(1)</b><div>本文中の<span class="bk">a</span>に入れる適切な構成要素名を図 2 中から選び答えよ。</div></div>' +
'<div class="r p"><b>(2)</b><div>表 1 中の<span class="bk">b</span>，<span class="bk">c</span>に入れる適切な字句を解答群の中から選び，記号で答えよ。' +
'<div class="ag">解答群</div><div class="opts c2"><span>ア　移行性</span><span>イ　運用・保守性</span><span>ウ　可用性</span><span>エ　性能・拡張性</span></div></div></div>' +
'<div class="r p"><b>(3)</b><div>本文中の<span class="bk">d</span>，<span class="bk">e</span>に入れる適切な字句を解答群の中から選び，記号で答えよ。' +
'<div class="ag">解答群</div><div class="opts c2"><span>ア　CASB</span><span>イ　RAID5</span><span>ウ　VPN</span><span>エ　アクティブ-スタンバイ</span><span>オ　クライアントサーバ</span><span>カ　シンクライアント</span><span>キ　ピアツーピア</span><span>ク　ライブマイグレーション</span></div></div></div></div></div>' +
'<div class="r q"><b>設問 2</b><div>〔クラウドサービス障害発生時の新システムへの影響〕について答えよ。' +
'<div class="r p"><b>(1)</b><div>図 3 中の<span class="bk">f</span>に入れる適切な字句を解答群の中から選び，記号で答えよ。' +
'<div class="ag">解答群</div><div class="opts c4"><span>ア　稼働</span><span>イ　待機</span><span>ウ　超過</span><span>エ　停止</span></div></div></div>' +
'<div class="r p"><b>(2)</b><div>本文中の<span class="bk">g</span>に入れる適切な月間累積障害時間を分単位で，小数第 1 位を四捨五入して整数で答えよ。ここで，1 か月は 30 日間とする。</div></div>' +
'<div class="r p"><b>(3)</b><div>本文中の下線①の場合で，サーバの月間利用料金が 20 万円のときに減額される金額を円単位で，小数第 1 位を四捨五入して整数で答えよ。</div></div>' +
'<div class="r p"><b>(4)</b><div>本文中の下線②について，BEMS サーバに発生する可能性のある障害の要因のうち，E 社クラウド基盤サービスの SLA で保証されないものを解答群の中から選び，記号で答えよ。' +
'<div class="ag">解答群</div><div class="opts c2"><span>ア　CPU の障害</span><span>イ　ストレージの障害</span><span>ウ　ソフトウェアの障害</span><span>エ　ネットワークの障害</span></div></div></div></div></div>'
];
