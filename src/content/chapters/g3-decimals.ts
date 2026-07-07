import type { Chapter } from "@/lib/types";

// 問題は下記の実在教材の設問・解答をもとに作成（AIによる自由生成は行っていない）。
// - 宮城県教育センター「わくわくワーク」小学3年 算数 単元12「小数」
//   https://www.edu-c.pref.miyagi.jp/tangen/math/ele3_math/answer/00.els3.kaitou.all.pdf
// - 埼玉県「学力向上ワークシート」算数 小学3年 12 小数
//   https://www.pref.saitama.lg.jp/documents/56538/3-12syousu-mondai.pdf
//   （県の著作権ページには教育目的の一律利用許可の記載はなく、すたぺんドリルと
//   同様に「個人利用の範囲で使用し、商用化・配布前に見直す」caveatを踏襲する）
export const g3Decimals: Chapter = {
  id: "g3-decimals",
  grade: "小学3年",
  title: "小数",
  explanation: {
    summary: `1を10等分した1こ分の大きさを「0.1」と書きます。0.1が10こ集まると1になります。

小数点（．）の右がわ、一番左の位を「小数第一位」といいます。1.3の小数第一位の数字は3です。

小数のたし算・ひき算は、整数のたし算・ひき算と同じように、位をそろえて（小数点の位置をそろえて）計算します。

小数は整数と同じ数直線の上に並べて考えることができます。「10より0.1小さい数」は9.9、「0.1を15こ集めた数」は1.5です。`,
    keyPoints: [
      "1を10等分した1こ分の大きさが0.1",
      "0.1が10こで1になる",
      "小数点の右がわ、一番左の位が「小数第一位」",
      "小数のたし算・ひき算は、小数点の位置をそろえて計算する",
    ],
    notebookExample: {
      question: "例：3.4 + 2.7 = ？（小数点をそろえて筆算）",
      lines: [
        "  3.4",
        "+ 2.7",
        "-----",
        "  6.1  ← 小数点をそろえて、整数と同じように計算する",
      ],
    },
  },
  practiceProblems: [
    {
      id: "g3-decimal-easy-1",
      difficulty: "easy",
      question: "0.7 + 0.5 = ？",
      answer: "1.2",
      steps: ["0.1が何こ分かで考える：0.7は0.1が7こ、0.5は0.1が5こ", "7 + 5 = 12こ分 → 1.2"],
      tags: ["小数のたし算"],
    },
    {
      id: "g3-decimal-easy-2",
      difficulty: "easy",
      question: "8.8 - 0.9 = ？",
      answer: "7.9",
      steps: ["0.1が何こ分かで考える：8.8は0.1が88こ、0.9は0.1が9こ", "88 - 9 = 79こ分 → 7.9"],
      tags: ["小数のひき算"],
    },
    {
      id: "g3-decimal-normal-1",
      difficulty: "normal",
      question: "2.6 + 3 = ？",
      answer: "5.6",
      steps: ["整数の3を3.0と考えて、小数点をそろえて計算する", "2.6 + 3.0 = 5.6"],
      tags: ["小数のたし算"],
    },
    {
      id: "g3-decimal-normal-2",
      difficulty: "normal",
      question:
        "いちごが3このせてある皿の重さをはかったところ、96.5gありました。この皿だけの重さは83gです。いちご3このおもさは何gですか。",
      answer: "13.5",
      steps: ["「全体の重さ - 皿の重さ = いちごの重さ」と考える", "96.5 - 83 = 13.5", "いちご3こで13.5g"],
      tags: ["小数のひき算", "文章題"],
    },
  ],
  assessmentProblems: [
    {
      id: "g3-decimal-easy-3",
      difficulty: "easy",
      question: "10より0.1小さい数はいくつですか。",
      answer: "9.9",
      steps: ["10から0.1をひく", "10 - 0.1 = 9.9"],
      tags: ["小数のしくみ"],
    },
    {
      id: "g3-decimal-easy-4",
      difficulty: "easy",
      question: "0.1を15こ集めた数はいくつですか。",
      answer: "1.5",
      steps: ["0.1が10こで1、0.1が5こで0.5", "1 + 0.5 = 1.5"],
      tags: ["小数のしくみ"],
    },
    {
      id: "g3-decimal-easy-5",
      difficulty: "easy",
      question: "3.4 + 2.7 = ？",
      answer: "6.1",
      steps: ["小数点をそろえて計算する", "3.4 + 2.7 = 6.1"],
      tags: ["小数のたし算"],
    },
    {
      id: "g3-decimal-easy-6",
      difficulty: "easy",
      question: "8.2 - 7.7 = ？",
      answer: "0.5",
      steps: ["小数点をそろえて計算する", "8.2 - 7.7 = 0.5"],
      tags: ["小数のひき算"],
    },
    {
      id: "g3-decimal-normal-3",
      difficulty: "normal",
      question: "0.1を17こ集めた数はいくつですか。",
      answer: "1.7",
      steps: ["0.1 × 17 = 1.7"],
      tags: ["小数のしくみ"],
    },
    {
      id: "g3-decimal-normal-4",
      difficulty: "normal",
      question: "0.1を7こ、1を16こ集めた数はいくつですか。",
      answer: "16.7",
      steps: ["1を16こ集めた数：16", "0.1を7こ集めた数：0.7", "16 + 0.7 = 16.7"],
      tags: ["小数のしくみ"],
    },
    {
      id: "g3-decimal-normal-5",
      difficulty: "normal",
      question: "24.8の小数第一位の数字は何ですか。",
      answer: "8",
      steps: ["小数点の右がわ、一番左の位が小数第一位", "24.8の小数第一位は8"],
      tags: ["小数のしくみ"],
    },
    {
      id: "g3-decimal-normal-6",
      difficulty: "normal",
      question: "1.8mは何m何cmですか。",
      answer: "1m80cm",
      steps: ["1.8mの整数部分1はそのまま1m", "0.8m = 80cm（1m=100cmなので0.1m=10cm）", "1.8m = 1m80cm"],
      tags: ["小数のしくみ", "単位換算"],
    },
    {
      id: "g3-decimal-hard-1",
      difficulty: "hard",
      question: "7.4cmと5.8cmでは、7.4cmの方が何cm長いですか。",
      answer: "1.6",
      steps: ["差を求める：7.4 - 5.8", "7.4 - 5.8 = 1.6cm"],
      tags: ["小数のひき算", "文章題"],
    },
    {
      id: "g3-decimal-hard-2",
      difficulty: "hard",
      question: "4.7は、6.3よりいくつ小さい数ですか。",
      answer: "1.6",
      steps: ["差を求める：6.3 - 4.7", "6.3 - 4.7 = 1.6"],
      tags: ["小数のひき算"],
    },
    {
      id: "g3-decimal-hard-3",
      difficulty: "hard",
      question: "7.2は、いくつを10分の1にした数ですか。",
      answer: "72",
      steps: ["「10分の1にする」は「10でわる」ということ", "反対に「10をかける」と、もとの数がわかる", "7.2 × 10 = 72"],
      tags: ["小数のしくみ"],
    },
    {
      id: "g3-decimal-hard-4",
      difficulty: "hard",
      question:
        "昨日の最高気温は7度でした。今日の最高気温は、昨日の最高気温より2.5度低いそうです。今日の最高気温は何度でしょうか。",
      answer: "4.5",
      steps: ["「昨日より2.5度低い」なのでひき算 7 - 2.5 を考える", "7 - 2.5 = 4.5", "今日の最高気温は4.5度"],
      tags: ["小数のひき算", "文章題"],
    },
    {
      id: "g3-decimal-hard-5",
      difficulty: "hard",
      question:
        "石油ストーブの石油タンクに石油を入れたところ、1.8L入りました。この石油タンクには4.2Lの石油が入ります。石油を入れる前、タンクには初め何Lの石油が入っていたのでしょうか。",
      answer: "2.4",
      steps: [
        "「タンク全体の量 - 入れた量 = はじめに入っていた量」と考える",
        "4.2 - 1.8 = 2.4",
        "はじめ2.4L入っていた",
      ],
      tags: ["小数のひき算", "文章題"],
    },
    {
      id: "g3-decimal-hard-6",
      difficulty: "hard",
      question:
        "りんご1この重さは100g、みかん1この重さは50gです。同じ重さのりんご3ことみかん10こを合わせると、合計何kgになりますか。",
      answer: "0.8",
      steps: [
        "りんご3こ分の重さ：100 × 3 = 300g",
        "みかん10こ分の重さ：50 × 10 = 500g",
        "合計：300 + 500 = 800g",
        "800g = 0.8kg（1000gで1kg）",
      ],
      tags: ["小数のしくみ", "文章題", "複合問題"],
    },
    {
      id: "g3-decimal-easy-7",
      difficulty: "easy",
      question: "1dLは何Lですか。",
      answer: "0.1",
      steps: ["1dL（デシリットル）は、1Lを10等分した1こ分の大きさ", "1dL = 0.1L"],
      tags: ["小数のしくみ", "単位換算"],
    },
    {
      id: "g3-decimal-easy-8",
      difficulty: "easy",
      question: "2L5dLは何Lですか。",
      answer: "2.5",
      steps: ["5dL = 0.5L", "2L + 0.5L = 2.5L"],
      tags: ["小数のしくみ", "単位換算"],
    },
    {
      id: "g3-decimal-easy-9",
      difficulty: "easy",
      question: "8mmは何cmですか。",
      answer: "0.8",
      steps: ["1mm = 0.1cmなので", "8mm = 0.8cm"],
      tags: ["小数のしくみ", "単位換算"],
    },
    {
      id: "g3-decimal-normal-7",
      difficulty: "normal",
      question: "3.6cmは、0.1cmの何こ分ですか。",
      answer: "36",
      steps: ["3.6は0.1が36こ集まった数", "3.6 ÷ 0.1 = 36"],
      tags: ["小数のしくみ"],
    },
    {
      id: "g3-decimal-normal-8",
      difficulty: "normal",
      question: "3より0.1小さい数はいくつですか。",
      answer: "2.9",
      steps: ["3から0.1をひく", "3 - 0.1 = 2.9"],
      tags: ["小数のしくみ"],
    },
    {
      id: "g3-decimal-normal-9",
      difficulty: "normal",
      question: "0.3 と 0.8 では、どちらが大きいですか。等号・不等号（=, >, <）で答えましょう（0.3 ○ 0.8）。",
      answer: "<",
      steps: ["0.3は0.8より小さい", "0.3 < 0.8"],
      tags: ["小数のしくみ"],
    },
    {
      id: "g3-decimal-normal-10",
      difficulty: "normal",
      question: "6.1 と 5.9 では、どちらが大きいですか。等号・不等号（=, >, <）で答えましょう（6.1 ○ 5.9）。",
      answer: ">",
      steps: ["6.1は5.9より大きい", "6.1 > 5.9"],
      tags: ["小数のしくみ"],
    },
    {
      id: "g3-decimal-normal-11",
      difficulty: "normal",
      question: "1.2 + 0.9 = ？",
      answer: "2.1",
      steps: ["小数点をそろえて計算する", "1.2 + 0.9 = 2.1"],
      tags: ["小数のたし算"],
    },
    {
      id: "g3-decimal-normal-12",
      difficulty: "normal",
      question: "2.5 + 0.5 = ？",
      answer: "3",
      steps: ["小数点をそろえて計算する", "2.5 + 0.5 = 3.0 = 3"],
      tags: ["小数のたし算"],
    },
    {
      id: "g3-decimal-normal-13",
      difficulty: "normal",
      question: "1.6 - 0.7 = ？",
      answer: "0.9",
      steps: ["小数点をそろえて計算する", "1.6 - 0.7 = 0.9"],
      tags: ["小数のひき算"],
    },
  ],
};
