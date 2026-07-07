import type { Chapter } from "@/lib/types";

// 問題は下記の実在教材の設問・解答をもとに作成（AIによる自由生成は行っていない）。
// - 宮城県教育センター「わくわくワーク」小学3年 算数 単元11「円と球」
//   https://www.edu-c.pref.miyagi.jp/tangen/math/ele3_math/answer/00.els3.kaitou.all.pdf
// - 埼玉県「学力向上ワークシート」算数 小学3年 11 円と球
//   https://www.pref.saitama.lg.jp/documents/56538/3-11entokyu-mondai.pdf
//   （県の著作権ページには教育目的の一律利用許可の記載はなく、すたぺんドリルと
//   同様に「個人利用の範囲で使用し、商用化・配布前に見直す」caveatを踏襲する）
export const g3CircleSphere: Chapter = {
  id: "g3-circle-sphere",
  grade: "小学3年",
  title: "円と球",
  explanation: {
    summary: `円のまん中の点を「中心」といいます。
中心から円のまわりまで引いた直線を「半径」、中心を通って円のまわりから反対側のまわりまで引いた直線を「直径」といいます。

直径の長さは、半径の長さの2倍になります（半径 × 2 = 直径）。

どこから見ても円に見える形を「球」といいます。ボールのような形です。球を真ん中で切ると、切り口はいちばん大きい円になり、その円の中心・半径・直径は、球の中心・半径・直径と同じ長さになります。

正方形や長方形の中に同じ大きさの円がぴったり並んでいるとき、円の直径のいくつ分が、正方形・長方形の1辺の長さになっているかを考えると、円の半径や直径を求めることができます。`,
    keyPoints: [
      "円のまん中の点＝中心",
      "中心からまわりまでの直線＝半径",
      "中心を通ってまわりからまわりまでの直線＝直径",
      "直径 ＝ 半径 × 2（半径 ＝ 直径 ÷ 2）",
      "どこから見ても円に見える形＝球",
      "図形の中に円がぴったり並んでいるときは、1辺の長さが直径の何こ分かを考える",
    ],
    notebookExample: {
      question: "例：半径7cmの円の直径、直径10cmの円の半径",
      lines: [
        "直径 ＝ 半径 × 2 → 7 × 2 = 14cm",
        "半径 ＝ 直径 ÷ 2 → 10 ÷ 2 = 5cm",
      ],
    },
    diagram: {
      kind: "circle",
      centerLabel: "中心",
      radiusLabel: "半径",
      showDiameter: true,
      diameterLabel: "直径",
    },
  },
  practiceProblems: [
    {
      id: "g3-circle-easy-1",
      difficulty: "easy",
      question: "円のまん中の点アのことを、何といいますか。",
      answer: "中心",
      steps: ["円のまん中の点は「中心」とよぶ"],
      tags: ["円の用語"],
      figure: { kind: "circle", centerLabel: "ア" },
    },
    {
      id: "g3-circle-easy-2",
      difficulty: "easy",
      question: "半径の長さが7cmのとき、直径の長さは何cmですか。",
      answer: "14",
      steps: ["直径 ＝ 半径 × 2", "7 × 2 = 14cm"],
      tags: ["半径と直径"],
    },
    {
      id: "g3-circle-normal-1",
      difficulty: "normal",
      question: "直径40cmの球の半径は何cmですか。",
      answer: "20",
      steps: ["半径 ＝ 直径 ÷ 2", "40 ÷ 2 = 20cm"],
      tags: ["半径と直径", "球"],
    },
    {
      id: "g3-circle-normal-2",
      difficulty: "normal",
      question: "円の中心アを通る直線イウ（直径）の長さが10cmのとき、直線アエ（半径）は何cmですか。",
      answer: "5",
      steps: ["半径 ＝ 直径 ÷ 2", "10 ÷ 2 = 5cm"],
      tags: ["半径と直径"],
    },
  ],
  assessmentProblems: [
    {
      id: "g3-circle-easy-3",
      difficulty: "easy",
      question: "直径は、円の何を通りますか。",
      answer: "中心",
      steps: ["直径は必ず円の中心を通る"],
      tags: ["円の用語"],
      figure: { kind: "circle", centerLabel: "中心", showDiameter: true, diameterLabel: "直径" },
    },
    {
      id: "g3-circle-easy-4",
      difficulty: "easy",
      question: "どこから見ても円に見える形を、何といいますか。",
      answer: "球",
      steps: ["どこから見ても円に見える立体の形を「球」という"],
      tags: ["円の用語"],
    },
    {
      id: "g3-circle-normal-3",
      difficulty: "normal",
      question: "右の図で、円の中心アから円のまわりに引いた直線アウのことを、何といいますか。",
      answer: "半径",
      steps: ["中心からまわりまでの直線は「半径」とよぶ"],
      tags: ["円の用語"],
      figure: { kind: "circle", centerLabel: "ア", radiusLabel: "アウ" },
    },
    {
      id: "g3-circle-normal-4",
      difficulty: "normal",
      question: "直線ウエ（直径）の長さは、直線アイ（半径）の長さの何倍ですか。",
      answer: "2",
      steps: ["直径は半径の2倍の長さになる"],
      tags: ["半径と直径"],
      figure: {
        kind: "circle",
        centerLabel: "中心",
        radiusLabel: "アイ",
        showDiameter: true,
        diameterLabel: "ウエ",
      },
    },
    {
      id: "g3-circle-normal-5",
      difficulty: "normal",
      question:
        "1辺が8cmの正方形の中に、同じ大きさの円がきちんと4つ入っています。この円の半径は何cmですか。",
      answer: "2",
      steps: [
        "円が2つずつ並んでいるので、円の直径2つ分が正方形の1辺（8cm）になる",
        "直径：8 ÷ 2 = 4cm",
        "半径：4 ÷ 2 = 2cm",
      ],
      tags: ["半径と直径", "文章題"],
    },
    {
      id: "g3-circle-hard-1",
      difficulty: "hard",
      question:
        "横の長さが12cmの長方形の中に、3つの同じ大きさの円がきちんと入っています。この円の半径は何cmですか。",
      answer: "2",
      steps: [
        "円の直径3つ分が長方形の横の長さ（12cm）になる",
        "直径：12 ÷ 3 = 4cm",
        "半径：4 ÷ 2 = 2cm",
      ],
      tags: ["半径と直径", "文章題"],
    },
    {
      id: "g3-circle-hard-2",
      difficulty: "hard",
      question:
        "野球のボール12こが、長方形のはこの中にきちんとすきまなく入っています。はこの横の長さは28cmで、ボールは横に4つ並んでいます。このボールの直径は何cmになりますか。",
      answer: "7",
      steps: [
        "ボールの直径4つ分が、はこの横の長さ（28cm）になる",
        "28 ÷ 4 = 7cm",
      ],
      tags: ["半径と直径", "文章題"],
    },
    {
      id: "g3-circle-hard-3",
      difficulty: "hard",
      question:
        "同じ野球のボール（直径7cm）が、はこの中にたてに3つ並んでいます。はこのたての長さは何cmになりますか。",
      answer: "21",
      steps: [
        "ボールの直径×たての個数を求める",
        "7 × 3 = 21cm",
      ],
      tags: ["半径と直径", "文章題", "複合問題"],
    },
    {
      id: "g3-circle-hard-4",
      difficulty: "hard",
      question: "直径2cmの円を4つ、横一列にすきまなく並べます。全体の長さは何cmになりますか。",
      answer: "8",
      steps: [
        "直径×こ数を求める",
        "2 × 4 = 8cm",
      ],
      tags: ["半径と直径", "文章題"],
    },
    {
      id: "g3-circle-hard-5",
      difficulty: "hard",
      question: "半径3cmの球を2つ、横にぴったりくっつけて並べます。全体の長さは何cmになりますか。",
      answer: "12",
      steps: [
        "まず直径を求める：半径 × 2 = 3 × 2 = 6cm",
        "直径×こ数を求める：6 × 2 = 12cm",
      ],
      tags: ["半径と直径", "文章題", "複合問題"],
    },
    {
      id: "g3-circle-easy-5",
      difficulty: "easy",
      question:
        "次の文は正しいですか、まちがっていますか。「半径の長さは、直径の2倍である」",
      answer: "まちがっている",
      steps: ["正しくは「直径 ＝ 半径 × 2」なので、この文は逆になっている", "まちがっている"],
      tags: ["半径と直径"],
    },
    {
      id: "g3-circle-easy-6",
      difficulty: "easy",
      question: "次の文は正しいですか、まちがっていますか。「1つの円では、半径はみんな同じ長さである」",
      answer: "正しい",
      steps: ["同じ円の半径（中心からまわりまでの直線）は、どこをとっても同じ長さになる", "正しい"],
      tags: ["円の用語"],
    },
    {
      id: "g3-circle-normal-6",
      difficulty: "normal",
      question: "1辺の長さが8cmの正方形の中に、ぴったりと円が1つ入っています。この円の半径は何cmですか。",
      answer: "4",
      steps: ["円の直径が正方形の1辺の長さと同じになる：直径＝8cm", "半径 ＝ 直径 ÷ 2 ＝ 8 ÷ 2 ＝ 4cm"],
      tags: ["半径と直径", "文章題"],
    },
    {
      id: "g3-circle-normal-7",
      difficulty: "normal",
      question: "1辺の長さが12cmの正方形の中に、ぴったりと円が1つ入っています。この円の半径は何cmですか。",
      answer: "6",
      steps: ["円の直径が正方形の1辺の長さと同じになる：直径＝12cm", "半径 ＝ 直径 ÷ 2 ＝ 12 ÷ 2 ＝ 6cm"],
      tags: ["半径と直径", "文章題"],
    },
    {
      id: "g3-circle-hard-6",
      difficulty: "hard",
      question: "直径4cmの円を2つ、ぴったりとくっつけて横に並べました。両はしを結ぶ直線の長さは何cmですか。",
      answer: "8",
      steps: ["直径 × こ数を求める", "4 × 2 = 8cm"],
      tags: ["半径と直径", "文章題"],
    },
    {
      id: "g3-circle-hard-7",
      difficulty: "hard",
      question: "直径6cmの円を3つ、ぴったりとくっつけて横に並べました。両はしを結ぶ直線の長さは何cmですか。",
      answer: "18",
      steps: ["直径 × こ数を求める", "6 × 3 = 18cm"],
      tags: ["半径と直径", "文章題"],
    },
    {
      id: "g3-circle-hard-8",
      difficulty: "hard",
      question:
        "半径4cmのボールが3こ、ぴったり横に並んで入っている箱があります。この箱のたての長さは何cmですか。",
      answer: "8",
      steps: ["たての長さは、ボール1こ分の直径と同じになる", "直径 ＝ 半径 × 2 ＝ 4 × 2 ＝ 8cm"],
      tags: ["半径と直径", "文章題", "複合問題"],
    },
    {
      id: "g3-circle-hard-9",
      difficulty: "hard",
      question:
        "半径4cmのボールが3こ、ぴったり横に並んで入っている箱があります。この箱の横の長さは何cmですか。",
      answer: "24",
      steps: [
        "まず直径を求める：半径 × 2 ＝ 4 × 2 ＝ 8cm",
        "直径 × こ数を求める：8 × 3 ＝ 24cm",
      ],
      tags: ["半径と直径", "文章題", "複合問題"],
    },
    {
      id: "g3-circle-hard-10",
      difficulty: "hard",
      question:
        "たての長さが80cm、横の長さが120cmの紙に、同じ大きさの円が、たてに2こ、横に3こ、ぴったり並んでいます。この円の半径は何cmですか。",
      answer: "20",
      steps: [
        "たての長さを使って直径を求める：円がたてに2つ並んでいるので、80 ÷ 2 ＝ 40cm（直径）",
        "半径 ＝ 直径 ÷ 2 ＝ 40 ÷ 2 ＝ 20cm",
      ],
      tags: ["半径と直径", "文章題", "複合問題"],
    },
  ],
};
