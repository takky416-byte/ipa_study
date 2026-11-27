/* 令和4年度 秋期 応用情報技術者試験 午後 問3（IPA 公表の問題冊子を文字データに起こしたもの） */
window.CBT_TEXT = window.CBT_TEXT || {};
(function () {
  var B = function (k, w) { return '<span class="bk" style="min-width:' + (w || 4.6) + 'em">' + k + '</span>'; };
  var V = '<td style="vertical-align:top">', N = '<td style="vertical-align:top;white-space:nowrap">';
  var W = function (s) { s = s.replace(/<[^>]+>/g, ''); var n = 0; for (var i = 0; i < s.length; i++) n += s.charCodeAt(i) > 0xff ? 2 : 1; return n; };
  var P = function (t, col, cmt, bw) {
    if (!cmt) return t;
    var w = W(t.replace(/<span class="bk"[^>]*>[^<]*<\/span>/g, function () { return new Array((bw || 10) + 1).join('x'); }));
    return t + new Array(Math.max(1, col - w) + 1).join(' ') + cmt;
  };
  var PRE = '<pre class="code sp" style="font-size:.8em;letter-spacing:0;line-height:1.8">';
  window.CBT_TEXT["ap_04_aki_pm03"] = [
'<p class="qh"><span>問3</span>迷路の探索処理に関する次の記述を読んで，設問に答えよ。</p>' +
'<p class="ind sp">始点と終点を任意の場所に設定する n×m の 2 次元のマスの並びから成る迷路の解を求める問題を考える。本問の迷路では次の条件で解を見つける。</p>' +
'<p class="li">・迷路内には障害物のマスがあり，n×m のマスを囲む外壁のマスがある。障害物と外壁のマスを通ることはできない。</p>' +
'<p class="li">・任意のマスから，そのマスに隣接し，通ることのできるマスに移動できる。迷路の解とは，この移動の繰返しで始点から終点にたどり着くまでのマスの並びである。ただし，迷路の解では同じマスを 2 回以上通ることはできない。</p>' +
'<p class="li">・始点と終点は異なるマスに設定されている。</p>' +
'<p class="ind sp">5×5 の迷路の例を示す。解が一つの迷路の例を図 1 に，解が複数（四つ）ある迷路の例を図 2 に示す。</p>' +
'<div class="sp" style="display:flex;justify-content:space-between;align-items:flex-end">' +
'<div class="fig" style="width:47%;margin:0"><img src="{BASE}ap_04_aki_pm03/fig1.png" style="width:100%" alt=""><div class="cap">図 1　解が一つの迷路の例</div></div>' +
'<div class="fig" style="width:44%;margin:0"><img src="{BASE}ap_04_aki_pm03/fig2.png" style="width:100%" alt=""><div class="cap">図 2　解が複数ある迷路の例</div></div></div>' +
'<p class="sec sp">〔迷路の解を見つける探索〕</p>' +
'<p class="ind">迷路の解を全て見つける探索の方法を次のように考える。</p>' +
'<p class="ind">迷路と外壁の各マスの位置を x 座標と y 座標で表し，各マスについてそのマスに関する情報（以下，マス情報という）を考える。与えられた迷路に対して，障害物と外壁のマス情報には NG フラグを，それ以外のマス情報には OK フラグをそれぞれ設定する。マス情報全体を迷路図情報という。</p>' +
'<p class="ind">探索する際の“移動”には，“進む”と“戻る”の二つの動作がある。“進む”は，</p>',

'<p style="text-indent:0">現在いるマスから① y 座標を 1 増やす，② x 座標を 1 増やす，③ y 座標を 1 減らす，④ x 座標を 1 減らす，のいずれかの方向に動くことである。マスに“進む”と同時にそのマスのマス情報に足跡フラグを入れる。足跡フラグが入ったマスには“進む”ことはできない。“戻る”は，今いるマスから“進んで”きた一つ前のマスに動くことである。マスに“移動”したとき，移動先のマスを“訪問”したという。</p>' +
'<p class="ind">探索は，始点のマスのマス情報に足跡フラグを入れ，始点のマスを“訪問”したマスとして，始点のマスから開始する。現在いるマスから次のマスに“進む”試みを①～④の順に行い，もし試みた方向のマスに“進む”ことができないならば，次の方向に“進む”ことを試みる。4 方向いずれにも“進む”ことができないときには，現在いるマスのマス情報を OK フラグに戻し，一つ前のマスに“戻る”。これを終点に到達するまで繰り返す。終点に到達したとき，始点から終点まで“進む”ことでたどってきたマスの並びが迷路の解の一つとなる。</p>' +
'<p class="ind">迷路の解を見つけた後も，他の解を見つけるために，終点から一つ前のマスに“戻り”，迷路の探索を続け，全ての探索を行ったら終了する。迷路を探索している間，それまでの経過をスタックに格納しておく。終点にたどり着いた時点でスタックの内容を順番にたどると，それが解の一つになる。</p>' +
'<p class="ind">図 1 の迷路では，始点から始めて，(1,1)→(1,2)→(1,3)→(1,4)→(1,5)→(2,5)→(1,5)→(1,4)のように“移動”する。ここまででマスの“移動”は 7 回起きていて，このときスタックには経過を示す 4 個の座標が格納されている。さらに探索を続けて，始めから 13 回目の“移動”が終了した時点では，スタックには' + B('ア') + '個の座標が格納されている。</p>' +
'<p class="sec sp">〔迷路の解を全て求めて表示するプログラム〕</p>' +
'<p class="ind">迷路の解を全て求めて表示するプログラムを考える。プログラム中で使用する主な変数，定数及び配列を表 1 に示す。配列の添字は全て 0 から始まり，要素の初期値は全て 0 とする。迷路を探索してマスを“移動”する関数 visit のプログラムを図 3 に，メインプログラムを図 4 に示す。メインプログラム中の変数及び配列は大域変数とする。</p>',

'<div class="tcap">表 1　プログラム中で使用する主な変数，定数及び配列</div>' +
'<table class="tbl" style="font-size:.92em;letter-spacing:0"><tr><th style="width:10em">名称</th><th style="width:4em">種類</th><th>内容</th></tr>' +
'<tr>' + N + 'maze[x][y]</td><td class="c">配列</td>' + V + '迷路図情報を格納する 2 次元配列</td></tr>' +
'<tr>' + N + 'OK</td><td class="c">定数</td>' + V + 'OK フラグ</td></tr>' +
'<tr>' + N + 'NG</td><td class="c">定数</td>' + V + 'NG フラグ</td></tr>' +
'<tr>' + N + 'VISITED</td><td class="c">定数</td>' + V + '足跡フラグ</td></tr>' +
'<tr>' + N + 'start_x</td><td class="c">変数</td>' + V + '始点の x 座標</td></tr>' +
'<tr>' + N + 'start_y</td><td class="c">変数</td>' + V + '始点の y 座標</td></tr>' +
'<tr>' + N + 'goal_x</td><td class="c">変数</td>' + V + '終点の x 座標</td></tr>' +
'<tr>' + N + 'goal_y</td><td class="c">変数</td>' + V + '終点の y 座標</td></tr>' +
'<tr>' + N + 'stack_visit[k]</td><td class="c">配列</td>' + V + 'それまでの経過を格納するスタック</td></tr>' +
'<tr>' + N + 'stack_top</td><td class="c">変数</td>' + V + 'スタックポインタ</td></tr>' +
'<tr>' + N + 'sol_num</td><td class="c">変数</td>' + V + '見つけた解の総数</td></tr>' +
'<tr>' + N + 'paths[u][v]</td><td class="c">配列</td>' + V + '迷路の全ての解の座標を格納する 2 次元配列。添字の u は解の番号，添字の v は解を構成する座標の順番である。</td></tr></table>' +
PRE + [
'function visit(x, y)',
P('  maze[x][y] ← VISITED', 50, '//足跡フラグを入れる'),
P('  stack_visit[stack_top] ← (x, y)', 50, '//スタックに座標を入れる'),
P('  if(x が goal_x と等しい かつ y が goal_y と等しい)', 50, '//終点に到達'),
'    for(k を 0 から stack_top まで 1 ずつ増やす)',
'      ' + B('イ', 6) + ' ← stack_visit[k]',
'    endfor',
'    sol_num ← sol_num＋1',
'  else',
'    stack_top ← stack_top＋1',
'    if(maze[x][y＋1]が OK と等しい)',
'      visit(x, y＋1)',
'    endif',
'    if(maze[x＋1][y]が OK と等しい)',
'      visit(x＋1, y)',
'    endif',
'    if(maze[x][y－1]が OK と等しい)',
'      visit(x, y－1)',
'    endif',
'    if(maze[x－1][y]が OK と等しい)',
'      visit(x－1, y)',
'    endif',
'    stack_top ← ' + B('ウ', 6),
'  endif',
'  ' + B('エ', 6) + ' ← OK',
'endfunction'].join('\n') + '</pre>' +
'<div class="fig" style="margin-top:.2em"><div class="cap">図 3　関数 visit のプログラム</div></div>',

PRE.replace(' sp"', '"') + [
'function main',
'  stack_top ← 0',
'  sol_num ← 0',
'  maze[x][y]に迷路図情報を設定する',
'  start_x, start_y, goal_x, goal_y に始点と終点の座標を設定する',
'  visit(start_x, start_y)',
'  if(' + B('オ', 6) + ' が 0 と等しい)',
'    “迷路の解は見つからなかった”と印字する',
'  else',
'    paths[][]を順に全て印字する',
'  endif',
'endfunction'].join('\n') + '</pre>' +
'<div class="fig" style="margin-top:.2em"><div class="cap">図 4　メインプログラム</div></div>' +
'<p class="sec sp">〔解が複数ある迷路〕</p>' +
'<p class="ind">図 2 は解が複数ある迷路の例で，一つ目の解が見つかった後に，他の解を見つけるために，迷路の探索を続ける。一つ目の解が見つかった後で，最初に実行される関数 visit の引数の値は' + B('カ') + 'である。この引数の座標を基点として二つ目の解が見つかるまでに，マスの“移動”は' + B('キ') + '回起き，その間に座標が(4,2)のマスは' + B('ク') + '回“訪問”される。</p>' +
'<div class="r q sp"><b>設問 1</b><div>〔迷路の解を見つける探索〕について答えよ。' +
'<div class="r p"><b>(1)</b><div>図 1 の例で終点に到達したときに，この探索で“訪問”されなかったマスの総数を，障害物と外壁のマスを除き答えよ。</div></div>' +
'<div class="r p"><b>(2)</b><div>本文中の<span class="bk">ア</span>に入れる適切な数値を答えよ。</div></div></div></div>' +
'<div class="r q"><b>設問 2</b><div>図 3 中の<span class="bk">イ</span>～<span class="bk">エ</span>に入れる適切な字句を答えよ。</div></div>' +
'<div class="r q"><b>設問 3</b><div>図 4 中の<span class="bk">オ</span>に入れる適切な字句を答えよ。</div></div>' +
'<div class="r q"><b>設問 4</b><div>〔解が複数ある迷路〕について答えよ。' +
'<div class="r p"><b>(1)</b><div>本文中の<span class="bk">カ</span>に入れる適切な引数を答えよ。</div></div>' +
'<div class="r p"><b>(2)</b><div>本文中の<span class="bk">キ</span>，<span class="bk">ク</span>に入れる適切な数値を答えよ。</div></div></div></div>'
  ];
})();
