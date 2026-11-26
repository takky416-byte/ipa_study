/* 令和7年度 秋期 応用情報技術者試験 午後 問3（IPA 公表の問題冊子を文字データに起こしたもの） */
window.CBT_TEXT = window.CBT_TEXT || {};
window.CBT_TEXT["ap_07_aki_pm03"] = [
'<p class="qh"><span>問3</span>二つの列の最長共通部分列（Longest Common Subsequence）の長さを求めるアルゴリズムに関する次の記述を読んで，設問に答えよ。</p>' +
'<p class="ind sp">列 X＝{x<sub>1</sub>，x<sub>2</sub>，…，x<sub>n</sub>}に対して，順序を保持して要素を抽出した列を部分列という。また，列の長さはその列の要素の個数で定義される。ここでは，各要素が文字である列を考える。例えば，X＝{“A”，“B”，“C”，“B”，“D”，“A”，“B”}のとき，図 1 に示すように{“B”，“C”，“D”，“B”}は X の部分列の例であり，その長さは 4 である。</p>' +
'<div class="fig"><img src="{BASE}ap_07_aki_pm03/fig1.png" style="width:37%" alt=""><div class="cap">図 1　部分列の例</div></div>' +
'<p class="ind sp">ある列 Z が二つの列 X，Y 両方の部分列であるとき，Z を X と Y との共通部分列といい，共通部分列のうち長さが最大となるものを最長共通部分列という。最長共通部分列は複数通り存在する場合もあるが，その長さは一意に決まる。X＝{“A”，“B”，“C”，“B”，“D”，“A”，“B”}，Y＝{“B”，“D”，“C”，“A”，“B”，“A”}の場合の共通部分列及び最長共通部分列の例を図 2 に示す。</p>' +
'<div class="fig"><img src="{BASE}ap_07_aki_pm03/fig2.png" style="width:60%" alt=""><div class="cap">図 2　共通部分列及び最長共通部分列の例</div></div>' +
'<p class="ind sp">なお，共通部分列が存在しない場合，最長共通部分列は空の列となり，その長さ',

'<p>は 0 である。</p>' +
'<p class="ind">最長共通部分列の長さは，2 本の DNA の塩基配列間の類似度を測る目的などに用いられる。</p>' +
'<p class="sec sp">〔最長共通部分列の長さを求めるアルゴリズム〕</p>' +
'<p class="ind">二つの列 X，Y の最長共通部分列の長さを求めるアルゴリズムを考える。列 X，Y それぞれについて，先頭から n 個，k 個の要素を抽出した列を X<sub>n</sub>，Y<sub>k</sub> と表記し，列 X<sub>n</sub>，Y<sub>k</sub> それぞれの末尾の要素を x<sub>n</sub>，y<sub>k</sub> と表記する。例えば，X＝{“A”，“B”，“C”，“B”}とすると，X<sub>3</sub>＝{“A”，“B”，“C”}，x<sub>3</sub>＝“C”である。このとき，列 X<sub>n</sub> と列 Y<sub>k</sub> との最長共通部分列の中の一つを LCS(n，k)，最長共通部分列の長さを LCSL(n，k)と表記する。なお，X<sub>0</sub> と Y<sub>0</sub> は空の列であり，x<sub>0</sub> と y<sub>0</sub> は存在しない。</p>' +
'<p class="ind">ここで，x<sub>n</sub> と y<sub>k</sub> とが一致しているか否かに着目して次の(1)～(3)に場合分けし，再帰的な関係を用いて LCSL(n，k)を求めることを考える。</p>' +
'<div class="r p"><b>(1)</b><div>x<sub>n</sub>＝y<sub>k</sub> の場合を考える。例えば，x<sub>n</sub>＝y<sub>k</sub>＝“A”とする。このとき，LCS(n，k)の末尾の要素は“A”となる。よって，LCS(n，k)は，列 X<sub>n－1</sub>，Y<sub>k－1</sub> の最長共通部分列 LCS(n－1，k－1)の末尾に“A”を付加したものと一致する。したがって，LCSL(n，k)＝LCSL(n－1，k－1) ＋ 1 が成り立つ。</div></div>' +
'<div class="r p"><b>(2)</b><div>x<sub>n</sub>≠y<sub>k</sub> の場合を考える。例えば，x<sub>n</sub>＝“A”，y<sub>k</sub>＝“B”とする。ここで，LCS(n，k)の末尾の要素は“A”又は“A”以外となる。LCS(n，k)の末尾の要素が“A”である場合は，列 Y<sub>k</sub> から末尾の“B”を取り除いても最長共通部分列には影響しないので，LCS(n，k)は LCS(n，k－1)と一致する。一方，LCS(n，k)の末尾の要素が“A”でない場合は，列 X<sub>n</sub> から末尾の“A”を取り除いても最長共通部分列には影響しないので，LCS(n，k)は LCS(n－1，k)と一致する。よって，LCS(n，k)は LCS(n，k－1)又は LCS(n－1，k)のいずれかと一致する。したがって，LCSL(n，k)は，LCSL(n，k－1)と LCSL(n－1，k)のうちの最大値と一致する。</div></div>' +
'<div class="r p"><b>(3)</b><div>n＝0 又は k＝0 の場合，最長共通部分列は空の列となり，LCSL(n，k)＝0 である。</div></div>',

'<p class="sec">〔動的計画法を用いて最長共通部分列の長さを求めるアルゴリズム〕</p>' +
'<p class="ind">(1)～(3)の再帰的な関係に従い，LCSL(n，k)を再帰的に計算することによって，列 X，Y の最長共通部分列の長さを求めることができる。しかし，再帰的に計算するアルゴリズムでは，重複して同じ計算をすることによって時間計算量が大きくなり，非効率になる場合がある。そこで，重複して同じ計算をすることを避けるために，LCSL(n，k)の値を動的計画法によって求めることを考える。</p>' +
'<p class="ind">二つの列が X＝{“A”，“B”，“C”，“B”，“D”，“A”，“B”}，Y＝{“B”，“D”，“C”，“A”，“B”，“A”}の場合，0≦n≦7 かつ 0≦k≦6 に対する LCSL(n，k)の値を図 3 に示す。図 3 の左端 2 列は n（0～7）とそれに対応する x<sub>n</sub> を，上端 2 行は k（0～6）とそれに対応する y<sub>k</sub> を表す。n＝0 のときの x<sub>n</sub>，k＝0 のときの y<sub>k</sub> は存在しないので，“－”と表す。各要素は列 X<sub>n</sub> と列 Y<sub>k</sub> との最長共通部分列の長さ LCSL(n，k)の値を示している。</p>' +
'<div class="fig" style="margin-bottom:0"><img src="{BASE}ap_07_aki_pm03/fig3.png" style="width:100%" alt=""></div>' +
'<p class="note" style="padding-left:4em;text-indent:-4em">注記 1　（）内の①～③については，図 3 に続く本文で値の求め方を説明している。</p>' +
'<p class="note" style="padding-left:4em;text-indent:-4em">注記 2　LCSL(n，k)の値の一部は，設問のため表示していない。</p>' +
'<div class="fig" style="margin-top:.2em"><div class="cap">図 3　LCSL(n，k)の値</div></div>',

'<p class="ind">図 3 の各要素の値は，〔最長共通部分列の長さを求めるアルゴリズム〕の(1)～(3)の再帰的な関係に従って求められる。</p>' +
'<p class="ind">まず，n＝0 又は k＝0 のときは(3)に対応するので，LCSL(n，k)＝0 である。</p>' +
'<p class="ind">それ以外の値について，例えば，図 3 の①～③は次のように値が決まる。</p>' +
'<p class="ind">①について，x<sub>2</sub>＝y<sub>1</sub> なので(1)に対応し，LCSL(2，1)＝LCSL(1，0) ＋ 1 である。LCSL(1，0)＝0 なので，LCSL(2，1)＝1 となる。</p>' +
'<p class="ind">②について，x<sub>2</sub>≠y<sub>2</sub> なので(2)に対応し，LCSL(2，1)＝1，LCSL(1，2)＝0 なので，LCSL(2，2)＝1 となる。</p>' +
'<p class="ind">③について，x<sub>6</sub>≠y<sub>2</sub> なので(2)に対応し，LCSL(6，1)＝1，LCSL(5，2)＝2 なので，LCSL(6，2)＝2 となる。</p>' +
'<p class="ind">図 3 の要素の値を全て計算することによって列 X，Y の最長共通部分列の長さが 4 であると分かる。</p>' +
'<p class="sec sp">〔動的計画法を用いて最長共通部分列の長さを求めるプログラム〕</p>' +
'<p class="ind">〔動的計画法を用いて最長共通部分列の長さを求めるアルゴリズム〕に基づいて，二つの列の最長共通部分列の長さを求めるプログラムを考える。任意の二つの列をそれぞれ配列 S，T として受け取り，動的計画法を用いて最長共通部分列の長さを求めるプログラムを図 4 に示す。ここで，配列の要素番号は 0 から始まり，整数型の二次元配列 lcsl は，行番号が 0 から配列 S の要素数 s までの(s ＋ 1)行，列番号が 0 から配列 T の要素数 t までの(t ＋ 1)列の大きさをもつ。</p>',

'<pre class="code">○整数型: calculate_lcsl(文字型の配列: S, 文字型の配列: T)\n' +
'  整数型: s ← Sの要素数\n  整数型: t ← Tの要素数\n' +
'  整数型の二次元配列: lcsl ← {(s ＋ 1)行, (t ＋ 1)列の未定義の値}\n  整数型: n, k\n' +
'  for (nを0からsまで1ずつ増やす)\n    lcsl[n, 0] ← 0\n  endfor\n' +
'  for (kを0からtまで1ずつ増やす)\n    lcsl[0, k] ← 0\n  endfor\n' +
'  for (nを1からsまで1ずつ増やす)\n    for (kを1からtまで1ずつ増やす)\n' +
'      if (S[n － 1]がT[k － 1]と等しい)\n        lcsl[n, k] ← <span class="bk">ウ</span>\n' +
'      elseif (lcsl[n, k － 1]がlcsl[n － 1, k]より大きい)\n        lcsl[n, k] ← <span class="bk">エ</span>\n' +
'      else\n        lcsl[n, k] ← <span class="bk">オ</span>\n      endif\n    endfor\n  endfor\n' +
'  return <span class="bk">カ</span></pre>' +
'<div class="fig" style="margin-top:.2em"><div class="cap">図 4　動的計画法を用いて最長共通部分列の長さを求めるプログラム</div></div>' +
'<p class="ind sp">図 4 のプログラムの時間計算量を，配列 S の要素数 s，配列 T の要素数 t を用いて表すと <i>O</i>(<span class="bk">キ</span>)である。</p>' +
'<div class="r q sp"><b>設問 1</b><div>列{“A”，“C”，“B”，“C”，“D”，“C”}と列{“C”，“D”，“B”，“D”，“C”，“A”}との最長共通部分列の長さを答えよ。</div></div>' +
'<div class="r q"><b>設問 2</b><div>図 3 中の<span class="bk">ア</span>，<span class="bk">イ</span>に入れる適切な数値を答えよ。</div></div>' +
'<div class="r q"><b>設問 3</b><div>図 4 中の<span class="bk">ウ</span>～<span class="bk">カ</span>に入れる適切な字句を答えよ。</div></div>' +
'<div class="r q"><b>設問 4</b><div>本文中の<span class="bk">キ</span>に入れる適切な字句を，s と t を用いて答えよ。</div></div>'
];
