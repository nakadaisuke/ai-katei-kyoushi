import type { Chapter } from "@/lib/types";

// 問題は下記の実在教材の設問・解答をもとに作成（AIによる自由生成は行っていない）。
// - 宮城県教育センター「わくわくワーク」小学4年 算数 単元10「分数」
//   https://www.edu-c.pref.miyagi.jp/tangen/math/ele4_math/answer/31.els4.kaitou.10.1hop.pdf
//   https://www.edu-c.pref.miyagi.jp/tangen/math/ele4_math/answer/32.els4.kaitou.10.2stp.pdf
//   https://www.edu-c.pref.miyagi.jp/tangen/math/ele4_math/answer/33.els4.kaitou.10.3jmp.pdf
export const g4Fractions: Chapter = {
  id: "g4-fractions",
  grade: "小学4年",
  title: "分数",
  explanation: {
    summary: `分子が分母より小さい分数を「真分数」といいます。分子が分母と同じか、分母より大きい分数を「仮分数」といいます。整数と真分数の和で表された分数（例：1と2/3）を「帯分数」といいます。

帯分数を仮分数になおすには、整数の部分を分母の分だけの分数になおして、真分数の部分とたします。例えば1と2/3は、1を3/3になおして、3/3+2/3=5/3となります。

分母が同じ分数どうしのたし算・ひき算は、分母をそのままにして、分子どうしをたしたりひいたりします。答えが仮分数になったときは、帯分数になおすこともできます。

分数の大きさは、見た目の分子・分母の数字がちがっても等しくなることがあります。等しい大きさかどうかは、小数になおしたり、実際の量で比べたりして確かめられます。`,
    keyPoints: [
      "真分数：分子が分母より小さい分数（例：1/2、3/5）",
      "仮分数：分子が分母と同じか、分母より大きい分数（例：7/7、6/5）",
      "帯分数：整数と真分数の和で表された分数（例：1と2/3）",
      "帯分数を仮分数になおすには、整数部分を分母と同じ分子の分数になおしてたす",
      "分母が同じ分数のたし算・ひき算は、分子どうしをたす・ひく（分母はそのまま）",
    ],
    diagram: { kind: "fraction-bar", numerator: 5, denominator: 3 },
    notebookExample: {
      question: "例：1と2/3を仮分数になおす",
      lines: [
        "1を3/3になおす（分母が3なので）",
        "3/3 + 2/3 = 5/3",
      ],
    },
  },
  practiceProblems: [
    {
      id: "g4-fraction-easy-1",
      difficulty: "easy",
      question: "分子が分母より小さい分数を何といいますか。",
      answer: "真分数",
      steps: ["分子が分母より小さい分数を「真分数」という"],
      tags: ["分数の種類"],
    },
    {
      id: "g4-fraction-easy-2",
      difficulty: "easy",
      question: "分子が分母と同じか、分母より大きい分数を何といいますか。",
      answer: "仮分数",
      steps: ["分子が分母と同じか、分母より大きい分数を「仮分数」という"],
      tags: ["分数の種類"],
    },
    {
      id: "g4-fraction-normal-1",
      difficulty: "normal",
      question: "整数と真分数の和で表された分数（例：1と2/3）を何といいますか。",
      answer: "帯分数",
      steps: ["整数と真分数の和で表された分数を「帯分数」という"],
      tags: ["分数の種類"],
    },
    {
      id: "g4-fraction-normal-2",
      difficulty: "normal",
      question: "1/3 + 1/3 = ？",
      answer: "2/3",
      steps: ["分母が同じなので分子どうしをたす", "1 + 1 = 2", "2/3"],
      tags: ["分数のたし算"],
    },
  ],
  assessmentProblems: [
    {
      id: "g4-fraction-easy-3",
      difficulty: "easy",
      question: "7/7という分数は、真分数・仮分数・帯分数のどれですか。",
      answer: "仮分数",
      steps: ["分子が分母と同じ（7と7）なので仮分数"],
      tags: ["分数の種類"],
    },
    {
      id: "g4-fraction-normal-3",
      difficulty: "normal",
      question: "1mのテープを3等分すると、1つ分は1/3mです。色をぬっていない部分（2つ分）の長さは何mですか。",
      answer: "2/3m",
      steps: ["1つ分は1/3m", "2つ分なので1/3 + 1/3 = 2/3", "2/3m"],
      tags: ["分数の意味", "文章題"],
    },
    {
      id: "g4-fraction-easy-4",
      difficulty: "easy",
      question: "2/5 + 3/5 = ？",
      answer: "1",
      steps: ["分母が同じなので分子どうしをたす", "2 + 3 = 5", "5/5 = 1"],
      tags: ["分数のたし算"],
    },
    {
      id: "g4-fraction-normal-4",
      difficulty: "normal",
      question: "3/7 + 2/7 = ？",
      answer: "5/7",
      steps: ["分母が同じなので分子どうしをたす", "3 + 2 = 5", "5/7"],
      tags: ["分数のたし算"],
    },
    {
      id: "g4-fraction-normal-5",
      difficulty: "normal",
      question: "1と4/9 + 1/9 = ？",
      answer: "1と5/9",
      steps: ["帯分数の真分数部分どうしをたす", "4/9 + 1/9 = 5/9", "1と5/9"],
      tags: ["分数のたし算"],
    },
    {
      id: "g4-fraction-easy-5",
      difficulty: "easy",
      question: "3/4 - 2/4 = ？",
      answer: "1/4",
      steps: ["分母が同じなので分子どうしをひく", "3 - 2 = 1", "1/4"],
      tags: ["分数のひき算"],
    },
    {
      id: "g4-fraction-normal-6",
      difficulty: "normal",
      question: "6/7 - 2/7 = ？",
      answer: "4/7",
      steps: ["分母が同じなので分子どうしをひく", "6 - 2 = 4", "4/7"],
      tags: ["分数のひき算"],
    },
    {
      id: "g4-fraction-normal-7",
      difficulty: "normal",
      question: "6/5 - 4/5 = ？",
      answer: "2/5",
      steps: ["分母が同じなので分子どうしをひく", "6 - 4 = 2", "2/5"],
      tags: ["分数のひき算"],
    },
    {
      id: "g4-fraction-hard-1",
      difficulty: "hard",
      question: "3と7/10 - 1と4/10 = ？",
      answer: "2と3/10",
      steps: ["整数部分どうし、真分数部分どうしをそれぞれ計算する", "整数：3 - 1 = 2", "真分数：7/10 - 4/10 = 3/10", "2と3/10"],
      tags: ["分数のひき算"],
    },
    {
      id: "g4-fraction-normal-8",
      difficulty: "normal",
      question: "2つのコップに1/7Lと3/7Lのジュースが入っています。ジュースはあわせて何Lありますか。",
      answer: "4/7L",
      steps: ["分母が同じなので分子どうしをたす", "1/7 + 3/7 = 4/7", "4/7L"],
      tags: ["分数のたし算", "文章題"],
    },
    {
      id: "g4-fraction-hard-2",
      difficulty: "hard",
      question: "3/9、2/14、6/14、3/7、5/7の中で、大きさの等しいものはどれとどれですか。",
      answer: "6/14 と 3/7",
      steps: ["それぞれの分数を約分するなどして比べる", "6/14を約分すると3/7になる", "6/14と3/7は同じ大きさ"],
      tags: ["等しい分数"],
    },
    {
      id: "g4-fraction-normal-9",
      difficulty: "normal",
      question: "数直線で0と1の間を10等分すると、1めもりは1/10（0.1）を表します。1と3/10は小数でいくつですか。",
      answer: "1.3",
      steps: ["1めもりは0.1（1/10）", "1と3/10は1めもり13こ分", "1.3"],
      tags: ["分数と小数"],
    },
    {
      id: "g4-fraction-hard-3",
      difficulty: "hard",
      question: "1と3/10は、1/10が何こ分の大きさですか。",
      answer: "13こ分",
      steps: ["1と3/10を仮分数になおす：1 = 10/10なので、10/10 + 3/10 = 13/10", "1/10が13こ分"],
      tags: ["分数のしくみ"],
    },
    {
      id: "g4-fraction-normal-10",
      difficulty: "normal",
      question: "オレンジジュース1L入りのペットボトルが2本あります。これを4人で同じように分けると、1人分は何dLになりますか。",
      answer: "5dL",
      steps: ["2L = 20dL", "20 ÷ 4 = 5", "5dL"],
      tags: ["文章題", "単位換算"],
    },
    {
      id: "g4-fraction-normal-11",
      difficulty: "normal",
      question: "1と2/3を仮分数になおすといくつですか。",
      answer: "5/3",
      steps: ["整数の1を3/3になおす", "3/3 + 2/3 = 5/3"],
      tags: ["帯分数と仮分数"],
    },
    {
      id: "g4-fraction-normal-12",
      difficulty: "normal",
      question: "1と2/3に何をあわせると2になりますか。",
      answer: "1/3",
      steps: ["2 - 1と2/3 = 1/3", "1と2/3に1/3をあわせると2になる"],
      tags: ["帯分数と仮分数"],
    },
    {
      id: "g4-fraction-hard-4",
      difficulty: "hard",
      question: "1と5/6、0、8/6、3/6、1 の5つの数を、小さい順にならべましょう。",
      answer: "0、3/6、1、8/6、1と5/6",
      steps: ["帯分数・仮分数を比べるときは、仮分数の形にそろえるとわかりやすい", "1と5/6を仮分数になおすと11/6、1は6/6、8/6はそのまま、3/6はそのまま", "0 < 3/6 < 6/6(1) < 8/6 < 11/6(1と5/6)"],
      tags: ["分数の大小"],
    },
    {
      id: "g4-fraction-hard-5",
      difficulty: "hard",
      question:
        "あつこさんはケーキを8等分し、はじめに自分が食べる1つ分を用意していましたが、参加できなくなった2人分もあわせて食べることになりました。ケーキ全体の何分のいくつを食べることになりますか。",
      answer: "3/8",
      steps: ["自分の1つ分＋参加できなくなった2人分＝3つ分", "8等分したうちの3つ分なので3/8"],
      tags: ["分数の意味", "文章題"],
    },
    {
      id: "g4-fraction-hard-6",
      difficulty: "hard",
      question:
        "部屋にたたみが8枚しきつめてあり、そのうち3枚には家具がおいてあります。家具がない残りのたたみのうち、2枚分は寝る場所として使わないことにします。自由に使える部分は、部屋全体の何分のいくつですか。",
      answer: "3/8",
      steps: ["何もおいていない部分：8 - 3 = 5枚", "そのうち使わない2枚を引く：5 - 2 = 3枚", "自由に使える部分は8枚中3枚なので3/8"],
      tags: ["分数の意味", "文章題"],
    },
  ],
};
