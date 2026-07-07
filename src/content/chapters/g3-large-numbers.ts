import type { Chapter } from "@/lib/types";

// 問題は下記の実在教材の設問・解答をもとに作成（AIによる自由生成は行っていない）。
// - 宮城県教育センター「わくわくワーク」小学3年 算数 単元8「大きい数のしくみ」
//   https://www.edu-c.pref.miyagi.jp/tangen/math/ele3_math/answer/00.els3.kaitou.all.pdf
export const g3LargeNumbers: Chapter = {
  id: "g3-large-numbers",
  grade: "小学3年",
  title: "大きい数",
  explanation: {
    summary: `数は、一・十・百・千・一万・十万・百万・千万・一億…と、4けたごとに新しい大きな単位（万・億）に変わっていきます。

数を10倍すると、位が1つ上がり、右はしに0が1こ増えます（例：23 → 230）。
数を10でわると、位が1つ下がり、右はしの0が1こ減ります（例：190 → 19）。

千万を10こ集めた数を「一億」といい、100000000と書きます。

数の大小をくらべるときは「＝」「＞」「＜」を使います。大きい位からくらべて、どちらが大きいかを判断します。`,
    keyPoints: [
      "4けたごとに新しい大きな単位に変わる（一万・一億）",
      "10倍すると位が1つ上がり、右に0が1こ増える",
      "10でわると位が1つ下がり、右の0が1こ減る",
      "1億＝1000万を10こ集めた数",
      "数の大小は、大きい位から順にくらべる",
    ],
    notebookExample: {
      question: "例：23を10倍した数、190を10でわった数",
      lines: [
        "10倍：もとの数の右はしに0を1こつける → 23 × 10 = 230",
        "10でわる：右はしの0を1ことる → 190 ÷ 10 = 19",
      ],
    },
  },
  practiceProblems: [
    {
      id: "g3-largenum-easy-1",
      difficulty: "easy",
      question: "次の数を数字で書きましょう。四万八千二百七十五",
      answer: "48275",
      steps: ["「四万」→ 4のあとに万を表す位が続く", "「八千二百七十五」→ 8275", "4のあとに8275を続ける：48275"],
      tags: ["位取り"],
    },
    {
      id: "g3-largenum-easy-2",
      difficulty: "easy",
      question: "23を10倍した数はいくつですか。",
      answer: "230",
      steps: ["10倍すると位が1つ上がる", "右はしに0を1こつける：23 → 230"],
      tags: ["10倍・10分の1"],
    },
    {
      id: "g3-largenum-normal-1",
      difficulty: "normal",
      question: "190を10でわった数はいくつですか。",
      answer: "19",
      steps: ["10でわると位が1つ下がる", "右はしの0を1ことる：190 → 19"],
      tags: ["10倍・10分の1"],
    },
    {
      id: "g3-largenum-normal-2",
      difficulty: "normal",
      question: "千万を10こ集めた数を一億といいます。この数を数字で書きましょう。",
      answer: "100000000",
      steps: ["千万は10000000", "10000000を10こ集めると、位が1つ上がる", "一億 = 100000000"],
      tags: ["億の位"],
    },
  ],
  assessmentProblems: [
    {
      id: "g3-largenum-easy-3",
      difficulty: "easy",
      question: "50を10倍した数はいくつですか。",
      answer: "500",
      steps: ["右はしに0を1こつける：50 → 500"],
      tags: ["10倍・10分の1"],
    },
    {
      id: "g3-largenum-easy-4",
      difficulty: "easy",
      question: "6050を10でわった数はいくつですか。",
      answer: "605",
      steps: ["右はしの0を1ことる：6050 → 605"],
      tags: ["10倍・10分の1"],
    },
    {
      id: "g3-largenum-easy-5",
      difficulty: "easy",
      question: "次の数を数字で書きましょう。九万百六十",
      answer: "90160",
      steps: ["「九万」→ 9のあとに万を表す位が続く", "「百六十」→ 0160", "9のあとに0160を続ける：90160"],
      tags: ["位取り"],
    },
    {
      id: "g3-largenum-normal-3",
      difficulty: "normal",
      question: "10万を3こ、1万を7こあわせた数はいくつですか。",
      answer: "370000",
      steps: ["10万 × 3 = 300000", "1万 × 7 = 70000", "300000 + 70000 = 370000"],
      tags: ["位取り"],
    },
    {
      id: "g3-largenum-normal-4",
      difficulty: "normal",
      question: "100万を8こ集めた数はいくつですか。",
      answer: "8000000",
      steps: ["100万 × 8 = 8000000"],
      tags: ["位取り"],
    },
    {
      id: "g3-largenum-normal-5",
      difficulty: "normal",
      question: "1000を26こ集めた数はいくつですか。",
      answer: "26000",
      steps: ["1000 × 26 = 26000"],
      tags: ["位取り"],
    },
    {
      id: "g3-largenum-normal-6",
      difficulty: "normal",
      question: "530000は、1000を何こ集めた数ですか。",
      answer: "530",
      steps: ["530000 ÷ 1000 = 530", "1000を530こ集めた数"],
      tags: ["位取り"],
    },
    {
      id: "g3-largenum-normal-7",
      difficulty: "normal",
      question: "340を100倍した数はいくつですか。",
      answer: "34000",
      steps: ["100倍すると位が2つ上がる", "右はしに0を2こつける：340 → 34000"],
      tags: ["10倍・10分の1"],
    },
    {
      id: "g3-largenum-normal-8",
      difficulty: "normal",
      question: "7800を100でわった数はいくつですか。",
      answer: "78",
      steps: ["100でわると位が2つ下がる", "右はしの0を2ことる：7800 → 78"],
      tags: ["10倍・10分の1"],
    },
    {
      id: "g3-largenum-hard-1",
      difficulty: "hard",
      question: "72930000は、1万を何こ集めた数ですか。",
      answer: "7293",
      steps: ["72930000 ÷ 10000 = 7293", "1万を7293こ集めた数"],
      tags: ["億の位", "位取り"],
    },
    {
      id: "g3-largenum-hard-2",
      difficulty: "hard",
      question: "72930000について、7は何が7こあることを表していますか。",
      answer: "1000万",
      steps: ["7293万0000を位ごとに見る：千万の位が7", "7は「1000万が7こ」あることを表す"],
      tags: ["億の位", "位取り"],
    },
    {
      id: "g3-largenum-hard-3",
      difficulty: "hard",
      question: "1億は、1000万を何こ集めた数ですか。",
      answer: "10",
      steps: ["1億 = 100000000", "1000万 = 10000000", "100000000 ÷ 10000000 = 10"],
      tags: ["億の位"],
    },
    {
      id: "g3-largenum-hard-4",
      difficulty: "hard",
      question: "8000万は、あといくつで1億になりますか。",
      answer: "2000万",
      steps: ["1億 = 10000万", "10000万 - 8000万 = 2000万"],
      tags: ["億の位"],
    },
    {
      id: "g3-largenum-hard-5",
      difficulty: "hard",
      question:
        "0から5までのカードが1まいずつあります。このカードを全部使って6桁の数をつくるとき、いちばん大きい数はいくつですか。",
      answer: "543210",
      steps: [
        "いちばん大きい数にするには、大きい位から大きい数字を並べる",
        "大きい順に並べる：5, 4, 3, 2, 1, 0",
        "543210",
      ],
      tags: ["位取り", "文章題"],
    },
    {
      id: "g3-largenum-hard-6",
      difficulty: "hard",
      question: "70000 と 80000 では、どちらが大きいですか。等号・不等号（=, >, <）で答えましょう（70000 ○ 80000）。",
      answer: "<",
      steps: ["万の位を比べる：7万 と 8万", "7万のほうが小さいので、70000 < 80000"],
      tags: ["数の大小"],
    },
  ],
};
