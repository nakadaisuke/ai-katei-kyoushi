import type { Chapter } from "@/lib/types";

// 問題は下記の実在教材の設問・解答をもとに作成（AIによる自由生成は行っていない）。
// - 宮城県教育センター「わくわくワーク」小学4年 算数 単元8「計算のきまり」
//   https://www.edu-c.pref.miyagi.jp/tangen/math/ele4_math/answer/25.els4.kaitou.08.1hop.pdf
//   https://www.edu-c.pref.miyagi.jp/tangen/math/ele4_math/answer/26.els4.kaitou.08.2stp.pdf
//   https://www.edu-c.pref.miyagi.jp/tangen/math/ele4_math/answer/27.els4.kaitou.08.3jmp.pdf
export const g4CalculationRules: Chapter = {
  id: "g4-calculation-rules",
  grade: "小学4年",
  title: "計算のきまり",
  explanation: {
    summary: `1つの式にいろいろな計算がまじっているときは、計算する順序が決まっています。
①（　）の中を先に計算する
②かけ算・わり算をたし算・ひき算より先に計算する
③それ以外は前から順に計算する

このきまりを知らないと、電たく（電卓）で計算するときも間違えることがあります。例えば75+25×3を電たくにそのまま入力すると、先に75+25が計算されてしまい、正しい答えにならないことがあります。

計算をくふうするときは、たしても100や1000になるまとまり、かけても100になるまとまりなどに注目すると、計算が簡単になります。（　）を使って、その部分を先に計算する順序を変えることができます。`,
    keyPoints: [
      "計算の順序：①（　）の中 → ②かけ算・わり算 → ③前から順に（たし算・ひき算）",
      "電たくで計算するときも、計算の順序に気をつける",
      "計算をくふうするときは、100や1000になるまとまりに注目する",
      "（　）を使うと、計算する順序を変えることができる",
    ],
    diagram: { kind: "area-model", splitFactor: [100, 9], otherFactor: 8 },
    notebookExample: {
      question: "例：75 + 25 × 3 を正しい順序で計算する",
      lines: [
        "かけ算を先に計算する：25 × 3 = 75",
        "75 + 75 = 150",
      ],
    },
  },
  practiceProblems: [
    {
      id: "g4-calcrules-easy-1",
      difficulty: "easy",
      question: "50 - (20 + 5) = ？",
      answer: "25",
      steps: ["（　）の中を先に計算する", "20 + 5 = 25", "50 - 25 = 25"],
      tags: ["計算の順序"],
    },
    {
      id: "g4-calcrules-easy-2",
      difficulty: "easy",
      question: "(23 - 3) + 4 = ？",
      answer: "24",
      steps: ["（　）の中を先に計算する", "23 - 3 = 20", "20 + 4 = 24"],
      tags: ["計算の順序"],
    },
    {
      id: "g4-calcrules-normal-1",
      difficulty: "normal",
      question: "(1 + 2) × 7 = ？",
      answer: "21",
      steps: ["（　）の中を先に計算する", "1 + 2 = 3", "3 × 7 = 21"],
      tags: ["計算の順序"],
    },
    {
      id: "g4-calcrules-normal-2",
      difficulty: "normal",
      question: "3 × (5 - 2) = ？",
      answer: "9",
      steps: ["（　）の中を先に計算する", "5 - 2 = 3", "3 × 3 = 9"],
      tags: ["計算の順序"],
    },
  ],
  assessmentProblems: [
    {
      id: "g4-calcrules-easy-3",
      difficulty: "easy",
      question: "12 ÷ (3 + 1) = ？",
      answer: "3",
      steps: ["（　）の中を先に計算する", "3 + 1 = 4", "12 ÷ 4 = 3"],
      tags: ["計算の順序"],
    },
    {
      id: "g4-calcrules-normal-3",
      difficulty: "normal",
      question: "1こ15円のチョコレートを4こと、100円のノートを1さつ買いました。ぜんぶでいくらですか。",
      answer: "160円",
      steps: ["かけ算を先に計算する：15 × 4 = 60", "60 + 100 = 160"],
      tags: ["文章題"],
    },
    {
      id: "g4-calcrules-normal-4",
      difficulty: "normal",
      question: "37 + 14 + 6 = ？（14 + 6 を先に計算するとかんたんです）",
      answer: "57",
      steps: ["14 + 6 = 20", "37 + 20 = 57"],
      tags: ["計算のくふう"],
    },
    {
      id: "g4-calcrules-normal-5",
      difficulty: "normal",
      question: "25 × 6 × 4 = ？（25 × 4 を先に計算するとかんたんです）",
      answer: "600",
      steps: ["25 × 4 = 100", "100 × 6 = 600"],
      tags: ["計算のくふう"],
    },
    {
      id: "g4-calcrules-normal-6",
      difficulty: "normal",
      question: "621 + (572 - 135) = ？",
      answer: "1058",
      steps: ["（　）の中を先に計算する", "572 - 135 = 437", "621 + 437 = 1058"],
      tags: ["計算の順序"],
    },
    {
      id: "g4-calcrules-normal-7",
      difficulty: "normal",
      question: "450 - 50 × 4 = ？",
      answer: "250",
      steps: ["かけ算を先に計算する", "50 × 4 = 200", "450 - 200 = 250"],
      tags: ["計算の順序"],
    },
    {
      id: "g4-calcrules-normal-8",
      difficulty: "normal",
      question: "100 + 480 ÷ 2 = ？",
      answer: "340",
      steps: ["わり算を先に計算する", "480 ÷ 2 = 240", "100 + 240 = 340"],
      tags: ["計算の順序"],
    },
    {
      id: "g4-calcrules-normal-9",
      difficulty: "normal",
      question: "80 + 20 × 6 = ？",
      answer: "200",
      steps: ["かけ算を先に計算する", "20 × 6 = 120", "80 + 120 = 200"],
      tags: ["計算の順序"],
    },
    {
      id: "g4-calcrules-normal-10",
      difficulty: "normal",
      question: "160 - 60 ÷ 2 = ？",
      answer: "130",
      steps: ["わり算を先に計算する", "60 ÷ 2 = 30", "160 - 30 = 130"],
      tags: ["計算の順序"],
    },
    {
      id: "g4-calcrules-hard-1",
      difficulty: "hard",
      question: "みかんが12こずつ2列、りんごが12こずつ4列あります。(2+4)×12という式で計算すると、あわせて何こになりますか。",
      answer: "72こ",
      steps: ["（　）の中を先に計算する", "2 + 4 = 6", "6 × 12 = 72"],
      tags: ["文章題"],
    },
    {
      id: "g4-calcrules-hard-2",
      difficulty: "hard",
      question: "11 - 8 ÷ 4 × 3 = ？",
      answer: "5",
      steps: ["かけ算・わり算を前から順に計算する", "8 ÷ 4 = 2", "2 × 3 = 6", "11 - 6 = 5"],
      tags: ["計算の順序"],
    },
    {
      id: "g4-calcrules-hard-3",
      difficulty: "hard",
      question: "7 × (8 - 6) ÷ 2 = ？",
      answer: "7",
      steps: ["（　）の中を先に計算する：8 - 6 = 2", "かけ算・わり算を前から順に計算する", "7 × 2 = 14、14 ÷ 2 = 7"],
      tags: ["計算の順序"],
    },
    {
      id: "g4-calcrules-hard-4",
      difficulty: "hard",
      question: "76 + 35 + 24 = ？（76 + 24 を先に計算するとかんたんです）",
      answer: "135",
      steps: ["76 + 24 = 100", "100 + 35 = 135"],
      tags: ["計算のくふう"],
    },
    {
      id: "g4-calcrules-hard-5",
      difficulty: "hard",
      question: "4 × 13 × 25 = ？（4 × 25 を先に計算するとかんたんです）",
      answer: "1300",
      steps: ["4 × 25 = 100", "100 × 13 = 1300"],
      tags: ["計算のくふう"],
    },
    {
      id: "g4-calcrules-hard-6",
      difficulty: "hard",
      question: "109 × 8 = ？（109を100と9に分けて計算しましょう）",
      answer: "872",
      steps: ["109 = 100 + 9", "100 × 8 = 800、9 × 8 = 72", "800 + 72 = 872"],
      tags: ["計算のくふう"],
    },
    {
      id: "g4-calcrules-hard-7",
      difficulty: "hard",
      question: "97 × 6 = ？（97を100-3と考えて計算しましょう）",
      answer: "582",
      steps: ["97 = 100 - 3", "100 × 6 = 600、3 × 6 = 18", "600 - 18 = 582"],
      tags: ["計算のくふう"],
    },
    {
      id: "g4-calcrules-hard-8",
      difficulty: "hard",
      question:
        "とおるさんの学級では28人が4人ずつのグループを作り、おさむさんの学級では30人が5人ずつのグループを作りました。二人の学級をあわせて何グループできるでしょうか。",
      answer: "13グループ",
      steps: ["とおるさんの学級：28 ÷ 4 = 7グループ", "おさむさんの学級：30 ÷ 5 = 6グループ", "7 + 6 = 13グループ"],
      tags: ["文章題"],
    },
    {
      id: "g4-calcrules-hard-9",
      difficulty: "hard",
      question:
        "1さつ150円のノートを4さつ、1本45円のえんぴつを半ダース（6本）、1こ430円のコンパスを1こ、1本110円のボールペンを2本買いました。代金は全部でいくらになるでしょうか。",
      answer: "1520円",
      steps: [
        "150×4 + 45×6 + 430 + 110×2 という式になる",
        "150×4=600、45×6=270、110×2=220",
        "600 + 270 + 430 + 220 = 1520",
      ],
      tags: ["文章題", "複合問題"],
    },
    {
      id: "g4-calcrules-hard-10",
      difficulty: "hard",
      question:
        "75+25×3を電たくにそのまま入力すると300と表示されますが、これはまちがいです。かけ算を先に計算すると、正しい答えはいくつになりますか。",
      answer: "150",
      steps: ["かけ算を先に計算する：25 × 3 = 75", "75 + 75 = 150"],
      tags: ["計算の順序"],
    },
  ],
};
