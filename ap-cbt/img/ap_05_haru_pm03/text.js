/* 令和5年度 春期 応用情報技術者試験 午後 問3（IPA 公表の問題冊子を文字データに起こしたもの） */
window.CBT_TEXT = window.CBT_TEXT || {};
(function () {
  var B = function (k, w) { return '<span class="bk" style="min-width:' + (w || 4.6) + 'em">' + k + '</span>'; };
  var W = function (s) { s = s.replace(/<[^>]+>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&'); var n = 0; for (var i = 0; i < s.length; i++) n += s.charCodeAt(i) > 0xff ? 2 : 1; return n; };
  // 左のコード部分の表示幅を数えて，col 桁目からコメントを置く（空欄枠は幅 bw 桁として数える）
  var P = function (t, col, cmt, bw) {
    if (!cmt) return t;
    var w = W(t.replace(/<span class="bk"[^>]*>[^<]*<\/span>/g, function () { return new Array((bw || 10) + 1).join('x'); }));
    return t + new Array(Math.max(1, col - w) + 1).join(' ') + cmt;
  };
  var X = '<td class="c">', V = '<td style="vertical-align:top">', N = '<td style="vertical-align:top;white-space:nowrap">';
  var PRE = '<pre class="code sp" style="font-size:.74em;letter-spacing:0;line-height:1.85">';
  window.CBT_TEXT["ap_05_haru_pm03"] = [
'<p class="qh"><span>問3</span>多倍長整数の演算に関する次の記述を読んで，設問に答えよ。</p>' +
'<p class="ind sp">コンピュータが一度に処理できる整数の最大桁には，CPU が一度に扱える情報量に依存した限界がある。一度に扱える桁数を超える演算を行う一つの方法として，10 を基数とした多倍長整数（以下，多倍長整数という）を用いる方法がある。</p>' +
'<p class="sec sp">〔多倍長整数の加減算〕</p>' +
'<p class="ind">多倍長整数の演算では，整数の桁ごとの値を，1 の位から順に 1 次元配列に格納して管理する。例えば整数 123 は，要素数が 3 の配列に{3, 2, 1}を格納して表現する。</p>' +
'<p class="ind">多倍長整数の加算は，“桁ごとの加算”の後，“繰り上がり”を処理することで行う。456＋789 を計算した例を図 1 に示す。</p>' +
'<div class="fig sp"><img src="{BASE}ap_05_haru_pm03/fig1.png" style="width:86%" alt=""><div class="cap">図 1　456＋789 を計算した例</div></div>' +
'<p class="ind sp">“桁ごとの加算”を行うと，配列の内容は{15, 13, 11}となる。1 の位は 15 になるが，15 は 10×1＋5 なので，10 の位である 13 に 1 を繰り上げて{5, 14, 11}とする。これを最上位まで繰り返す。最上位で繰り上がりが発生する場合は，配列の要素数を増やして対応する。減算も同様に“桁ごとの減算”と“繰り下がり”との処理で計算できる。</p>' +
'<p class="sec sp">〔多倍長整数の乗算〕</p>' +
'<p class="ind">多倍長整数の乗算については，計算量を削減するアルゴリズムが考案されており，その中の一つにカラツバ法がある。ここでは，桁数が 2 のべき乗で，同じ桁数をもった正の整数同士の乗算について，カラツバ法を適用した計算を行うことを考える。桁数が 2 のべき乗でない整数や，桁数が異なる整数同士の乗算を扱う場合は，上位の桁を 0 で埋めて処理する。例えば，123×4 は 0123×0004 として扱う。</p>',

'<p class="sec">〔ツリー構造の構築〕</p>' +
'<p class="ind">カラツバ法を適用した乗算のアルゴリズムは，計算のためのツリー構造（以下，ツリーという）を作る処理と，ツリーを用いて演算をする処理から成る。ツリーは，多倍長整数の乗算の式を一つのノードとし，一つのノードは 3 個の子ノードをもつ。</p>' +
'<p class="ind">M 桁×M 桁の乗算の式について，乗算記号の左右にある値を，それぞれ M/2 桁ずつに分けて A，B，C，D の四つの多倍長整数を作る。これらの整数を使って，①A×C，②B×D，③(A＋B)×(C＋D)の 3 個の子ノードを作り，M/2 桁×M/2 桁の乗算を行う層を作る。(A＋B)，(C＋D)は多倍長整数の加算の結果であるが，ここでは“桁ごとの加算”だけを行い，“繰り上がり”の処理はツリーを用いて行う演算の最後でまとめて行う。生成した子ノードについても同じ手順を繰り返し，1 桁×1 桁の乗算を行う最下層のノードまで展開する。</p>' +
'<p class="ind">1234×5678 についてのツリーを図 2 に示す。図 2 の層 2 の場合，①は 12×56，②は 34×78，③は 46×134 となる。③の(C＋D)は，“桁ごとの加算”だけの処理を行うと，10 の位が 5＋7＝12，1 の位が 6＋8＝14 となるので，12×10＋14＝134 となる。</p>' +
'<div class="fig sp"><img src="{BASE}ap_05_haru_pm03/fig2.png" style="width:90%" alt=""></div>' +
'<p class="note" style="margin-left:5%">注記　この例では層 3 が最下層となる。</p>' +
'<div class="fig" style="margin-top:0"><div class="cap">図 2　1234×5678 についてのツリー</div></div>' +
'<p class="sec sp">〔ツリーを用いた演算〕</p>' +
'<p class="ind">ツリーの最下層のノードは，整数の乗算だけで計算できる。最下層以外の層は，子ノードの計算結果を使って，次の式で計算できることが分かっている。ここで，<i>α</i>，<i>β</i>，<i>γ</i> は，それぞれ子ノード①，②，③の乗算の計算結果を，K は対象のノードの桁数を表す。</p>' +
'<p style="text-align:center"><i>α</i>×10<sup>K</sup> ＋ (<i>γ</i>－<i>α</i>－<i>β</i>)×10<sup>K/2</sup> ＋ <i>β</i>　……(1)</p>' +
'<p class="ind">図 2 のルートノードの場合，K＝4，<i>α</i>＝672，<i>β</i>＝2652，<i>γ</i>＝6164 なので，計算結果は次のとおりとなる。</p>' +
'<p style="text-align:center">672×10000＋(6164－672－2652)×100＋2652＝7006652</p>',

'<p class="sec">〔多倍長整数の乗算のプログラム〕</p>' +
'<p class="ind">桁数が 2 のべき乗の多倍長整数 val1，val2 の乗算を行うプログラムを作成した。</p>' +
'<p class="ind">プログラム中で利用する多倍長整数と，ツリーのノードは構造体で取り扱う。構造体の型と要素を表 1 に示す。構造体の各要素には，構造体の変数名.要素名でアクセスできる。また，配列の添字は 1 から始まる。</p>' +
'<div class="tcap sp">表 1　構造体の型と要素</div>' +
'<table class="tbl" style="font-size:.9em;letter-spacing:0"><tr><th style="white-space:nowrap">構造体の型</th><th style="width:6.6em">要素名</th><th style="width:6.6em">要素の型</th><th>内容</th></tr>' +
'<tr><td rowspan="2" style="vertical-align:top">多倍長整数</td>' + V + 'N</td>' + V + '整数</td>' + V + '多倍長整数の桁数</td></tr>' +
'<tr>' + V + 'values</td>' + V + '整数の配列</td>' + V + '桁ごとの値を管理する 1 次元配列。1 の位の値から順に値を格納する。配列の要素は，必要な桁を全て格納するのに十分な数が確保されているものとする。</td></tr>' +
'<tr><td rowspan="4" style="vertical-align:top">ノード</td>' + V + 'N</td>' + V + '整数</td>' + V + 'ノードが取り扱う多倍長整数の桁数。図 2 の 1234×5678 のノードの場合は 4 である。</td></tr>' +
'<tr>' + V + 'val1</td>' + V + '多倍長整数</td>' + V + '乗算記号の左側の値</td></tr>' +
'<tr>' + V + 'val2</td>' + V + '多倍長整数</td>' + V + '乗算記号の右側の値</td></tr>' +
'<tr>' + V + 'result</td>' + V + '多倍長整数</td>' + V + '乗算の計算結果</td></tr></table>' +
'<p class="ind sp">多倍長整数の操作を行う関数を表 2 に，プログラムで使用する主な変数，配列及び関数を表 3 に，与えられた二つの多倍長整数からツリーを構築するプログラムを図 3 に，そのツリーを用いて演算を行うプログラムを図 4 に，それぞれ示す。表 2，表 3 中の p，q，v1，v2 の型は多倍長整数である。また，図 3，図 4 中の変数は全て大域変数である。</p>' +
'<div class="tcap sp">表 2　多倍長整数の操作を行う関数</div>' +
'<table class="tbl" style="font-size:.9em;letter-spacing:0;width:92%;margin:0 auto"><tr><th style="width:8.4em">名称</th><th style="width:7em">型</th><th>内容</th></tr>' +
'<tr>' + N + 'add(p, q)</td>' + X + '多倍長整数</td>' + V + 'p と q について，“桁ごとの加算”を行う。</td></tr>' +
'<tr>' + N + 'carry(p)</td>' + X + '多倍長整数</td>' + V + 'p について“繰り上がり”・“繰り下がり”の処理を行う。</td></tr>' +
'<tr>' + N + 'left(p, k)</td>' + X + '多倍長整数</td>' + V + 'p について，values の添字が大きい方の k 個の要素を返す。<br>p の values が{4, 3, 2, 1}，k が 2 であれば，values が{2, 1}の多倍長整数を返す。</td></tr>' +
'<tr>' + N + 'right(p, k)</td>' + X + '多倍長整数</td>' + V + 'p について，values の添字が小さい方の k 個の要素を返す。<br>p の values が{4, 3, 2, 1}，k が 2 であれば，values が{4, 3}の多倍長整数を返す。</td></tr>' +
'<tr>' + N + 'lradd(p, k)</td>' + X + '多倍長整数</td>' + V + 'add(left(p, k), right(p, k))の結果を返す。</td></tr>' +
'<tr>' + N + 'shift(p, k)</td>' + X + '多倍長整数</td>' + V + 'p を 10<sup>k</sup> 倍する。</td></tr>' +
'<tr>' + N + 'sub(p, q)</td>' + X + '多倍長整数</td>' + V + 'p と q について，“桁ごとの減算”を行い p－q を返す。</td></tr></table>',

'<div class="tcap">表 3　使用する主な変数，配列及び関数</div>' +
'<table class="tbl" style="font-size:.88em;letter-spacing:0"><tr><th style="width:9.6em">名称</th><th style="width:3.4em">種類</th><th style="width:6.4em">型</th><th>内容</th></tr>' +
'<tr>' + N + 'elements[]</td>' + V + '配列</td>' + V + 'ノード</td>' + V + 'ツリーのノードを管理する配列。ルートノードを先頭に，各層の左側のノードから順に要素を格納する。図 2 の場合は，{1234×5678, 12×56, 34×78, 46×134, 1×5, 2×6, …}の順で格納する。</td></tr>' +
'<tr>' + N + 'layer_top[]</td>' + V + '配列</td>' + V + '整数</td>' + V + 'ルートノードから順に，各層の左端のノードの，elements 配列上での添字の値を格納する。図 2 の場合は 1234×5678，12×56，1×5 の添字に対応する{1, 2, 5}が入る。</td></tr>' +
'<tr>' + N + 'mod(m, k)</td>' + V + '関数</td>' + V + '整数</td>' + V + 'm を k で割った剰余を整数で返す。</td></tr>' +
'<tr>' + N + 'new_elem(k,v1,v2)</td>' + V + '関数</td>' + V + 'ノード</td>' + V + '取り扱う多倍長整数の桁数が k で，v1×v2 の乗算を表すノード構造体を新規に一つ作成して返す。</td></tr>' +
'<tr>' + N + 'pow(m, k)</td>' + V + '関数</td>' + V + '整数</td>' + V + 'm の k 乗を整数で返す。k が 0 の場合は 1 を返す。</td></tr>' +
'<tr>' + N + 't_depth</td>' + V + '変数</td>' + V + '整数</td>' + V + 'ツリーの層の数。図 2 の場合は 3 である。</td></tr>' +
'<tr>' + N + 'val1, val2</td>' + V + '変数</td>' + V + '多倍長整数</td>' + V + '乗算する対象の二つの値。図 2 の場合，ルートノードの二つの値で，val1 は 1234，val2 は 5678 である。</td></tr>' +
'<tr>' + N + 'answer</td>' + V + '変数</td>' + V + '多倍長整数</td>' + V + '乗算の計算結果を格納する変数</td></tr></table>' +
PRE + [
'// ツリーの各層の，elements配列上での先頭インデックスを算出する',
P('layer_top[1] ← 1', 58, '// ルートノードは先頭なので1を入れる'),
'for (iを1からt_depth － 1まで1ずつ増やす)',
'  layer_top[i ＋ 1] ← layer_top[i] ＋ ' + B('ウ', 6),
'endfor',
'',
'// ツリーを構築する',
P('elements[1] ← new_elem(val1.N, val1, val2)', 50, '// ルートノードを用意。桁数はval1の桁数を使う'),
P('for (dpを1からt_depth － 1まで1ずつ増やす)', 50, '// ルートノードの層から，最下層以外の層を順に処理'),
P('  for (iを1からpow(3, dp － 1)まで1ずつ増やす)', 50, '// 親ノードになる層の要素数だけ繰り返す'),
P('    pe ← elements[layer_top[dp] ＋ (i － 1)]', 50, '// 親ノードの要素を取得'),
P('    cn ← pe.N / 2', 50, '// 子ノードの桁数を算出'),
P('    tidx ← layer_top[dp ＋ 1] ＋ ' + B('エ', 6), 50, '// 子ノード①へのインデックス', 12),
'    elements[tidx    ] ← new_elem(cn, left(' + B('オ', 3.6) + ', cn), left(' + B('カ', 3.6) + ', cn))',
'    elements[tidx ＋ 1] ← new_elem(cn, right(' + B('オ', 3.6) + ', cn), right(' + B('カ', 3.6) + ', cn))',
'    elements[tidx ＋ 2] ← new_elem(cn, lradd(' + B('オ', 3.6) + ', cn), lradd(' + B('カ', 3.6) + ', cn))',
'  endfor',
'endfor'].join('\n') + '</pre>' +
'<div class="fig" style="margin-top:.2em"><div class="cap">図 3　与えられた二つの多倍長整数からツリーを構築するプログラム</div></div>',

PRE.replace(' sp"', '"') + [
'// 最下層の計算',
P('for (iを1からpow(3, t_depth － 1)まで1ずつ増やす)', 54, '// 最下層の要素数は3のt_depth－1乗個'),
P('  el ← elements[layer_top[t_depth] ＋ (i － 1)]', 54, '// 最下層のノード'),
P('  mul ← el.val1.values[1] ＊ el.val2.values[1]', 54, '// 最下層の乗算'),
P('  el.result.N ← 2', 54, '// 計算結果は2桁の多倍長整数'),
P('  el.result.values[1] ← ' + B('キ', 6), 54, '// 1の位', 12),
P('  el.result.values[2] ← mul / 10', 54, '// 10の位'),
'endfor',
'',
'// 最下層以外の計算',
P('for (dpをt_depth － 1から1まで1ずつ減らす)', 54, '// 最下層より一つ上の層から順に処理'),
P('  for (iを1からpow(3, dp － 1)まで1ずつ増やす)', 54, '// 各層の要素数だけ繰り返す'),
P('    el ← elements[layer_top[dp] ＋ (i － 1)]', 54, '// 計算対象のノード'),
P('    cidx ← layer_top[dp ＋ 1] ＋ ' + B('エ', 6), 54, '// 子ノード①へのインデックス', 12),
'    s1 ← sub(' + B('ク', 7) + '.result, ' + B('ケ', 7) + '.result )',
P('    s2 ← sub(s1, elements[cidx ＋ 1].result)', 54, '// γ－α－βを計算'),
P('    p1 ← shift(elements[cidx].result, el.N)', 54, '// α×10<sup>K</sup>を計算'),
P('    p2 ← shift(s2, el.N / 2)', 54, '// (γ－α－β)×10<sup>K/2</sup>を計算'),
P('    p3 ← elements[cidx ＋ 1].result', 54, '// βを計算'),
'    el.result ← add(add(p1, p2), p3)',
'  endfor',
'endfor',
'',
'// 繰り上がり処理',
P('answer ← carry(elements[1].result)', 56, '// 計算結果をanswerに格納')].join('\n') + '</pre>' +
'<p class="note" style="margin-left:0">注記　図 4 中の<span class="bk">エ</span>には，図 3 中の<span class="bk">エ</span>と同じ字句が入る。</p>' +
'<div class="fig" style="margin-top:0"><div class="cap">図 4　ツリーを用いて演算を行うプログラム</div></div>' +
'<div class="r q sp"><b>設問 1</b><div>図 2 中の<span class="bk">ア</span>，<span class="bk">イ</span>に入れる適切な字句を答えよ。</div></div>' +
'<div class="r q"><b>設問 2</b><div>図 2 中の層 2 にある 46×134 のノードについて，本文中の式(1)の数式は具体的にどのような計算式になるか。次の式の①～④に入れる適切な整数を答えよ。' +
'<p style="text-align:center">( ① )×100 ＋ (( ② )－( ③ )－84)×10 ＋ ( ④ )</p></div></div>' +
'<div class="r q"><b>設問 3</b><div>図 3 中の<span class="bk">ウ</span>～<span class="bk">カ</span>に入れる適切な字句を答えよ。</div></div>' +
'<div class="r q"><b>設問 4</b><div>図 4 中の<span class="bk">キ</span>～<span class="bk">ケ</span>に入れる適切な字句を答えよ。</div></div>' +
'<div class="r q"><b>設問 5</b><div>N 桁同士の乗算をする場合，多倍長整数の構造体において，配列 values に必要な最大の要素数は幾つか。N を用いて答えよ。</div></div>'
  ];
})();
