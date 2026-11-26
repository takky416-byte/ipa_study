/*
 * 令和7年度 秋期 応用情報技術者試験 午後（科目B相当）の出題定義。
 * 問題文は IPA 公表の問題冊子（PDF）をページ画像にしたもの（img/）を表示する。
 *
 * 解答欄の種類（CBT 操作説明の5種類に対応）
 *   choice   : 選択ボタン（options のどれか1つ）
 *   multi    : 複数選択（チェックボックス）
 *   pulldown : プルダウン
 *   line     : 1行解答欄（max: 上限文字数, chars: "num" | "alnum" で入力制限）
 *   text     : 複数行解答欄（max: 上限文字数。カット/コピー/ペースト/検索ボタン付き）
 *
 * 解答例は answers.js に分けてあり、試験画面では読み込まない。
 */
(function () {
  var K = function (n) { return "アイウエオカキクケコサシスセソ".slice(0, n).split(""); };
  var img = function (q, n) {
    var a = [];
    for (var i = 1; i <= n; i++) a.push("data/2025a/img/q" + (q < 10 ? "0" : "") + q + "-" + i + ".png");
    return a;
  };
  var ER = ["―（1対1）", "→（1対多）", "←（多対1）", "↔（多対多）"];

  window.CBT_EXAMS = window.CBT_EXAMS || {};
  window.CBT_EXAMS["2025a"] = {
    id: "2025a",
    exam: "応用情報技術者試験",
    subject: "科目B試験",
    source: "令和7年度 秋期 午後",
    timeLimitMin: 150,
    selectCount: 5,
    reference: { label: "参考資料", pages: ["data/2025a/img/ref-1.png", "data/2025a/img/ref-2.png"] },
    problems: [
      {
        no: 1, title: "情報セキュリティ", required: true, pages: img(1, 5),
        items: [
          { label: "設問1", fields: [
            { key: "a", type: "pulldown", options: K(11) },
            { key: "b", type: "pulldown", options: K(11) },
            { key: "d", type: "pulldown", options: K(11) },
            { key: "e", type: "pulldown", options: K(11) }] },
          { label: "設問2", fields: [{ key: "c", type: "line", max: 5 }] },
          { label: "設問3(1)", fields: [{ type: "choice", options: K(4) }] },
          { label: "設問3(2)", fields: [{ type: "text", max: 30 }] },
          { label: "設問3(3)", fields: [{ type: "text", max: 35 }] }
        ]
      },
      {
        no: 2, title: "経営戦略", pages: img(2, 5),
        items: [
          { label: "設問1", fields: [{ key: "a", type: "line", max: 5 }] },
          { label: "設問2(1)", fields: [{ type: "text", max: 45 }] },
          { label: "設問2(2)", fields: [{ key: "b", type: "line", max: 15 }] },
          { label: "設問2(3)", fields: [{ type: "choice", options: K(4) }] },
          { label: "設問2(4)", fields: [{ key: "c", type: "line", max: 10 }] },
          { label: "設問3(1)", fields: [{ type: "text", max: 30 }] },
          { label: "設問3(2)", fields: [{ key: "d", type: "pulldown", options: K(3) }] },
          { label: "設問3(3)", fields: [{ type: "text", max: 20 }] }
        ]
      },
      {
        no: 3, title: "プログラミング", pages: img(3, 5),
        items: [
          { label: "設問1", fields: [{ type: "line", max: 3, chars: "num" }] },
          { label: "設問2", fields: [
            { key: "ア", type: "line", max: 3, chars: "num" },
            { key: "イ", type: "line", max: 3, chars: "num" }] },
          { label: "設問3", fields: [
            { key: "ウ", type: "line", max: 40 },
            { key: "エ", type: "line", max: 40 },
            { key: "オ", type: "line", max: 40 },
            { key: "カ", type: "line", max: 40 }] },
          { label: "設問4", fields: [{ key: "キ", type: "line", max: 20 }] }
        ]
      },
      {
        no: 4, title: "システムアーキテクチャ", pages: img(4, 5),
        items: [
          { label: "設問1", fields: [
            { key: "a", type: "pulldown", options: K(5) },
            { key: "b", type: "pulldown", options: K(5) }] },
          { label: "設問2(1)", fields: [{ key: "c", type: "line", max: 5, chars: "num" }] },
          { label: "設問2(2)", fields: [
            { key: "d", type: "pulldown", options: K(6) },
            { key: "e", type: "pulldown", options: K(6) }] },
          { label: "設問2(3)", fields: [{ type: "choice", options: K(4) }] },
          { label: "設問3", fields: [{ type: "text", max: 20 }] },
          { label: "設問4(1)", fields: [{ type: "line", max: 8, chars: "num", suffix: "mWh" }] },
          { label: "設問4(2)", fields: [{ type: "text", max: 15 }] }
        ]
      },
      {
        no: 5, title: "ネットワーク", pages: img(5, 5),
        items: [
          { label: "設問1(1)", fields: [{ type: "line", max: 20 }] },
          { label: "設問1(2)", fields: [{ type: "text", max: 40 }] },
          { label: "設問1(3)", fields: [
            { key: "a", type: "line", max: 20 },
            { key: "b", type: "line", max: 20 },
            { key: "c", type: "line", max: 20 }] },
          { label: "設問2(1)", fields: [
            { key: "通過前", type: "line", max: 20, chars: "alnum" },
            { key: "通過後", type: "line", max: 20, chars: "alnum" }] },
          { label: "設問2(2)", fields: [{ type: "text", max: 60 }] },
          { label: "設問2(3)", fields: [{ type: "text", max: 60 }] }
        ]
      },
      {
        no: 6, title: "データベース", pages: img(6, 5),
        items: [
          { label: "設問1", fields: [
            { key: "a", type: "line", max: 20 },
            { key: "b", type: "pulldown", options: ER }] },
          { label: "設問2(1)", fields: [
            { key: "c", type: "line", max: 20 },
            { key: "d", type: "line", max: 20 }] },
          { label: "設問2(2)", fields: [{ type: "text", max: 20 }] },
          { label: "設問2(3)", fields: [{ key: "e", type: "line", max: 20 }] },
          { label: "設問3", fields: [{ key: "f", type: "line", max: 20 }] },
          { label: "設問4", fields: [
            { key: "g", type: "line", max: 40 },
            { key: "h", type: "line", max: 20 }] },
          { label: "設問5", fields: [{ key: "i", type: "text", max: 100 }] }
        ]
      },
      {
        no: 7, title: "組込みシステム開発", pages: img(7, 5),
        items: [
          { label: "設問1(1)", fields: [
            { key: "e", type: "line", max: 10 },
            { key: "f", type: "line", max: 10 }] },
          { label: "設問1(2)", fields: [{ type: "text", max: 20 }] },
          { label: "設問2(1)", fields: [
            { key: "最大値", type: "line", max: 6, chars: "num", suffix: "Mバイト" },
            { key: "最小値", type: "line", max: 6, chars: "num", suffix: "Mバイト" }] },
          { label: "設問2(2)", fields: [{ type: "line", max: 6, chars: "num" }] },
          { label: "設問3(1)", fields: [
            { key: "a", type: "line", max: 20 },
            { key: "b", type: "line", max: 20 },
            { key: "c", type: "line", max: 20 },
            { key: "d", type: "line", max: 20 }] },
          { label: "設問3(2)", fields: [{ type: "text", max: 40 }] },
          { label: "設問3(3)", fields: [{ key: "g", type: "line", max: 15 }] }
        ]
      },
      {
        no: 8, title: "情報システム開発", pages: img(8, 6),
        items: [
          { label: "設問1(1)", fields: [
            { key: "a", type: "pulldown", options: K(8) },
            { key: "b", type: "pulldown", options: K(8) },
            { key: "c", type: "pulldown", options: K(8) },
            { key: "d", type: "pulldown", options: K(8) }] },
          { label: "設問1(2)", fields: [{ type: "choice", options: K(4) }] },
          { label: "設問1(3)", fields: [{ type: "line", max: 10 }] },
          { label: "設問2(1)", fields: [{ type: "text", max: 20 }] },
          { label: "設問2(2)", fields: [{ type: "line", max: 10 }] },
          { label: "設問3(1)", fields: [{ type: "line", max: 15 }] },
          { label: "設問3(2)", fields: [{ type: "choice", options: K(4) }] }
        ]
      },
      {
        no: 9, title: "プロジェクトマネジメント", pages: img(9, 5),
        items: [
          { label: "設問1", fields: [{ type: "text", max: 25 }] },
          { label: "設問2(1)", fields: [
            { key: "a", type: "pulldown", options: K(9) },
            { key: "b", type: "pulldown", options: K(9) }] },
          { label: "設問2(2)", fields: [{ type: "text", max: 25 }] },
          { label: "設問2(3)", fields: [{ key: "c", type: "line", max: 10 }] },
          { label: "設問3(1)", fields: [{ key: "d", type: "line", max: 4, chars: "num" }] },
          { label: "設問3(2)", fields: [{ key: "e", type: "line", max: 10 }] }
        ]
      },
      {
        no: 10, title: "サービスマネジメント", pages: img(10, 4),
        items: [
          { label: "設問1", fields: [{ key: "a", type: "line", max: 5, chars: "alnum" }] },
          { label: "設問2(1)", fields: [{ key: "b", type: "line", max: 5 }] },
          { label: "設問2(2)", fields: [{ key: "c", type: "line", max: 6, chars: "num" }] },
          { label: "設問3(1)", fields: [{ key: "d", type: "line", max: 5 }] },
          { label: "設問3(2)", fields: [{ key: "e", type: "line", max: 10 }] },
          { label: "設問4(1)", fields: [{ type: "text", max: 40 }] },
          { label: "設問4(2)", fields: [
            { key: "f", type: "line", max: 12 },
            { key: "g", type: "line", max: 12 }] }
        ]
      },
      {
        no: 11, title: "システム監査", pages: img(11, 4),
        items: [
          { label: "設問1", fields: [{ key: "a", type: "line", max: 10 }] },
          { label: "設問2", fields: [{ key: "b", type: "pulldown", options: K(6) }] },
          { label: "設問3(1)", fields: [{ key: "c", type: "line", max: 5 }] },
          { label: "設問3(2)", fields: [{ key: "d", type: "line", max: 10 }] },
          { label: "設問3(3)", fields: [{ key: "e", type: "line", max: 15 }] },
          { label: "設問4(1)", fields: [{ key: "f", type: "line", max: 5 }] },
          { label: "設問4(2)", fields: [{ key: "g", type: "line", max: 10 }] },
          { label: "設問5", fields: [
            { key: "h", type: "line", max: 5 },
            { key: "i", type: "line", max: 5 }] }
        ]
      }
    ]
  };
})();
