/* 令和4年度 秋期 応用情報技術者試験 午後 問1（IPA 公表の問題冊子を文字データに起こしたもの） */
window.CBT_TEXT = window.CBT_TEXT || {};
(function () {
  var S = function (n, t) { return '<div class="r" style="margin-left:-.4em"><b style="min-width:2.6em">' + n + '</b><div>' + t + '</div></div>'; };
  window.CBT_TEXT["ap_04_aki_pm01"] = [
'<div class="must">次の問1は必須問題です。必ず解答してください。</div>' +
'<p class="qh"><span>問1</span>マルウェアへの対応策に関する次の記述を読んで，設問に答えよ。</p>' +
'<p class="ind sp">P 社は，従業員数 400 名の IT 関連製品の卸売会社であり，300 社の販売代理店をもっている。P 社では，販売代理店向けに，インターネット経由で商品情報の提供，見積書の作成を行う代理店サーバを運用している。また，従業員向けに，代理店ごとの卸価格や担当者の情報を管理する顧客サーバを運用している。代理店サーバ及び顧客サーバには，HTTP Over TLS でアクセスする。</p>' +
'<p class="ind">P 社のネットワークの運用及び情報セキュリティインシデント対応は，情報システム部（以下，システム部という）の運用グループが行っている。</p>' +
'<p class="ind">P 社のネットワーク構成を図 1 に示す。</p>' +
'<div class="fig sp"><img src="{BASE}ap_04_aki_pm01/fig1.png" style="width:100%" alt=""></div>' +
'<p class="note" style="margin-left:0">注記 1　配布サーバは，PC にセキュリティパッチなどを配布するサーバである。</p>' +
'<p class="note" style="margin-left:0">注記 2　検証 LAN は，サーバ及び PC の動作検証などを行うための LAN である。</p>' +
'<div class="fig" style="margin-top:0"><div class="cap">図 1　P 社のネットワーク構成</div></div>' +
'<p class="sec sp">〔セキュリティ対策の現状〕</p>' +
'<p class="ind">P 社では，複数のサーバ，PC 及びネットワーク機器を運用しており，それらには次のセキュリティ対策を実施している。</p>' +
'<p class="li">・<span class="bk">a</span>では，インターネットと DMZ 間及び内部 LAN と DMZ 間で業務に必要な通信だけを許可し，通信ログ及び遮断ログを取得する。</p>' +
'<p class="li">・<span class="bk">b</span>では，SPF（Sender Policy Framework）機能によって送信元ドメイン認証を行い，送信元メールアドレスがなりすまされた電子メール（以下，電子メールをメールという）を隔離する。</p>',

'<p class="li">・外部 DNS サーバでは，DMZ のゾーン情報の管理のほかに，キャッシュサーバの機能を稼働させており，外部 DNS サーバを<u>①DDoS の踏み台とする攻撃</u>への対策を行う。</p>' +
'<p class="li">・P 社からインターネット上の Web サーバへのアクセスは，DMZ のプロキシサーバを経由し，プロキシサーバでは，通信ログを取得する。</p>' +
'<p class="li">・PC 及びサーバで稼働するマルウェア対策ソフトは，毎日，決められた時刻にベンダーの Web サイトをチェックし，マルウェア定義ファイルが新たに登録されている場合は，ダウンロードして更新する。</p>' +
'<p class="li">・システム部の担当者は，毎日，ベンダーの Web サイトをチェックし，OS のセキュリティパッチやアップデート版の有無を確認する。最新版が更新されている場合は，ダウンロードして検証 LAN で動作確認を 1 週間程度行う。動作に問題がなければ，PC 向けのものは<span class="bk">c</span>に登録し，サーバ向けのものは，休日に担当者が各サーバに対して更新作業を行う。</p>' +
'<p class="li">・PC は，電源投入時に<span class="bk">c</span>にアクセスし，更新が必要な新しい版が登録されている場合は，ダウンロードして更新処理を行う。</p>' +
'<p class="li">・FW 及びプロキシサーバのログの検査は，担当者が週に 1 回実施する。</p>' +
'<p class="sec sp">〔マルウェア X の調査〕</p>' +
'<p class="ind">ある日，システム部の Q 課長は，マルウェア X の被害が社外で多発していることを知り，R 主任にマルウェア X の調査を指示した。R 主任による調査結果を次に示す。</p>' +
S('(1)', '攻撃者は，不正なマクロを含む文書ファイル（以下，マクロ付き文書ファイル A という）をメールに添付して送信する。') +
S('(2)', '受信者が，添付されたマクロ付き文書ファイル A を開きマクロを実行させると，マルウェアへの指令や不正アクセスの制御を行うインターネット上の C&amp;C サーバと通信が行われ，マルウェア X の本体がダウンロードされる。') +
S('(3)', 'PC に侵入したマルウェア X は，内部ネットワークの探索，情報の窃取，窃取した情報の C&amp;C サーバへの送信及び感染拡大を，次の(a)～(d)の手順で試みる。') +
'<div class="r" style="margin-left:1.4em"><b style="min-width:2.4em">(a)</b><div><u>②PC が接続するセグメント及び社内の他のセグメントの全てのホストアドレス宛てに，宛先アドレスを変えながら ICMP エコー要求パケットを送信し，連続してホストの情報を取得する。</u></div></div>' +
'<div class="r" style="margin-left:1.4em"><b style="min-width:2.4em">(b)</b><div><u>③(a)によって情報を取得できたホストに対して，攻撃対象のポート番号を</u></div></div>',

'<div class="r" style="margin-left:1.4em"><b style="visibility:hidden;min-width:2.4em">(b)</b><div><u>セットした TCP の SYN パケットを送信し，応答内容を確認する。</u></div></div>' +
'<div class="r" style="margin-left:1.4em"><b style="min-width:2.4em">(c)</b><div>(b)で SYN/ACK の応答があった場合，指定したポート番号のサービスの<ruby>脆<rt>ぜい</rt></ruby>弱性を悪用して個人情報や秘密情報などを窃取し，C&amp;C サーバに送信する。</div></div>' +
'<div class="r" style="margin-left:1.4em"><b style="min-width:2.4em">(d)</b><div>侵入した PC に保存されている過去にやり取りされたメールを悪用し，当該 PC 上でマクロ付き文書ファイル A を添付した返信メールを作成し，このメールを取引先などに送信して感染拡大を試みる。</div></div>' +
'<p class="ind sp">R 主任が調査結果を Q 課長に報告したときの，2 人の会話を次に示す。</p>' +
'<div class="r" style="margin-left:-.6em"><b style="min-width:5em">Q 課長：</b><div>マルウェア X に対して，現在の対策で十分だろうか。</div></div>' +
'<div class="r" style="margin-left:-.6em"><b style="min-width:5em">R 主任：</b><div>十分ではないと考えます。文書ファイルに組み込まれたマクロは，容易に処理内容が分析できない構造になっており，マルウェア対策ソフトでは発見できない場合があります。また，<u>④マルウェア X に感染した社外の PC から送られてきたメールは，SPF 機能ではなりすましが発見できません</u>。</div></div>' +
'<div class="r" style="margin-left:-.6em"><b style="min-width:5em">Q 課長：</b><div>それでは，マルウェア X に対する有効な対策を考えてくれないか。</div></div>' +
'<div class="r" style="margin-left:-.6em"><b style="min-width:5em">R 主任：</b><div>分かりました。セキュリティサービス会社の S 社に相談してみます。</div></div>' +
'<p class="sec sp">〔マルウェア X への対応策〕</p>' +
'<p class="ind">R 主任は，現在のセキュリティ対策の内容を S 社に説明し，マルウェア X に対する対応策の提案を求めた。S 社から，セキュリティパッチの適用やログの検査が迅速に行われていないという問題が指摘され，マルウェア X 侵入の早期発見，侵入後の活動の抑止及び被害内容の把握を目的として，EDR（Endpoint Detection and Response）システム（以下，EDR という）の導入を提案された。</p>' +
'<p class="ind">S 社が提案した EDR の構成と機能概要を次に示す。</p>' +
'<p class="li">・EDR は，管理サーバ，及び PC に導入するエージェントから構成される。</p>' +
'<p class="li">・管理サーバは，エージェントの設定，エージェントから受信したログの保存，分析及び分析結果の可視化などの機能をもつ。</p>' +
'<p class="li">・エージェントは，次の( i )，( ii )の処理を行うことができる。</p>' +
'<div class="r" style="margin-left:1.4em"><b style="min-width:3em">( i )</b><div>PC で実行されたコマンド，通信内容，ファイル操作などのイベントのログを管理サーバに送信する。</div></div>' +
'<div class="r" style="margin-left:1.4em"><b style="min-width:3em">( ii )</b><div>PC のプロセスを監視し，あらかじめ設定した条件に合致した動作が行われたことを検知した場合に，設定した対応策を実施する。例えば，EDR は，(a)～</div></div>',

'<p style="text-indent:0;margin-left:4.4em">(c)に示した<u>⑤マルウェア X の活動</u>を検知した場合に，<u>⑥内部ネットワークの探索を防ぐなどの緊急措置</u>を PC に対して実施することができる。</p>' +
'<p class="ind sp">R 主任は，S 社の提案を基に，マルウェア X の侵入時の対応策をまとめ，Q 課長に EDR の導入を提案した。提案内容は承認され，EDR の導入が決定した。</p>' +
'<div class="r q sp"><b>設問 1</b><div>〔セキュリティ対策の現状〕について答えよ。' +
'<div class="r p"><b>(1)</b><div>本文中の<span class="bk">a</span>～<span class="bk">c</span>に入れる適切な機器を，解答群の中から選び記号で答えよ。' +
'<div class="ag">解答群</div><div class="opts c3"><span>ア　FW</span><span>イ　L2SW</span><span>ウ　L3SW</span><span>エ　外部 DNS サーバ</span><span>オ　検証用サーバ</span><span>カ　社内メールサーバ</span><span>キ　内部 DNS サーバ</span><span>ク　配布サーバ</span><span>ケ　メール中継サーバ</span></div></div></div>' +
'<div class="r p"><b>(2)</b><div>本文中の下線①の攻撃名を，解答群の中から選び記号で答えよ。' +
'<div class="ag">解答群</div><div class="opts c2"><span>ア　DNS リフレクション攻撃</span><span>イ　セッションハイジャック攻撃</span><span>ウ　メール不正中継攻撃</span></div></div></div></div></div>' +
'<div class="r q"><b>設問 2</b><div>〔マルウェア X の調査〕について答えよ。' +
'<div class="r p"><b>(1)</b><div>本文中の下線②の処理によって取得できる情報を，20 字以内で答えよ。</div></div>' +
'<div class="r p"><b>(2)</b><div>本文中の下線③の処理を行う目的を，解答群の中から選び記号で答えよ。' +
'<div class="ag">解答群</div><div class="opts c1">' +
'<div class="r o"><b>ア</b><div>DoS 攻撃を行うため</div></div>' +
'<div class="r o"><b>イ</b><div>稼働中の OS のバージョンを知るため</div></div>' +
'<div class="r o"><b>ウ</b><div>攻撃対象のサービスの稼働状態を知るため</div></div>' +
'<div class="r o"><b>エ</b><div>ホストの稼働状態を知るため</div></div></div></div></div>' +
'<div class="r p"><b>(3)</b><div>本文中の下線④について，発見できない理由として最も適切なものを解答群の中から選び，記号で答えよ。' +
'<div class="ag">解答群</div><div class="opts c1">' +
'<div class="r o"><b>ア</b><div>送信者のドメインが詐称されたものでないから</div></div>' +
'<div class="r o"><b>イ</b><div>添付ファイルが暗号化されているので，チェックできないから</div></div>' +
'<div class="r o"><b>ウ</b><div>メールに付与された署名が正規のドメインで生成されたものだから</div></div>' +
'<div class="r o"><b>エ</b><div>メール本文に不審な箇所がないから</div></div></div></div></div></div></div>',

'<div class="r q"><b>設問 3</b><div>〔マルウェア X への対応策〕について答えよ。' +
'<div class="r p"><b>(1)</b><div>本文中の下線⑤について，どのような事象を検知した場合に，マルウェア X の侵入を疑うことができるのかを，25 字以内で答えよ。</div></div>' +
'<div class="r p"><b>(2)</b><div>本文中の下線⑥について，緊急措置の内容を 25 字以内で答えよ。</div></div>' +
'<div class="r p"><b>(3)</b><div>EDR 導入後にマルウェア X の被害が発生したとき，被害内容を早期に明らかにするために実施すべきことは何か。本文中の字句を用いて 20 字以内で答えよ。</div></div></div></div>'
  ];
})();
