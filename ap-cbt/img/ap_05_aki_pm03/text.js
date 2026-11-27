/* 令和5年度 秋期 応用情報技術者試験 午後 問3（IPA 公表の問題冊子を文字データに起こしたもの） */
window.CBT_TEXT = window.CBT_TEXT || {};
(function () {
  var B = function (k) { return '<span class="bk" style="min-width:4.6em">' + k + '</span>'; };
  var PRE = function (lines, cap, w) {
    return '<div style="width:' + (w || 48.5) + '%"><pre class="code" style="font-size:.8em;letter-spacing:0;margin:0">' + lines.join('\n') + '</pre>' +
      '<div class="cap" style="text-align:left;padding-left:2.5em;text-indent:-2.5em;margin-top:.2em">' + cap + '</div></div>';
  };
  var ROW = function (a, b) { return '<div class="sp" style="display:flex;justify-content:space-between;align-items:flex-start">' + a + b + '</div>'; };
  window.CBT_TEXT["ap_05_aki_pm03"] = [
'<p class="qh"><span>問3</span>2 分探索木に関する次の記述を読んで，設問に答えよ。</p>' +
'<p class="ind sp">2 分探索木とは，木に含まれる全てのノードがキー値をもち，各ノード N が次の二つの条件を満たす 2 分木のことである。ここで，重複したキー値をもつノードは存在しないものとする。</p>' +
'<p class="li">・N の左側の部分木にある全てのノードのキー値は，N のキー値よりも小さい。</p>' +
'<p class="li">・N の右側の部分木にある全てのノードのキー値は，N のキー値よりも大きい。</p>' +
'<p class="ind">2 分探索木の例を図 1 に示す。図中の数字はキー値を表している。</p>' +
'<div class="fig sp"><img src="{BASE}ap_05_aki_pm03/fig1.png" style="width:20%" alt=""><div class="cap">図 1　2 分探索木の例</div></div>' +
'<p class="ind sp">2 分探索木をプログラムで表現するために，ノードを表す構造体 Node を定義する。構造体 Node の構成要素を表 1 に示す。</p>' +
'<div class="tcap sp">表 1　構造体 Node の構成要素</div>' +
'<table class="tbl" style="width:62%;margin:0 auto;white-space:nowrap"><tr><th style="width:8em">構成要素</th><th>説明</th></tr>' +
'<tr><td class="c">key</td><td>キー値</td></tr><tr><td class="c">left</td><td>左側の子ノードへの参照</td></tr><tr><td class="c">right</td><td>右側の子ノードへの参照</td></tr></table>' +
'<p class="ind sp">構造体 Node を新しく生成し，その構造体への参照を変数 p に代入する式を次のように書く。</p>' +
'<p style="margin-left:2em">p ← new Node(k)</p>' +
'<p class="ind">ここで，引数 k は生成するノードのキー値であり，構成要素 key の初期値となる。構成要素 left 及び right は，参照するノードがないこと（以下，空のノードという）を表す NULL で初期化される。また，生成した p の各構成要素へのアクセスには“.”を用いる。例えば，キー値は p.key でアクセスする。</p>',

'<p class="sec">〔2 分探索木におけるノードの探索・挿入〕</p>' +
'<p class="ind">キー値 k をもつノードの探索は次の手順で行う。</p>' +
'<div class="r p"><b>(1)</b><div>探索対象の 2 分探索木の根を参照する変数を t とする。</div></div>' +
'<div class="r p"><b>(2)</b><div>t が空のノードであるかを調べる。</div></div>' +
'<div class="r" style="margin-left:1.4em"><b style="min-width:3.6em">(2-1)</b><div>t が空のノードであれば，探索失敗と判断して探索を終了する。</div></div>' +
'<div class="r" style="margin-left:1.4em"><b style="min-width:3.6em">(2-2)</b><div>t が空のノードでなければ，t のキー値 t.key と k を比較する。</div></div>' +
'<p class="li" style="margin-left:1.4em">・t.key ＝ k の場合，探索成功と判断して探索を終了する。</p>' +
'<p class="li" style="margin-left:1.4em">・t.key ＞ k の場合，t の左側の子ノードを新たな t として(2)から処理を行う。</p>' +
'<p class="li" style="margin-left:1.4em">・t.key ＜ k の場合，t の右側の子ノードを新たな t として(2)から処理を行う。</p>' +
'<p class="ind">キー値 k をもつノード K の挿入は，探索と同様の手順で根から順にたどっていき，空のノードが見つかった位置にノード K を追加することで行う。ただし，キー値 k と同じキー値をもつノードが既に 2 分探索木中に存在するときは何もしない。</p>' +
'<p class="ind">これらの手順によって探索を行う関数 search のプログラムを図 2 に，挿入を行う関数 insert のプログラムを図 3 に示す。関数 search は，探索に成功した場合は見つかったノードへの参照を返し，失敗した場合は NULL を返す。関数 insert は，得られた木の根への参照を返す。</p>' +
ROW(PRE(['// t が参照するノードを根とする木から', '// キー値が k であるノードを探索する', 'function search(t, k)', '  if(t が NULL と等しい)', '    return NULL', '  elseif(t.key が k と等しい)', '    return t', '  elseif(t.key が k より大きい)', '    return search(t.left, k)', '  else // t.key が k より小さい場合', '    return search(t.right, k)', '  endif', 'endfunction'], '図 2　探索を行う関数 search のプログラム'),
    PRE(['// t が参照するノードを根とする木に', '// キー値が k であるノードを挿入する', 'function insert(t, k)', '  if(t が NULL と等しい)', '    t ← new Node(k)', '  elseif(t.key が k より大きい)', '    t.left ← insert(t.left, k)', '  elseif(t.key が k より小さい)', '    t.right ← insert(t.right, k)', '  endif', '  return t', 'endfunction'], '図 3　挿入を行う関数 insert のプログラム')) +
'<p class="ind sp">関数 search を用いてノードの総数が n 個の 2 分探索木を探索するとき，探索に掛かる最悪の場合の時間計算量（以下，最悪時間計算量という）は <i>O</i>(<span class="bk">ア</span>)であ</p>',

'<p style="text-indent:0">る。これは葉を除く全てのノードについて左右のどちらかにだけ子ノードが存在する場合である。一方で，葉を除く全てのノードに左右両方の子ノードが存在し，また，全ての葉の深さが等しい完全な 2 分探索木であれば，最悪時間計算量は <i>O</i>(<span class="bk">イ</span>)となる。したがって，高速に探索するためには，なるべく左右両方の子ノードが存在するように配置して，高さができるだけ低くなるように構成した木であることが望ましい。このような木のことを平衡 2 分探索木という。</p>' +
'<p class="sec sp">〔2 分探索木における回転操作〕</p>' +
'<p class="ind">2 分探索木中のノード X と X の左側の子ノード Y について，X を Y の右側の子に，元の Y の右側の部分木を X の左側の部分木にする変形操作を右回転といい，逆の操作を左回転という。回転操作後も 2 分探索木の条件は維持される。木の回転の様子を図 4 に示す。ここで，t<sub>1</sub>～t<sub>3</sub> は部分木を表している。また，根から t<sub>1</sub>～t<sub>3</sub> の最も深いノードまでの深さを，図 4(a)では d<sub>1</sub>～d<sub>3</sub>，図 4(b)では d<sub>1</sub>’～d<sub>3</sub>’でそれぞれ表している。ここで，d<sub>1</sub>’＝d<sub>1</sub>－1，d<sub>2</sub>’＝d<sub>2</sub>，d<sub>3</sub>’＝d<sub>3</sub>＋1，が成り立つ。</p>' +
'<div class="fig sp"><img src="{BASE}ap_05_aki_pm03/fig2.png" style="width:90%" alt=""><div class="cap">図 4　木の回転の様子</div></div>' +
'<p class="ind sp">右回転を行う関数 rotateR のプログラムを図 5 に，左回転を行う関数 rotateL のプログラムを図 6 に示す。これらの関数は，回転した結果として得られた木の根への参照を返す。</p>',

ROW(PRE(['// t が参照するノードを根とする木に対して', '// 右回転を行う', 'function rotateR(t)', '  a ← t.left', '  b ← a.right', '  a.right ← t', '  t.left ← b', '  return a', 'endfunction'], '図 5　右回転を行う関数 rotateR のプログラム'),
    PRE(['// t が参照するノードを根とする木に対して', '// 左回転を行う', 'function rotateL(t)', '  a ← t.right', '  b ← a.left', '  a.left ← t', '  t.right ← b', '  return a', 'endfunction'], '図 6　左回転を行う関数 rotateL のプログラム')) +
'<p class="sec sp">〔回転操作を利用した平衡 2 分探索木の構成〕</p>' +
'<p class="ind">全てのノードについて左右の部分木の高さの差が 1 以下という条件（以下，条件 Bal という）を考える。条件 Bal を満たす場合，完全ではないときでも比較的左右均等にノードが配置された木になる。</p>' +
'<p class="ind">条件 Bal を満たす 2 分探索木 W に対して図 3 の関数 insert を用いてノードを挿入した 2 分探索木を W’とすると，ノードが挿入される位置によっては左右の部分木の高さの差が 2 になるノードが生じるので，W’は条件 Bal を満たさなくなることがある。その場合，挿入したノードから根まで，親をたどった各ノード T に対して順に次の手順を適用することで，条件 Bal を満たすように W’を変形することができる。</p>' +
'<div class="r p"><b>(1)</b><div>T の左側の部分木の高さが T の右側の部分木の高さより 2 大きい場合<p class="ind">T を根とする部分木に対して右回転を行う。ただし，T の左側の子ノード U について，U の右側の部分木の方が U の左側の部分木よりも高い場合は，先に U を根とする部分木に対して左回転を行う。</p></div></div>' +
'<div class="r p"><b>(2)</b><div>T の右側の部分木の高さが T の左側の部分木の高さより 2 大きい場合<p class="ind">T を根とする部分木に対して左回転を行う。ただし，T の右側の子ノード V について，V の左側の部分木の方が V の右側の部分木よりも高い場合は，先に V を根とする部分木に対して右回転を行う。</p></div></div>' +
'<p class="ind sp">この手順(1)，(2)によって木を変形する関数 balance のプログラムを図 7 に，関数 balance を適用するように関数 insert を修正した関数 insertB のプログラムを図 8 に示す。ここで，関数 height は，引数で与えられたノードを根とする木の高さを返す関数である。関数 balance は，変形の結果として得られた木の根への参照を返す。</p>',

ROW(PRE(['// t が参照するノードを根とする木を', '// 条件 Bal を満たすように変形する', 'function balance(t)', '  h1 ← height(t.left) - height(t.right)', '  if(' + B('ウ') + ')', '    h2 ← ' + B('エ'), '    if(h2 が 0 より大きい)', '      t.left ← rotateL(t.left)', '    endif', '    t ← rotateR(t)', '  elseif(' + B('オ') + ')', '    h3 ← ' + B('カ'), '    if(h3 が 0 より大きい)', '      t.right ← rotateR(t.right)', '    endif', '    t ← rotateL(t)', '  endif', '  return t', 'endfunction'], '図 7　関数 balance のプログラム'),
    PRE(['// t が参照するノードを根とする木に', '// キー値が k であるノードを挿入する', 'function insertB(t, k)', '  if(t が NULL と等しい)', '    t ← new Node(k)', '  elseif(t.key が k より大きい)', '    t.left ← insertB(t.left, k)', '  elseif(t.key が k より小さい)', '    t.right ← insertB(t.right, k)', '  endif', '  t ← balance(t)   // 追加', '  return t', 'endfunction'], '図 8　関数 insertB のプログラム')) +
'<p class="ind sp">条件 Bal を満たすノードの総数が n 個の 2 分探索木に対して関数 insertB を実行した場合，挿入に掛かる最悪時間計算量は <i>O</i>(<span class="bk">キ</span>)となる。</p>' +
'<div class="r q sp"><b>設問 1</b><div>本文中の<span class="bk">ア</span>，<span class="bk">イ</span>に入れる適切な字句を答えよ。</div></div>' +
'<div class="r q"><b>設問 2</b><div>〔回転操作を利用した平衡 2 分探索木の構成〕について答えよ。' +
'<div class="r p"><b>(1)</b><div>図 7 中の<span class="bk">ウ</span>～<span class="bk">カ</span>に入れる適切な字句を答えよ。</div></div>' +
'<div class="r p"><b>(2)</b><div>図 1 の 2 分探索木の根を参照する変数を r としたとき，次の処理を行うことで生成される 2 分探索木を図示せよ。2 分探索木は図 1 に倣って表現すること。<p style="margin-left:1em">insertB(insertB(r, 4), 8)</p></div></div>' +
'<div class="r p"><b>(3)</b><div>本文中の<span class="bk">キ</span>に入れる適切な字句を答えよ。なお，図 7 中の関数 height の処理時間は無視できるものとする。</div></div></div></div>'
  ];
})();
