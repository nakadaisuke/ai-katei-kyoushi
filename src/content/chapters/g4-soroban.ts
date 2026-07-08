import type { Chapter } from "@/lib/types";

// 問題は下記の実在教材の設問・解答をもとに作成（AIによる自由生成は行っていない）。
// - 宮城県教育センター「わくわくワーク」小学4年 算数 単元5「そろばん」
//   https://www.edu-c.pref.miyagi.jp/tangen/math/ele4_math/answer/17.els4.kaitou.05.5stp.pdf
//   https://www.edu-c.pref.miyagi.jp/tangen/math/ele4_math/answer/18.els4.kaitou.05.6jmp.pdf
// 注：珠を動かす途中経過を1問ごとに描く専用の図コンポーネントはまだ無いため、
// 個々の計算問題は文字のみで出題するが、単元解説には1けたぶんの珠の配置図を添える
// （ユーザー確認済み：軽い単元として作成）。
export const g4Soroban: Chapter = {
  id: "g4-soroban",
  grade: "小学4年",
  title: "そろばん",
  explanation: {
    summary: `そろばんの1だま（下の玉）は1を、5だま（上の玉）は5を表します。1だまを入れるときは親指、はらうときは人差し指を使います。5だまは入れるときもはらうときも人差し指を使います。

そろばんでは、1だまだけでは足りない・引けないときに「補数（ほすう）」の考え方を使います。例えば3をたしたいのに1だまが足りないときは、10の補数である7をはらって、上の位に10を入れます。同じように、2をひきたいのに1だまが足りないときは、5の補数である3を入れて、5だまをはらいます。

このくふうによって、そろばんでは1だま・5だまの少ない動きで、大きい数のたし算・ひき算ができます。`,
    keyPoints: [
      "1だまは1を、5だまは5を表す",
      "1だまを入れるときは親指、はらうときは人差し指を使う",
      "5だまは入れるときもはらうときも人差し指を使う",
      "たし算で玉が足りないときは「10の補数」を使う（例：3をたす→7をはらって10を入れる）",
      "ひき算で玉が足りないときは「5の補数」や「上の位からかりる」考え方を使う",
    ],
    diagram: { kind: "soroban" },
    notebookExample: {
      question: "例：そろばんで3をたしたいが1だまが足りないとき",
      lines: [
        "3の10の補数を考える：10 - 3 = 7",
        "7をはらって、上の位に10（1だま1つ）を入れる",
        "これで3をたしたのと同じ結果になる",
      ],
    },
  },
  practiceProblems: [
    {
      id: "g4-soroban-easy-1",
      difficulty: "easy",
      question: "そろばんで、1だまを入れるときは、どちらの指を使いますか。",
      answer: "親指",
      steps: ["1だまを入れるときは親指を使う"],
      tags: ["そろばんの使い方"],
    },
    {
      id: "g4-soroban-easy-2",
      difficulty: "easy",
      question: "そろばんで、1だまをはらうときは、どちらの指を使いますか。",
      answer: "人差し指",
      steps: ["1だまをはらうときは人差し指を使う"],
      tags: ["そろばんの使い方"],
    },
    {
      id: "g4-soroban-easy-3",
      difficulty: "easy",
      question: "7.3 + 1.4 = ？",
      answer: "8.7",
      steps: ["7.3に1.4をたす", "7.3 + 1.4 = 8.7"],
      tags: ["そろばんのたし算"],
    },
    {
      id: "g4-soroban-normal-1",
      difficulty: "normal",
      question: "9.5 - 3.2 = ？",
      answer: "6.3",
      steps: ["9.5から3.2をひく", "9.5 - 3.2 = 6.3"],
      tags: ["そろばんのひき算"],
    },
  ],
  assessmentProblems: [
    {
      id: "g4-soroban-easy-4",
      difficulty: "easy",
      question: "そろばんで、5だまを入れるときは、どちらの指を使いますか。",
      answer: "人差し指",
      steps: ["5だまは入れるときもはらうときも人差し指を使う"],
      tags: ["そろばんの使い方"],
    },
    {
      id: "g4-soroban-easy-5",
      difficulty: "easy",
      question: "1.4 + 2.7 = ？",
      answer: "4.1",
      steps: ["1.4に2.7をたす", "1.4 + 2.7 = 4.1"],
      tags: ["そろばんのたし算"],
    },
    {
      id: "g4-soroban-normal-2",
      difficulty: "normal",
      question: "8 - 2.7 = ？",
      answer: "5.3",
      steps: ["8から2.7をひく", "8 - 2.7 = 5.3"],
      tags: ["そろばんのひき算"],
    },
    {
      id: "g4-soroban-normal-3",
      difficulty: "normal",
      question:
        "そろばんで3をたしたいのに1だまが足りないとき、10の補数の考え方を使います。何をはらって10を入れればよいですか。",
      answer: "7",
      steps: ["10の補数は「たして10になる数」", "3の10の補数：10 - 3 = 7", "7をはらって10を入れる"],
      tags: ["補数"],
    },
    {
      id: "g4-soroban-normal-4",
      difficulty: "normal",
      question: "そろばんで2をひきたいのに1だまからひけないとき、5の補数の考え方を使います。何を入れて5をはらえばよいですか。",
      answer: "3",
      steps: ["5の補数は「たして5になる数」", "2の5の補数：5 - 2 = 3", "3を入れて5をはらう"],
      tags: ["補数"],
    },
    {
      id: "g4-soroban-normal-5",
      difficulty: "normal",
      question:
        "そろばんで0.7をひくとき、上の位から1をかりて0.3を入れます。このとき入れる数はいくつですか。",
      answer: "0.3",
      steps: ["1をひいて多くひきすぎた分をもどす", "1 - 0.7 = 0.3", "0.3を入れる"],
      tags: ["補数"],
    },
    {
      id: "g4-soroban-normal-6",
      difficulty: "normal",
      question: "そろばんで0.3をひくとき、1をはらって0.7を入れます。このとき入れる数はいくつですか。",
      answer: "0.7",
      steps: ["1をはらって多くひきすぎた分をもどす", "1 - 0.3 = 0.7", "0.7を入れる"],
      tags: ["補数"],
    },
    {
      id: "g4-soroban-hard-1",
      difficulty: "hard",
      question: "8.4 + 3.4 = ？",
      answer: "11.8",
      steps: ["8.4に3.4をたす", "8.4 + 3.4 = 11.8"],
      tags: ["そろばんのたし算"],
    },
    {
      id: "g4-soroban-hard-2",
      difficulty: "hard",
      question: "6.2 - 2.3 = ？",
      answer: "3.9",
      steps: ["6.2から2.3をひく", "6.2 - 2.3 = 3.9"],
      tags: ["そろばんのひき算"],
    },
  ],
};
