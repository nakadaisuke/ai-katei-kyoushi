import type { Chapter } from "@/lib/types";

// 問題は下記の実在教材の設問・解答をもとに作成（AIによる自由生成は行っていない）。
// - 宮城県教育センター「わくわくワーク」小学4年 算数 単元9「垂直・並行と四角形」
//   https://www.edu-c.pref.miyagi.jp/tangen/math/ele4_math/answer/28.els4.kaitou.09.1hop.pdf
//   https://www.edu-c.pref.miyagi.jp/tangen/math/ele4_math/answer/29.els4.kaitou.09.2stp.pdf
//   https://www.edu-c.pref.miyagi.jp/tangen/math/ele4_math/answer/30.els4.kaitou.09.3jmp.pdf
// 注：地図から垂直・平行な道を見つける問題や紙を折って切る問題など、写真・実物操作が
// 前提の設問は図コンポーネントでは再現しきれないため、引き続き文章のみで出題する。
export const g4Quadrilaterals: Chapter = {
  id: "g4-quadrilaterals",
  grade: "小学4年",
  title: "垂直，平行と四角形",
  explanation: {
    summary: `直角に交わる2本の直線は「垂直」であるといいます。どこまでのばしても交わらない2本の直線は「平行」であるといいます。

四角形には、いろいろな仲間があります。向かい合った1組の辺が平行な四角形を「台形」、向かい合った2組の辺がどちらも平行な四角形を「平行四辺形」といいます。平行四辺形のうち、4つの角がすべて直角になったものが「長方形」、4つの辺の長さがすべて等しくなったものが「ひし形」です。長方形とひし形の両方の性質を持つ（4つの角が直角で、4つの辺の長さが等しい）四角形が「正方形」です。

平行四辺形では、向かい合う辺の長さが等しく、向かい合う角の大きさも等しくなっています。また、平行四辺形の2本の対角線は、それぞれのまん中の点で交わります。ひし形の対角線は、さらに垂直に交わるという性質があります。`,
    keyPoints: [
      "直角に交わる2本の直線は「垂直」、どこまでのばしても交わらない2本の直線は「平行」",
      "台形：向かい合った1組の辺が平行な四角形",
      "平行四辺形：向かい合った2組の辺がどちらも平行な四角形（向かい合う辺・角がそれぞれ等しい）",
      "長方形：4つの角がすべて直角な四角形　ひし形：4つの辺の長さがすべて等しい四角形",
      "正方形：4つの角がすべて直角で、4つの辺の長さがすべて等しい四角形",
      "平行四辺形の対角線はまん中の点で交わる。ひし形の対角線はさらに垂直に交わる",
    ],
    diagrams: [
      { kind: "lines", relation: "perpendicular" },
      { kind: "lines", relation: "parallel" },
    ],
    diagram: {
      kind: "quadrilateral",
      shape: "parallelogram",
      vertexLabels: ["ア", "イ", "ウ", "エ"],
      parallelMarks: [1, 2, 1, 2],
    },
    notebookExample: {
      question: "例：平行四辺形の対角線がまん中の点で交わる性質を使う",
      lines: [
        "対角線はまん中の点で2等分される",
        "交点から一方のはしまでの長さが4cmなら、対角線全体は4cm×2=8cm",
      ],
    },
    midCheckpoint: {
      summary: `ここまでで、垂直・平行の意味と、ひし形の基本的な性質（4つの辺の長さが等しい）を確認しました。

ここからは、台形・平行四辺形・長方形・ひし形・正方形のちがいや、対角線の性質について、もう少しくわしい問題に取り組みます。進む前に、四角形の仲間分けをもう一度確認しておきましょう。

台形（向かい合う1組の辺が平行）→ 平行四辺形（向かい合う2組の辺が平行）→ 長方形（4つの角が直角）またはひし形（4つの辺が等しい）→ 正方形（長方形とひし形の両方の性質を持つ）、という関係になっています。`,
      keyPoints: [
        "台形：向かい合った1組の辺が平行な四角形",
        "平行四辺形：向かい合った2組の辺が平行な四角形",
        "長方形：平行四辺形のうち4つの角がすべて直角なもの",
        "ひし形：平行四辺形のうち4つの辺の長さがすべて等しいもの",
        "正方形：長方形とひし形の両方の性質を持つ四角形",
      ],
      diagrams: [
        { kind: "quadrilateral", shape: "trapezoid" },
        { kind: "quadrilateral", shape: "parallelogram", parallelMarks: [1, 2, 1, 2] },
        { kind: "quadrilateral", shape: "rectangle", showRightAngles: true },
        { kind: "quadrilateral", shape: "rhombus", equalMarks: [1, 1, 1, 1] },
        { kind: "quadrilateral", shape: "square", showRightAngles: true, equalMarks: [1, 1, 1, 1] },
      ],
    },
  },
  practiceProblems: [
    {
      id: "g4-quad-easy-1",
      difficulty: "easy",
      question: "直角に交わる2本の直線の関係を何といいますか。",
      answer: "垂直",
      steps: ["直角に交わる2本の直線は「垂直」であるという"],
      tags: ["垂直・平行"],
    },
    {
      id: "g4-quad-easy-2",
      difficulty: "easy",
      question:
        "長方形アイウエ（頂点が ア→イ→ウ→エ の順にならんでいる）で、辺アイと平行な辺はどれですか。",
      answer: "辺エウ",
      figure: {
        kind: "quadrilateral",
        shape: "rectangle",
        vertexLabels: ["ア", "イ", "ウ", "エ"],
        showRightAngles: true,
      },
      steps: ["長方形では向かい合う辺どうしが平行になっている", "辺アイの向かい合う辺は辺エウ"],
      tags: ["垂直・平行"],
    },
    {
      id: "g4-quad-normal-1",
      difficulty: "normal",
      question: "4つの辺の長さがみな等しい四角形を何といいますか。",
      answer: "ひし形",
      figure: {
        kind: "quadrilateral",
        shape: "rhombus",
        equalMarks: [1, 1, 1, 1],
      },
      steps: ["4つの辺の長さがすべて等しい四角形を「ひし形」という"],
      tags: ["四角形の仲間"],
    },
    {
      id: "g4-quad-normal-2",
      difficulty: "normal",
      question: "ひし形では、向かい合った辺は平行です。では、向かい合った角の大きさはどうなっていますか。",
      answer: "等しい",
      figure: {
        kind: "quadrilateral",
        shape: "rhombus",
        equalMarks: [1, 1, 1, 1],
        parallelMarks: [1, 2, 1, 2],
      },
      steps: ["ひし形は平行四辺形の仲間なので、向かい合った角の大きさは等しい"],
      tags: ["ひし形の性質"],
    },
  ],
  assessmentProblems: [
    {
      id: "g4-quad-normal-3",
      difficulty: "normal",
      question:
        "平行四辺形アイウエの2本の対角線アウとイエは、それぞれのまん中の点で交わります。対角線イエの半分の長さが4cmのとき、対角線イエ全体の長さは何cmですか。",
      answer: "8cm",
      figure: {
        kind: "quadrilateral",
        shape: "parallelogram",
        vertexLabels: ["ア", "イ", "ウ", "エ"],
        showDiagonals: true,
      },
      steps: ["平行四辺形の対角線は、まん中の点で2等分される", "半分が4cmなので、全体は4cm×2=8cm"],
      tags: ["平行四辺形の性質", "文章題"],
    },
    {
      id: "g4-quad-normal-4",
      difficulty: "normal",
      question:
        "画用紙を2つ折りにして二等辺三角形をかき、2枚重ねてある辺を切り取ります。それを開くとできる四角形は何ですか。",
      answer: "ひし形",
      steps: ["2つ折りにして重ねて切るので、4つの辺の長さがすべて同じになる", "4つの辺の長さが同じ四角形はひし形"],
      tags: ["ひし形の性質", "文章題"],
    },
    {
      id: "g4-quad-normal-5",
      difficulty: "normal",
      question:
        "正方形、長方形、ひし形、台形、平行四辺形のうち、対角線で2つの三角形に分けたとき、その2つの三角形がぴったり重なる四角形をすべて答えましょう。",
      answer: "正方形、長方形、ひし形、平行四辺形",
      steps: [
        "対角線で分けた2つの三角形が同じ形・大きさになるか調べる",
        "台形は向かい合う辺の長さがそろわないため、ぴったり重ならない",
        "正方形・長方形・ひし形・平行四辺形はすべて重なる",
      ],
      tags: ["四角形の性質"],
    },
    {
      id: "g4-quad-hard-1",
      difficulty: "hard",
      question:
        "正方形、長方形、ひし形、台形、平行四辺形のうち、2本の対角線が垂直に交わる四角形をすべて答えましょう。",
      answer: "正方形とひし形",
      steps: ["対角線が垂直に交わる四角形は、正方形とひし形", "長方形・台形・平行四辺形の対角線は垂直に交わらない"],
      tags: ["四角形の性質"],
    },
    {
      id: "g4-quad-normal-6",
      difficulty: "normal",
      question: "ひし形を1本の対角線で切ると、2つの三角形ができます。この三角形の名前を答えましょう。",
      answer: "二等辺三角形",
      figure: {
        kind: "quadrilateral",
        shape: "rhombus",
        equalMarks: [1, 1, 1, 1],
      },
      steps: ["ひし形は4つの辺の長さがすべて等しい", "切ってできる三角形も2つの辺の長さが等しくなる", "だから二等辺三角形"],
      tags: ["ひし形の性質"],
    },
    {
      id: "g4-quad-hard-2",
      difficulty: "hard",
      question: "ひし形を2本の対角線で切ると、4つの三角形ができます。この三角形の名前を答えましょう。",
      answer: "直角三角形",
      figure: {
        kind: "quadrilateral",
        shape: "rhombus",
        equalMarks: [1, 1, 1, 1],
        showDiagonals: true,
      },
      steps: ["ひし形の対角線は垂直に交わる", "垂直に交わる対角線で切られた三角形には直角ができる", "だから直角三角形"],
      tags: ["ひし形の性質"],
    },
    {
      id: "g4-quad-hard-3",
      difficulty: "hard",
      question:
        "紙を4つ折りにして、折り目の角から45°の線で1回切ります。それを開くとできる四角形の名前を答えましょう。",
      answer: "正方形",
      steps: [
        "4つ折りにした角から45°で切ると、開いたときに4つの辺の長さがすべて等しくなる",
        "さらに4つの角もすべて直角になる",
        "4つの辺が等しく4つの角が直角＝正方形",
      ],
      tags: ["四角形の性質", "文章題"],
    },
    {
      id: "g4-quad-easy-3",
      difficulty: "easy",
      question: "四角形を台形にするには、向かい合った1組の辺をどうすればよいですか。",
      answer: "平行にする",
      figure: { kind: "quadrilateral", shape: "trapezoid" },
      steps: ["台形は向かい合った1組の辺が平行な四角形"],
      tags: ["四角形の関係"],
    },
    {
      id: "g4-quad-normal-7",
      difficulty: "normal",
      question: "台形を平行四辺形にするには、もう1組の向かい合った辺をどうすればよいですか。",
      answer: "平行にする",
      figure: { kind: "quadrilateral", shape: "parallelogram", parallelMarks: [1, 2, 1, 2] },
      steps: ["平行四辺形は向かい合った2組の辺がどちらも平行な四角形"],
      tags: ["四角形の関係"],
    },
    {
      id: "g4-quad-normal-8",
      difficulty: "normal",
      question: "平行四辺形を長方形にするには、4つの角をどうすればよいですか。",
      answer: "直角にする",
      figure: { kind: "quadrilateral", shape: "rectangle", showRightAngles: true },
      steps: ["長方形は4つの角がすべて直角な平行四辺形"],
      tags: ["四角形の関係"],
    },
    {
      id: "g4-quad-normal-9",
      difficulty: "normal",
      question: "平行四辺形をひし形にするには、4つの辺の長さをどうすればよいですか。",
      answer: "等しくする",
      figure: { kind: "quadrilateral", shape: "rhombus", equalMarks: [1, 1, 1, 1] },
      steps: ["ひし形は4つの辺の長さがすべて等しい平行四辺形"],
      tags: ["四角形の関係"],
    },
    {
      id: "g4-quad-normal-10",
      difficulty: "normal",
      question: "長方形を正方形にするには、4つの辺の長さをどうすればよいですか。",
      answer: "等しくする",
      figure: { kind: "quadrilateral", shape: "square", showRightAngles: true, equalMarks: [1, 1, 1, 1] },
      steps: ["正方形は4つの辺の長さがすべて等しい長方形"],
      tags: ["四角形の関係"],
    },
    {
      id: "g4-quad-normal-11",
      difficulty: "normal",
      question: "ひし形を正方形にするには、4つの角をどうすればよいですか。",
      answer: "直角にする",
      figure: { kind: "quadrilateral", shape: "square", showRightAngles: true, equalMarks: [1, 1, 1, 1] },
      steps: ["正方形は4つの角がすべて直角なひし形"],
      tags: ["四角形の関係"],
    },
  ],
};
