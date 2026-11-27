/* 令和6年度 秋期 応用情報技術者試験 午後 問3（IPA 公表の問題冊子を文字データに起こしたもの） */
window.CBT_TEXT = window.CBT_TEXT || {};
(function () {
  var B = function (k, w) { return '<span class="bk" style="min-width:' + (w || 4.6) + 'em">' + k + '</span>'; };
  // 表示幅（半角=1，全角=2）を数えて，コメントの開始桁をそろえる
  var W = function (s) { s = s.replace(/<[^>]+>/g, ''); var n = 0; for (var i = 0; i < s.length; i++) n += s.charCodeAt(i) > 0xff ? 2 : 1; return n; };
  var C = function (left, col, cmt) {
    var pad = Math.max(1, col - W(left)), sp = new Array(col + 4).join(' ');
    return left + new Array(pad + 1).join(' ') + cmt.split('\n').join('\n' + sp);
  };
  var A = function (left, lab) { return C(left, 36, '◀━━━━━━━━━━━━━━━━ ' + lab); };
  window.CBT_TEXT["ap_06_aki_pm03"] = [
'<p class="qh"><span>問3</span>素数を列挙するアルゴリズムに関する次の記述を読んで，設問に答えよ。</p>' +
'<p class="ind sp">素数とは，2 以上の自然数のうち，正の約数が 1 と自身だけである数のことである。</p>' +
'<p class="ind">2 以上の自然数 N に対して，N 以下の素数を列挙する関数 prime1 のプログラムを図 1 に示す。なお，本問では，配列の要素番号は 1 から始まり，要素数が 0 の配列を{}で表す。</p>' +
'<pre class="code sp" style="font-size:.8em;letter-spacing:0">' + [
'○整数型の配列: prime1(整数型: N)',
C('  整数型の配列: primes ← {}', 30, '/* 結果となる素数の一覧を格納する一次元配列 */'),
C('  論理型: isPrime', 30, '/* ループ内で着目している数が素数か否かを表す変数。\ntrue であれば素数であることを表し，false であれば\n素数ではないことを表す */'),
'',
'  整数型: d ← 2',
'  整数型: t',
'  /* メイン処理開始 */',
'  while (d が N 以下)',
C('    isPrime ← true', 30, '/* 仮で素数として扱う */'),
'    t ← 2',
'    while (t が d 未満)',
'      if (d mod t が 0 と等しい)',
'        isPrime ← false',
'      endif',
A('      t ← t ＋ 1', '(L1)'),
'    endwhile',
'    if (isPrime が true と等しい)',
'      primes の末尾に d の値を追加する',
'    endif',
'    d ← d ＋ 1',
'  endwhile',
'  /* メイン処理終了 */',
'  return primes'].join('\n') + '</pre>' +
'<div class="fig" style="margin-top:.2em"><div class="cap">図 1　関数 prime1 のプログラム</div></div>' +
'<p class="ind sp">この関数 prime1 の時間計算量は，N を用いて表すと <i>O</i>(<span class="bk">ア</span>)である。</p>' +
'<p class="sec sp">〔アルゴリズムの改良 1〕</p>' +
'<p class="ind">素数の定義によって，2 以上の自然数 s について，s 自身を除く s の正の倍数 u は，1 と u 以外に s も約数に含むので素数ではない。この性質を利用して関数 prime1 を改良し，次の手順で素数を列挙する関数 prime2 を考える。</p>',

'<div class="r p"><b>(1)</b><div>2 以上 N 以下の自然数について，全て“素数である”とマークする。</div></div>' +
'<div class="r p"><b>(2)</b><div>2 以上 N 以下の自然数 d について，次の(a)，(b)を行う。' +
'<div class="r"><b style="min-width:2.4em">(a)</b><div>d が“素数ではない”とマークされている場合，何もしない。</div></div>' +
'<div class="r"><b style="min-width:2.4em">(b)</b><div>d が“素数である”とマークされている場合，次の処理を行う。' +
'<div class="r"><b style="min-width:2em">①</b><div>d が素数であることを確定させる。</div></div>' +
'<div class="r"><b style="min-width:2em">②</b><div>d 以上の自然数 x について，d を x 倍した数を“素数ではない”とマークする。</div></div></div></div></div></div>' +
'<p class="ind sp">関数 prime2 のプログラムを図 2 に示す。</p>' +
'<pre class="code sp" style="font-size:.8em;letter-spacing:0">' + [
'○整数型の配列: prime2(整数型: N)',
C('  整数型の配列: primes ← {}', 36, '/* 結果となる素数の一覧を格納する一次元配列 */'),
C('  論理型の配列: isPrime ← {false}', 36, '/* isPrime[k]が true であれば k が素数であることを\n表し，false であれば k が素数ではないことを表す\n一次元配列 */'),
'',
'  整数型: c ← 2',
'  整数型: d ← 2',
'  整数型: t',
'  while (c が N 以下)',
'    isPrime の末尾に true を追加する',
'    c ← c ＋ 1',
'  endwhile',
'  /* メイン処理開始 */',
'  while (d が N 以下)',
'    if (' + B('イ') + ')',
'      primes の末尾に d の値を追加する',
'      t ← d × d',
'      while (t が N 以下)',
'        isPrime[t] ← false',
A('        t ← ' + B('ウ') + '      ', '(L2)'),
'      endwhile',
'    endif',
'    d ← d ＋ 1',
'  endwhile',
'  /* メイン処理終了 */',
'  return primes'].join('\n') + '</pre>' +
'<div class="fig" style="margin-top:.2em"><div class="cap">図 2　関数 prime2 のプログラム</div></div>' +
'<p class="ind sp">関数 prime2 は関数 prime1 と比較してメイン処理部の時間計算量を小さくすること</p>',

'<p style="text-indent:0">ができ，引数 N の値が同一の場合において，関数 prime2 の(L2)の行の実行回数は，関数 prime1 の(L1)の行の実行回数以下となる。</p>' +
'<p class="sec sp">〔アルゴリズムの改良 2〕</p>' +
'<p class="ind">4 以上の偶数は全て 2 の倍数であるので素数ではない。したがって，2 以外の素数を列挙するためには奇数だけを考慮すればよい。この性質を利用して，関数 prime2 に次の変更を加えた関数 prime3 を考える。</p>' +
'<div class="r p"><b>(1)</b><div>関数の戻り値として素数の一覧が格納される primes にあらかじめ 2 を格納しておく。</div></div>' +
'<div class="r p"><b>(2)</b><div>いずれのループも奇数についてだけ実行されるようにする。</div></div>' +
'<div class="r p"><b>(3)</b><div>3 以上の自然数 2k＋1 が素数か否かを isPrime[k]で表すようにする。</div></div>' +
'<p class="ind sp">関数 prime3 のプログラムを図 3 に示す。</p>' +
'<pre class="code sp" style="font-size:.8em;letter-spacing:0">' + [
'○整数型の配列: prime3(整数型: N)',
C('  整数型の配列: primes ← {2}', 33, '/* 結果となる素数の一覧を格納する一次元配列 */'),
C('  論理型の配列: isPrime ← {}', 33, '/* isPrime[k]が true であれば 2k＋1 が素数であることを\n表し，false であれば 2k＋1 が素数ではないことを表す\n一次元配列 */'),
'',
'  整数型: c ← 3',
'  整数型: d ← 3',
'  整数型: t',
'  while (c が N 以下)',
'    isPrime の末尾に true を追加する',
'    c ← c ＋ 2',
'  endwhile',
'  /* メイン処理開始 */',
'  while (d が N 以下)',
'    if (' + B('エ') + ')',
'      primes の末尾に d の値を追加する',
'      t ← d × d',
'      while (t が N 以下)',
'        isPrime[' + B('オ') + '] ← false',
A('        t ← ' + B('カ') + '      ', '(L3)'),
'      endwhile',
'    endif',
'    d ← d ＋ 2',
'  endwhile',
'  /* メイン処理終了 */',
'  return primes'].join('\n') + '</pre>' +
'<div class="fig" style="margin-top:.2em"><div class="cap">図 3　関数 prime3 のプログラム</div></div>',

'<p class="ind">関数 prime3 は関数 prime2 と比較してメイン処理部の二重ループの実行回数を減らすことができる。引数 N の値が同一の場合において，関数 prime3 の(L3)の行の実行回数は，関数 prime2 の(L2)の行の実行回数の半分以下となる。加えて，計算に必要な配列 isPrime の要素数も半分以下に減らすことができる。</p>' +
'<div class="r q sp"><b>設問 1</b><div>本文中の<span class="bk">ア</span>に入れる適切な字句を答えよ。</div></div>' +
'<div class="r q"><b>設問 2</b><div>図 2 中の<span class="bk">イ</span>，<span class="bk">ウ</span>に入れる適切な字句を答えよ。</div></div>' +
'<div class="r q"><b>設問 3</b><div>図 3 中の<span class="bk">エ</span>～<span class="bk">カ</span>に入れる適切な字句を答えよ。</div></div>' +
'<div class="r q"><b>設問 4</b><div>prime1(20)，prime2(20)，prime3(20)をそれぞれ実行したとき，図 1 中の(L1)の行，図 2 中の(L2)の行，図 3 中の(L3)の行が実行される回数をそれぞれ答えよ。</div></div>'
  ];
})();
