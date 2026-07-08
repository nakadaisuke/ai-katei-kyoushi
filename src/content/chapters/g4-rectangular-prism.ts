import type { Chapter } from "@/lib/types";

// 問題は下記の実在教材の設問・解答をもとに作成（AIによる自由生成は行っていない）。
// - 宮城県教育センター「わくわくワーク」小学4年 算数 単元14「直方体と立方体」
//   https://www.edu-c.pref.miyagi.jp/tangen/math/ele4_math/answer/43.els4.kaitou.14.1hop.pdf
// 注：この単元の実教材の多くは、展開図の組み立てや見取図の作図など、実際に手を動かして
// 図をかく問題が中心で、そうした設問は図コンポーネントでは再現しきれないため対象外とする。
// 直方体・立方体の定義や面・辺・頂点の数を問う設問には、見取図（斜投影）を添えている。
export const g4RectangularPrism: Chapter = {
  id: "g4-rectangular-prism",
  grade: "小学4年",
  title: "直方体と立方体",
  explanation: {
    summary: `長方形や正方形で囲まれている形を「直方体」といいます。正方形だけで囲まれている形を「立方体」といいます。

直方体にも立方体にも、平らな面（平面）が6つ、辺が12本、頂点（かどの点）が8つあります。面・辺・頂点の数は、直方体と立方体で同じです。

立体の名前は、面の形や辺の長さの組み合わせから決まります。長方形の面をふくむものは直方体、すべての面が正方形になっているものは立方体です。`,
    keyPoints: [
      "直方体：長方形や正方形で囲まれている立体",
      "立方体：正方形だけで囲まれている立体",
      "直方体・立方体はどちらも、面が6つ、辺が12本、頂点が8つ",
      "面がすべて正方形なら立方体、長方形をふくむなら直方体",
    ],
    diagram: {
      kind: "rectangular-prism",
      widthLabel: "横",
      heightLabel: "高さ",
      depthLabel: "たて",
    },
    notebookExample: {
      question: "例：たて3cm、横3cm、高さ18cmの立体の名前",
      lines: [
        "たてと横は同じ長さだが、高さがちがう",
        "長方形の面があるので、直方体",
      ],
    },
  },
  practiceProblems: [
    {
      id: "g4-rectprism-easy-1",
      difficulty: "easy",
      question: "長方形や正方形で囲まれている形を何といいますか。",
      answer: "直方体",
      steps: ["長方形や正方形で囲まれている形を「直方体」という"],
      tags: ["直方体と立方体"],
    },
    {
      id: "g4-rectprism-easy-2",
      difficulty: "easy",
      question: "正方形だけで囲まれている形を何といいますか。",
      answer: "立方体",
      steps: ["正方形だけで囲まれている形を「立方体」という"],
      tags: ["直方体と立方体"],
    },
    {
      id: "g4-rectprism-normal-1",
      difficulty: "normal",
      question: "立方体の面の数はいくつですか。",
      answer: "6",
      steps: ["立方体の面の数は6"],
      tags: ["面・辺・頂点の数"],
    },
    {
      id: "g4-rectprism-normal-2",
      difficulty: "normal",
      question: "立方体の辺の数はいくつですか。",
      answer: "12",
      steps: ["立方体の辺の数は12"],
      tags: ["面・辺・頂点の数"],
    },
  ],
  assessmentProblems: [
    {
      id: "g4-rectprism-easy-3",
      difficulty: "easy",
      question: "立方体の頂点の数はいくつですか。",
      answer: "8",
      steps: ["立方体の頂点の数は8"],
      tags: ["面・辺・頂点の数"],
    },
    {
      id: "g4-rectprism-normal-3",
      difficulty: "normal",
      question: "直方体の面の数はいくつですか。",
      answer: "6",
      steps: ["直方体の面の数は6"],
      tags: ["面・辺・頂点の数"],
    },
    {
      id: "g4-rectprism-normal-4",
      difficulty: "normal",
      question: "直方体の辺の数はいくつですか。",
      answer: "12",
      steps: ["直方体の辺の数は12"],
      tags: ["面・辺・頂点の数"],
    },
    {
      id: "g4-rectprism-normal-5",
      difficulty: "normal",
      question: "直方体の頂点の数はいくつですか。",
      answer: "8",
      steps: ["直方体の頂点の数は8"],
      tags: ["面・辺・頂点の数"],
    },
    {
      id: "g4-rectprism-normal-6",
      difficulty: "normal",
      question: "直方体と立方体で、面の数・辺の数・頂点の数はそれぞれ同じですか、ちがいますか。",
      answer: "同じ",
      steps: ["どちらも面が6つ、辺が12本、頂点が8つ", "面・辺・頂点の数は同じ"],
      tags: ["面・辺・頂点の数"],
    },
    {
      id: "g4-rectprism-hard-1",
      difficulty: "hard",
      question: "たて3cm、横3cm、高さ18cmの直方体（長方形の面をふくむ）の名前を答えましょう。",
      answer: "直方体",
      figure: {
        kind: "rectangular-prism",
        depthLabel: "3cm",
        widthLabel: "3cm",
        heightLabel: "18cm",
      },
      steps: ["たて・横は同じ長さだが、高さがちがうので長方形の面ができる", "長方形をふくむので直方体"],
      tags: ["直方体と立方体"],
    },
    {
      id: "g4-rectprism-hard-2",
      difficulty: "hard",
      question: "たて16cm、横16cm、高さ16cmの立体の名前を答えましょう。",
      answer: "立方体",
      figure: {
        kind: "rectangular-prism",
        depthLabel: "16cm",
        widthLabel: "16cm",
        heightLabel: "16cm",
        isCube: true,
      },
      steps: ["たて・横・高さがすべて同じ長さ", "すべての面が正方形になるので立方体"],
      tags: ["直方体と立方体"],
    },
  ],
};
