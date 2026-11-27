/* 令和6年度 春期 応用情報技術者試験 午後 問6（IPA 公表の問題冊子を文字データに起こしたもの） */
window.CBT_TEXT = window.CBT_TEXT || {};
(function () {
  var B = function (k, w) { return '<span class="bk" style="min-width:' + (w || 6.2) + 'em">' + k + '</span>'; };
  var T = '<td style="vertical-align:top;white-space:nowrap">';
  window.CBT_TEXT["ap_06_haru_pm06"] = [
'<p class="qh"><span>問6</span>人事評価システムの設計と実装に関する次の記述を読んで，設問に答えよ。</p>' +
'<p class="ind sp">K 社は，人事評価システムを中小企業に提供する SaaS 事業者である。現在は，契約している会社ごとに仮想サーバを作成して，その中にデータベースを個別に作成している。現在のシステムの OS やフレームワークのサポート期限が迫ってきたのを機に，機能は変更せずにサーバリソース最適化を目的として，システムを再構築することにした。</p>' +
'<p class="sec sp">〔人事評価システムの機能概要〕</p>' +
'<p class="ind">人事評価システムの機能概要を表 1 に示す。</p>' +
'<div class="tcap sp">表 1　人事評価システムの機能概要</div>' +
'<table class="tbl" style="font-size:.92em;letter-spacing:0"><tr><th>機能名</th><th>概要</th></tr>' +
'<tr>' + T + '祝日管理</td><td>国民の祝日に加えて，創立記念日などの会社ごとの記念日を年月日で管理する。</td></tr>' +
'<tr>' + T + '入社</td><td>従業員が入社した際，従業員番号を割り振り，配属先の部署及び入社年月日を登録する。</td></tr>' +
'<tr>' + T + '評価者管理</td><td>部署の管理者を評価者として登録する。1 人の従業員が複数の部署を管理する場合がある。管理者の評価者は，評価時に個別に設定する。</td></tr>' +
'<tr>' + T + '目標設定</td><td>年度の始めに，その年度の目標を設定する。目標は複数設定することができ，重要度や達成までの期間などを考慮して重み付けする。</td></tr>' +
'<tr>' + T + '実績入力</td><td>年度の終わりに，その年度の実績を入力する。実績は，年度の始めに設定した目標に対して，実績内容や目標達成度を自己評価として記入する。</td></tr>' +
'<tr>' + T + '評価</td><td>年度の終わりに，管理者は評価対象の従業員が設定した目標とそれに対する実績を評価して，評価内容や達成度合を記入する。</td></tr>' +
'<tr>' + T + '退職</td><td>従業員の退職が決まると，その退職年月日と在籍期間を登録する。さらに，部署の管理者や人事部が対象の従業員にヒアリングした退職理由を登録する。</td></tr>' +
'<tr>' + T + '退職分析</td><td>人事部の管理者が自社及び自社と同じ業種の退職者について，在籍期間と退職理由を分析する。</td></tr></table>' +
'<p class="sec sp">〔単一データベース・単一スキーマ方式の検討〕</p>' +
'<p class="ind">データベースのリソースを最適化するために，会社ごとに個別に作成していたデータベース及びスキーマを一つにまとめることを考える。検討した E-R 図を図 1 に示す。</p>' +
'<p class="ind">なお，再構築するシステムでは，E-R 図のエンティティ名を表名に，属性名を列名にして，適切なデータ型で表定義した関係データベースによって，データを管理する。</p>',

'<div class="fig"><img src="{BASE}ap_06_haru_pm06/fig1.png" style="width:96%" alt=""><div class="cap">図 1　E-R 図</div></div>' +
'<p class="ind sp">図 1 を関係データベースに実装した際の SQL 文を考える。</p>' +
'<div class="r p"><b>(1)</b><div>指定された会社と年度における，国民の祝日と会社記念日の一覧を日付の昇順に出力する SQL 文を図 2 に示す。ここで“:会社番号”は指定された会社の会社番号を，“:年度開始日”，“:年度終了日”は，それぞれ指定された年度の開始日，終了日を表す埋込み変数である。</div></div>' +
'<pre class="code sp">' + [
'SELECT 祝日 AS 日付, 祝日名 AS 日付名',
'FROM 国民の祝日',
'WHERE 祝日 ' + B('b', 22),
'UNION ALL',
'SELECT 会社記念日 AS 日付, 会社記念日名 AS 日付名',
'FROM 会社記念日',
'WHERE 会社番号 = :会社番号',
'  AND 会社記念日 ' + B('b', 22),
B('c', 8.6) + ' 日付'].join('\n') + '</pre>' +
'<div class="fig" style="margin-top:.2em"><div class="cap">図 2　国民の祝日と会社記念日の一覧を日付の昇順に出力する SQL 文</div></div>',

'<div class="r p"><b>(2)</b><div>指定された管理者が評価する対象の従業員の一覧を部署番号，従業員番号の昇順に出力する SQL 文を図 3 に示す。ここで“:会社番号”と“:管理者番号”は，それぞれ指定された管理者の会社番号と従業員番号を表す埋込み変数である。</div></div>' +
'<pre class="code sp">' + [
'SELECT DEP.部署番号, DEP.部署名, EMP.従業員番号, EMP.従業員氏名',
'FROM 従業員 EMP INNER JOIN 部署 DEP',
'  ON EMP.会社番号 = DEP.会社番号',
'    AND ' + B('d', 22),
'    AND EMP.会社番号 = :会社番号',
'    AND DEP.管理者番号 = :管理者番号',
B('c', 8.6) + ' DEP.部署番号, EMP.従業員番号'].join('\n') + '</pre>' +
'<p class="note" style="margin-left:0">注記　<span class="bk">c</span>には，図 2 中の<span class="bk">c</span>と同じ字句が入る。</p>' +
'<div class="fig" style="margin-top:0"><div class="cap">図 3　従業員の一覧を部署番号，従業員番号の昇順に出力する SQL 文</div></div>' +
'<p class="sec sp">〔単一データベース・単一スキーマ方式のレビュー〕</p>' +
'<p class="ind">検討した単一データベース・単一スキーマ方式のレビューを受けたところ，次の指摘とアドバイスを受けた。</p>' +
'<p class="li">・指摘</p>' +
'<p class="ind" style="margin-left:1em">この検討案は，サーバリソース最適化を実現することができるが，SQL インジェクションの<ruby>脆<rt>ぜい</rt></ruby>弱性が見つかってしまった場合，多くの情報が漏えいしてしまうおそれがある。</p>' +
'<p class="li">・アドバイス</p>' +
'<p class="ind" style="margin-left:1em">データベースは一つのまま，システム全体で共有するデータだけを格納する共有用のスキーマと，<u>①システム利用者の会社ごとのスキーマに分ける方式</u>にするとよい。共有用のスキーマに作成した表は，会社ごとのスキーマに対象の表と同じ名前のビューを作成して照会できるようにすると，現在のシステムの SQL 文への修正を少なくすることができる。</p>' +
'<p class="sec sp">〔単一データベース・個別スキーマ方式の検討〕</p>' +
'<p class="ind">〔単一データベース・単一スキーマ方式のレビュー〕のアドバイスを受け，複数のスキーマを作成して各スキーマに表とビューを配置する。検討したスキーマを整理した結果を表 2 に示す。</p>',

'<div class="tcap">表 2　スキーマを整理した結果</div>' +
'<table class="tbl" style="width:96%;margin:0 auto"><tr><th style="white-space:nowrap">スキーマ種類</th><th style="width:9em">スキーマ名</th><th>配置する表</th><th style="white-space:nowrap">配置するビュー</th></tr>' +
'<tr><td>共有用</td><td>PUB</td><td>会社，国民の祝日</td><td class="c">－</td></tr>' +
'<tr><td style="vertical-align:top">個別会社用</td><td style="vertical-align:top">Cxxx<br>（xxx は任意の英数字）</td><td style="vertical-align:top">会社記念日，従業員，部署，目標，実績，評価，退職</td><td style="vertical-align:top">会社，<br>国民の祝日</td></tr></table>' +
'<p class="ind sp">次に，ビューを作成する SQL 文について考える。</p>' +
'<p class="ind">スキーマ C001 に国民の祝日ビューを作成する SQL 文を図 4 に示す。</p>' +
'<pre class="code sp">' + [
'CREATE VIEW ' + B('e', 8.6) + ' (祝日, 祝日名)',
'AS SELECT 祝日, 祝日名',
'FROM ' + B('f', 8.6)].join('\n') + '</pre>' +
'<div class="fig" style="margin-top:.2em"><div class="cap">図 4　国民の祝日ビューを作成する SQL 文</div></div>' +
'<p class="sec sp">〔単一データベース・個別スキーマ方式のレビュー〕</p>' +
'<p class="ind">検討した単一データベース・個別スキーマ方式のレビューを受けたところ，次の指摘を受けた。</p>' +
'<p class="li">・システム利用者ごとに，利用するスキーマを指定するために，<span class="bk">g</span>表に<span class="bk">h</span>列を追加する必要がある。</p>' +
'<p class="li">・表 2 の表とビューの配置のままでは<u>②利用できない機能</u>があるので，<u>③配置を一部見直す</u>必要がある。</p>' +
'<p class="ind sp">レビューで受けた指摘に全て対応することで，システムを再構築することができた。</p>' +
'<div class="r q sp"><b>設問 1</b><div>〔単一データベース・単一スキーマ方式の検討〕について答えよ。' +
'<div class="r p"><b>(1)</b><div>図 1 中の<span class="bk">a</span>に入れる適切なエンティティ間の関連を答え，E-R 図を完成させよ。<p class="ind">なお，エンティティ間の関連の表記は，図 1 の凡例に倣うこと。</p></div></div>' +
'<div class="r p"><b>(2)</b><div>図 2 中の<span class="bk">b</span>，図 2 及び図 3 中の<span class="bk">c</span>に入れる適切な字句を答えよ。</div></div>' +
'<div class="r p"><b>(3)</b><div>図 3 中の<span class="bk">d</span>に入れる適切な字句を答えよ。</div></div></div></div>',

'<div class="r q"><b>設問 2</b><div>本文中の下線①の方式にする利点は何か。20 字以内で答えよ。</div></div>' +
'<div class="r q"><b>設問 3</b><div>図 4 中の<span class="bk">e</span>，<span class="bk">f</span>に入れる適切な字句を答えよ。</div></div>' +
'<div class="r q"><b>設問 4</b><div>〔単一データベース・個別スキーマ方式のレビュー〕について答えよ。' +
'<div class="r p"><b>(1)</b><div>本文中の<span class="bk">g</span>，<span class="bk">h</span>に入れる適切な字句を答えよ。</div></div>' +
'<div class="r p"><b>(2)</b><div>本文中の下線②の機能を，表 1 の機能名から答えよ。</div></div>' +
'<div class="r p"><b>(3)</b><div>本文中の下線③の見直した内容を，20 字以内で答えよ。</div></div></div></div>'
  ];
})();
