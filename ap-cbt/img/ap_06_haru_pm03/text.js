/* 令和6年度 春期 応用情報技術者試験 午後 問3（IPA 公表の問題冊子を文字データに起こしたもの） */
window.CBT_TEXT = window.CBT_TEXT || {};
(function () {
  var B = function (k, w) { return '<span class="bk" style="min-width:' + (w || 4.6) + 'em">' + k + '</span>'; };
  var W = function (s) { s = s.replace(/<[^>]+>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>'); var n = 0; for (var i = 0; i < s.length; i++) n += s.charCodeAt(i) > 0xff ? 2 : 1; return n; };
  // 行番号つきの行。cmt があれば col 桁目からコメントを置き，2 行目以降もその桁にそろえる
  var L = function (n, t, col, cmt) {
    var s = '<span class="ln">' + n + ':</span>' + t;
    if (cmt) { var pad = Math.max(1, col - W(t)); s += new Array(pad + 1).join(' ') + cmt.split('\n').join('\n<span class="ln"></span>' + new Array(col + 1).join(' ')); }
    return s;
  };
  var P = function (t, col, cmt) { return cmt ? t + new Array(Math.max(1, col - W(t)) + 1).join(' ') + cmt : t; };
  var R = '<td>', X = '<td class="c">';
  window.CBT_TEXT["ap_06_haru_pm03"] = [
'<p class="qh"><span>問3</span>グラフのノード間の最短経路を求めるアルゴリズムに関する次の記述を読んで，設問に答えよ。</p>' +
'<p class="ind sp">グラフ内の二つのノード間の最短経路を求めるアルゴリズムにダイクストラ法がある。このアルゴリズムは，車載ナビゲーションシステムなどに採用されている。</p>' +
'<p class="sec sp">〔経路算定のモデル化〕</p>' +
'<p class="ind">グラフは，有限個のノードの集合と，その中の二つのノードを結ぶエッジの集合とから成る数理モデルである。ダイクストラ法による最短経路の探索問題を考えるに当たり，本問では，エッジをどちらの方向にも行き来することができ，任意の二つのノード間に経路が存在するグラフを扱う。ここで，グラフを次のように定義する。</p>' +
'<p class="li">・ノードの個数を N とし，N は 2 以上とする。ノードの番号（以下，ノード番号という）は，始点のノード番号を 1 とし，1 から始まる連続した整数とする。ノードには，ノード番号に対応させて，V1，V2，V3，…，VN とラベルを付ける。</p>' +
'<p class="li">・二つのノードが他のノードを経由せずにエッジでつながっているとき，それらのノードは隣接するという。隣接するノード間のエッジには，ノード間の距離として正の数値を付ける。</p>' +
'<p class="li">・始点のノード（以下，始点という）とは別のノードを終点のノード（以下，終点という）として定める。始点からあるノードまでの経路の中から，経路に含まれるエッジに付けられた距離の和が最小の距離を最短距離という。始点から終点までの最短距離となる経路を最短経路という。</p>' +
'<p class="ind">図 1 にノードが五つのグラフの例を示す。図 1 の例では，始点を V1 のノードとし，終点を V5 のノードとした場合の最短経路は，V1，V2，V3，V5 のノードを順にたどる経路である。</p>' +
'<div class="fig sp"><img src="{BASE}ap_06_haru_pm03/fig1.png" style="width:42%" alt=""><div class="cap">図 1　ノードが五つのグラフの例</div></div>',

'<p class="sec">〔始点から終点までの最短距離を求める手順〕</p>' +
'<p class="ind">ダイクストラ法による始点から終点までの最短距離の算出は次のように行う。</p>' +
'<p class="ind">最初に，各ノードについて，始点からそのノードまでの距離（以下，始点ノード距離という）を作業用に導入して十分に大きい定数としておく。ただし，始点の始点ノード距離は 0 とする。この時点では，どのノードの最短距離も確定していない。</p>' +
'<p class="ind">次に，終点の最短距離が確定するまで，①～③を繰り返す。ここで，始点との距離を算出する基準となるノードを更新起点ノードという。</p>' +
'<div class="r"><b style="min-width:2em">①</b><div>最短距離が確定していないノードの中で，始点ノード距離が最小のノードを更新起点ノードとして選び，そのときの始点ノード距離の値で，当該更新起点ノードの最短距離を確定する。更新起点ノードを選ぶ際に，始点ノード距離が最小となるノードが複数ある場合は，その中の任意のノードを更新起点ノードとして選ぶ。</div></div>' +
'<div class="r"><b style="min-width:2em">②</b><div>更新起点ノードが終点であれば，終了する。</div></div>' +
'<div class="r"><b style="min-width:2em">③</b><div>①で選択した更新起点ノードに隣接しており，かつ，最短距離が確定していない全てのノードについて，更新起点ノードを経由した場合の始点ノード距離を計算する。ここで計算した始点ノード距離が，そのノードの現在までの始点ノード距離よりも小さい場合には，そのノードの現在までの始点ノード距離を更新する。</div></div>' +
'<p class="sec sp">〔図 1 の例における最短距離を求める手順と始点ノード距離〕</p>' +
'<p class="ind">図 1 の例において，始点 V1 から終点 V5 までの経路に対して，上の①～③を繰返し適用する。そのとき，更新起点ノードを選ぶたびに，更新起点ノードの始点ノード距離，更新起点ノードと隣接するノードの始点ノード距離，及び最短距離が確定していないノードの始点ノード距離を計算した内容を表 1 に示す。</p>' +
'<div class="tcap sp">表 1　図 1 の例における最短距離を求める手順と始点ノード距離</div>' +
'<table class="tbl" style="font-size:.8em;letter-spacing:0;white-space:nowrap"><tr><th>探索適用<br>回数</th><th>更新起点ノード</th><th>最短距離が確定していない，更新起<br>点ノードに隣接するノード</th><th>最短距離が確定していないノード</th></tr>' +
'<tr>' + R + '1 回目</td>' + R + 'V1 &lt;0&gt;</td>' + R + 'V2 &lt;10&gt;，V3 &lt;16&gt;</td>' + R + 'V2 &lt;10&gt;，V3 &lt;16&gt;，V4 &lt;INF&gt;，V5 &lt;INF&gt;</td></tr>' +
'<tr>' + R + '2 回目</td>' + R + 'V2 &lt;10&gt;</td>' + R + 'V3 &lt;14&gt;，V4 &lt;13&gt;</td>' + R + 'V3 &lt;14&gt;，V4 &lt;13&gt;，V5 &lt;INF&gt;</td></tr>' +
'<tr>' + R + '3 回目</td>' + R + 'V4 &lt;13&gt;</td>' + R + 'V3 &lt;14&gt;，V5 &lt;19&gt;</td>' + R + 'V3 &lt;14&gt;，V5 &lt;19&gt;</td></tr>' +
'<tr>' + R + '4 回目</td>' + R + 'V3 &lt;14&gt;</td>' + R + 'V5 &lt;' + B('ア') + '&gt;</td>' + R + 'V5 &lt;' + B('ア') + '&gt;</td></tr>' +
'<tr>' + R + '5 回目</td>' + R + 'V5 &lt;' + B('ア') + '&gt;</td>' + X + '－</td>' + X + '－</td></tr></table>' +
'<p class="note" style="margin-left:0">注記 1　INF は，定数で十分大きい数を表す。</p>' +
'<p class="note" style="margin-left:0">注記 2　&lt;&gt;内の数値は，当該ノードの始点ノード距離を表す。</p>',

'<p class="sec">〔最短距離の算出プログラム〕</p>' +
'<p class="ind">始点から終点までの最短距離を求める関数 distance のプログラムを図 2 に示す。配列の要素番号は 1 から始まるものとする。また，行頭の数字は行の番号を表す。</p>' +
'<pre class="code sp" style="font-size:.76em;letter-spacing:0">' + [
L(' 1', '○整数型: distance()'),
L(' 2', '  整数型: N', 28, '/* ノードの個数 */'),
L(' 3', '  整数型: INF', 28, '/* 十分大きい定数 */'),
L(' 4', '  整数型の二次元配列: edge', 28, '/* edge[m, n]には，ノード m からノード n への距離を格納\n   二つのノードが隣接していない場合には INF を格納 */'),
L(' 5', '  整数型: GOAL', 28, '/* 終点のノード番号 */'),
L(' 6', '  整数型の配列: dist', 28, '/* 始点ノード距離。初期値は INF。要素番号がノード番号を表す。 */'),
L(' 7', '  整数型の配列: done', 28, '/* 初期値は 0。最短距離が確定したら 1 を入れる。\n   要素番号がノード番号を表す。 */'),
L(' 8', '  整数型: curNode', 28, '/* 更新起点ノードのノード番号 */'),
L(' 9', '  整数型: minDist', 28, '/* 更新起点ノードを求める際に使用する一時変数 */'),
L('10', '  整数型: k', 28, '/* 要素番号 */'),
L('11', '  dist[1] ← 0', 28, '/* 始点の始点ノード距離を 0 とする。 */'),
L('12', '  while (true)'),
L('13', '    minDist ← INF'),
L('14', '    for (k を 1 から N まで 1 ずつ増やす)'),
L('15', '      if (done[k]が 0 かつ ' + B('イ', 6.2) + ')'),
L('16', '        minDist ← ' + B('ウ', 6.2)),
L('17', '        curNode ← k'),
L('18', '      endif'),
L('19', '    endfor'),
L('20', '    done[curNode] ← 1'),
L('21', '    if (curNode が GOAL と等しい)'),
L('22', '      return dist[curNode]'),
L('23', '    endif'),
L('24', '    for (k を 1 から N まで 1 ずつ増やす)'),
L('25', '      if (' + B('エ', 6.2) + ' が dist[k] より小さい かつ done[k]が 0)'),
L('26', '        dist[k] ← ' + B('エ', 6.2)),
L('27', '      endif'),
L('28', '    endfor'),
L('29', '  endwhile')].join('\n') + '</pre>' +
'<div class="fig" style="margin-top:.2em"><div class="cap">図 2　関数 distance のプログラム</div></div>' +
'<p class="sec sp">〔最短経路の出力〕</p>' +
'<p class="ind">関数 distance を変更して，求めた最短距離となる最短経路を出力できるようにする。具体的には，まず，ノード番号 1～N を格納する配列 viaNode を使用するために，図 3 の変数宣言を図 2 の行 10 の直後に，図 4 のプログラムを図 2 の行 21 の直後に，それぞれ挿入する。さらに，各ノードの始点ノード距離を更新するたびに，直前に経由したノード番号を viaNode に格納する<u>①代入文を一つ</u>，図 2 のプログラムの行</p>',

'<p style="text-indent:0"><span class="bk">オ</span>の直後に挿入する。</p>' +
'<p class="ind">このプログラムの変更によって，終点のノード番号を起点として<span class="bk">カ</span>たどることで，最短経路のノード番号を逆順に出力する。</p>' +
'<pre class="code sp" style="font-size:.8em;letter-spacing:0">' + [
P('  整数型の配列: viaNode', 30, '/* 最短経路のノード番号を格納する。初期値は 0。 */'),
P('  整数型: j', 30, '/* 要素番号 */')].join('\n') + '</pre>' +
'<div class="fig" style="margin-top:.2em"><div class="cap">図 3　最短経路を出力するために関数 distance に挿入する変数宣言</div></div>' +
'<pre class="code sp" style="font-size:.8em;letter-spacing:0">' + [
P('  j ← GOAL', 30, '/* 終点のノード番号 */'),
P('  GOAL を出力', 30, '/* 終点のノード番号の出力 */'),
P('  while (j が 1 より大きい)', 30, '/* 最短経路の出力 */'),
'    viaNode[j]を出力',
'    j ← viaNode[j]',
'  endwhile'].join('\n') + '</pre>' +
'<div class="fig" style="margin-top:.2em"><div class="cap">図 4　最短経路を出力するために関数 distance に挿入するプログラム</div></div>' +
'<p class="sec sp">〔計算量の考察〕</p>' +
'<p class="ind">関数 distance では，次の<span class="bk">キ</span>を選ぶために始点ノード距離を計算する回数は最大でも N 回である。また，<span class="bk">キ</span>を選ぶ回数は，一度選ばれると当該ノードの最短距離は確定するので，最大でも N 回である。よって，最悪の場合の計算量は，<i>O</i>(<span class="bk">ク</span>)である。</p>',

'<div class="r q"><b>設問 1</b><div>表 1 中の<span class="bk">ア</span>に入れる適切な字句を答えよ。</div></div>' +
'<div class="r q"><b>設問 2</b><div>図 2 中の<span class="bk">イ</span>～<span class="bk">エ</span>に入れる適切な字句を答えよ。</div></div>' +
'<div class="r q"><b>設問 3</b><div>〔最短経路の出力〕について答えよ。' +
'<div class="r p"><b>(1)</b><div>本文中の下線①と<span class="bk">オ</span>について，挿入すべき代入文と<span class="bk">オ</span>に入れる行の番号を答えよ。行の番号については，最も小さい番号を答えること。ただし，図 2 中の現在の行の番号は図 3 及び図 4 の挿入によって変化しないものとする。</div></div>' +
'<div class="r p"><b>(2)</b><div>本文中の<span class="bk">カ</span>に入れる適切な字句を解答群の中から選び，記号で答えよ。' +
'<div class="ag">解答群</div><div class="opts c1">' +
'<div class="r o"><b>ア</b><div>viaNode に格納してあるノード番号を</div></div>' +
'<div class="r o"><b>イ</b><div>viaNode の要素番号を大きい方から</div></div>' +
'<div class="r o"><b>ウ</b><div>viaNode の要素番号を小さい方から</div></div></div></div></div></div></div>' +
'<div class="r q"><b>設問 4</b><div>〔計算量の考察〕について答えよ。' +
'<div class="r p"><b>(1)</b><div>本文中の<span class="bk">キ</span>に入れる適切な字句を，本文中の字句を用いて 10 字以内で答えよ。</div></div>' +
'<div class="r p"><b>(2)</b><div>本文中の<span class="bk">ク</span>に入れる適切な字句を答えよ。</div></div></div></div>'
  ];
})();
