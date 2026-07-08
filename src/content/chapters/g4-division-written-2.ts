import type { Chapter } from "@/lib/types";

// 問題は下記の実在教材の設問・解答をもとに作成（AIによる自由生成は行っていない）。
// - 宮城県教育センター「わくわくワーク」小学4年 算数 単元6「わり算の筆算（2）」
//   https://www.edu-c.pref.miyagi.jp/tangen/math/ele4_math/answer/19.els4.kaitou.06.1hop.pdf
//   https://www.edu-c.pref.miyagi.jp/tangen/math/ele4_math/answer/20.els4.kaitou.06.2stp.pdf
//   https://www.edu-c.pref.miyagi.jp/tangen/math/ele4_math/answer/21.els4.kaitou.06.3jmp.pdf
export const g4DivisionWritten2: Chapter = {
  id: "g4-division-written-2",
  grade: "小学4年",
  title: "わり算の筆算(2)",
  explanation: {
    summary: `わる数が2けたのわり算も、10や100のまとまりで考えると簡単になります。例えば40÷20は、10を4こ、10を2こと考えて、4÷2=2、だから40÷20=2です。

わられる数とわる数を10（や100）でわってから計算し、あまりが出たときは、そのあまりに10（や100）をかけた数が、もとのわり算のあまりになります。

わり算には「わる数とわられる数を同じ数でわっても、商は変わらない」というきまりがあります。このきまりを使うと、大きい数のわり算を小さい数のわり算に置きかえて計算できます。

わり算の文章題では、まず「わる数×商＋あまり＝わられる数」のたしかめざんを使って、ある数を求める問題にも対応できるようにしましょう。`,
    keyPoints: [
      "わる数が2けたのわり算も、10や100のまとまりで考える",
      "わられる数とわる数を10（100）でわって計算したときのあまりは、10（100）倍して考える",
      "わる数とわられる数を同じ数でわっても、商は変わらない",
      "たしかめざん：わる数×商＋あまり＝わられる数",
    ],
    diagram: { kind: "long-division", dividend: 432, divisor: 41 },
    notebookExample: {
      question: "例：40÷20を10をもとにして計算する",
      lines: [
        "40は10を4こ集めた数、20は10を2こ集めた数",
        "4 ÷ 2 = 2",
        "だから 40 ÷ 20 = 2",
      ],
    },
    midCheckpoint: {
      summary: `ここまでで、「何十でわる」わり算を、10のまとまりで考えて計算する方法を確認しました。

ここからは、わる数がふつうの2けたの数（25や41など）のときの、本格的な筆算に取り組みます。2けたでわる筆算でも、「たてる・かける・ひく・おろす」の手順は変わりません。ちがうのは、商をいくつにするかを自分で見当づけて、かけ算・ひき算で確かめる必要があることです。

見当をつけた商が大きすぎて、ひき算がマイナスになってしまうときは、商を1つ小さい数にやり直します。例えば725÷25では、わる数の25を「約20」と考えて商の見当をつけ、25のだんの九九（25×1=25、25×2=50、25×3=75…）を使って725に近づく商を探すと、商は29と求まります。`,
      keyPoints: [
        "2けたでわる筆算も「たてる・かける・ひく・おろす」の手順は同じ",
        "商の見当は、わる数を10や100のまとまりとして考えるとつけやすい",
        "見当をつけた商が大きすぎたら、1つ小さい数にやり直す",
      ],
      diagram: { kind: "long-division", dividend: 725, divisor: 25 },
    },
  },
  practiceProblems: [
    {
      id: "g4-divwritten2-easy-1",
      difficulty: "easy",
      question: "90 ÷ 30 = ？",
      answer: "3",
      steps: ["90は10が9こ、30は10が3こ", "9 ÷ 3 = 3"],
      tags: ["何十でわるわり算"],
    },
    {
      id: "g4-divwritten2-easy-2",
      difficulty: "easy",
      question: "150 ÷ 50 = ？",
      answer: "3",
      steps: ["150は10が15こ、50は10が5こ", "15 ÷ 5 = 3"],
      tags: ["何十でわるわり算"],
    },
    {
      id: "g4-divwritten2-normal-1",
      difficulty: "normal",
      question: "240 ÷ 60 = ？",
      answer: "4",
      steps: ["240は10が24こ、60は10が6こ", "24 ÷ 6 = 4"],
      tags: ["何十でわるわり算"],
    },
    {
      id: "g4-divwritten2-normal-2",
      difficulty: "normal",
      question: "490 ÷ 70 = ？",
      answer: "7",
      steps: ["490は10が49こ、70は10が7こ", "49 ÷ 7 = 7"],
      tags: ["何十でわるわり算"],
    },
  ],
  assessmentProblems: [
    {
      id: "g4-divwritten2-normal-3",
      difficulty: "normal",
      question: "40÷20を10をもとにして考えると、4÷2=2になります。40÷20はいくつですか。",
      answer: "2",
      steps: ["40は10を4こ、20は10を2こ集めた数", "4 ÷ 2 = 2なので、40 ÷ 20 = 2"],
      tags: ["何十でわるわり算"],
    },
    {
      id: "g4-divwritten2-normal-4",
      difficulty: "normal",
      question: "100 ÷ 30 = ？（あまりも答えよう）",
      answer: "3あまり10",
      steps: ["10でわった式で考える：10 ÷ 3 = 3あまり1", "あまりを10倍する：1 × 10 = 10", "100 ÷ 30 = 3あまり10"],
      tags: ["あまりのあるわり算"],
    },
    {
      id: "g4-divwritten2-normal-5",
      difficulty: "normal",
      question: "650 ÷ 80 = ？（あまりも答えよう）",
      answer: "8あまり10",
      steps: ["10でわった式で考える：65 ÷ 8 = 8あまり1", "あまりを10倍する：1 × 10 = 10", "650 ÷ 80 = 8あまり10"],
      tags: ["あまりのあるわり算"],
    },
    {
      id: "g4-divwritten2-normal-6",
      difficulty: "normal",
      question: "260 ÷ 70 = ？（あまりも答えよう）",
      answer: "3あまり50",
      steps: ["10でわった式で考える：26 ÷ 7 = 3あまり5", "あまりを10倍する：5 × 10 = 50", "260 ÷ 70 = 3あまり50"],
      tags: ["あまりのあるわり算"],
    },
    {
      id: "g4-divwritten2-normal-7",
      difficulty: "normal",
      question: "930 ÷ 90 = ？（あまりも答えよう）",
      answer: "10あまり30",
      steps: ["10でわった式で考える：93 ÷ 9 = 10あまり3", "あまりを10倍する：3 × 10 = 30", "930 ÷ 90 = 10あまり30"],
      tags: ["あまりのあるわり算"],
    },
    {
      id: "g4-divwritten2-normal-8",
      difficulty: "normal",
      question: "725 ÷ 25 = ？",
      answer: "29",
      steps: ["725 ÷ 25を筆算で計算する", "725 ÷ 25 = 29"],
      tags: ["2桁でわるわり算"],
    },
    {
      id: "g4-divwritten2-normal-9",
      difficulty: "normal",
      question: "432 ÷ 41 = ？（あまりも答えよう）",
      answer: "10あまり22",
      steps: ["432 ÷ 41を筆算で計算する", "41 × 10 = 410、432 - 410 = 22", "432 ÷ 41 = 10あまり22"],
      tags: ["2桁でわるわり算", "あまりのあるわり算"],
    },
    {
      id: "g4-divwritten2-normal-10",
      difficulty: "normal",
      question: "6000 ÷ 300 = ？",
      answer: "20",
      steps: ["100でわった式で考える：60 ÷ 3 = 20", "6000 ÷ 300 = 20"],
      tags: ["何百でわるわり算"],
    },
    {
      id: "g4-divwritten2-hard-1",
      difficulty: "hard",
      question: "4200 ÷ 400 = ？（あまりも答えよう）",
      answer: "10あまり200",
      steps: ["100でわった式で考える：42 ÷ 4 = 10あまり2", "あまりを100倍する：2 × 100 = 200", "4200 ÷ 400 = 10あまり200"],
      tags: ["何百でわるわり算", "あまりのあるわり算"],
    },
    {
      id: "g4-divwritten2-normal-11",
      difficulty: "normal",
      question:
        "ちえこさんの学校では給食があり、15回に1回ヨーグルトが出ます。1年間の給食の回数が200回だとすると、1年間にヨーグルトは何回出ますか。",
      answer: "13回",
      steps: ["200 ÷ 15 = 13あまり5", "13回出る（あまりの5回は次に持ちこされる分なので数えない）"],
      tags: ["文章題"],
    },
    {
      id: "g4-divwritten2-hard-2",
      difficulty: "hard",
      question: "ある数を12でわったら、商が16であまりは5になりました。ある数はいくつですか。",
      answer: "197",
      steps: ["わる数×商＋あまり＝わられる数", "12 × 16 + 5 = 197"],
      tags: ["文章題", "逆算"],
    },
    {
      id: "g4-divwritten2-normal-12",
      difficulty: "normal",
      question: "350÷50=7です。わる数とわられる数を同じ数（5）でわっても商は変わりません。70÷10はいくつですか。",
      answer: "7",
      steps: ["350を5でわると70、50を5でわると10", "70 ÷ 10 = 7（350 ÷ 50と同じ答え）"],
      tags: ["わり算のきまり"],
    },
    {
      id: "g4-divwritten2-normal-13",
      difficulty: "normal",
      question:
        "あつしさんの家から練習場までのきょりは900mで、これはとしきさんの家までのきょりの15倍です。としきさんの家までのきょりは何mでしょう。",
      answer: "60m",
      steps: ["900 ÷ 15 = 60", "としきさんの家までは60m"],
      tags: ["文章題"],
    },
    {
      id: "g4-divwritten2-hard-3",
      difficulty: "hard",
      question:
        "プルタブを集め始めて10日目に350枚集まり、25日目には400枚になりました。10日目の枚数は、その後の15日間で集まった枚数の何倍ですか。",
      answer: "7倍",
      steps: ["その後の15日間で集まった枚数：400 - 350 = 50枚", "350 ÷ 50 = 7", "7倍"],
      tags: ["文章題", "複合問題"],
    },
    {
      id: "g4-divwritten2-hard-4",
      difficulty: "hard",
      question:
        "さいふの中に940円あります。1こ80円の肉まんをできるだけ多く買うとすると、何こ買えて、残りのお金は何円になりますか。",
      answer: "11こ、残り60円",
      steps: ["940 ÷ 80 = 11あまり60", "11こ買えて、60円残る"],
      tags: ["文章題", "複合問題"],
    },
  ],
};
