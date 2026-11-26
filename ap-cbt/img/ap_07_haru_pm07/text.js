/* 令和7年度 春期 応用情報技術者試験 午後 問7（IPA 公表の問題冊子を文字データに起こしたもの） */
window.CBT_TEXT = window.CBT_TEXT || {};
window.CBT_TEXT["ap_07_haru_pm07"] = [
'<p class="qh"><span>問7</span>電動キックボードのシェアリングシステムに関する次の記述を読んで，設問に答えよ。</p>' +
'<p class="ind sp">G 社は，電動キックボード（以下，電動 KB という）のシェアリングシステム（以下，本システムという）を開発している。本システムは，利用者に対し，電動 KB の貸出し，使用及び返却をさせるものである。本システムを利用する場合には，利用者が事前にスマートフォン（以下，スマホという）に専用アプリケーションプログラム（以下，アプリという）をインストールし，利用者情報を登録して，利用者 ID を取得しておく必要がある。電動 KB の外観を図 1 に，本システムの主な構成を図 2 に，本システムの主な構成要素を表 1 に示す。</p>' +
'<div class="sp" style="display:flex;justify-content:space-around;align-items:flex-end">' +
'<div class="fig" style="width:41%;margin:0"><img src="{BASE}ap_07_haru_pm07/fig1.png" style="width:100%" alt=""><div class="cap">図 1　電動 KB の外観</div></div>' +
'<div class="fig" style="width:38%;margin:0"><img src="{BASE}ap_07_haru_pm07/fig2.png" style="width:100%" alt=""><div class="cap">図 2　本システムの主な構成</div></div></div>' +
'<div class="tcap sp">表 1　本システムの主な構成要素</div>' +
'<table class="tbl"><tr><th style="width:8em">構成要素名</th><th>機能概要</th></tr>' +
'<tr><td>制御部</td><td><p class="li">・電動 KB 全体を制御する。</p><p class="li">・利用者のアクセルレバー（以下，アクセルという）の操作量を計測し，アクセルの操作量に応じてモーターのトルクの発生を制御する。</p><p class="li">・その他，ライトの点灯制御，BLE 通信などの電動 KB に必要な処理を行う。</p></td></tr>' +
'<tr><td>駆動部</td><td><p class="li">・制御部から情報を受信し，車体を前方に加速するためにモーターの回転を制御する。</p><p class="li">・車輪ロック機構があり，貸出しされていないときは車輪をロックする。</p></td></tr>' +
'<tr><td>表示部</td><td><p class="li">・制御部表面のディスプレイに，電動 KB の車体の速度（以下，現在速度という）及び電池残量を表示する。</p></td></tr>' +
'<tr><td>ブレーキ</td><td><p class="li">・利用者がブレーキレバーを握ると作動し，機械的に車体を減速させる。</p></td></tr>' +
'<tr><td>速度センサー</td><td><p class="li">・現在速度を計測する。</p></td></tr>' +
'<tr><td>ライト</td><td><p class="li">・前照灯，尾灯，最高速度表示灯，制動灯などで構成され，用途に応じ点灯，消灯する。</p></td></tr>' +
'<tr><td>電池</td><td><p class="li">・制御部，駆動部，表示部，速度センサー，ライトなどに電力を供給する。</p></td></tr>' +
'<tr><td>スマホ</td><td><p class="li">・アプリで，次のことを行う。</p><p class="li2">－ スマホの位置の情報（以下，位置情報という）を使用する。</p><p class="li2">－ インターネットを介して，管理サーバとメッセージをやり取りする。</p><p class="li2">－ 電動 KB の制御部と BLE で通信し，メッセージをやり取りする。</p></td></tr>' +
'<tr><td>管理サーバ</td><td><p class="li">・利用者情報，電動 KB の情報の管理などを行う。</p></td></tr></table>',

'<p class="sec">〔本システムの利用方法〕</p>' +
'<p class="ind">利用開始前の電動 KB は，車輪がロックされた状態で，専用の貸出し用及び返却用の駐車スペース（以下，ポートという）に，駐車している。本システムには，複数のポートがあり，各ポートで電動 KB の貸出し又は返却を行う。なお，ポート以外の場所では，電動 KB の貸出し及び返却を行うことはできない。電動 KB の利用手順を表 2 に示す。</p>' +
'<div class="tcap">表 2　電動 KB の利用手順</div>' +
'<table class="tbl"><tr><th style="width:9em">利用方法</th><th>詳細手順</th></tr>' +
'<tr><td>利用者が電動 KB を借りる場合</td><td><div class="r"><b style="min-width:1.8em">①</b><div>利用者がポートに駐車している任意の電動 KB に近づき，アプリで電動 KB の車体に貼られている 2 次元バーコードから，車体の識別情報である車体 ID を読み取る。</div></div><div class="r"><b style="min-width:1.8em">②</b><div>アプリで電動 KB を返却するポート（以下，返却ポートという）を予約する。</div></div><div class="r"><b style="min-width:1.8em">③</b><div>アプリで“貸出し”を選択する。その結果，車体 ID に対応した電動 KB の車輪のロックが解除される。</div></div></td></tr>' +
'<tr><td>利用者が電動 KB で走行する場合</td><td><div class="r"><b style="min-width:1.8em">①</b><div>利用者は，手押しで初速をつけて，地面を蹴りながら電動 KB に乗車する。</div></div><div class="r"><b style="min-width:1.8em">②</b><div>利用者がアクセルを押すと，アクセルの操作量に応じて，電動 KB はモーターのトルクを発生させて最高速度（20km／時）まで加速することができる。</div></div><div class="r"><b style="min-width:1.8em">③</b><div>利用者は，アクセルを用いて加速，又はブレーキレバーを用いて減速させて電動 KB を操作する。</div></div></td></tr>' +
'<tr><td>利用者が電動 KB を返却する場合</td><td><div class="r"><b style="min-width:1.8em">①</b><div>予約した返却ポートに，利用中の電動 KB を駐車する。</div></div><div class="r"><b style="min-width:1.8em">②</b><div>アプリで“返却”を選択する。その結果，利用中の車体 ID に対応した電動 KB の車輪がロックされる。</div></div></td></tr></table>' +
'<p class="sec sp">〔電動 KB の状態の遷移〕</p>' +
'<p class="ind">電動 KB の状態の遷移を図 3 に示す。</p>' +
'<div class="fig sp"><img src="{BASE}ap_07_haru_pm07/fig3.png" style="width:100%" alt=""></div>' +
'<p class="note">注記　簡略化のために，一部の状態だけを図に示している。</p>' +
'<div class="fig" style="margin-top:0"><div class="cap">図 3　電動 KB の状態の遷移</div></div>',

'<p class="sec">〔電動 KB の動作概要〕</p>' +
'<p class="ind">電動 KB の動作概要を次に示す。</p>' +
'<p class="li">・利用開始前の電動 KB は，車輪をロックした待機中状態でポートに駐車している。</p>' +
'<p class="li">・待機中状態で利用者がアプリで“貸出し”を選択すると，電動 KB はアプリを介した管理サーバからの指示によって車輪のロックを解除して停止中状態になる。</p>' +
'<p class="li">・停止中状態で手押しなどによって 0.3km／時以上になると，走行準備状態になる。</p>' +
'<p class="li">・走行準備状態で手押しなどを続けて 3km／時以上になると，加速可能状態になる。</p>' +
'<p class="li">・加速可能状態でアクセルを押すと，走行中状態になり次の動作のいずれかを行う。</p>' +
'<p class="li2">－ 現在速度が最高速度未満の場合は，アクセルの操作量に応じて，モーターのトルクの発生を制御する。</p>' +
'<p class="li2">－ 現在速度が最高速度に達した場合は，最高速度表示灯を点灯させ，モーターのトルクを抑制する。</p>' +
'<p class="li">・走行中状態でアクセルを戻すと，加速可能状態になる。</p>' +
'<p class="li">・走行準備状態，加速可能状態，走行中状態で 0.1km／時未満が一定時間継続すると停止中状態になる。</p>' +
'<p class="li">・停止中状態で利用者がアプリで“返却”を選択したとき，管理サーバは<u>（ア）ある情報を確認してから</u>，返却の指示を行う。電動 KB はアプリを介した管理サーバからの指示によって車輪をロックし，待機中状態になる。</p>' +
'<p class="li">・状態に関係なく，ブレーキレバーを握ると，機械的にブレーキが掛かる。</p>' +
'<p class="sec sp">〔本システムで使用する主なメッセージ〕</p>' +
'<p class="ind">本システムで使用する主なメッセージを表 3 に示す。</p>',

'<div class="tcap">表 3　本システムで使用する主なメッセージ</div>' +
'<table class="tbl" style="font-size:.93em"><tr><th>メッセージ名</th><th>送信元</th><th>送信先</th><th>構成データ名</th></tr>' +
'<tr><td style="white-space:nowrap">貸出し要求</td><td style="white-space:nowrap">アプリ</td><td style="white-space:nowrap">管理サーバ</td><td>車体 ID，利用者 ID，返却ポート，位置情報</td></tr>' +
'<tr><td style="white-space:nowrap">貸出し指示</td><td style="white-space:nowrap">管理サーバ</td><td style="white-space:nowrap">アプリ</td><td>車体 ID，利用者 ID</td></tr>' +
'<tr><td style="white-space:nowrap">貸出し応答</td><td style="white-space:nowrap">アプリ</td><td style="white-space:nowrap">管理サーバ</td><td>車体 ID，利用者 ID，<br>車輪ロック解除結果（成功・失敗）</td></tr>' +
'<tr><td style="white-space:nowrap">返却要求</td><td style="white-space:nowrap">アプリ</td><td style="white-space:nowrap">管理サーバ</td><td>車体 ID，利用者 ID，位置情報</td></tr>' +
'<tr><td style="white-space:nowrap">返却指示</td><td style="white-space:nowrap">管理サーバ</td><td style="white-space:nowrap">アプリ</td><td>車体 ID，利用者 ID</td></tr>' +
'<tr><td style="white-space:nowrap">返却応答</td><td style="white-space:nowrap">アプリ</td><td style="white-space:nowrap">管理サーバ</td><td>車体 ID，利用者 ID，<br>車輪ロック結果（成功・失敗）</td></tr>' +
'<tr><td style="white-space:nowrap">車輪ロック指示</td><td style="white-space:nowrap">アプリ</td><td style="white-space:nowrap">電動 KB</td><td>車体 ID</td></tr>' +
'<tr><td style="white-space:nowrap">車輪ロック応答 <sup>1)</sup></td><td style="white-space:nowrap">電動 KB</td><td style="white-space:nowrap">アプリ</td><td>車体 ID，結果（成功・失敗）</td></tr>' +
'<tr><td style="white-space:nowrap">車輪ロック解除指示</td><td style="white-space:nowrap">アプリ</td><td style="white-space:nowrap">電動 KB</td><td>車体 ID</td></tr>' +
'<tr><td style="white-space:nowrap">車輪ロック解除応答 <sup>2)</sup></td><td style="white-space:nowrap">電動 KB</td><td style="white-space:nowrap">アプリ</td><td>車体 ID，結果（成功・失敗）</td></tr>' +
'<tr><td style="white-space:nowrap">現在情報</td><td style="white-space:nowrap">電動 KB</td><td style="white-space:nowrap">アプリ</td><td>車体 ID，電動 KB の状態，現在速度</td></tr></table>' +
'<p class="note" style="margin-left:3%">注 <sup>1)</sup>　車輪ロック応答の結果が失敗のときは，車輪ロック指示のメッセージを 1 回だけ再送する。</p>' +
'<p class="note" style="margin-left:3%">注 <sup>2)</sup>　車輪ロック解除応答の結果が失敗のときは，車輪ロック解除指示のメッセージを 1 回だけ再送する。</p>' +
'<p class="sec sp">〔電動 KB の制御部のソフトウェア構成について〕</p>' +
'<p class="ind">電動 KB の制御部では，リアルタイム OS を使用する。制御部の主なタスクの処理概要を表 4 に示す。</p>' +
'<div class="tcap sp">表 4　制御部の主なタスクの処理概要</div>' +
'<table class="tbl"><tr><th style="width:7em">タスク名</th><th>処理概要</th></tr>' +
'<tr><td>メイン</td><td><p class="li">・電動 KB の状態管理を行い，10 秒間隔で“現在情報”をアプリに送信する。</p><p class="li">・アプリからメッセージを受信し，次のことを行う。</p><p class="li2">－ “車輪ロック解除指示”を受信すると，車輪のロックを解除し，状態を<span class="bk">b</span>状態にして，“車輪ロック解除応答”をアプリに送信する。</p><p class="li2">－ “車輪ロック指示”を受信すると，車輪をロックし，状態を待機中状態にして，“車輪ロック応答”をアプリに送信する。</p><p class="li">・現在速度及び電池残量の情報を表示タスクに通知する。</p><p class="li">・<span class="bk">c</span>をモータータスクに通知する。</p></td></tr>' +
'<tr><td>速度計測</td><td><p class="li">・速度センサーで計測した現在速度を，<span class="bk">d</span>タスクとモータータスクに通知する。</p></td></tr>' +
'<tr><td>モーター</td><td><p class="li">・メインタスク，アクセルタスク，速度計測タスクの情報から，モーターのトルク・回転数を制御する。</p></td></tr>' +
'<tr><td>表示</td><td><p class="li">・メインタスクから現在速度及び電池残量の情報を受けると，現在速度及び電池残量をディスプレイに表示し，最高速度表示灯を制御する。</p></td></tr>' +
'<tr><td>アクセル</td><td><p class="li">・アクセルの操作量を計測し，メインタスクとモータータスクに通知する。</p></td></tr></table>',

'<div class="r q"><b>設問 1</b><div>電動 KB を手押しからアクセルを押して加速した後，アクセルを戻して惰性で走行したときの状態の遷移を解答群の中から選び，記号で答えよ。' +
'<div class="ag">解答群</div><div class="opts c1">' +
'<div class="r o"><b>ア</b><div>走行準備→加速可能</div></div>' +
'<div class="r o"><b>イ</b><div>走行準備→加速可能→走行中</div></div>' +
'<div class="r o"><b>ウ</b><div>走行準備→加速可能→走行中→加速可能</div></div>' +
'<div class="r o"><b>エ</b><div>走行準備→加速可能→走行中→加速可能→走行準備</div></div></div></div></div>' +
'<div class="r q"><b>設問 2</b><div>〔電動 KB の状態の遷移〕及び〔電動 KB の動作概要〕について答えよ。' +
'<div class="r p"><b>(1)</b><div>図 3 中の<span class="bk">a</span>に入れる適切な条件を答えよ。</div></div>' +
'<div class="r p"><b>(2)</b><div>下線（ア）について，ある情報には車体 ID 及び利用者 ID 以外に何があるか。本文中の字句を用いて答えよ。なお，スマホと電動 KB 間は BLE 通信が安定的に行える状態である。</div></div></div></div>' +
'<div class="r q"><b>設問 3</b><div>電動 KB の制御部の主なタスクについて答えよ。' +
'<div class="r p"><b>(1)</b><div>表 4 中の<span class="bk">b</span>に入れる適切な電動 KB の状態を図 3 中の字句で，表 4 中の<span class="bk">d</span>に入れる適切なタスク名を表 4 中のタスク名でそれぞれ答えよ。</div></div>' +
'<div class="r p"><b>(2)</b><div>表 4 中の<span class="bk">c</span>に入れる適切な情報を答えよ。</div></div></div></div>' +
'<div class="r q"><b>設問 4</b><div>電動 KB の貸出し・返却の処理について答えよ。' +
'<div class="r p"><b>(1)</b><div>利用者が電動 KB を借りる処理において車輪のロック解除が失敗なく正常に行われた場合に，送受信されるメッセージの流れについて，<span class="bk">e</span>～<span class="bk">g</span>に入れる適切なメッセージ名を解答群の中から選び，記号で答えよ。' +
'<p style="margin:.4em 0 0 1em">“貸出し要求”→“貸出し指示”→“<span class="bk">e</span>”</p>' +
'<p style="text-align:right;margin-right:1em">→“<span class="bk">f</span>”→“<span class="bk">g</span>”</p>' +
'<div class="ag">解答群</div><div class="opts c2"><span>ア　貸出し応答</span><span>イ　車輪ロック指示</span><span>ウ　車輪ロック応答</span><span>エ　車輪ロック解除指示</span><span>オ　車輪ロック解除応答</span></div></div></div></div></div>',

'<div class="r q"><b style="visibility:hidden">設問 4</b><div>' +
'<div class="r p"><b>(2)</b><div>利用者がアプリで“返却”を選択した後，電動 KB は 1 回目では車輪のロックに失敗し，2 回目で車輪のロックに成功した。管理サーバが結果を受信するまでの処理について，次の①及び②に要する時間は何秒かそれぞれ答えよ。答えは小数第 3 位を四捨五入して，小数第 2 位まで求めよ。' +
'<p class="ind">ここで，管理サーバとアプリ間で一つのメッセージ通信には 200 ミリ秒掛かり，アプリと電動 KB 間で一つのメッセージ通信には 10 ミリ秒掛かるものとする。また，電動 KB の車輪をロックする処理に成功した場合 1 秒，電動 KB の車輪をロックする処理に失敗した場合 1 秒，メッセージ再送までに 0.5 秒掛かり，その他の管理サーバ，アプリ，電動 KB の処理時間は無視できるものとする。</p>' +
'<div class="r"><b style="min-width:1.8em">①</b><div>アプリで“返却”を選択してから，管理サーバから“返却指示”メッセージを受信するまで</div></div>' +
'<div class="r"><b style="min-width:1.8em">②</b><div>アプリが，“返却指示”メッセージを受信してから，結果が成功の“車輪ロック応答”メッセージを受信するまで</div></div></div></div></div></div>'
];
