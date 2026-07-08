import type { Chapter } from "@/lib/types";

// 問題は下記の実在教材の設問・解答をもとに作成（AIによる自由生成は行っていない）。
// - 宮城県教育センター「わくわくワーク」小学4年 算数 単元7「がい数の使い方と表し方」
//   https://www.edu-c.pref.miyagi.jp/tangen/math/ele4_math/answer/22.els4.kaitou.07.1hop.pdf
//   https://www.edu-c.pref.miyagi.jp/tangen/math/ele4_math/answer/23.els4.kaitou.07.2stp.pdf
//   https://www.edu-c.pref.miyagi.jp/tangen/math/ele4_math/answer/24.els4.kaitou.07.3jmp.pdf
export const g4Rounding: Chapter = {
  id: "g4-rounding",
  grade: "小学4年",
  title: "がい数の使い方と表し方",
  explanation: {
    summary: `だいたいの数を表すとき、「がい数」を使います。がい数にする方法の1つが「四捨五入」で、求めたい位の1つ下の位の数字が0〜4なら切り捨て（0にする）、5〜9なら切り上げます。

「百の位までのがい数」にするには十の位を、「千の位までのがい数」にするには百の位を、「一万の位までのがい数」にするには千の位を四捨五入します。「上から1けたのがい数」にするには、上から2番目の位を四捨五入します。

数の範囲を表すことばに「以上（それ以上、その数をふくむ）」「以下（それ以下、その数をふくむ）」「未満（それより小さい、その数はふくまない）」があります。

がい数を使うと、正確な計算をしなくても、だいたいの答えを素早く見積もることができます。`,
    keyPoints: [
      "四捨五入：求めたい位の1つ下が0〜4なら切り捨て、5〜9なら切り上げ",
      "「百の位までのがい数」は十の位を、「千の位までのがい数」は百の位を四捨五入する",
      "「上から1けたのがい数」は上から2番目の位を四捨五入する",
      "以上＝その数をふくんで大きい方、以下＝その数をふくんで小さい方、未満＝その数をふくまず小さい方",
      "がい数を使うと、計算の答えをすばやく見積もることができる",
    ],
    diagram: {
      kind: "number-line",
      min: 200,
      max: 400,
      majorStep: 100,
      minorStep: 10,
    },
    notebookExample: {
      question: "例：732を十の位で四捨五入する",
      lines: [
        "十の位の数字は3なので、切り捨てる",
        "732 → 700",
      ],
    },
  },
  practiceProblems: [
    {
      id: "g4-rounding-easy-1",
      difficulty: "easy",
      question: "248を四捨五入して百の位までのがい数にすると、300になりますか、なりませんか。",
      answer: "ならない",
      steps: ["十の位の4を四捨五入する：4は切り捨て", "248 → 200なので、300にはならない"],
      tags: ["四捨五入"],
    },
    {
      id: "g4-rounding-easy-2",
      difficulty: "easy",
      question: "250を四捨五入して百の位までのがい数にすると、300になりますか、なりませんか。",
      answer: "なる",
      steps: ["十の位の5を四捨五入する：5は切り上げ", "250 → 300になる"],
      tags: ["四捨五入"],
    },
    {
      id: "g4-rounding-normal-1",
      difficulty: "normal",
      question: "283162を四捨五入して一万の位までのがい数にするといくつですか。",
      answer: "280000",
      steps: ["一万の位までのがい数にするには、千の位を四捨五入する", "千の位の3は切り捨て", "283162 → 280000"],
      tags: ["四捨五入"],
    },
    {
      id: "g4-rounding-normal-2",
      difficulty: "normal",
      question: "283162を四捨五入して上から1けたのがい数にするといくつですか。",
      answer: "300000",
      steps: ["上から1けたのがい数にするには、上から2番目の位（万の位）を四捨五入する", "万の位の8は切り上げ", "283162 → 300000"],
      tags: ["四捨五入"],
    },
  ],
  assessmentProblems: [
    {
      id: "g4-rounding-easy-3",
      difficulty: "easy",
      question: "346を四捨五入して百の位までのがい数にすると、300になりますか、なりませんか。",
      answer: "なる",
      steps: ["十の位の4を四捨五入する：4は切り捨て", "346 → 300になる"],
      tags: ["四捨五入"],
    },
    {
      id: "g4-rounding-easy-4",
      difficulty: "easy",
      question: "359を四捨五入して百の位までのがい数にすると、300になりますか、なりませんか。",
      answer: "ならない",
      steps: ["十の位の5を四捨五入する：5は切り上げ", "359 → 400なので、300にはならない"],
      tags: ["四捨五入"],
    },
    {
      id: "g4-rounding-normal-3",
      difficulty: "normal",
      question:
        "あつしさんの家から神社までの片道のきょりは732mです。732の十の位を四捨五入して、おうふくのきょりをがい数で見積もると、およそ何mですか。",
      answer: "およそ1400m",
      steps: ["732の十の位を四捨五入すると700", "おうふくなので、700 × 2 = 1400", "およそ1400m"],
      tags: ["文章題", "見積もり"],
    },
    {
      id: "g4-rounding-normal-4",
      difficulty: "normal",
      question: "14987を千の位で四捨五入するといくつですか。",
      answer: "10000",
      steps: ["千の位の数字4を四捨五入する：4は切り捨て", "14987 → 10000"],
      tags: ["四捨五入"],
    },
    {
      id: "g4-rounding-normal-5",
      difficulty: "normal",
      question: "35469を千の位で四捨五入するといくつですか。",
      answer: "40000",
      steps: ["千の位の数字5を四捨五入する：5は切り上げ", "35469 → 40000"],
      tags: ["四捨五入"],
    },
    {
      id: "g4-rounding-normal-6",
      difficulty: "normal",
      question: "14987を四捨五入して、千の位までのがい数にするといくつですか。",
      answer: "15000",
      steps: ["千の位までのがい数にするには、百の位を四捨五入する", "百の位の9は切り上げ", "14987 → 15000"],
      tags: ["四捨五入"],
    },
    {
      id: "g4-rounding-normal-7",
      difficulty: "normal",
      question: "52562を四捨五入して、千の位までのがい数にするといくつですか。",
      answer: "53000",
      steps: ["百の位の5を四捨五入する：5は切り上げ", "52562 → 53000"],
      tags: ["四捨五入"],
    },
    {
      id: "g4-rounding-hard-1",
      difficulty: "hard",
      question:
        "地球にきょうりゅうがいたのは、およそ1億9500万年前から1億3500万年前までとされています。ジュラ紀はおよそ何年続きましたか。",
      answer: "およそ6000万年",
      steps: ["195000000 - 135000000 = 60000000", "およそ6000万年"],
      tags: ["文章題", "見積もり"],
    },
    {
      id: "g4-rounding-normal-8",
      difficulty: "normal",
      question:
        "A市の人口56895人を、千の位までのがい数にすると約57000人になります。同じように四捨五入すると、B市の人口61713人は約何人になりますか。",
      answer: "約62000人",
      steps: ["千の位までのがい数にするには、百の位を四捨五入する", "百の位の7は切り上げ", "61713 → 62000", "約62000人"],
      tags: ["文章題"],
    },
    {
      id: "g4-rounding-normal-9",
      difficulty: "normal",
      question: "74291を四捨五入して、千の位までの概数で表すといくつですか。",
      answer: "74000",
      steps: ["百の位の2を四捨五入する：2は切り捨て", "74291 → 74000"],
      tags: ["四捨五入"],
    },
    {
      id: "g4-rounding-normal-10",
      difficulty: "normal",
      question:
        "1470円の本と930円の本を買います。それぞれ百の位で四捨五入して、代金をがい数で見積もると、およそ何円ですか。",
      answer: "およそ2000円",
      steps: ["1470円 → 1000円、930円 → 1000円", "1000 + 1000 = 2000", "およそ2000円"],
      tags: ["文章題", "見積もり"],
    },
    {
      id: "g4-rounding-hard-2",
      difficulty: "hard",
      question:
        "1しゅう227mのトラックを13しゅう走ります。227を上から1けたのがい数にして、約何m走ることになるか見積もりましょう。",
      answer: "約2600m",
      steps: ["227を上から1けたのがい数にすると200", "200 × 13 = 2600", "約2600m"],
      tags: ["文章題", "見積もり"],
    },
    {
      id: "g4-rounding-easy-5",
      difficulty: "easy",
      question: "5, 6, 7, 8, 9…と続く整数を、「以上」ということばを使って表しましょう。",
      answer: "5以上の整数",
      steps: ["5と等しいか、それより大きい整数なので「5以上の整数」"],
      tags: ["以上・以下・未満"],
    },
    {
      id: "g4-rounding-normal-11",
      difficulty: "normal",
      question: "31, 32, 33, 34, 35という整数を「以上」「以下」を使って表しましょう。",
      answer: "31以上35以下の整数",
      steps: ["31と等しいか大きく、35と等しいか小さい整数", "「31以上35以下の整数」"],
      tags: ["以上・以下・未満"],
    },
    {
      id: "g4-rounding-normal-12",
      difficulty: "normal",
      question: "四捨五入して百の位までのがい数にして、467+136の答えを見積もりましょう。",
      answer: "600",
      steps: ["467 → 500、136 → 100", "500 + 100 = 600"],
      tags: ["見積もり"],
    },
    {
      id: "g4-rounding-normal-13",
      difficulty: "normal",
      question: "四捨五入して百の位までのがい数にして、295+438+1688の答えを見積もりましょう。",
      answer: "2400",
      steps: ["295 → 300、438 → 400、1688 → 1700", "300 + 400 + 1700 = 2400"],
      tags: ["見積もり"],
    },
    {
      id: "g4-rounding-hard-3",
      difficulty: "hard",
      question: "四捨五入して上から1けたのがい数にして、519×276の答えを見積もりましょう。",
      answer: "150000",
      steps: ["519 → 500、276 → 300", "500 × 300 = 150000"],
      tags: ["見積もり"],
    },
    {
      id: "g4-rounding-hard-4",
      difficulty: "hard",
      question: "四捨五入して上から1けたのがい数にして、4121÷23の答えを見積もりましょう。",
      answer: "200",
      steps: ["4121 → 4000、23 → 20", "4000 ÷ 20 = 200"],
      tags: ["見積もり"],
    },
    {
      id: "g4-rounding-hard-5",
      difficulty: "hard",
      question: "百の位を四捨五入して84000になる整数のうち、いちばん小さい数はいくつですか。",
      answer: "83500",
      steps: ["百の位を四捨五入して84000になる整数は、83500から84499までの間", "いちばん小さいのは83500"],
      tags: ["四捨五入", "文章題"],
    },
    {
      id: "g4-rounding-hard-6",
      difficulty: "hard",
      question: "百の位を四捨五入して12000になる整数のうち、いちばん大きい数はいくつですか。",
      answer: "12499",
      steps: ["百の位を四捨五入して12000になる整数は、11500から12499までの間", "いちばん大きいのは12499"],
      tags: ["四捨五入", "文章題"],
    },
  ],
};
