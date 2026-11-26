/* 令和7年度 春期 応用情報技術者試験 午後 問3（IPA 公表の問題冊子を文字データに起こしたもの） */
window.CBT_TEXT = window.CBT_TEXT || {};
(function () {
  var B = function (k, w) { return '<span class="bk"' + (w ? ' style="min-width:' + w + 'em"' : '') + '>' + k + '</span>'; };
  var L = function (n, t) { return '<span class="ln">' + n + ':</span>' + t; };
  window.CBT_TEXT["ap_07_haru_pm03"] = [
'<p class="qh"><span>問3</span>スライドパズルを解くプログラムに関する次の記述を読んで，設問に答えよ。</p>' +
'<p class="ind sp">表 1 のルールで定義されるスライドパズルについて考える。</p>' +
'<div class="tcap sp">表 1　スライドパズルのルール</div>' +
'<table class="tbl"><tr><th style="width:8em">用語</th><th>説明</th></tr>' +
'<tr><td>盤面</td><td>正方形の面に，1 から順に 1 ずつ大きくなる数字の書かれた駒が配置されている。1 か所だけ駒の置かれていない空白のマス（以下，空白マスという）がある。</td></tr>' +
'<tr><td>開始時点の盤面</td><td>開始時点では，駒と空白マスはランダムに配置されている。</td></tr>' +
'<tr><td>ゴールの盤面</td><td>盤面左上に数字が 1 の駒があり，右の駒の数字は 1 ずつ増えていき，その行の右端の駒に書かれた数字より 1 大きい数字が，次の行の左端の駒の数字となる。盤面右下のマスが空白マスとなる。</td></tr>' +
'<tr><td>駒の移動</td><td>駒の上下左右のいずれかに空白マスがある場合，駒を空白マスに移動することができる。駒が移動した場合，駒が置かれていたマスが空白マスになる。駒を空白マスに移動させて盤面を変化させ，ゴールの盤面と同じにすることを目指す。</td></tr></table>' +
'<p class="ind sp">一辺が 3 マスのスライドパズルの例を図 1 に示す。</p>' +
'<div class="fig"><img src="{BASE}ap_07_haru_pm03/fig1.png" style="width:42%" alt=""><div class="cap">図 1　一辺が 3 マスのスライドパズルの例</div></div>' +
'<p class="ind sp">本問では，一辺のマスの個数が任意のスライドパズルにおいて，ゴールの盤面になるまでの駒の移動回数が最小となる移動方法（以下，最小解という）を一つ求めるプログラムを作成する。</p>' +
'<p class="sec sp">〔一辺が N マスのスライドパズルの最小解を幅優先探索を用いて求める方法〕</p>' +
'<p class="ind">幅優先探索を行ったときの，スライドパズルの盤面の遷移を，グラフで表現する。開始時点の盤面をルートノード，ある時点の盤面をノード，駒の移動に伴う盤面の遷移をエッジで表現する。また，ゴールの盤面をゴールノードとして定義する。</p>' +
'<p class="ind">幅優先探索で最小解を求める方法を次のように考える。ここで，N は 2 以上とする。</p>' +
'<p class="ind">探索対象のノードに対して，移動できる駒ごとにその駒を移動した後のノードを',

'<p>作成して，探索対象のノードの子ノードとし，探索対象のノードは探索済みとなる。このとき，子ノードが表す盤面が既に探索したノード（以下，探索済みノードという）と同じであれば，この子ノードは終端ノードとして，以降の探索は行わない。また，子ノードがゴールノードと同じであれば，最小解が見つかったと判断して探索を終了する。</p>' +
'<p class="sec sp">〔N が 3 の場合の例〕</p>' +
'<p class="ind">一辺が 3 マスのスライドパズルの最小解を求める過程の例を図 2 に示す。</p>' +
'<div class="fig"><img src="{BASE}ap_07_haru_pm03/fig2.png" style="width:100%" alt=""><div class="cap">図 2　一辺が 3 マスのスライドパズルの最小解を求める過程の例</div></div>' +
'<div class="r p sp"><b>(1)</b><div>1 回目の駒の移動では，ルートノードを探索対象のノードとする。ここでは，移動できる駒が三つあるので，ルートノードから深さが 1 となる①～③の子ノードを作成し，ルートノードは探索済みノードとなる。ここで，①～③の子ノードに対して，ゴールノードの判定及び終端ノードの判定を行う。</div></div>' +
'<div class="r p"><b>(2)</b><div>次に，作成した子ノードで終端ノード以外のノードをそれぞれ探索対象のノードとし，駒の移動にあわせて子ノードを作成する。図 2 では，①～③のノードから④～⑪の子ノードを作成し，①～③は探索済みノードとなる。ここで，④～⑪の子ノードに対して，ゴールノードの判定及び終端ノードの判定を行う。図 2 では，</div></div>',

'<div class="r p"><b style="visibility:hidden">(2)</b><div>盤面が探索済みノードと一致する⑤，⑥及び⑩は終端ノードとなり，以降の探索は行わない。</div></div>' +
'<div class="r p"><b>(3)</b><div>以降，(2)で作成したノードの子ノードの作成と，ゴールノードの判定及び終端ノードの判定を繰り返す。図 2 の⑫は，n 回目の移動でゴールノードに至ったことを示している。なお，全てのリーフノードが終端ノードと判定された場合，ゴールの盤面に至る駒の移動方法がないことを意味しているので，その旨のメッセージを出力して探索を終了する。</div></div>' +
'<p class="ind sp">次に，配列を用いた盤面の表現方法を図 3 に示す。ここで，空白マスを表す値は最も大きい駒の数字である 8 に 1 を加えた 9 とする。なお，配列の要素番号は 1 から始まるものとする。</p>' +
'<div class="fig"><img src="{BASE}ap_07_haru_pm03/fig3.png" style="width:100%" alt=""><div class="cap">図 3　配列を用いた盤面の表現方法</div></div>' +
'<p class="sec sp">〔一辺が N マスのスライドパズルの最小解を求めるプログラム〕</p>' +
'<p class="ind">一辺が N マスのスライドパズルにおいて，開始時点の盤面をランダムに作成し，最小解を求め，開始時点の盤面からの遷移及び駒の移動回数を出力するプログラムを作成する。開始時点からの盤面の遷移を保持する単方向連結リストの要素となるクラス BoardState の説明を図 4 に，キューを実現するクラス Queue の説明を図 5 に，リストを実現するクラス List の説明を図 6 に，プログラムで使用する主な関数を表 2 に，最小解を求めるプログラムを図 7 に示す。</p>',

'<table class="tbl"><tr><th style="width:5.5em">メンバ変数</th><th style="width:7.5em">型</th><th>説明</th></tr>' +
'<tr><td>board</td><td>整数型配列の配列</td><td>盤面配列。初期状態は未定義。</td></tr>' +
'<tr><td>space</td><td>整数型の配列</td><td>空白マスの場所を示す行番号と列番号の二つの要素から成る配列。初期状態は未定義。</td></tr>' +
'<tr><td>prev</td><td>BoardState</td><td>駒が 1 回移動する前の BoardState のインスタンスへの参照。開始時点の盤面からの遷移を出力する際に用いる。初期状態は未定義。</td></tr></table>' +
'<table class="tbl sp"><tr><th style="width:13em">コンストラクタ</th><th>説明</th></tr>' +
'<tr><td>BoardState()</td><td>インスタンスを初期化する。</td></tr>' +
'<tr><td>BoardState(BoardState: st)</td><td>インスタンスを初期化し，メンバ変数に次の処理を行う。<div class="r p"><b>(1)</b><div>メンバ変数 board に引数で渡された BoardState のインスタンスの board の値を格納する。</div></div><div class="r p"><b>(2)</b><div>メンバ変数 space に引数で渡された BoardState のインスタンスの space の値を格納する。</div></div><div class="r p"><b>(3)</b><div>メンバ変数 prev に引数で渡された BoardState のインスタンスへの参照 st を格納する。</div></div></td></tr></table>' +
'<div class="fig" style="margin-top:.2em"><div class="cap">図 4　クラス BoardState の説明</div></div>' +
'<table class="tbl sp"><tr><th style="width:11em">コンストラクタ</th><th>説明</th></tr><tr><td>Queue()</td><td>可変長のキューを生成する。</td></tr></table>' +
'<table class="tbl sp"><tr><th style="width:11em">メソッド</th><th style="width:7em">戻り値</th><th>説明</th></tr>' +
'<tr><td>add(BoardState: st)</td><td>なし</td><td>キューに BoardState のインスタンスへの参照 st を追加する。</td></tr>' +
'<tr><td>isEmpty()</td><td>論理型</td><td>キューが空の場合は true を返し，空でない場合は false を返す。</td></tr>' +
'<tr><td>poll()</td><td>BoardState</td><td>先頭の BoardState のインスタンスへの参照を取り出して返す。</td></tr>' +
'<tr><td>peek()</td><td>BoardState</td><td>先頭の BoardState のインスタンスへの参照を返す。</td></tr></table>' +
'<div class="fig" style="margin-top:.2em"><div class="cap">図 5　クラス Queue の説明</div></div>' +
'<table class="tbl sp"><tr><th style="width:13em">コンストラクタ</th><th>説明</th></tr><tr><td>List()</td><td>可変長のリストを生成する。</td></tr></table>' +
'<table class="tbl sp"><tr><th style="width:13em">メソッド</th><th style="width:8em">戻り値</th><th>説明</th></tr>' +
'<tr><td>add(整数型配列の配列: b)</td><td>なし</td><td>リストに盤面配列 b を追加する。</td></tr>' +
'<tr><td>isEmpty()</td><td>論理型</td><td>リストが空の場合は true を返し，空でない場合は false を返す。</td></tr>' +
'<tr><td>peek()</td><td>整数型配列の配列</td><td>リストの先頭に存在する盤面配列を返す。</td></tr></table>' +
'<div class="fig" style="margin-top:.2em"><div class="cap">図 6　クラス List の説明</div></div>',

'<div class="tcap">表 2　プログラムで使用する主な関数</div>' +
'<table class="tbl"><tr><th>名称</th><th style="width:6.5em">戻り値</th><th>説明</th></tr>' +
'<tr><td>createGoal(整数型: board_size)</td><td>整数型配列の配列</td><td>引数 board_size の値を一辺のマス数としたスライドパズルのゴールの盤面を表す配列（以下，ゴールの盤面配列という）を作成して返す。</td></tr>' +
'<tr><td>createStart(整数型: board_size)</td><td>整数型配列の配列</td><td>引数 board_size の値を一辺のマス数としたスライドパズルの開始時点の盤面配列をランダムに作成し，出力して返す。なお，ゴールの盤面配列と同じものが作成されることはない。</td></tr>' +
'<tr><td>getSpace(整数型配列の配列: b)</td><td>整数型の配列</td><td>盤面配列 b を用いて，空白マスの場所を行番号と列番号から成る配列で返す。</td></tr>' +
'<tr><td>checkGoal(整数型配列の配列: b,<br>　　　　　整数型配列の配列: g)</td><td>論理型</td><td>第一引数の盤面配列 b と第二引数のゴールの盤面配列 g を用いて両者が一致しているかどうかを判定して結果を返す。一致する場合は true を返し，一致しない場合は false を返す。</td></tr>' +
'<tr><td>printResult(BoardState: st)</td><td>なし</td><td>引数として与えられた BoardState のインスタンスへの参照 st を用いて，開始時点の盤面からの遷移及び駒の移動回数を出力する。</td></tr>' +
'<tr><td>checkSameBoard(整数型配列の配列: b,<br>　　　　　　　List: l)</td><td>論理型</td><td>引数で渡される探索済みの盤面配列のリストへの参照 l を用いて，盤面配列 b が探索済みの盤面配列のリストに存在するかどうかを判定して結果を返す。存在する場合は true を返し，存在しない場合は false を返す。</td></tr></table>' +
'<pre class="code">' + [
L(' 1', '○solveNPuzzle(整数型: board_size)'),
L(' 2', '  BoardState: start_state        /* 開始時点の盤面を保持するBoardStateのインスタンス\n                                     への参照 */'),
L(' 3', '  整数型配列の配列: goal_board   /* ゴールの盤面配列 */'),
L(' 4', '  整数型配列の配列: direction    /* 駒の移動に伴う空白マスの移動方向を行番号の増減を1番目\n                                     の要素，列番号の増減を2番目の要素で表現する配列 */'),
L(' 5', '  Queue: explore_queue           /* 探索対象の盤面を保持するキューのインスタンスへの参照 */'),
L(' 6', '  List: check_list               /* 探索済みの盤面配列を保持するリストのインスタンス\n                                     への参照 */'),
L(' 7', '  BoardState: state              /* 駒が移動する前の盤面を保持するBoardStateの\n                                     インスタンスへの参照 */'),
L(' 8', '  BoardState: new_state          /* 駒が移動した後の盤面を保持するBoardStateの\n                                     インスタンスへの参照 */'),
L(' 9', '  整数型: change_num             /* 移動する駒の数字 */'),
L('10', '  整数型: i                      /* forループ内で使用するカウンタ変数 */')].join('\n') + '</pre>' +
'<div class="fig" style="margin-top:.2em"><div class="cap">図 7　最小解を求めるプログラム</div></div>',

'<pre class="code">' + [
L('11', '  start_state ← BoardState()'),
L('12', '  goal_board ← createGoal(board_size)'),
L('13', '  start_state.board ← createStart(board_size)'),
L('14', '  start_state.space ← getSpace(start_state.board)'),
L('15', '  direction ← {{1, 0}, {0, －1}, {－1, 0}, {0, 1}}'),
L('16', '  explore_queue ← Queue()'),
L('17', '  explore_queue.add(start_state)'),
L('18', '  check_list ← List()'),
L('19', '  check_list.add(start_state.board)'),
L('20', '  while (' + B('ア') + 'がfalseと等しい)'),
L('21', '    state ← explore_queue.' + B('イ')),
L('22', '    for (iを1からdirectionの要素数まで1ずつ増やす)'),
L('23', '      if ((state.space[1] ＋ ' + B('ウ') + 'が1以上) かつ'),
L('24', '          (state.space[1] ＋ ' + B('ウ') + 'が' + B('エ') + '以下) かつ'),
L('25', '          (state.space[2] ＋ ' + B('オ') + 'が1以上) かつ'),
L('26', '          (state.space[2] ＋ ' + B('オ') + 'が' + B('エ') + '以下))'),
L('27', '        new_state ← BoardState(state)'),
L('28', '        new_state.space[1] ← state.space[1] ＋ ' + B('ウ')),
L('29', '        new_state.space[2] ← state.space[2] ＋ ' + B('オ')),
L('30', '        change_num ← new_state.board[new_state.space[1]][new_state.space[2]]'),
L('31', '        new_state.board[new_state.space[1]][new_state.space[2]] ← board_size × board_size'),
L('32', '        new_state.board[state.space[1]][state.space[2]] ← change_num'),
L('33', '        if (' + B('カ') + 'がtrueと等しい)'),
L('34', '          printResult(new_state)'),
L('35', '          return'),
L('36', '        endif'),
L('37', '        if (checkSameBoard(new_state.board, check_list)がfalseと等しい)'),
L('38', '          explore_queue.' + B('キ')),
L('39', '          check_list.' + B('ク')),
L('40', '        endif'),
L('41', '      endif'),
L('42', '    endfor'),
L('43', '  endwhile'),
L('44', '  ゴールの盤面に至る駒の移動方法がない旨のメッセージを出力'),
L('45', '  return')].join('\n') + '</pre>' +
'<div class="fig" style="margin-top:.2em"><div class="cap">図 7　最小解を求めるプログラム（続き）</div></div>' +
'<div class="r q sp"><b>設問 1</b><div>図 2 中の②の盤面を図 3 に倣って，配列で答えよ。</div></div>' +
'<div class="r q"><b>設問 2</b><div>図 7 中の<span class="bk">ア</span>～<span class="bk">ク</span>に入れる適切な字句を答えよ。</div></div>'
  ];
})();
