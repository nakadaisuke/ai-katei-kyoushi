import type { Chapter } from "@/lib/types";

// 問題は下記の実在教材の設問・解答をもとに作成（AIによる自由生成は行っていない）。
// - 宮城県教育センター「わくわくワーク」小学4年 算数 単元4「角の大きさ」
//   https://www.edu-c.pref.miyagi.jp/tangen/math/ele4_math/answer/10.els4.kaitou.04.1hop.pdf
//   https://www.edu-c.pref.miyagi.jp/tangen/math/ele4_math/answer/11.els4.kaitou.04.2stp.pdf
//   https://www.edu-c.pref.miyagi.jp/tangen/math/ele4_math/answer/12.els4.kaitou.04.3jmp.pdf
export const g4Angles: Chapter = {
  id: "g4-angles",
  grade: "小学4年",
  title: "角の大きさ",
  explanation: {
    summary: `1つの直角の大きさを90等分した1つ分の角の大きさを「1度（1°）」といいます。直角は90°、1回転の角は4直角で360°です。

角の大きさは分度器ではかります。分度器の一番小さいめもりは1°を表し、0°から180°まで示されています。180°より大きい角（反射角）をはかるときは、180°より何度大きいか、または360°より何度小さいかを考えます。

三角じょうぎには2種類あり、1つは90°・45°・45°、もう1つは90°・60°・30°の角でできています。三角じょうぎを組み合わせると、角の大きさをたし算・ひき算で求めることができます。

時計の長いはりは1回転（360°）を60分でまわるので、1分あたり360°÷60＝6°の角度で進みます。`,
    keyPoints: [
      "直角＝90°、1回転の角＝4直角＝360°",
      "分度器の一番小さいめもりは1°、0°から180°まで示されている",
      "180°より大きい角は、180°より何度大きいか・360°より何度小さいかで考える",
      "三角じょうぎは90°・45°・45°の組と、90°・60°・30°の組がある",
      "時計の長いはりは1分あたり6°（360°÷60分）進む",
    ],
    diagram: {
      kind: "angle",
      angleDegrees: 50,
      label: "50°",
      rayLabels: ["辺", "辺"],
    },
    notebookExample: {
      question: "例：時計の長いはりが15分でまわる角の大きさ",
      lines: [
        "長いはりは1分あたり6°進む",
        "15分では 6° × 15 = 90°",
      ],
    },
  },
  practiceProblems: [
    {
      id: "g4-angle-easy-1",
      difficulty: "easy",
      question: "1直角は何度ですか。",
      answer: "90°",
      steps: ["直角の大きさは90°と決められている"],
      tags: ["角の用語"],
    },
    {
      id: "g4-angle-easy-2",
      difficulty: "easy",
      question: "1回転の角は何度ですか。",
      answer: "360°",
      steps: ["1回転の角は4直角で、90° × 4 = 360°"],
      tags: ["角の用語"],
    },
    {
      id: "g4-angle-normal-1",
      difficulty: "normal",
      question: "分度器の一番小さいめもりは、何度を表していますか。",
      answer: "1°",
      steps: ["分度器の一番小さいめもりは1°を表す"],
      tags: ["分度器"],
    },
    {
      id: "g4-angle-normal-2",
      difficulty: "normal",
      question: "分度器のめもりは、0°から何度まで示されていますか。",
      answer: "180°",
      steps: ["ふつうの分度器は0°から180°まで示されている"],
      tags: ["分度器"],
    },
  ],
  assessmentProblems: [
    {
      id: "g4-angle-easy-3",
      difficulty: "easy",
      question: "直角を90等分した1つ分の角の大きさを何といいますか。",
      answer: "1度",
      steps: ["直角を90に等分した1つ分を1度（1°）という"],
      tags: ["角の用語"],
    },
    {
      id: "g4-angle-easy-4",
      difficulty: "easy",
      question: "1組の三角じょうぎのうち、1つは90°の角と、大きさの等しい2つの角でできています。この2つの角はそれぞれ何度ですか。",
      answer: "45°",
      figure: {
        kind: "triangle",
        sideLabels: ["", "", ""],
        equalMarks: [1, 0, 1],
        angleLabels: ["90°", "？", "？"],
        rightAngleAt: [true, false, false],
        angles: [90, 45, 45],
      },
      steps: ["90°の三角じょうぎの残り2つの角は、90°を2等分した大きさ", "(180-90)÷2 = 45°"],
      tags: ["三角じょうぎ"],
    },
    {
      id: "g4-angle-easy-5",
      difficulty: "easy",
      question: "もう1組の三角じょうぎには90°・60°・30°の角があります。いちばん小さい角は何度ですか。",
      answer: "30°",
      figure: {
        kind: "triangle",
        sideLabels: ["", "", ""],
        equalMarks: [0, 0, 0],
        angleLabels: ["90°", "60°", "30°"],
        rightAngleAt: [true, false, false],
        angles: [90, 60, 30],
      },
      steps: ["90°、60°、30°のうちいちばん小さいのは30°"],
      tags: ["三角じょうぎ"],
    },
    {
      id: "g4-angle-normal-3",
      difficulty: "normal",
      question: "時計の長いはりが30分でまわる角の大きさは何度ですか。",
      answer: "180°",
      steps: ["長いはりは1分あたり6°進む", "6° × 30 = 180°"],
      tags: ["時計と角度"],
    },
    {
      id: "g4-angle-normal-4",
      difficulty: "normal",
      question: "時計の長いはりが15分でまわる角の大きさは何度ですか。",
      answer: "90°",
      steps: ["長いはりは1分あたり6°進む", "6° × 15 = 90°"],
      tags: ["時計と角度"],
    },
    {
      id: "g4-angle-normal-5",
      difficulty: "normal",
      question: "時計の長いはりが50分でまわる角の大きさは何度ですか。",
      answer: "300°",
      steps: ["長いはりは1分あたり6°進む", "6° × 50 = 300°"],
      tags: ["時計と角度"],
    },
    {
      id: "g4-angle-normal-6",
      difficulty: "normal",
      question: "時計の長いはりが5分でまわる角の大きさは何度ですか。",
      answer: "30°",
      steps: ["長いはりは1分あたり6°進む", "6° × 5 = 30°"],
      tags: ["時計と角度"],
    },
    {
      id: "g4-angle-hard-1",
      difficulty: "hard",
      question: "時計の長いはりが1分でまわる角の大きさは何度ですか。",
      answer: "6°",
      steps: ["長いはりは1回転（360°）を60分でまわる", "360° ÷ 60 = 6°"],
      tags: ["時計と角度"],
    },
    {
      id: "g4-angle-normal-7",
      difficulty: "normal",
      question: "三角じょうぎを組み合わせて、45°の角と90°の角をならべました。合わせて何度になりますか。",
      answer: "135°",
      figure: { kind: "angle", angleDegrees: 135, label: "？" },
      steps: ["45° + 90° = 135°"],
      tags: ["三角じょうぎ"],
    },
    {
      id: "g4-angle-normal-8",
      difficulty: "normal",
      question: "三角じょうぎを組み合わせて、45°の角と30°の角をならべました。合わせて何度になりますか。",
      answer: "75°",
      figure: { kind: "angle", angleDegrees: 75, label: "？" },
      steps: ["45° + 30° = 75°"],
      tags: ["三角じょうぎ"],
    },
    {
      id: "g4-angle-hard-2",
      difficulty: "hard",
      question:
        "二等辺三角形で、1つの角が50°、もう1つの角が80°であることが分かっています。のこりの角（ア）は50°、60°、70°、80°のどれですか。",
      answer: "50°",
      figure: {
        kind: "triangle",
        sideLabels: ["", "", ""],
        equalMarks: [1, 0, 1],
        angleLabels: ["80°", "50°", "？"],
        angles: [80, 50, 50],
      },
      steps: ["二等辺三角形は2つの角の大きさが等しくなる", "この三角形では、アの角と50°の角が等しい", "アは50°"],
      tags: ["三角形と角"],
    },
    {
      id: "g4-angle-hard-3",
      difficulty: "hard",
      question: "三角じょうぎの60°の角のとなりにできる角（180°から60°をひいた角）は何度ですか。",
      answer: "120°",
      figure: { kind: "angle", angleDegrees: 120, label: "？" },
      steps: ["180° - 60° = 120°"],
      tags: ["三角じょうぎ"],
    },
    {
      id: "g4-angle-hard-4",
      difficulty: "hard",
      question: "三角じょうぎの30°の角のとなりにできる角（180°から30°をひいた角）は何度ですか。",
      answer: "150°",
      figure: { kind: "angle", angleDegrees: 150, label: "？" },
      steps: ["180° - 30° = 150°"],
      tags: ["三角じょうぎ"],
    },
    {
      id: "g4-angle-hard-5",
      difficulty: "hard",
      question:
        "テープを折ったとき、28°の角と、アの角2つ分を合わせると180°になります。アの角度は何度ですか。",
      answer: "76°",
      figure: { kind: "angle", angleDegrees: 76, label: "？" },
      steps: ["28° + ア + ア = 180°", "180° - 28° = 152°で、これがアの2つ分", "152° ÷ 2 = 76°"],
      tags: ["文章題"],
    },
    {
      id: "g4-angle-hard-6",
      difficulty: "hard",
      question: "180°より135°大きい角は何度ですか。",
      answer: "315°",
      figure: { kind: "angle", angleDegrees: 315, label: "？" },
      steps: ["180° + 135° = 315°"],
      tags: ["反射角"],
    },
    {
      id: "g4-angle-normal-9",
      difficulty: "normal",
      question: "185°の角は、180°より何度大きいですか。",
      answer: "5°",
      figure: { kind: "angle", angleDegrees: 185, label: "？" },
      steps: ["185° - 180° = 5°"],
      tags: ["反射角"],
    },
  ],
};
