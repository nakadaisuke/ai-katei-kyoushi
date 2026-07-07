import type { Chapter } from "@/lib/types";

// 問題は下記の実在教材の設問・解答をもとに作成（AIによる自由生成は行っていない）。
// - 宮城県教育センター「わくわくワーク」小学3年 算数 単元18「ぼうグラフと表」
//   https://www.edu-c.pref.miyagi.jp/tangen/math/ele3_math/answer/00.els3.kaitou.all.pdf
// - 埼玉県「学力向上ワークシート」算数 小学3年 18 ぼうグラフと表
//   https://www.pref.saitama.lg.jp/documents/56538/3-18bougurahu-mondai.pdf
//   （県の著作権ページには教育目的の一律利用許可の記載はなく、すたぺんドリルと
//   同様に「個人利用の範囲で使用し、商用化・配布前に見直す」caveatを踏襲する）
export const g3BarGraphs: Chapter = {
  id: "g3-bar-graphs",
  grade: "小学3年",
  title: "棒グラフと表",
  explanation: {
    summary: `調べたことを表に整理すると、数のようすが分かりやすくなります。表のたてとよこの見出しを組み合わせて読むと、それぞれの数を読み取ることができます。

「合計」の行や列は、それぞれの数を全部たしたものです。表の一部が空らんのときは、他の数と合計から、たし算・ひき算で空らんの数を求めることができます。

棒グラフは、数の大きさを棒の高さで表したグラフです。たて軸の目もりを読むと、棒が表す数が分かります。1目もりがいくつを表しているかを最初に確認しましょう。

棒グラフを見ると、どれがいちばん多いか・少ないか、それぞれが何倍かなどが、ひと目で分かります。`,
    keyPoints: [
      "表の「合計」は、その行（または列）の数を全部たしたもの",
      "表の空らんは、合計と他の数からたし算・ひき算で求められる",
      "棒グラフは、棒の高さが数の大きさを表す",
      "棒グラフを読むときは、まず1目もりがいくつを表しているかを確認する",
    ],
    notebookExample: {
      question: "例：合計35人のうち、カレーライス9人、ハンバーグ7人、スパゲッティ5人、その他6人。やきそばは何人？",
      lines: [
        "分かっている数を全部たす：9 + 7 + 5 + 6 = 27",
        "合計からひく：35 - 27 = 8",
        "やきそばは8人",
      ],
    },
  },
  practiceProblems: [
    {
      id: "g3-bargraph-easy-1",
      difficulty: "easy",
      question: "下の表は、4種類のカードの数を調べたものです。カードはぜんぶで何まいありますか。",
      answer: "31",
      figure: {
        kind: "table",
        columns: ["数（まい）"],
        rows: [
          { label: "♠のカード", cells: [8] },
          { label: "♡のカード", cells: [10] },
          { label: "♣のカード", cells: [6] },
          { label: "◇のカード", cells: [7] },
        ],
      },
      steps: ["それぞれの数をすべてたす", "8 + 10 + 6 + 7 = 31", "ぜんぶで31まい"],
      tags: ["表の読み取り"],
    },
    {
      id: "g3-bargraph-easy-2",
      difficulty: "easy",
      question: "上の表で、いちばん多いカードの種類は何ですか。",
      answer: "♡のカード",
      figure: {
        kind: "table",
        columns: ["数（まい）"],
        rows: [
          { label: "♠のカード", cells: [8] },
          { label: "♡のカード", cells: [10] },
          { label: "♣のカード", cells: [6] },
          { label: "◇のカード", cells: [7] },
        ],
      },
      steps: ["それぞれの数をくらべる：8, 10, 6, 7", "いちばん大きいのは10の♡のカード"],
      tags: ["表の読み取り"],
    },
    {
      id: "g3-bargraph-normal-1",
      difficulty: "normal",
      question: "下の棒グラフは、すきな飲み物についてまとめたものです。グラフの1目もりは、何人を表していますか。",
      answer: "2",
      figure: {
        kind: "bar-chart",
        unit: "人",
        maxValue: 20,
        yLabels: [0, 10, 20],
        bars: [
          { label: "ジュース", value: 16 },
          { label: "お茶", value: 8 },
          { label: "牛にゅう", value: 6 },
          { label: "ココア", value: 4 },
          { label: "その他", value: 4 },
        ],
      },
      steps: ["0から10までの間の目もりの数を数える", "0〜10の間に5目もりあるので、1目もりは10÷5=2人"],
      tags: ["棒グラフの読み取り"],
    },
    {
      id: "g3-bargraph-normal-2",
      difficulty: "normal",
      question: "上の棒グラフで、お茶がすきな人は何人ですか。",
      answer: "8",
      figure: {
        kind: "bar-chart",
        unit: "人",
        maxValue: 20,
        yLabels: [0, 10, 20],
        bars: [
          { label: "ジュース", value: 16 },
          { label: "お茶", value: 8 },
          { label: "牛にゅう", value: 6 },
          { label: "ココア", value: 4 },
          { label: "その他", value: 4 },
        ],
      },
      steps: ["お茶の棒の高さを目もりで読む", "8人のところまで棒がのびている"],
      tags: ["棒グラフの読み取り"],
    },
  ],
  assessmentProblems: [
    {
      id: "g3-bargraph-easy-3",
      difficulty: "easy",
      question:
        "下の表は、すきなきゅう食についてまとめたものです。カレーライス9人、ハンバーグ7人、やきそば？人、スパゲッティ5人、その他6人で、合計は35人でした。やきそばがすきな人は何人ですか。",
      answer: "8",
      figure: {
        kind: "table",
        columns: ["人数（人）"],
        rows: [
          { label: "カレーライス", cells: [9] },
          { label: "ハンバーグ", cells: [7] },
          { label: "やきそば", cells: ["？"] },
          { label: "スパゲッティ", cells: [5] },
          { label: "その他", cells: [6] },
          { label: "合計", cells: [35] },
        ],
      },
      steps: ["分かっている数を全部たす：9 + 7 + 5 + 6 = 27", "合計からひく：35 - 27 = 8", "やきそばは8人"],
      tags: ["表の読み取り", "文章題"],
    },
    {
      id: "g3-bargraph-easy-4",
      difficulty: "easy",
      question: "すきな飲み物の棒グラフで、ジュースがすきな人は、お茶がすきな人の何倍ですか。",
      answer: "2",
      figure: {
        kind: "bar-chart",
        unit: "人",
        maxValue: 20,
        yLabels: [0, 10, 20],
        bars: [
          { label: "ジュース", value: 16 },
          { label: "お茶", value: 8 },
          { label: "牛にゅう", value: 6 },
          { label: "ココア", value: 4 },
          { label: "その他", value: 4 },
        ],
      },
      steps: ["ジュースは16人、お茶は8人", "16 ÷ 8 = 2", "2倍"],
      tags: ["棒グラフの読み取り"],
    },
    {
      id: "g3-bargraph-easy-5",
      difficulty: "easy",
      question: "すきな飲み物を調べた人数は、合計で何人ですか。",
      answer: "38",
      figure: {
        kind: "bar-chart",
        unit: "人",
        maxValue: 20,
        yLabels: [0, 10, 20],
        bars: [
          { label: "ジュース", value: 16 },
          { label: "お茶", value: 8 },
          { label: "牛にゅう", value: 6 },
          { label: "ココア", value: 4 },
          { label: "その他", value: 4 },
        ],
      },
      steps: ["それぞれの人数をすべてたす", "16 + 8 + 6 + 4 + 4 = 38", "合計38人"],
      tags: ["棒グラフの読み取り", "文章題"],
    },
    {
      id: "g3-bargraph-normal-3",
      difficulty: "normal",
      question:
        "けんじさんのクラスで、イヌとネコをかっているかを調べた表があります。表の（ア）にあてはまる数はいくつですか。",
      answer: "4",
      figure: {
        kind: "table",
        columns: ["ネコ：かっている", "ネコ：かっていない", "合計"],
        rows: [
          { label: "イヌ：かっている", cells: [2, "イ", 9] },
          { label: "イヌ：かっていない", cells: ["ア", 17, "ウ"] },
          { label: "合計", cells: [6, 24, 30] },
        ],
      },
      steps: ["ネコをかっている列の合計は6", "6 - 2 = 4", "ア = 4"],
      tags: ["表の読み取り"],
    },
    {
      id: "g3-bargraph-normal-4",
      difficulty: "normal",
      question: "同じ表で、表の（ウ）にあてはまる数はいくつですか。",
      answer: "21",
      figure: {
        kind: "table",
        columns: ["ネコ：かっている", "ネコ：かっていない", "合計"],
        rows: [
          { label: "イヌ：かっている", cells: [2, "イ", 9] },
          { label: "イヌ：かっていない", cells: ["ア", 17, "ウ"] },
          { label: "合計", cells: [6, 24, 30] },
        ],
      },
      steps: ["イヌをかっていない行の合計を求める", "ア(4) + 17 = 21", "ウ = 21"],
      tags: ["表の読み取り"],
    },
    {
      id: "g3-bargraph-normal-5",
      difficulty: "normal",
      question:
        "同じ表で、（イ）は「イヌをかっていて、ネコはかっていない人の数」を表しています。表からイの値を求めましょう。",
      answer: "7",
      figure: {
        kind: "table",
        columns: ["ネコ：かっている", "ネコ：かっていない", "合計"],
        rows: [
          { label: "イヌ：かっている", cells: [2, "イ", 9] },
          { label: "イヌ：かっていない", cells: ["ア", 17, "ウ"] },
          { label: "合計", cells: [6, 24, 30] },
        ],
      },
      steps: ["イヌをかっている行の合計は9", "9 - 2 = 7", "イ = 7"],
      tags: ["表の読み取り"],
    },
    {
      id: "g3-bargraph-normal-6",
      difficulty: "normal",
      question: "3年生の3クラスですきなスポーツを調べ、1つの表にまとめました。表の（ア）に入る人数は何人ですか。",
      answer: "80",
      figure: {
        kind: "table",
        columns: ["1組", "2組", "3組", "合計"],
        rows: [
          { label: "サッカー", cells: [9, 11, 10, 30] },
          { label: "野球", cells: [12, 8, 6, 26] },
          { label: "ドッジボール", cells: [3, 4, 8, 15] },
          { label: "その他", cells: [4, 2, 3, 9] },
          { label: "合計", cells: [28, 25, 27, "ア"] },
        ],
      },
      steps: ["各クラスの合計をたす", "28 + 25 + 27 = 80", "ア = 80"],
      tags: ["表の読み取り"],
    },
    {
      id: "g3-bargraph-hard-1",
      difficulty: "hard",
      question: "同じスポーツの表で、すきな人がいちばん多いスポーツは何ですか。",
      answer: "サッカー",
      figure: {
        kind: "table",
        columns: ["1組", "2組", "3組", "合計"],
        rows: [
          { label: "サッカー", cells: [9, 11, 10, 30] },
          { label: "野球", cells: [12, 8, 6, 26] },
          { label: "ドッジボール", cells: [3, 4, 8, 15] },
          { label: "その他", cells: [4, 2, 3, 9] },
          { label: "合計", cells: [28, 25, 27, 80] },
        ],
      },
      steps: ["合計の列をくらべる：サッカー30、野球26、ドッジボール15、その他9", "いちばん多いのはサッカー"],
      tags: ["表の読み取り"],
    },
    {
      id: "g3-bargraph-hard-2",
      difficulty: "hard",
      question:
        "のぞみさんは、黒と白の四角形と円を、色と形で分けて表にまとめています。表の（ア）にあてはまる数はいくつですか。",
      answer: "3",
      figure: {
        kind: "table",
        columns: ["四角形", "円", "合計"],
        rows: [
          { label: "黒", cells: ["ア", "-", "-"] },
          { label: "白", cells: ["-", "イ", "-"] },
          { label: "合計", cells: ["-", "ウ", "-"] },
        ],
      },
      steps: ["黒い四角形の数を図から数える", "アにあてはまる数は3"],
      tags: ["表の読み取り"],
    },
    {
      id: "g3-bargraph-hard-3",
      difficulty: "hard",
      question: "同じ表で、（イ）にあてはまる数はいくつですか。",
      answer: "6",
      figure: {
        kind: "table",
        columns: ["四角形", "円", "合計"],
        rows: [
          { label: "黒", cells: ["ア", "-", "-"] },
          { label: "白", cells: ["-", "イ", "-"] },
          { label: "合計", cells: ["-", "ウ", "-"] },
        ],
      },
      steps: ["白い円の数を図から数える", "イにあてはまる数は6"],
      tags: ["表の読み取り"],
    },
    {
      id: "g3-bargraph-hard-4",
      difficulty: "hard",
      question: "同じ表で、（ウ）は何の数の合計を表していますか。",
      answer: "円",
      steps: ["ウは「円」の列のいちばん下、合計の行にある", "円の数の合計を表している"],
      tags: ["表の読み取り"],
    },
    {
      id: "g3-bargraph-easy-6",
      difficulty: "easy",
      question: "下の表は、家の前を通ったのりものの数を調べたものです。2番目に多く通ったのりものは何ですか。",
      answer: "トラック",
      figure: {
        kind: "table",
        columns: ["台数（台）"],
        rows: [
          { label: "じょう用車", cells: [15] },
          { label: "トラック", cells: [6] },
          { label: "自転車", cells: [5] },
          { label: "バイク", cells: [3] },
          { label: "その他", cells: [8] },
        ],
      },
      steps: ["それぞれの台数をくらべる：15, 6, 5, 3, 8", "いちばん多いのはじょう用車(15)、2番目はトラック(6)"],
      tags: ["表の読み取り"],
    },
    {
      id: "g3-bargraph-normal-7",
      difficulty: "normal",
      question: "同じ表で、じょう用車の台数は、自転車の台数の何倍ですか。",
      answer: "3",
      figure: {
        kind: "table",
        columns: ["台数（台）"],
        rows: [
          { label: "じょう用車", cells: [15] },
          { label: "トラック", cells: [6] },
          { label: "自転車", cells: [5] },
          { label: "バイク", cells: [3] },
          { label: "その他", cells: [8] },
        ],
      },
      steps: ["じょう用車は15台、自転車は5台", "15 ÷ 5 = 3", "3倍"],
      tags: ["表の読み取り"],
    },
    {
      id: "g3-bargraph-normal-8",
      difficulty: "normal",
      question: "同じ表で、バイクの台数は、トラックの台数の何分の一ですか。",
      answer: "2分の1",
      figure: {
        kind: "table",
        columns: ["台数（台）"],
        rows: [
          { label: "じょう用車", cells: [15] },
          { label: "トラック", cells: [6] },
          { label: "自転車", cells: [5] },
          { label: "バイク", cells: [3] },
          { label: "その他", cells: [8] },
        ],
      },
      steps: ["バイクは3台、トラックは6台", "3は6の半分（2分の1）"],
      tags: ["表の読み取り"],
    },
    {
      id: "g3-bargraph-easy-7",
      difficulty: "easy",
      question: "同じ表で、家の前を通ったのりものは全部で何台ですか。",
      answer: "37",
      figure: {
        kind: "table",
        columns: ["台数（台）"],
        rows: [
          { label: "じょう用車", cells: [15] },
          { label: "トラック", cells: [6] },
          { label: "自転車", cells: [5] },
          { label: "バイク", cells: [3] },
          { label: "その他", cells: [8] },
        ],
      },
      steps: ["それぞれの台数をすべてたす", "15 + 6 + 5 + 3 + 8 = 37", "合計37台"],
      tags: ["表の読み取り", "文章題"],
    },
    {
      id: "g3-bargraph-normal-9",
      difficulty: "normal",
      question: "下の表は、図書室でかりられた本の数を3か月分まとめたものです。11月に借りられた物語は何さつですか。",
      answer: "23",
      figure: {
        kind: "table",
        columns: ["9月", "10月", "11月", "合計"],
        rows: [
          { label: "物語", cells: [17, 28, 23, 68] },
          { label: "伝記", cells: [12, 24, 19, 55] },
          { label: "図かん", cells: [7, 12, 9, 28] },
          { label: "その他", cells: [15, 20, 16, 51] },
          { label: "合計", cells: [51, 84, 67, 202] },
        ],
      },
      steps: ["表の「物語」の行、「11月」の列を見る", "23さつ"],
      tags: ["表の読み取り"],
    },
    {
      id: "g3-bargraph-normal-10",
      difficulty: "normal",
      question: "同じ表で、9月から11月までにかりられた伝記の合計は何さつですか。",
      answer: "55",
      figure: {
        kind: "table",
        columns: ["9月", "10月", "11月", "合計"],
        rows: [
          { label: "物語", cells: [17, 28, 23, 68] },
          { label: "伝記", cells: [12, 24, 19, 55] },
          { label: "図かん", cells: [7, 12, 9, 28] },
          { label: "その他", cells: [15, 20, 16, 51] },
          { label: "合計", cells: [51, 84, 67, 202] },
        ],
      },
      steps: ["伝記の行の合計を見る", "12 + 24 + 19 = 55"],
      tags: ["表の読み取り"],
    },
    {
      id: "g3-bargraph-hard-5",
      difficulty: "hard",
      question: "同じ表で、3か月間でかりられた本の合計は何さつですか。",
      answer: "202",
      figure: {
        kind: "table",
        columns: ["9月", "10月", "11月", "合計"],
        rows: [
          { label: "物語", cells: [17, 28, 23, 68] },
          { label: "伝記", cells: [12, 24, 19, 55] },
          { label: "図かん", cells: [7, 12, 9, 28] },
          { label: "その他", cells: [15, 20, 16, 51] },
          { label: "合計", cells: [51, 84, 67, 202] },
        ],
      },
      steps: ["合計の列のいちばん下の数を見る", "68 + 55 + 28 + 51 = 202"],
      tags: ["表の読み取り"],
    },
    {
      id: "g3-bargraph-hard-6",
      difficulty: "hard",
      question: "同じ表で、いちばん多くかりられた本の種類は何ですか。",
      answer: "物語",
      figure: {
        kind: "table",
        columns: ["9月", "10月", "11月", "合計"],
        rows: [
          { label: "物語", cells: [17, 28, 23, 68] },
          { label: "伝記", cells: [12, 24, 19, 55] },
          { label: "図かん", cells: [7, 12, 9, 28] },
          { label: "その他", cells: [15, 20, 16, 51] },
          { label: "合計", cells: [51, 84, 67, 202] },
        ],
      },
      steps: ["合計の列をくらべる：物語68、伝記55、図かん28、その他51", "いちばん多いのは物語"],
      tags: ["表の読み取り"],
    },
  ],
};
