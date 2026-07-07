import type { Chapter } from "@/lib/types";

// 問題は下記の実在教材の設問・解答をもとに作成（AIによる自由生成は行っていない）。
// - 宮城県教育センター「わくわくワーク」小学3年 算数 単元17「三角形と角」
//   https://www.edu-c.pref.miyagi.jp/tangen/math/ele3_math/answer/00.els3.kaitou.all.pdf
// - 埼玉県「学力向上ワークシート」算数 小学3年 17 三角形
//   https://www.pref.saitama.lg.jp/documents/56538/3-17sankakkei-mondai.pdf
// - 大阪府「小学校算数・ワークブック」3年 三角形と角①〜⑤
//   https://www.pref.osaka.lg.jp/documents/9096/h26323-emw-3c121~5.pdf
//   （県・府の著作権ページには教育目的の一律利用許可の記載はなく、すたぺんドリルと
//   同様に「個人利用の範囲で使用し、商用化・配布前に見直す」caveatを踏襲する）
export const g3Triangles: Chapter = {
  id: "g3-triangles",
  grade: "小学3年",
  title: "二等辺三角形・正三角形",
  explanation: {
    summary: `2つの辺の長さが等しい三角形を「二等辺三角形」といいます。
3つの辺の長さがすべて等しい三角形を「正三角形」といいます。

1つの頂点（ちょう点）から出ている2つの辺がつくる形を「角」といいます。正三角形の3つの角は、すべて60°で同じ大きさになります。

三角形の3つの辺の長さが分かっていれば、どの辺が等しいかを見て、二等辺三角形か正三角形かを判断できます。まわりの長さ（3つの辺の長さの合計）と、2つの辺の長さが分かっていれば、のこりの辺の長さも計算で求められます。`,
    keyPoints: [
      "二等辺三角形＝2つの辺の長さが等しい三角形",
      "正三角形＝3つの辺の長さがすべて等しい三角形",
      "1つの頂点から出る2つの辺がつくる形＝角",
      "正三角形の3つの角は、すべて60°",
      "まわりの長さ－分かっている辺の長さ＝のこりの辺の長さ",
    ],
    notebookExample: {
      question: "例：まわりの長さが19cmの三角形。2つの辺が7cm、5cmのとき、のこりの辺は？",
      lines: [
        "まわりの長さから分かっている2辺をひく：19 - 7 - 5 = 7",
        "のこりの辺は7cm",
        "辺の長さは7cm・7cm・5cmで、7cmの辺が2つ→二等辺三角形",
      ],
    },
  },
  practiceProblems: [
    {
      id: "g3-triangle-easy-1",
      difficulty: "easy",
      question: "2つの辺の長さが等しい三角形を何といいますか。",
      answer: "二等辺三角形",
      steps: ["2つの辺の長さが等しい三角形の名前を答える"],
      tags: ["三角形の用語"],
    },
    {
      id: "g3-triangle-easy-2",
      difficulty: "easy",
      question: "3つの辺の長さが等しい三角形を何といいますか。",
      answer: "正三角形",
      steps: ["3つの辺の長さがすべて等しい三角形の名前を答える"],
      tags: ["三角形の用語"],
    },
    {
      id: "g3-triangle-normal-1",
      difficulty: "normal",
      question: "1つの頂点（ちょう点）から出ている2つの辺がつくる形を何といいますか。",
      answer: "角",
      steps: ["1つの頂点から出る2つの辺がつくる形の名前を答える"],
      tags: ["三角形の用語"],
    },
    {
      id: "g3-triangle-normal-2",
      difficulty: "normal",
      question: "3つの辺の長さがすべて7cmで等しい三角形は、何三角形ですか。",
      answer: "正三角形",
      steps: ["3つの辺の長さがすべて等しいので、正三角形"],
      tags: ["三角形の分類"],
    },
  ],
  assessmentProblems: [
    {
      id: "g3-triangle-easy-3",
      difficulty: "easy",
      question: "2つの辺の長さが8cmで等しく、もう1つの辺の長さが5cmの三角形は、何三角形ですか。",
      answer: "二等辺三角形",
      steps: ["8cmの辺が2つあり、長さが等しいので、二等辺三角形"],
      tags: ["三角形の分類"],
    },
    {
      id: "g3-triangle-easy-4",
      difficulty: "easy",
      question: "3つの角の大きさが60°、60°、60°の三角形は、何三角形ですか。",
      answer: "正三角形",
      steps: ["正三角形の3つの角は、すべて60°になる", "3つの角が60°なので、正三角形"],
      tags: ["三角形の分類"],
    },
    {
      id: "g3-triangle-easy-5",
      difficulty: "easy",
      question: "三角形の3つの辺の長さが、すべて6cmです。この三角形は何三角形ですか。",
      answer: "正三角形",
      steps: ["3つの辺の長さがすべて等しいので、正三角形"],
      tags: ["三角形の分類"],
    },
    {
      id: "g3-triangle-normal-3",
      difficulty: "normal",
      question:
        "まわりの長さが19cmの三角形があります。その三角形の2つの辺の長さは、7cm、5cmでした。この三角形は、何という三角形ですか。",
      answer: "二等辺三角形",
      steps: [
        "まわりの長さから分かっている2辺をひいて、のこりの辺を求める：19 - 7 - 5 = 7",
        "辺の長さは7cm・7cm・5cmで、7cmの辺が2つある",
        "2つの辺の長さが等しいので、二等辺三角形",
      ],
      tags: ["三角形の分類", "文章題"],
    },
    {
      id: "g3-triangle-normal-4",
      difficulty: "normal",
      question:
        "同じ大きさの円が2つ交わっています。交わったところの1つをアとし、アとそれぞれの円の中心イ、ウを直線で結ぶと、どんな三角形ができますか。",
      answer: "二等辺三角形",
      steps: [
        "アイ、アウは、どちらも円の半径にあたる",
        "同じ大きさの円の半径は等しいので、アイとアウの長さは等しい",
        "2つの辺の長さが等しいので、二等辺三角形",
      ],
      tags: ["三角形の分類", "文章題"],
    },
    {
      id: "g3-triangle-normal-5",
      difficulty: "normal",
      question:
        "二等辺三角形の、等しい2つの辺の長さが、それぞれ9cmです。もう1つの辺の長さが4cmのとき、まわりの長さは何cmですか。",
      answer: "22",
      steps: ["3つの辺の長さをすべてたす", "9 + 9 + 4 = 22", "まわりの長さは22cm"],
      tags: ["まわりの長さ", "文章題"],
    },
    {
      id: "g3-triangle-normal-6",
      difficulty: "normal",
      question:
        "まわりの長さが19cmの三角形があります。その三角形の2つの辺の長さが、どちらも7cmです。のこりの1つの辺の長さは何cmですか。",
      answer: "5",
      steps: ["まわりの長さから分かっている2辺をひく", "19 - 7 - 7 = 5", "のこりの辺は5cm"],
      tags: ["まわりの長さ", "文章題"],
    },
    {
      id: "g3-triangle-hard-1",
      difficulty: "hard",
      question:
        "3本のぼうのはしとはしをつないで、二等辺三角形をつくります。5cmと11cmのぼうが1本ずつあります。あと何cmのぼうがあれば完成しますか。",
      answer: "11",
      steps: [
        "二等辺三角形は2つの辺の長さが等しい三角形",
        "3本目が5cmだとすると、等しい2辺の合計は5+5=10cmで、もう1つの辺11cmと三角形を作れない",
        "3本目が11cmなら、等しい2辺は11cmと11cmになり、三角形をつくれる",
        "あと11cmのぼうが必要",
      ],
      tags: ["三角形の分類", "文章題"],
    },
    {
      id: "g3-triangle-hard-2",
      difficulty: "hard",
      question:
        "半径6cmの同じ大きさの円が2つ交わっています。交わったところの1つをアとし、アとそれぞれの円の中心を直線で結んでできる三角形は二等辺三角形です。この三角形の、等しい長さの2つの辺は、それぞれ何cmですか。",
      answer: "6",
      steps: [
        "アと円の中心を結ぶ直線は、どちらもその円の半径にあたる",
        "半径はどちらも6cmなので、等しい2辺はそれぞれ6cm",
      ],
      tags: ["三角形の分類", "文章題"],
    },
    {
      id: "g3-triangle-hard-3",
      difficulty: "hard",
      question:
        "二等辺三角形の、等しい2つの辺の長さが、それぞれ8cmです。まわりの長さが24cmのとき、のこりの1つの辺の長さは何cmですか。",
      answer: "8",
      steps: ["まわりの長さから分かっている2辺をひく", "24 - 8 - 8 = 8", "のこりの辺は8cm"],
      tags: ["まわりの長さ", "文章題"],
    },
    {
      id: "g3-triangle-hard-4",
      difficulty: "hard",
      question: "正三角形の1つの辺の長さが9cmです。この正三角形のまわりの長さは何cmですか。",
      answer: "27",
      steps: ["正三角形は3つの辺の長さがすべて等しい", "9 × 3 = 27", "まわりの長さは27cm"],
      tags: ["まわりの長さ", "文章題"],
    },
    {
      id: "g3-triangle-easy-6",
      difficulty: "easy",
      question: "二等辺三角形で、角の大きさの等しい角はいくつありますか。",
      answer: "2",
      steps: ["二等辺三角形は、2つの辺の長さが等しい三角形", "等しい2つの辺にはさまれた角どうしが同じ大きさになる", "角の大きさの等しい角は2つ"],
      tags: ["三角形の用語"],
    },
    {
      id: "g3-triangle-easy-7",
      difficulty: "easy",
      question: "正三角形で、角の大きさの等しい角はいくつありますか。",
      answer: "3",
      steps: ["正三角形は、3つの辺の長さがすべて等しい三角形", "3つの辺が等しいので、3つの角もすべて等しくなる", "角の大きさの等しい角は3つ"],
      tags: ["三角形の用語"],
    },
    {
      id: "g3-triangle-normal-7",
      difficulty: "normal",
      question: "4cmのストローを1本、5cmのストローを2本つなげて三角形を作ります。何三角形になりますか。",
      answer: "二等辺三角形",
      steps: ["辺の長さは4cm・5cm・5cmで、5cmの辺が2つある", "2つの辺の長さが等しいので、二等辺三角形"],
      tags: ["三角形の分類"],
    },
    {
      id: "g3-triangle-normal-8",
      difficulty: "normal",
      question: "2cmのストローを3本つなげて三角形を作ります。何三角形になりますか。",
      answer: "正三角形",
      steps: ["辺の長さは2cm・2cm・2cmで、3つの辺の長さがすべて等しい", "正三角形"],
      tags: ["三角形の分類"],
    },
    {
      id: "g3-triangle-normal-9",
      difficulty: "normal",
      question: "4cmのストローを2本、5cmのストローを1本つなげて三角形を作ります。何三角形になりますか。",
      answer: "二等辺三角形",
      steps: ["辺の長さは4cm・4cm・5cmで、4cmの辺が2つある", "2つの辺の長さが等しいので、二等辺三角形"],
      tags: ["三角形の分類"],
    },
    {
      id: "g3-triangle-normal-10",
      difficulty: "normal",
      question: "4cmのストローを3本つなげて三角形を作ります。何三角形になりますか。",
      answer: "正三角形",
      steps: ["辺の長さは4cm・4cm・4cmで、3つの辺の長さがすべて等しい", "正三角形"],
      tags: ["三角形の分類"],
    },
    {
      id: "g3-triangle-normal-11",
      difficulty: "normal",
      question: "2cmのストローを1本、5cmのストローを2本つなげて三角形を作ります。何三角形になりますか。",
      answer: "二等辺三角形",
      steps: ["辺の長さは2cm・5cm・5cmで、5cmの辺が2つある", "2つの辺の長さが等しいので、二等辺三角形"],
      tags: ["三角形の分類"],
    },
    {
      id: "g3-triangle-normal-12",
      difficulty: "normal",
      question: "3つの辺の長さが、5cm、7cm、7cmの三角形は、何三角形ですか。",
      answer: "二等辺三角形",
      steps: ["7cmの辺が2つあり、長さが等しいので、二等辺三角形"],
      tags: ["三角形の分類"],
    },
    {
      id: "g3-triangle-normal-13",
      difficulty: "normal",
      question: "1つの辺の長さが6cmの正三角形の、まわりの長さは何cmですか。",
      answer: "18",
      steps: ["正三角形は3つの辺の長さがすべて等しい", "6 × 3 = 18", "まわりの長さは18cm"],
      tags: ["まわりの長さ", "文章題"],
    },
    {
      id: "g3-triangle-hard-5",
      difficulty: "hard",
      question: "5cmのストローを1本、2cmのストローを2本つなげようとしても、三角形を作ることができません。作れますか、作れませんか。",
      answer: "作れない",
      steps: ["2cmのストロー2本を5cmのストローの両はしから伸ばしても、2 + 2 = 4cmで5cmにとどかない", "3本のストローの両はしがくっつかないので、三角形は作れない"],
      tags: ["三角形の分類"],
    },
  ],
};
