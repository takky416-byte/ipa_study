/* 令和7年度 春期 応用情報技術者試験 午後 問9（IPA 公表の問題冊子を文字データに起こしたもの） */
window.CBT_TEXT = window.CBT_TEXT || {};
window.CBT_TEXT["ap_07_haru_pm09"] = [
'<p class="qh"><span>問9</span>CCPM（Critical Chain Project Management）を用いたプロジェクトのスケジュール管理に関する次の記述を読んで，設問に答えよ。</p>' +
'<p class="ind sp">Z 社は，小売業を営む中堅企業である。社内で 10 年以上利用してきた販売管理システムの老朽化対策として，販売管理の新システムを構築することになった。</p>' +
'<p class="sec sp">〔新システム発注先の選定〕</p>' +
'<p class="ind">現行の販売管理システム（以下，現行システムという）は，Z 社システム部が Z 社内の稼働システム全般の維持管理を委託している J 社によって開発された。現行システムは，利用部門の業務要求を広く受け入れたことで冗長なシステムになり，費用が膨れてしまった。そこで，Z 社システム部は，新システムの構築は現行システムの機能保証にこだわらず，費用を抑える方針とした。</p>' +
'<p class="ind">この方針の下で検討を進めた結果，新システムとして，販売管理系の SaaS の標準機能を導入（以下，SaaS 導入という）し，業務を SaaS の標準機能に極力合わせ，どうしても合わせられない機能に限り Z 社独自の業務要求を追加（以下，SaaS アドオンという）することにした。一方で，本稼働後の新システムの維持管理を J 社に委託する予定で，J 社には新システムの構築時に，SaaS と連携させる必要がある現行システムの周辺にある関連システム（以下，現行関連システムという）を改修してもらうことに同意を得ている。なお，新システムの構築期間中は，現行システムの機能変更を最小限にとどめることにした。</p>' +
'<p class="ind">Z 社システム部の X 課長は，販売管理系の SaaS を提供する複数のベンダーに RFI 及び RFP を段階的に提出し，それぞれの回答内容を基に発注先候補を K 社，L 社，M 社及び N 社に絞った。この 4 社に提案のプレゼンテーションを依頼し，多基準意思決定分析の加重総和法を用いて発注先候補を評価し，選定することにした。発注先候補を多面的に評価するため，評価項目及び主な評価内容を次のとおりとした。</p>' +
'<div class="r" style="margin-left:-.4em"><b style="min-width:6.4em">費用：</b><div>初期費（SaaS 導入費，SaaS アドオン費など），運用費（SaaS ライセンス費，SaaS 環境利用料など）。ここで，現行関連システムの改修費及び運用費は，どの SaaS を採用しても同額とする。</div></div>' +
'<div class="r" style="margin-left:-.4em"><b style="min-width:6.4em">要求充足度：</b><div>Z 社の業務要求の充足度。</div></div>' +
'<div class="r" style="margin-left:-.4em"><b style="min-width:6.4em">保守性：</b><div>SaaS アドオンの維持管理支援ツールの充実度。</div></div>' +
'<div class="r" style="margin-left:-.4em"><b style="min-width:6.4em">会社実績：</b><div>Z 社との取引実績，会社の規模・信頼度，業界での導入実績。</div></div>' +
'<div class="r" style="margin-left:-.4em"><b style="min-width:6.4em">提案内容：</b><div>プレゼンテーション，RFP 記載事項以外の有効な提案の有無。</div></div>',

'<p class="ind">各評価項目を 5 点満点で評価する。評価項目に Z 社が重要視する度合いに応じて重みを設定し，評価点数に重みを乗じて再評価し，再評価値を算出する。選定基準として，再評価値の合計が最も大きいベンダーを選定する。ただし，一つでも評価点数が 2 点以下の評価項目があるベンダーは選定しない。発注先候補の選定評価結果を表 1 に示す。</p>' +
'<div class="tcap sp">表 1　発注先候補の選定評価結果</div>' +
'<table class="tbl" style="width:88%;margin:0 auto"><tr><th rowspan="2" style="width:7em;vertical-align:top">評価項目</th><th rowspan="2" style="width:6em;text-align:left;vertical-align:top">評価項目の重み</th><th colspan="4">評価点数</th></tr>' +
'<tr><th>K 社</th><th>L 社</th><th>M 社</th><th>N 社</th></tr>' +
'<tr><td>費用</td><td style="text-align:right">2.0</td><td style="text-align:right">4</td><td style="text-align:right">3</td><td style="text-align:right">4</td><td style="text-align:right">3</td></tr>' +
'<tr><td>要求充足度</td><td style="text-align:right">1.5</td><td style="text-align:right">4</td><td style="text-align:right">3</td><td style="text-align:right">5</td><td style="text-align:right">3</td></tr>' +
'<tr><td>保守性</td><td style="text-align:right">1.0</td><td style="text-align:right">4</td><td style="text-align:right">3</td><td style="text-align:right">5</td><td style="text-align:right">4</td></tr>' +
'<tr><td>会社実績</td><td style="text-align:right">1.0</td><td style="text-align:right">3</td><td style="text-align:right">4</td><td style="text-align:right">2</td><td style="text-align:right">5</td></tr>' +
'<tr><td>提案内容</td><td style="text-align:right">1.0</td><td style="text-align:right">4</td><td style="text-align:right">4</td><td style="text-align:right">4</td><td style="text-align:right">5</td></tr></table>' +
'<p class="note" style="margin-left:7%">注記　評価点数　1：著しく不足，2：不足，3：普通，4：ほぼ十分，5：十分</p>' +
'<p class="ind sp">再評価の結果，X 課長は，今回の選定基準に従って<span class="bk">a</span>社（以下，SaaS 提供会社という）を選定し，Z 社内で承認された。</p>' +
'<p class="sec sp">〔開発スケジュールの作成〕</p>' +
'<p class="ind">新システムの構築プロジェクトの PM に任命された X 課長は，部下の Y 君に開発スケジュールの作成を指示した。Y 君は，図 1 に示すアローダイアグラムを作成した。</p>' +
'<div class="fig sp"><img src="{BASE}ap_07_haru_pm09/fig1.png" style="width:100%" alt=""><div class="cap">図 1　Y 君が作成したアローダイアグラム</div></div>' +
'<p class="ind sp">ここで，アクティビティ[A]の開始日を 1 日目とする。各アクティビティの日数は 1 日単位で数え，依存関係にある先行アクティビティが終了した翌日に後続アクティ</p>',

'<p style="text-indent:0">ビティを速やかに開始する。図 1 中の[B]に関して，最早開始日は[A]を開始してから 31 日目であり，最遅開始日は<span class="bk">b</span>日目である。</p>' +
'<p class="ind">Z 社の過去のプロジェクトでは，所要日数のうち 10％の日数をアクティビティごとに安全余裕（以下，バッファという）として設定していた。Z 社システム部及び外部委託先の開発担当者（以下，開発担当者という）は，バッファを含んだ所要日数で作業スケジュールを作成し，作業の実施でバッファを不必要に消費する傾向にあった。これが原因で，開発スケジュール全体が遅延したことが度々あった。</p>' +
'<p class="ind">このような状況を改善し，バッファを含む完了予定日までにプロジェクトを完了させるために，X 課長は次のとおり CCPM の考えを取り入れたガントチャート形式の開発スケジュールを作成して，スケジュールを管理するよう Y 君に指示した。</p>' +
'<p class="li">・アローダイアグラムの<u>①アクティビティごとに設けられたバッファを削除</u>してクリティカルチェーンを設定する。</p>' +
'<p class="li">・クリティカルチェーンのアクティビティから削除したバッファを合計して<span class="bk">c</span>バッファを設定する。クリティカルチェーンのアクティビティの進捗が遅延した場合はこのバッファを使い，これ以降のアクティビティのスケジュールを，遅延した日数分だけ後ろにずらす。</p>' +
'<p class="li">・クリティカルチェーンにないアクティビティが遅延してもスケジュール全体に影響しないように，クリティカルチェーンにつながるアクティビティの直後に<span class="bk">d</span>バッファを設定する。</p>' +
'<p class="ind sp">SaaS 提供会社の SaaS アドオンはローコード開発が特長で，数日間のオンライン研修を受講すればローコード開発の技術を習得できるということであった。J 社は，本稼働後の新システムの維持管理を見据え，現行システムの維持管理要員のうち数名に研修を受講させた。そこで良い感触をつかんだ J 社から，“弊社が SaaS アドオンの設計及び開発を担当すれば，御社の外部委託費用を抑えることができる”という提案があった。X 課長は，元々J 社の現行システムの維持管理要員に委託する予定であった[E]，[F]に加え，SaaS 提供会社に委託する予定であった[C]，[D]も J 社に委託することにし，J 社と新たに準委任契約を締結することに決めた。これによって，J 社内で[C]～[F]間の要員シフトの調整が可能になった。</p>' +
'<p class="ind">さらに J 社から，[C]を独立に実施可能な[C1]と[C2]に分割して並行作業し，[D]も</p>',

'<p style="text-indent:0">同様に[D1]と[D2]に分割して並行作業し，加えて当初予定の 2 倍の要員を投入して各アクティビティの所要日数を半分にするという提案があった。J 社は，J1 チーム（[C1]及び[D1]を担当），J2 チーム（[C2]及び[D2]を担当），及び J3 チーム（[E]及び[F]を担当）の 3 チーム体制を作り，各バッファの期間を含めて十分な要員を確保することを約束した。これらを反映した開発スケジュールを図 2 に示す。</p>' +
'<div class="fig sp"><img src="{BASE}ap_07_haru_pm09/fig2.png" style="width:100%" alt=""><div class="cap">図 2　開発スケジュール</div></div>' +
'<p class="ind sp">X 課長は，要件定義に参加する Z 社の利用部門との間で，費用，及びバッファを含む完了予定日を守ることを念頭においた要件定義の進め方を合意し，図 2 のとおり作業を開始した。</p>' +
'<p class="sec sp">〔アクティビティの進捗遅延発生時の対応〕</p>' +
'<p class="ind">X 課長は，週次（作業日ベースで 5 日ごと）で進捗会議を開催した。進捗会議において，次のとおりアクティビティの進捗が遅延していると報告された。これらのアクティビティ以外は，順調に進捗していた。X 課長は，これら 2 件の遅延報告に対してそれぞれ対策を指示した。</p>' +
'<p style="margin-left:-.2em">（ⅰ）40 日目の進捗会議</p>' +
'<div class="r" style="margin-left:1.4em"><b style="min-width:7em">遅延報告：</b><div>前日時点で[C1]の進捗が 3 日ほど遅れている。</div></div>' +
'<div class="r" style="margin-left:1.4em"><b style="min-width:7em">対策：</b><div>4 日の遅延で[C1]が終了する見通しとなったので，その 4 日分は<span class="bk">d</span>バッファを使って作業を続けること。</div></div>',

'<p style="margin-left:-.2em">（ⅱ）70 日目の進捗会議</p>' +
'<div class="r" style="margin-left:1.4em"><b style="min-width:7em">遅延報告：</b><div>SaaS アドオン開発のスキルが必要とされる作業において，予期しない技術上の問題が発生したことによって作業量が増大したので，[D2]の進捗が遅延している。最大で 12 日の遅延となるおそれがあり，<u>②その場合，プロジェクトの完了がバッファを含む完了予定日よりも遅れる</u>ことが懸念される。なお，[D2]の作業手順に問題は見られず，中間成果物の品質は担保されていた。また，並行作業している[D1]は，遅延していないが余裕はない状況である。</div></div>' +
'<div class="r" style="margin-left:1.4em"><b style="min-width:7em">対策：</b><div>これ以上[D2]の遅延を拡大させないように，J2 チームの要員を発生した問題の解決作業に専念させ，それ以外の作業を実施するために<u>③早急にリソース視点の対策をとること</u>。</div></div>' +
'<p class="sp">（ⅱ）の対策によって，[D2]の遅延は最小限に抑えられた。[D2]の終了後の[G]は順調に実施され，バッファを含む完了予定日より前にプロジェクトが完了した。</p>' +
'<div class="r q sp"><b>設問 1</b><div>〔新システム発注先の選定〕について答えよ。' +
'<div class="r p"><b>(1)</b><div>Z 社が新システム構築の発注先の選定評価に加重総和法を用いた狙いを 25 字以内で具体的に答えよ。</div></div>' +
'<div class="r p"><b>(2)</b><div>本文中の<span class="bk">a</span>に入れる適切な社名を英字 1 字で答えよ。</div></div></div></div>' +
'<div class="r q"><b>設問 2</b><div>〔開発スケジュールの作成〕について答えよ。' +
'<div class="r p"><b>(1)</b><div>本文中の<span class="bk">b</span>に入れる適切な数字を答えよ。</div></div>' +
'<div class="r p"><b>(2)</b><div>本文中の下線①について，X 課長はこの対策によって個々の開発担当者の作業にどのような効果が期待できると考えたのか。20 字以内で答えよ。</div></div>' +
'<div class="r p"><b>(3)</b><div>本文中及び図 2 中の<span class="bk">c</span>，<span class="bk">d</span>に入れる適切な字句を解答群の中から選び，記号で答えよ。' +
'<div class="ag">解答群</div><div class="opts c4"><span>ア　キャパシティ</span><span>イ　合流</span><span>ウ　資源</span><span>エ　プロジェクト</span></div></div></div></div></div>' +
'<div class="r q"><b>設問 3</b><div>〔アクティビティの進捗遅延発生時の対応〕について答えよ。' +
'<div class="r p"><b>(1)</b><div>本文中の下線②について，対策をせずに最大日数の遅延になった場合，プロジェクトの完了はバッファを含む完了予定日に対して何日遅れるか。数字で答えよ。</div></div>' +
'<div class="r p"><b>(2)</b><div>本文中の下線③について，対策の内容を 25 字以内で具体的に答えよ。</div></div></div></div>'
];
